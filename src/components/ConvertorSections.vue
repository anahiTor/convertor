<template>
  <div class="convertor-section-content">
    <base-convertor-input
      :rates="rates"
      v-model="baseRate"
      @setConvertableRate="setConvertableRate"
      :key="baseRate.name"
    />
    <img src="@/assets/icons/swap.png" @click="switchRates" />
    <base-convertor-input
      :rates="rates"
      :readonly="true"
      v-model="convertedRate"
      :key="convertedRate.name"
    />
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import BaseConvertorInput from "./base/BaseConvertorInput.vue";
export default {
  components: { BaseConvertorInput },
  name: "ConvertorSection",
  props: {
    data: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const rates = computed(() => ({ ...props.data.rates, RUB: 1 }));
    const baseRate = ref({
      name: "RUB",
      value: 1,
    });
    const convertedRate = ref({
      name: "AMD",
      value: rates.value["AMD"],
    });

    const setConvertableRate = ({ name, value }) =>
      (convertedRate.value = {
        name,
        value:
          ((baseRate.value.value / rates.value[baseRate.value.name]) *
            (value * rates.value[convertedRate.value.name])) /
          value,
      });

    const switchRates = () => {
      return ([baseRate.value, convertedRate.value] = [
        convertedRate.value,
        baseRate.value,
      ]);
    };

    watch(
      baseRate,
      (val) => {
        setConvertableRate({
          name: convertedRate.value.name,
          value: val.value,
        });
      },
      { deep: true }
    );

    watch(
      convertedRate,
      (val) => {
        if (val.value === 1) {
          baseRate.value.value =
            rates.value[baseRate.value.name] / rates.value[val.name];
        }
      },
      { deep: true }
    );

    return {
      rates,
      baseRate,
      convertedRate,
      setConvertableRate,
      switchRates,
    };
  },
};
</script>
<style lang="scss" scoped>
.convertor-section-content {
  display: flex;
  justify-content: space-between;
  width: 40rem;
  align-items: center;
  height: max-content;
  padding: 0 2rem;
}
img {
  width: 40px;
  height: 40px;
  transform: scale(1) rotate(0deg);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2) rotate(180deg);
  }
}
</style>
