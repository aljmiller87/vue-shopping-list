<template>
  <div>
    <ProductHero
      title="All Products"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie eros. Sed viverra velit venenatis fermentum luctus."
    />
    <NoSSR>
      <ProductSort />
    </NoSSR>
  </div>
</template>

<script>
import NoSSR from "vue-no-ssr";
import ProductHero from "~/components/Products/Hero";
import ProductsList from "~/components/Products/ProductsList";
import ProductSort from "~/components/Products/Sort";

export default {
  name: "products",
  components: {
    NoSSR,
    ProductHero,
    ProductSort
  }
};
</script>

<style lang="scss" scoped></style>
