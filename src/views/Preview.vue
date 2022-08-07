<template>
  <base-section class="preview">
    <preview-header-section
      :searchQuery="searchQuery"
      @setSearchQuery="setSearchQuery"
      :valutes="valutes"
    />
  </base-section>
  <base-loader v-if="isLoading" />
  <base-section :isCentered="true" class="list">
    <preview-table-section :valutesTable="valutesTable" />
  </base-section>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { PATHS } from "@/constants";
import BaseSection from "@/components/base/BaseSection.vue";
import BaseLoader from "@/components/base/BaseLoader.vue";
import PreviewHeaderSection from "@/components/PreviewHeaderSection.vue";
import PreviewTableSection from "@/components/PreviewTableSection.vue";

export default {
  name: "Preview",
  components: {
    BaseSection,
    BaseLoader,
    PreviewHeaderSection,
    PreviewTableSection,
  },
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const searchQuery = ref("");
    const setSearchQuery = (val) => (searchQuery.value = val);

    const valutes = computed(() => {
      if (searchQuery.value) {
        return store.getters.getValutes.filter((e) => {
          return (
            e.CharCode.toLowerCase().includes(
              searchQuery.value.toLowerCase()
            ) || e.Name.toLowerCase().includes(searchQuery.value.toLowerCase())
          );
        });
      } else {
        return store.getters.getValutes;
      }
    });

    const baseValute = computed(() => store.getters.getBaseValute);

    const valutesTable = computed(
      () =>
        valutes.value &&
        Object.values(valutes.value)
          .filter((e) => baseValute.value.CharCode !== e.CharCode)
          .map((e) => {
            return {
              ID: e.ID,
              CharCode: e.CharCode,
              Name: e.Name,
              Nominal: e.Nominal,
              Value: e.Value,
              isUpgraded: e.Value > e.Previous,
            };
          })
    );

    onMounted(async () => {
      isLoading.value = true;
      await store.dispatch("fetchCurrenciesData", {
        path: PATHS[`CBR_CURRENCIES_PREVIEW`],
        field: "preview",
      });
      isLoading.value = false;
      return;
    });

    return {
      isLoading,
      valutes,
      searchQuery,
      baseValute,
      valutesTable,
      setSearchQuery,
    };
  },
};
</script>
<style lang="scss" scoped>
.preview {
  justify-content: space-around;
}

.list {
  width: 80%;
}
</style>
