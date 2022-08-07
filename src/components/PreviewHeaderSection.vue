<template>
  <base-search
    :value="searchQuery"
    @update:value="(val) => $emit('setSearchQuery', val)"
    :show-list="showList"
    @setShowList="setShowList"
  >
    <div v-if="valutes.length">
      <div
        v-for="(valute, key) in valutes"
        :key="key"
        class="valute"
        @click="() => selectValute(valute)"
      >
        <img
          v-if="valute.CharCode !== 'XDR'"
          :src="require(`@/assets/valutes/${valute.CharCode}.png`)"
        />
        <span>{{ valute.CharCode }}</span>
      </div>
    </div>
    <div v-else class="message">Ничего не найдено</div>
  </base-search>
  <base-dropdown
    v-model="baseValute"
    :isDropdownOpen="isDropdownOpen"
    @toggleDropdown="toggleDropdown"
    v-click-outside="() => toggleDropdown(false)"
  >
    <div
      v-for="valute in baseValutes"
      :key="valute.ID"
      @click="setBaseItem(valute)"
    >
      <span>{{ valute.CharCode }}</span>
    </div>
  </base-dropdown>
</template>

<script>
import BaseSearch from "@/components/base/BaseSearch.vue";
import useToggle from "@/composables/useToggle";
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "PreviewHeaderSection",
  props: {
    searchQuery: {
      type: String,
      default: "",
    },
    valutes: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    BaseSearch,
    BaseDropdown,
  },
  setup(props, { emit }) {
    const store = useStore();

    const isLoading = ref(false);

    const selectedValute = computed(() => store.getters.getSelectedValute);
    const selectValute = (valute) => {
      store.commit("SET_SELECTED_VALUTE", valute);
      setShowList(false);
      emit("setSearchQuery", selectedValute.value.CharCode);
    };

    const { isOpen: showList, toggleOpen: setShowList } = useToggle(
      !!props.searchQuery
    );

    const { isOpen: isDropdownOpen, toggleOpen: toggleDropdown } = useToggle();

    const baseValute = computed(() => store.getters.getBaseValute);
    const baseValutes = computed(() => store.getters.getValutes);
    const setBaseItem = (val) => {
      store.dispatch("calculateValutes", val);
      toggleDropdown(false);
    };

    return {
      isLoading,
      showList,
      selectedValute,
      baseValute,
      isDropdownOpen,
      baseValutes,
      toggleDropdown,
      selectValute,
      setShowList,
      setBaseItem,
    };
  },
};
</script>
<style lang="scss" scoped>
.valute {
  padding: 0.4em;
  text-align: left;
  color: #e5e5e5;
  border-radius: 9px;
  cursor: pointer;

  &:hover {
    background-color: #27272888;
    transition: all 0.5s;
  }

  img {
    width: 20px;
    margin-right: 0.5rem;
  }
}

.message {
  padding: 1rem;
  color: #e5e5e5;
}
</style>
