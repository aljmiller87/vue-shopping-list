<template>
  <div class="product_detail_page">
    <div class="home_container">
      <div class="home_background" :style="{ backgroundImage: `url(${bg})` }"></div>
      <div class="home_content_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content">
                <div class="home_title">
                  {{ title }}
                  <span>.</span>
                </div>
                <div class="home_text">
                  <p>{{ description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundUrl from "@/images/categories.jpg";
export default {
  name: "ProductHero",
  props: {
    product: Object
  },
  data() {
    return {
      bg: backgroundUrl,
      description: this.product.description,
      title: this.product.name
    };
  }
};
</script>

<style lang="scss" scoped>
</style>