<template>
  <main-navigation />
  <router-view />
</template>

<script>
import MainNavigation from "@/components/MainNavigation.vue";

export default {
  name: "App",
  components: { MainNavigation },
};
</script>
