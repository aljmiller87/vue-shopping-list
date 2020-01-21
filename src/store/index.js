import Vue from "vue";
import Vuex from "vuex";
import * as axios from "axios";

import { fetchProducts, fetchCategories } from "@/utils/products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: "notLoading",
    productCategories: [],
    products: [],
    cartProducts: [],
    cartProductCount: 0
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_CATEGORIES(state, categories) {
      state.productCategories = categories;
    }
  },
  actions: {
    async getAllData(context) {
      context.commit("SET_LOADING_STATUS", "loading");
      const products = await fetchProducts();
      const categories = await fetchCategories();
      context.commit("SET_PRODUCTS", products);
      context.commit("SET_CATEGORIES", categories);
      context.commit("SET_LOADING_STATUS", "notLoading");
    },
    async getProducts(context) {
      context.commit("SET_LOADING_STATUS", "loading");
      const products = await fetchProducts();
      context.commit("SET_PRODUCTS", products);
      context.commit("SET_LOADING_STATUS", "notLoading");
    },
    async getProductCategories(context) {
      context.commit("SET_LOADING_STATUS", "loading");
      const categories = await fetchCategories();
      context.commit("SET_CATEGORIES", categories);
      context.commit("SET_LOADING_STATUS", "notLoading");
    }
    // addToCart({ commit }, product, quantity = 1)
  },
  getters: {
    getProductById: state => id => state.products.find(item => item.id == id)
  }
});
