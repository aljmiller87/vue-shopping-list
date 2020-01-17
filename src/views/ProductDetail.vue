<template>
  <div>
    <ProductHero :product="product" />
    <div class="product_details">
      <div class="container">
        <div class="row details_row">
          <!-- Product Image -->
          <div class="col-lg-6">
            <div class="details_image">
              <div class="details_image_large">
                <img v-if="selectedImage" :src="getImagePath(selectedImage)" alt />
                <div class="product_extra product_new">
                  <a href="categories.html">{{ product.option }}</a>
                </div>
              </div>
              <div
                class="details_image_thumbnails d-flex flex-row align-items-start justify-content-between"
              >
                <div
                  v-for="image in product.images"
                  :key="image"
                  class="details_image_thumbnail"
                  :class="{ active: isActive(image) }"
                  v-on:click="setSelectedImage(image)"
                >
                  <img :src="getImagePath(image)" alt />
                </div>
              </div>
            </div>
          </div>

          <!-- Product Content -->
          <div class="col-lg-6">
            <div class="details_content">
              <div class="details_name">{{ product.name }}</div>
              <div class="details_discount">$890</div>
              <div class="details_price">${{ product.price }}</div>

              <!-- In Stock -->
              <div class="in_stock_container">
                <div class="availability">Availability:</div>
                <span>In Stock</span>
              </div>
              <div class="details_text">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Phasellus id nisi quis justo tempus mollis sed et dui. In hac habitasse platea dictumst. Suspendisse ultrices mauris diam. Nullam sed aliquet elit. Mauris consequat nisi ut mauris efficitur lacinia.</p>
              </div>

              <!-- Product Quantity -->
              <div class="product_quantity_container">
                <div class="product_quantity clearfix">
                  <span>Qty</span>
                  <input id="quantity_input" type="text" pattern="[0-9]*" :value="quantity" />>
                  <div class="quantity_buttons">
                    <div
                      id="quantity_inc_button"
                      class="quantity_inc quantity_control"
                      v-on:click="quantity += 1"
                    >
                      <i class="fa fa-chevron-up" aria-hidden="true"></i>
                    </div>
                    <div
                      id="quantity_dec_button"
                      class="quantity_dec quantity_control"
                      v-on:click="quantity -= 1"
                    >
                      <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
                <div v-on:click="this.addToCart" class="button cart_button">
                  <span>Add to cart</span>
                </div>
              </div>

              <!-- Share -->
              <div class="details_share">
                <span>Share:</span>
                <ul>
                  <li>
                    <a href="#">
                      <i class="fa fa-pinterest" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Store
import { store } from "@/store";

// Utils
import { fetchProducts } from "@/utils/products";

//Components
import ProductHero from "@/components/Products/Hero";

export default {
  name: "ProductDetail",
  components: {
    ProductHero
  },
  // props: ['id', 'name', 'price', 'option'],
  data() {
    return {
      localStore: store,
      product: {
        id: this.$route.params.id,
        name: this.$route.params.name ? this.$route.params.name : undefined,
        price: this.$route.params.price ? this.$route.params.price : undefined,
        images: this.$route.params.images ? this.$route.params.images : [],
        option: this.$route.params.option
          ? this.$route.params.option
          : undefined
      },
      quantity: 1,
      selectedImage: this.$route.params.images
        ? this.$route.params.images[0]
        : false
    };
  },
  async created() {
    if (!this.isDataComplete()) {
      await this.loadProduct();
    }
  },
  methods: {
    isDataComplete() {
      if (
        !this.$route.params.name ||
        !this.$route.params.price ||
        !this.$route.params.images ||
        !this.$route.params.option
      ) {
        return false;
      }
      return true;
    },
    async loadProduct() {
      const products = await fetchProducts();
      const product = products.filter(
        item => item.id === parseInt(this.$route.params.id)
      );
      this.product = product[0];
      const firstImage = this.product.images[0];
      this.selectedImage = firstImage;
    },
    getImagePath(path) {
      return require("../images/" + path);
    },
    addToCart() {
      const item = this.product;
      const qty = this.quantity;
      store.addToCart(item, qty);
    },
    setSelectedImage(img) {
      this.selectedImage = img;
    },
    isActive(img) {
      if (this.selectedImage === img) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
</style>