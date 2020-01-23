<template>
  <div class="row row_extra">
    <div class="col-lg-4">
      <!-- Delivery -->
      <Shipping v-on="$listeners" />

      <!-- Coupon Code -->
      <Coupon />
    </div>

    <div class="col-lg-6 offset-lg-2">
      <Total :subtotal="subtotal" :shipping="shipping" :total="total" />
    </div>
  </div>
</template>

<script>
import Total from "@/components/Cart/Total";
import Shipping from "@/components/Cart/Shipping";
import Coupon from "@/components/Cart/Coupon";

export default {
  name: "Extra",
  components: {
    Total,
    Coupon,
    Shipping
  },
  props: {
    subtotal: Number,
    shipping: Number,
    total: Number
  }
};
</script>
<style lang="scss" scoped>
</style>