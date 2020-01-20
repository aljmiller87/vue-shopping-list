<template>
  <ProductHero title="All Products" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie eros. Sed viverra velit venenatis fermentum luctus." />
</template>

<script>
import ProductHero from "@/components/Products/Hero";
import ProductsList from "@/components/Products/ProductsList";
export default {
  name: "products",
  components: {
    ProductHero,
    ProductsList
  }
};
</script>

<style lang="scss" scoped>
</style>