<template>
  <div
    class="base-search"
    v-click-outside="() => showList && $emit('setShowList', false)"
  >
    <div class="base-search__header">
      <input
        placeholder="Искать"
        :value="value"
        @input="search"
        @focus="$emit('setShowList', true)"
      />
      <img
        :src="icon"
        @click="value.length && $emit('update:modelValue', '')"
      />
    </div>
    <transition>
      <div v-if="showList" class="base-search__contents">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "BaseSearch",
  props: {
    value: {
      type: String,
      required: true,
      default: "",
    },
    showList: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ["update:value", "showList"],
  setup(props, { emit }) {
    const icon = computed(() =>
      props.value.length
        ? require("@/assets/icons/close.png")
        : require("@/assets/icons/search.png")
    );

    const search = (e) => {
      emit("update:value", e.target.value);
    };

    return {
      icon,
      search,
    };
  },
};
</script>

<style scoped lang="scss">
.base-search {
  position: relative;
  width: 500px;
  &__header {
    height: 40px;
    input {
      position: absolute;
      z-index: 2;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      font-size: 16px;
      color: #e5e5e5;
      border-radius: 25px;
      outline-color: #0dd73e;
      background-color: #4a494b;
      border: 1px solid rgb(183, 181, 181);
    }
    img {
      position: absolute;
      z-index: 2;
      right: 0rem;
      width: 20px;
      height: 20px;
      background-size: contain;
      transform: translate(10px, 10px);
      cursor: pointer;
    }
  }
  &__contents {
    position: absolute;
    top: calc(40px - 1rem);
    z-index: 1;
    width: 100%;
    max-height: 200px;
    padding: 1.5rem 1rem 1rem;
    left: 0;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 7px 20px -10px #000000;
    background-color: #4a494b;
    overflow-y: scroll;
  }
}

.v-enter-from {
  opacity: 0;
  height: 0px;
  transition: all 0.5s ease;
}
.v-enter-to {
  opacity: 1;
  height: 200px;
  transition: all 0.5s ease;
}
.v-leave-from {
  opacity: 1;
  height: 200px;
  transition: all 0.5s ease;
}
.v-leave-to {
  opacity: 0;
  height: 0px;
  transition: all 0.5s ease;
}
</style>
