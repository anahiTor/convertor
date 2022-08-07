import { createStore } from "vuex";

export default createStore({
  state: {
    preview: null,
    convertor: null,
    selectedValute: {
      CharCode: "RUB",
      ID: "R00000",
      Name: "Российских рублей",
      Nominal: 1,
      NumCode: "000",
      Previous: 1,
      Value: 1,
    },
    baseValute: {
      CharCode: "RUB",
      ID: "R00000",
      Name: "Российских рублей",
      Nominal: 1,
      NumCode: "000",
      Previous: 1,
      Value: 1,
    },
  },
  getters: {
    getValutes(state) {
      if (state.preview) {
        return Object.values(state.preview?.Valute);
      }
    },
    getSelectedValute(state) {
      return state.selectedValute;
    },
    getBaseValute(state) {
      return state.baseValute;
    },
    getConvertorData(state) {
      return state.convertor
    },

  },
  mutations: {
    SET_STATE(state, { field, data }) {
      state[field] = { ...data };
    },
    SET_SELECTED_VALUTE(state, valute) {
      console.log(valute, "setting valute");
      state.selectedValute = { ...valute };
    },
    SET_BASE_VALUTE(state, valute) {
      state.baseValute = { ...valute };
    },
    SET_VALUTES(state, unit) {
      console.log("unit", unit);
      Object.entries(state.preview.Valute).map(([key, value]) => {
        state.preview.Valute[key] = {
          ...value,
          Value: (value.Value / unit).toFixed(4),
          Previous: (value.Previous / unit).toFixed(4),
        };
      });
    },
  },
  actions: {
    async fetchCurrenciesData({ commit }, { path, field }) {
      try {
        const res = await fetch(path);
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          commit("SET_STATE", { field, data });
        }
      } catch (err) {
        console.error(err);
      }
    },
    calculateValutes({ state, commit }, valute) {
      commit("SET_BASE_VALUTE", valute);
      const valutes = Object.values(state.preview.Valute);
      const valueInRubs = valutes.find(
        (e) => e.CharCode === state.baseValute.CharCode
      ).Value;
      const unit = (valueInRubs / state.baseValute.Nominal).toFixed(4);
      commit("SET_VALUTES", unit);
    },
  },
  modules: {},
});
