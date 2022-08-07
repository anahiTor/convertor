import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { clickOutside } from "./utils/clickOutside";

const app = createApp(App)
  .use(store)
  .use(router)
  .directive("click-outside", clickOutside);
app.mount("#app");
