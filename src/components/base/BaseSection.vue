<template>
  <section class="base-section" :class="{ centered: isCentered }">
    <slot />
  </section>
</template>

<script>
export default {
  name: "BaseSection",
  props: {
    isCentered: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.base-section {
  display: flex;
  width: 100%;
  padding: 4rem 2rem;
  @media (max-width: 1200px) {
    padding: 3rem 2rem;
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
  &.centered {
    align-items: center;
    justify-content: center;
  }
}
</style>
