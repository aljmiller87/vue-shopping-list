<template>
  <div class="cart_info">
    <div class="container">
      <ProductListLabels />
      <div class="row cart_items_row">
        <div class="col">
          <!-- Cart Item -->
          <CartItem
            v-for="item in items"
            :cartItem="item"
            :key="item.product.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// components
import ProductListLabels from "@/components/Cart/ProductListLabels";
import CartItem from "@/components/Cart/CartItem";

// utilities
import { fetchProducts } from "@/assets/utils/products";
import { getImagePath } from "@/assets/utils/getImagePath";

export default {
  name: "ProductList",
  components: {
    CartItem,
    ProductListLabels
  },
  props: {
    items: Array
  },
  data() {
    return {
      cartItems: this.items
    };
  }
};
</script>

<style lang="scss" scoped></style>
