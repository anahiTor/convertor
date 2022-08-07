import { ref } from "vue";
export default (val = false) => {
  const isOpen = ref(val);

  const toggleOpen = (value) => {
    isOpen.value = value;
  };

  return { isOpen, toggleOpen };
};
