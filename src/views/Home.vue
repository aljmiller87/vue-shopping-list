<template>
  <div>
    <div class="home">
      <Slider />
    </div>
    <Ads />
    <ProductsList />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Slider from "@/components/Slider";
  import Ads from "@/components/Ads";
  import ProductsList from "@/components/Products/ProductsList";

  export default {
    name: "home",
    components: {
      Slider,
      Ads,
      ProductsList
    },
  };
</script>