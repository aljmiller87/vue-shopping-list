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
import imagesLoaded from "imagesloaded";
import Isotope from "@/utils/isotope";
import { fetchProducts } from "@/utils/products";
import { getImagePath } from "@/utils/getImagePath";

export default {
  name: "ProductsList",
  props: {
    limit: Number
  },
  data() {
    return {
      products: [],
      option: {
        default: "",
        hot: "product_hot",
        new: "product_new",
        popular: "product_popular",
        sale: "product_sale"
      }
    };
  },
  async created() {
    await this.loadProducts();
  },
  computed: {
    computedList() {
      return this.limit ? this.products.slice(0, this.limit) : this.products;
    }
  },
  methods: {
    async loadProducts() {
      this.products = [];
      this.products = await fetchProducts();
    },
    getImagePath: getImagePath
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
    }
  }
};
</script>
