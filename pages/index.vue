<template>
  <div>
    <div class="home">
      <Slider />
    </div>
    <Ads />
    <NoSSR>
      <ProductsList :limit="8" />
    </NoSSR>
  </div>
</template>

<script>
// @ is an alias to /src
import NoSSR from "vue-no-ssr";

import * as axios from "axios";
import Slider from "~/components/Slider";
import Ads from "~/components/Ads";
import ProductsList from "~/components/Products/ProductsList";

export default {
  name: "home",
  components: {
    Slider,
    Ads,
    ProductsList,
    NoSSR
  },
  created() {
    this.$store.dispatch("getAllData");
  }
};
</script>
