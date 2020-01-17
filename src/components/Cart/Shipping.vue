<template>
  <div class="delivery">
    <div class="section_title">Shipping method</div>
    <div class="section_subtitle">Select the one you want</div>
    <div class="delivery_options">
      <label class="delivery_option clearfix">
        Next day delivery
        <input type="radio" name="radio" value="4.99" v-model="shipping" />
        <span class="checkmark"></span>
        <span class="delivery_price">$4.99</span>
      </label>
      <label class="delivery_option clearfix">
        Standard delivery
        <input type="radio" name="radio" value="1.99" v-model="shipping" />
        <span class="checkmark"></span>
        <span class="delivery_price">$1.99</span>
      </label>
      <label class="delivery_option clearfix">
        Personal pickup
        <input
          type="radio"
          checked="checked"
          name="radio"
          value="0"
          v-model="shipping"
        />
        <span class="checkmark"></span>
        <span class="delivery_price">Free</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shipping",
  data() {
    return {
      shipping: 0
    };
  },
  updated() {
    console.log("shipping component updated");
  },
  watch: {
    shipping: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log("oldValue: ", oldValue, " newValue: ", newValue);
        this.$emit("set-shipping", newValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>