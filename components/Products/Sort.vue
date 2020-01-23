<template>
  <!-- Product Sorting -->
  <div class="products_sort">
    <div class="container">
      <div class="row">
        <div class="col">
          <div
            class="sorting_bar d-flex flex-md-row flex-column align-items-md-center justify-content-md-start"
          >
            <div class="results">
              Showing
              <span>12</span> results
            </div>
            <div class="sorting_container ml-md-auto">
              <div class="sorting">
                <ul class="item_sorting">
                  <li v-if="productCategories.length > 0">
                    <span class="sorting_text">{{
                      computedCategory | capitalize
                    }}</span>
                    <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    <ul>
                      <li class="product_sorting_btn">
                        <button
                          class="btn-nodefault"
                          value
                          v-on:click="setCategory"
                        >
                          Default
                        </button>
                      </li>
                      <li
                        v-for="category in productCategories"
                        :key="category"
                        class="product_sorting_btn"
                      >
                        <button
                          class="btn-nodefault"
                          :value="category"
                          v-on:click="setCategory"
                        >
                          {{ category | capitalize }}
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span class="sorting_text">{{
                      computedSortBy | capitalize
                    }}</span>
                    <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    <ul>
                      <li class="product_sorting_btn">
                        <button
                          class="btn-nodefault"
                          value
                          v-on:click="setSortBy"
                        >
                          Default
                        </button>
                      </li>
                      <li class="product_sorting_btn">
                        <button
                          class="btn-nodefault"
                          value="price"
                          v-on:click="setSortBy"
                        >
                          Price
                        </button>
                      </li>
                      <li class="product_sorting_btn">
                        <button
                          class="btn-nodefault"
                          value="name"
                          v-on:click="setSortBy"
                        >
                          Name
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NoSSR>
      <ProductsList :sort="sortBy" :category="category" />
    </NoSSR>
  </div>
</template>

<script>
import NoSSR from "vue-no-ssr";

import { mapState, mapGetters } from "vuex";
import ProductsList from "@/components/Products/ProductsList";

export default {
  name: "ProductSort",
  components: {
    ProductsList,
    NoSSR
  },
  data() {
    return {
      category: "",
      sortBy: ""
    };
  },
  methods: {
    setSortBy(e) {
      const value = e.target.value;
      this.sortBy = value;
    },
    setCategory(e) {
      const value = e.target.value;
      this.category = value;
    }
  },
  computed: {
    ...mapState(["productCategories", "loadingStatus"]),
    ...mapGetters(["getProductCategories"]),
    computedSortBy() {
      if (!this.sortBy) {
        return "Sort by";
      }
      return this.sortBy;
    },
    computedCategory() {
      if (!this.category) {
        return "Choose Category";
      }
      return this.category;
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
