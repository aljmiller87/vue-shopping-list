<template>
  <!-- Products -->

  <div class="products">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="product_grid">
            <!-- Product -->
            <div v-for="product in computedList" :key="product.id" class="product">
              <div class="product_image">
                <img :src="getImagePath(product.images[0])" alt />
              </div>
              <div
                class="product_extra"
                :class="option[product.option]"
                v-if="product.option !== 'default'"
              >
                <a href="categories.html">{{ product.option | capitalize }}</a>
              </div>
              <div class="product_content">
                <div class="product_title">
                  <router-link
                    :to="{
                      name: 'product-detail',
                      params: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        option: product.option
                      }
                    }"
                  >{{ product.name }}</router-link>
                </div>
                <div class="product_price">${{ product.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import imagesLoaded from "imagesloaded";
import Isotope from "@/utils/isotope";
import { fetchProducts } from "@/utils/products";
import { getImagePath } from "@/utils/getImagePath";

export default {
  name: "ProductsList",
  props: {
    category: String,
    limit: Number,
    searchTerm: String,
    sort: String
  },
  data() {
    return {
      // products: [],
      option: {
        default: "",
        hot: "product_hot",
        new: "product_new",
        popular: "product_popular",
        sale: "product_sale"
      }
    };
  },
  computed: {
    ...mapState(["products", "loadingStatus"]),
    computedList() {
      if (!this.products) {
        return [];
      }
      let productList = [...this.products];

      // If Limit is passed
      if (this.limit) {
        productList = productList.slice(0, this.limit);
      }

      // If Sort value is passed
      if (this.sort) {
        if (this.sort == "price") {
          productList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }
        if (this.sort == "name") {
          productList.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
      }

      // If Category value is passed
      if (this.category) {
        productList = productList.filter(product => {
          const productCategories = product.categories;
          const hasCategory = productCategories.indexOf(this.category);
          return hasCategory >= 0;
        });
      }

      // If Search Term value is passed
      if (this.searchTerm) {
        productList = productList.filter(
          product =>
            this.hasCategory(product, this.searchTerm) ||
            this.hasName(product, this.searchTerm)
        );
      }

      return productList;
    }
  },
  methods: {
    getImagePath: getImagePath,
    hasCategory(product, searchTerm) {
      const productCategories = product.categories;
      const containsCategory = productCategories.indexOf(searchTerm);
      return containsCategory >= 0;
    },
    hasName(product, searchTerm) {
      const name = product.name.toLowerCase();
      const term = searchTerm.toLowerCase();
      return name.includes(term);
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  watch: {
    "products.length": {
      immediate: true,
      handler(newValue, oldValue) {
        const images = document.querySelectorAll(".product_image");
        imagesLoaded(images, () => {
          Isotope();
        });
      }
    },
    sort: {
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue === newValue) return;
        Isotope();
      }
    },
    category(newValue, oldValue) {
      Isotope();
    },
    searchTerm(newValue, oldValue) {
      Isotope();
    }
  }
};
</script>
