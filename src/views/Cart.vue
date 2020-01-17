<template>
  <div class="cart_info">
    <div class="container">
      <ProductList :items="items" />
      <CartButtons :clearCart="clearCart" />
      <Extra :subtotal="subtotal" @set-shipping="setShipping" :shipping="shipping" :total="total" />
    </div>
  </div>
</template>

<script>
// store
import { store } from "@/store";

// components
import ProductList from "@/components/Cart/ProductList";
import CartButtons from "@/components/Cart/CartButtons";
import Extra from "@/components/Cart/Extra";

// utilities
import { getImagePath } from "@/utils/getImagePath";

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
      shipping: 0,
      store: store
    };
  },
  async created() {
    await this.loadCart();
  },
  computed: {
    subtotal: function() {
      if (!this.items || !this.items.length) {
        return 0;
      }
      const subTotal = this.items.reduce(
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
    async loadCart() {
      const cartItems = [...store.items];
      this.items = cartItems;
      this.itemNumber = store.itemNumber;
    },
    setShipping(number) {
      if (typeof number === "string") {
        this.shipping = parseFloat(number);
      } else {
        this.shipping = number;
      }
    },
    clearCart(e) {
      e.preventDefault();
      console.log("clearCart method in Cart.vue called");
      store.clearCart();
    }
  },
  watch: {
    "store.itemsNumber": {
      immediate: true,
      async handler(newValue, oldValue) {
        console.log("oldValue: ", oldValue, " newValue: ", newValue);
        await this.loadCart();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>