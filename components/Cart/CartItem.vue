<template>
  <div
    class="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start"
  >
    <!-- Name -->
    <div
      class="cart_item_product d-flex flex-row align-items-center justify-content-start"
    >
      <div class="cart_item_image">
        <div><img :src="getImagePath(product.product.images[0])" alt="" /></div>
      </div>
      <div class="cart_item_name_container">
        <div class="cart_item_name">
          <nuxt-link
            :to="{ name: 'product-detail', params: { id: product.product.id } }"
          >
            {{ product.product.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- Price -->
    <div class="cart_item_price">${{ product.product.price }}</div>
    <!-- Quantity -->
    <div class="cart_item_quantity">
      <div class="product_quantity_container">
        <div class="product_quantity clearfix">
          <span>Qty</span>
          <input
            id="quantity_input"
            type="text"
            pattern="[0-9]*"
            :value="product.quantity"
          />
          <div class="quantity_buttons">
            <div
              id="quantity_inc_button"
              class="quantity_inc quantity_control"
              v-on:click="this.addToCart"
            >
              <i class="fa fa-chevron-up" aria-hidden="true"></i>
            </div>
            <div
              id="quantity_dec_button"
              class="quantity_dec quantity_control"
              v-on:click="this.removeFromCart"
            >
              <i class="fa fa-chevron-down" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Total -->
    <div class="cart_item_total">${{ productTotal }}</div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    cartItem: Object
  },
  data() {
    return {
      product: this.cartItem
    };
  },
  computed: {
    productTotal() {
      return this.product.quantity * parseFloat(this.product.product.price);
    }
  },
  methods: {
    getImagePath(path) {
      return require("@/assets/images/" + path);
    },
    addToCart() {
      const item = {
        product: this.product.product,
        quantity: 1
      };
      this.$store.dispatch("addToCart", item);
    },
    removeFromCart() {
      const item = this.product.product;
      this.$store.dispatch("removeFromCart", item);
    }
  }
};
</script>

<style lang="scss" scoped></style>
