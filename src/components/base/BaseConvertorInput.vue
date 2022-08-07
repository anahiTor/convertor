<template>
  <div
    class="base-convertor-input"
    v-click-outside="() => isOpen && toggleOpen(false)"
  >
    <base-dropdown
      v-model="selectedValute"
      :isDropdownOpen="isOpen"
      @toggleDropdown="toggleOpen"
    >
      <div
        v-for="[key, rate] in Object.entries(rates)"
        :key="key"
        @click="
          () => (
            setBaseItem(key, Math.ceil((1 / rate) * rate)), toggleOpen(false)
          )
        "
      >
        {{ key }}
      </div>
    </base-dropdown>
    <input type="number" :readonly="readonly" v-model="calculatedValue" />
  </div>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import useToggle from "@/composables/useToggle";
import BaseDropdown from "./BaseDropdown.vue";
export default {
  name: "BaseConvertorInput",
  props: {
    rates: {
      type: Object,
      required: true,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  components: { BaseDropdown },
  emits: ["update:modelValue", "setConvertableRate"],
  setup(props, { emit }) {
    const { isOpen, toggleOpen } = useToggle();
    const valute = ref(props.modelValue.name);

    const setBaseItem = (name, value) => {
      emit("update:modelValue", {
        name,
        value,
      });
    };
    const selectedValute = computed({
      get: () => props.modelValue.name,
      set: (val) => setBaseItem(val, props.modelValue.value),
    });

    const calculatedValue = computed({
      get: () =>
        props.readonly
          ? props.modelValue.value.toFixed(4)
          : props.modelValue.value,
      set: (val) => {
        setBaseItem(props.modelValue.name, val);
      },
    });

    return {
      isOpen,
      toggleOpen,
      valute,
      setBaseItem,
      calculatedValue,
      selectedValute,
    };
  },
};
</script>

<style lang="scss">
.base-convertor-input {
  position: relative;
  display: flex;
  height: 3rem;
  width: 15rem;
  .base-dropdown {
    width: 5rem;
  }
  input {
    position: absolute;
    left: 0;
    width: calc(100% - 6rem);
    height: 100%;
    padding-left: 6rem;
    border-radius: 25px;
    border: none;
    outline: none;
    background-color: #4a494b;
    color: #e5e5e5;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
