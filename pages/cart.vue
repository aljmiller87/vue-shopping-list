<template>
  <div class="cart_info">
    <div class="container">
      <ProductList :items="cartProducts" />
      <CartButtons :clearCart="clearCart" />
      <Extra
        :subtotal="subtotal"
        @set-shipping="setShipping"
        :shipping="shipping"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// components
import ProductList from "~/components/Cart/ProductList";
import CartButtons from "~/components/Cart/CartButtons";
import Extra from "~/components/Cart/Extra";

export default {
  name: "cart",
  components: {
    ProductList,
    CartButtons,
    Extra
  },
  data() {
    return {
      items: [],
      itemNumber: 0,
      shipping: 0
    };
  },
  computed: {
    ...mapState(["cartProducts"]),
    subtotal: function() {
      if (!this.cartProducts || !this.cartProducts.length) {
        return 0;
      }
      const subTotal = this.cartProducts.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      );
      return subTotal;
    },
    total: function() {
      return this.subtotal + parseFloat(this.shipping);
    }
  },
  methods: {
    setShipping(number) {
      if (typeof number === "string") {
        this.shipping = parseFloat(number);
      } else {
        this.shipping = number;
      }
    },
    clearCart(e) {
      e.preventDefault();
      this.$store.dispatch("clearCart");
    }
  }
};
</script>

<style lang="scss" scoped></style>
