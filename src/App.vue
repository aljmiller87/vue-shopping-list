<template>
  <div id="app">
    <div class="super_container">
      <Header />
      <Menu />
      <div :style="{ background: '#fff', position: 'relative', zIndex: '2' }">
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";

export default {
  components: {
    Header,
    Footer,
    Menu
  }
};
</script>

<style lang="scss">
/*@import "./styles/global.scss";*/
</style>
