<template>
  <!-- Products -->

  <div class="products">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="product_grid">
            <!-- <NoSSR> -->
            <!-- Product -->
            <div
              v-for="product in computedList"
              :key="product.id"
              class="product"
            >
              <div class="product_image">
                <img :src="getImagePath(product.images[0])" alt />
              </div>
              <div
                class="product_extra"
                :class="option[product.option]"
                v-if="product.option !== 'default'"
              >
                <a href="categories.html">
                  {{ product.option | capitalize }}
                </a>
              </div>
              <div class="product_content">
                <div class="product_title">
                  <nuxt-link
                    :to="{
                      name: 'product-id',
                      params: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        option: product.option
                      }
                    }"
                    >{{ product.name }}</nuxt-link
                  >
                </div>
                <div class="product_price">${{ product.price }}</div>
              </div>
            </div>
            <!-- </NoSSR> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let initIsotope;
let imagesLoaded;
if (process.browser) {
  initIsotope = require("../../assets/utils/isotope");
  imagesLoaded = require("imagesloaded");
}
import { mapState, mapActions } from "vuex";
import { fetchProducts } from "~/assets/utils/products";
import { getImagePath } from "~/assets/utils/getImagePath";

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
      option: {
        default: "",
        hot: "product_hot",
        new: "product_new",
        popular: "product_popular",
        sale: "product_sale"
      },
      mounted: false,
      images: []
    };
  },
  mounted() {
    this.mounted = true;
  },
  updated() {
    if (this.images.length === 0) {
      const imgs = document.querySelectorAll(".product_image");
      if (imgs.length > 0) {
        this.images = imgs;
      }
    }
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
    },
    initIsotope() {
      imagesLoaded(this.images, () => {
        console.log("images loaded", this.images);
        var elem = document.querySelector(".product_grid");
        new Isotope(elem, {
          // options
          itemSelector: ".product",
          layoutMode: "fitRows",
          fitRows: {
            gutter: 30
          },
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false
          }
        });
      });
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
    "images.length"(newValue, oldValue) {
      if (newValue > 0) {
        this.initIsotope();
      }
    },
    "products.length": {
      immediate: false,
      handler(newValue, oldValue) {
        if (this.mounted) {
          this.initIsotope();
        }
      }
    },
    sort: {
      immediate: false,
      handler(newValue, oldValue) {
        if (oldValue === newValue) return;
        if (this.mounted) {
          this.initIsotope();
        }
      }
    },
    category(newValue, oldValue) {
      if (this.mounted) {
        this.initIsotope();
      }
    },
    searchTerm(newValue, oldValue) {
      if (this.mounted) {
        this.initIsotope();
      }
    }
  }
};
</script>
