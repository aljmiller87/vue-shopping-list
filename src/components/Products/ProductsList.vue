<template>
  <!-- Products -->

  <div class="products">
    <div class="container">
      <div class="row">
        <div class="col">

          <div class="product_grid">

            <!-- Product -->
            <div v-for="product in products" :key="product.id" :data-key="product.id" class="product">
              <div class="product_image"><img :src="getImagePath(product.image)"  alt=""></div>
              <div class="product_extra product_new"><a href="categories.html">{{ product.option }}</a></div>
              <div class="product_content">
                <div class="product_title"><a href="product.html">{{ product.name }}</a></div>
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
  import imagesLoaded from 'imagesloaded';
  import Isotope from "@/utils/isotope";
  import { fetchProducts } from "@/utils/products";

  export default {
    name: "ProductsList",
    data() {
      return {
        products: [],
      }
    },
    async created() {
      await this.loadProducts();
    },
    methods: {
      async loadProducts() {
        this.products = [];
        this.products = await fetchProducts();
      },
      getImagePath(path) {
        return require('../../images/' + path)
      }
    },
    watch: {
      'products.length': {
        immediate: true,
        handler(newValue, oldValue) {
          const images = document.querySelectorAll('.product_image');
          imagesLoaded(images, () => {
            Isotope();
          })
        }
      }
    },
  }
</script>
