<template>
  <div class="row row_cart_buttons">
    <div class="col">
      <div
        class="cart_buttons d-flex flex-lg-row flex-column align-items-start justify-content-start"
      >
        <div class="button continue_shopping_button">
          <nuxt-link to="/products">Continue shopping</nuxt-link>
        </div>
        <div class="cart_buttons_right ml-lg-auto">
          <div class="button clear_cart_button">
            <a href="#" v-on:click="clearCart">Clear cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartButtons",
  props: {
    clearCart: Function
  }
};
</script>

<style lang="scss" scoped></style>
