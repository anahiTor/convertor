<template>
  <nav class="main-nav">
    <router-link to="/preview" class="main-nav__item"> Просмотор </router-link>
    <router-link to="/convertor" class="main-nav__item">
      Конвертация
    </router-link>
  </nav>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainNavigation",
  setup() {},
});
</script>

<style scoped lang="scss">
.main-nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  border-radius: 25px;
  background-color: #4a494b;
  &__item {
    display: flex;
    padding: 1rem;
    color: #e9f2e8;
    text-decoration: none;
    &.router-link-active {
      color: #0dd73e;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        z-index: 1;
        height: calc(100% - 4px);
        border-radius: 25px;
        border: 2px solid #33994c;
        transition: all .3s;
        transform: translate(-1rem, 0rem);
      }
      &:nth-child(1) {
        &::before {
          width: 47%;
        }
      }
      &:nth-child(2) {
        &::before {
          width: 52%;
        }
      }
    }
  }
}
</style>
