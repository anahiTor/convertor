<template>
  <div class="base-dropdown">
    <div class="base-dropdown__header">
      <div @click="toggleDropdown">
        {{ selectedItem?.CharCode || selectedItem }}
      </div>
    </div>
    <transition>
      <div v-if="isDropdownOpen" class="base-dropdown__contents">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "BaseDropdown",
  props: {
    modelValue: {
      type: [Object, String],
      required: true,
      default: () => {},
    },
    isDropdownOpen: {
      type: Boolean,
      required: true.valueOf,
      default: false,
    },
  },
  emits: ["update:modelValue", "toggleDropdown"],
  setup(props, { emit }) {
    const selectedItem = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit("update:modelValue", val);
      },
    });

    const toggleDropdown = () => {
      emit("toggleDropdown", !props.isDropdownOpen);
    };

    return {
      selectedItem,
      toggleDropdown,
    };
  },
};
</script>
<style lang="scss">
.base-dropdown {
  position: relative;
  width: 15rem;
  &__header {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #e5e5e5;
    background-color: #4a494b;
    border-radius: 25px;
    border: 1px solid rgb(183, 181, 181);
    cursor: pointer;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  &__contents {
    position: absolute;
    top: calc(40px - 1rem);
    padding-top: 1.5rem;
    z-index: 1;
    width: 100%;
    max-height: 200px;
    left: 0;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 7px 20px -10px #000000;
    background-color: #4a494b;
    overflow-y: scroll;
    > div {
      padding: 0.5rem;
      color: #e5e5e5;
      cursor: pointer;
      &:hover {
        background-color: #27272888;
        transition: all 0.5s;
      }
    }
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
