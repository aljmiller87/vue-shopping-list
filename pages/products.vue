<template>
  <div>
    <ProductHero
      title="All Products"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie eros. Sed viverra velit venenatis fermentum luctus."
    />
    <ProductSort />
  </div>
</template>

<script>
import ProductHero from "~/components/Products/Hero";
import ProductSort from "~/components/Products/Sort";

export default {
  name: "products",
  components: {
    ProductHero,
    ProductSort
  },
  created() {
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getProductCategories");
  },
  mounted() {
    this.$store.dispatch("getCart");
  }
};
</script>

<style lang="scss" scoped></style>
