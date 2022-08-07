<template>
  <base-section class="convertor-section">
    <convertor-sections :data="convertorData" v-if="convertorData" />
  </base-section>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { PATHS } from "@/constants";
import BaseSection from "@/components/base/BaseSection.vue";
import ConvertorSections from "@/components/ConvertorSections.vue";
export default defineComponent({
  name: "Convertor",
  components: { BaseSection, ConvertorSections },
  setup() {
    const store = useStore();
    const convertorData = computed(() => store.getters.getConvertorData);

    onMounted(() =>
      store.dispatch("fetchCurrenciesData", {
        path: PATHS["CBR_CURRENCIES_CONVERTOR"],
        field: "convertor",
      })
    );
    return {
      convertorData,
    };
  },
});
</script>
<style scoped>
.convertor-section {
  justify-content: center;
  height: 100vh;
}
</style>
