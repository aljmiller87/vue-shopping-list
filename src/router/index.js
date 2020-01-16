import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Cart from "../views/Cart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    props: route => ({ 
      id: parseInt(route.params.id),
      // name: route.params.name,
      // price: route.params.price,
      // option: route.params.option
    }),
    component: ProductDetail,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
