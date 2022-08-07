<template>
  <div class="base-list">
    <div class="base-list__row">
      <slot />
    </div>
    <div v-if="list.length">
      <div class="base-list__row" v-for="(item, key) in list" :key="key">
        <div v-for="(field, i) in Object.values(item)" :key="i">
          <span v-if="typeof field !== 'boolean'">
            {{ field }}
          </span>
          <img
            v-else
            :src="
              field
                ? require('@/assets/icons/up.png')
                : require('@/assets/icons/down.png')
            "
          />
        </div>
      </div>
    </div>
    <div v-else>Нет Данных</div>
  </div>
</template>

<script>
export default {
  name: "BaseList",
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup() {},
};
</script>
<style lang="scss" scoped>
.base-list {
  color: #e5e5e5;
  width: 100%;
  &__row {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 1fr 0.5fr 0.5fr 0.5fr;
    text-align: left;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 25px;
    box-shadow: 4px 7px 20px -10px #000000;
    background-color: #4a494b;
    img {
      width: 20px;
    }
  }
}
</style>
