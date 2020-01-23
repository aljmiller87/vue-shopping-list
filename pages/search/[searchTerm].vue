<template>
  <div>
    <SmallHero title="Search Results" />
    <NoSSR>
      <ProductsList :searchTerm="searchTerm" />
    </NoSSR>
  </div>
</template>

<script>
import NoSSR from "vue-no-ssr";
import ProductsList from "~/components/Products/ProductsList";
import SmallHero from "~/components/SmallHero";

export default {
  name: "search-results",
  components: {
    SmallHero,
    ProductsList,
    NoSSR
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

<style lang="scss" scoped></style>
