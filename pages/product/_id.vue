<template>
  <div v-if="product">
    <ProductHero :title="product.name" :description="product.description" />
    <div class="product_details">
      <div class="container">
        <div class="row details_row">
          <!-- Product Image -->
          <div class="col-lg-6">
            <div class="details_image">
              <div class="details_image_large">
                <img
                  v-if="selectedImage"
                  :src="getImagePath(selectedImage)"
                  alt
                />
                <div
                  class="product_extra"
                  :class="option[product.option]"
                  v-if="product.option !== 'default'"
                >
                  <a href="categories.html">
                    {{ product.option | capitalize }}
                  </a>
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
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. Phasellus id nisi quis justo
                  tempus mollis sed et dui. In hac habitasse platea dictumst.
                  Suspendisse ultrices mauris diam. Nullam sed aliquet elit.
                  Mauris consequat nisi ut mauris efficitur lacinia.
                </p>
              </div>

              <!-- Product Quantity -->
              <div class="product_quantity_container">
                <div class="product_quantity clearfix">
                  <span>Qty</span>
                  <input
                    id="quantity_input"
                    type="text"
                    pattern="[0-9]*"
                    :value="quantity"
                  />>
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
import { mapGetters, mapState } from "vuex";

//Components
import ProductHero from "~/components/Products/Hero";

export default {
  name: "ProductDetail",
  components: {
    ProductHero
  },
  data() {
    return {
      product: {},
      quantity: 1,
      selectedImage: this.product ? this.product.images[0] : false,
      option: {
        default: "",
        hot: "product_hot",
        new: "product_new",
        popular: "product_popular",
        sale: "product_sale"
      }
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.product = this.getProductById(this.$route.params.id);
  },
  computed: {
    ...mapState(["loadingStatus"]),
    ...mapGetters(["getProductById"])
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    getImagePath(path) {
      return require("~/assets/images/" + path);
    },
    addToCart() {
      const product = this.product;
      const quantity = this.quantity;
      this.$store.dispatch("addToCart", { product, quantity });
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
  },
  watch: {
    loadingStatus(newValue, oldValue) {
      // If products has finished loading, update this.product
      if (newValue === "notLoading") {
        this.product = this.getProductById(this.$route.params.id);
      }
    },
    product(newValue, oldValue) {
      // If products successfully updates, also update this.selectedImage
      if (this.product && this.product.images) {
        this.selectedImage = this.product.images[0];
      }
    }
  }
};
</script>

<style scoped></style>
