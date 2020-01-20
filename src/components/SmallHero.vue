<template>
  <div class="home SmallHero">
    <div class="home_container">
      <div class="home_background" :style="{ backgroundImage: `url(${SmallHeroBg})` }"></div>
      <div class="home_content_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content">
                <div class="breadcrumbs">
                  <ul>
                    <li>
                      <router-link to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li>Search</li>
                  </ul>
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
import SmallHeroBg from "@/images/contact.jpg";
export default {
  name: "SmallHero",
  data() {
    return {
      SmallHeroBg: SmallHeroBg
    };
  }
};
</script>

<style lang="scss" scoped>
</style>