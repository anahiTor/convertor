<template>
  <main-page />
</template>

<script>
import MainPage from "./views/MainPage.vue";

export default {
  name: "App",
  components: { MainPage },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #282726;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
