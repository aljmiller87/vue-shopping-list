<template>
  <div>
    <div class="home">
      <Slider />
    </div>
    <Ads />
    <ProductsList :limit="8" />
  </div>
</template>

<script>
// @ is an alias to /src

import * as axios from "axios";
import Slider from "~/components/Slider";
import Ads from "~/components/Ads";
import ProductsList from "~/components/Products/ProductsList";

export default {
  name: "home",
  components: {
    Slider,
    Ads,
    ProductsList
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
