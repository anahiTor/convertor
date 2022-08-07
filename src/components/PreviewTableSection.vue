<template>
  <base-list :list="valutesTable">
    <div>ID</div>
    <div>Валюта</div>
    <div>Название</div>
    <div>Едениц</div>
    <div>Курс</div>
    <div>Статус</div>
  </base-list>
</template>

<script>
import BaseList from '@/components/base/BaseList.vue';
export default {
  components: { BaseList },
  name: "PreviewTableSection",
  props: {
    valutesTable: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
