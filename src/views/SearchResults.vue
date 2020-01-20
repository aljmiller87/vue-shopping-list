<template>
  <div>
    <SmallHero title="Search Results" />
    <ProductsList :searchTerm="searchTerm" />
  </div>
</template>

<script>
import { fetchProducts } from "@/utils/products";
import { fetchCategories } from "@/utils/products";
import ProductsList from "@/components/Products/ProductsList";
import SmallHero from "@/components/SmallHero";

export default {
  name: "search-results",
  components: {
    SmallHero,
    ProductsList
  },
  data() {
    return {
      searchTerm: this.$route.params.searchTerm
    };
  },
  watch: {
    "$route.params.searchTerm": function(newValue, oldValue) {
      this.searchTerm = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>