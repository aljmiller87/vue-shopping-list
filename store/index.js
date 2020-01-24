// import Vue from "vue";
// import Vuex from "vuex";
import { findProductInCart, saveCartData } from "~/assets/utils/helpers";

import { fetchProducts, fetchCategories } from "~/assets/utils/products";

// Vue.use(Vuex);

export const state = () => ({
  loadingStatus: "notLoading",
  productCategories: [],
  products: [],
  cartProducts: [],
  cartProductCount: 0
});

export const mutations = {
  SET_LOADING_STATUS(state, status) {
    state.loadingStatus = status;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_CATEGORIES(state, categories) {
    state.productCategories = categories;
  },
  SET_CART(state, savedCart) {
    state.cartProducts = savedCart.cartProducts;
    state.cartProductCount = savedCart.cartProductCount;
  },
  ADD_TO_CART(state, payload) {
    const product = payload.product;
    const quantity = payload.quantity;

    // Getting copy of list of products in cart
    let cartProducts = [...state.cartProducts];

    // Finding index of product in cart (-1 if not in cart)
    let foundProduct = findProductInCart(cartProducts, product.id);

    // Setting state by either adding product to cart or updating product's quantity in cart
    if (foundProduct !== -1) {
      cartProducts[foundProduct].quantity += quantity;
    } else {
      cartProducts.push({
        product,
        quantity
      });
    }

    state.cartProducts = cartProducts;
    state.cartProductCount += quantity;
    saveCartData(cartProducts, state.cartProductCount);
  },
  REMOVE_FROM_CART(state, product) {
    // Getting copy of list of products in cart
    let cartProducts = [...state.cartProducts];

    // Finding index of product in cart (-1 if not in cart)
    let index = findProductInCart(cartProducts, product.id);

    // Setting state by either adding product to cart or updating product's quantity in cart
    let productQuantity = cartProducts[index].quantity;
    if (productQuantity > 1) {
      cartProducts[index].quantity -= 1;
    } else {
      cartProducts.splice(index, 1);
    }

    state.cartProductCount -= 1;
    state.cartProducts = cartProducts;

    saveCartData(state.cartProducts, state.cartProductCount);
  },
  CLEAR_CART(state) {
    state.cartProductCount = 0;
    state.cartProducts = [];
    saveCartData(state.cartProducts, state.cartProductCount);
  }
};

export const actions = {
  async getAllData(context) {
    context.commit("SET_LOADING_STATUS", "loading");
    const savedCart = JSON.parse(window.localStorage.getItem("saved_cart"));
    if (savedCart) {
      context.commit("SET_CART", savedCart);
    }
    const products = await fetchProducts();
    const categories = await fetchCategories();
    context.commit("SET_PRODUCTS", products);
    context.commit("SET_CATEGORIES", categories);
    context.commit("SET_LOADING_STATUS", "notLoading");
  },
  async getProducts(context) {
    context.commit("SET_LOADING_STATUS", "loading");
    const products = await fetchProducts();
    context.commit("SET_PRODUCTS", products);
    context.commit("SET_LOADING_STATUS", "notLoading");
  },
  async getProductCategories(context) {
    context.commit("SET_LOADING_STATUS", "loading");
    const categories = await fetchCategories();
    context.commit("SET_CATEGORIES", categories);
    context.commit("SET_LOADING_STATUS", "notLoading");
  },
  getCart(context) {
    if (window) {
      const savedCart = JSON.parse(window.localStorage.getItem("saved_cart"));

      if (savedCart) {
        context.commit("SET_CART", savedCart);
      }
    }
  },
  addToCart(context, payload) {
    context.commit("ADD_TO_CART", payload);
  },
  removeFromCart(context, product) {
    context.commit("REMOVE_FROM_CART", product);
  },
  clearCart(context) {
    context.commit("CLEAR_CART");
  }
};

export const getters = {
  getProductById: state => id => state.products.find(item => item.id == id)
};

// export default new Vuex.Store({
//   state: {
//     loadingStatus: "notLoading",
//     productCategories: [],
//     products: [],
//     cartProducts: [],
//     cartProductCount: 0
//   },
//   mutations: {
// SET_LOADING_STATUS(state, status) {
//   state.loadingStatus = status;
// },
// SET_PRODUCTS(state, products) {
//   state.products = products;
// },
// SET_CATEGORIES(state, categories) {
//   state.productCategories = categories;
// },
// SET_CART(state, savedCart) {
//   state.cartProducts = savedCart.cartProducts;
//   state.cartProductCount = savedCart.cartProductCount;
// },
// ADD_TO_CART(state, payload) {
//   const product = payload.product;
//   const quantity = payload.quantity;

//   // Getting copy of list of products in cart
//   let cartProducts = [...state.cartProducts];

//   // Finding index of product in cart (-1 if not in cart)
//   let foundProduct = findProductInCart(cartProducts, product.id);

//   // Setting state by either adding product to cart or updating product's quantity in cart
//   if (foundProduct !== -1) {
//     cartProducts[foundProduct].quantity += quantity;
//   } else {
//     cartProducts.push({
//       product,
//       quantity
//     });
//   }

//   state.cartProducts = cartProducts;
//   state.cartProductCount += quantity;
//   saveCartData(cartProducts, state.cartProductCount);
// },
// REMOVE_FROM_CART(state, product) {
//   // Getting copy of list of products in cart
//   let cartProducts = [...state.cartProducts];

//   // Finding index of product in cart (-1 if not in cart)
//   let index = findProductInCart(cartProducts, product.id);

//   // Setting state by either adding product to cart or updating product's quantity in cart
//   let productQuantity = cartProducts[index].quantity;
//   if (productQuantity > 1) {
//     cartProducts[index].quantity -= 1;
//   } else {
//     cartProducts.splice(index, 1);
//   }

//   state.cartProductCount -= 1;
//   state.cartProducts = cartProducts;

//   saveCartData(state.cartProducts, state.cartProductCount);
// },
// CLEAR_CART(state) {
//   state.cartProductCount = 0;
//   state.cartProducts = [];
//   saveCartData(state.cartProducts, state.cartProductCount);
// }
//   },
//   actions: {
// async getAllData(context) {
//   context.commit("SET_LOADING_STATUS", "loading");
//   const savedCart = JSON.parse(window.localStorage.getItem("saved_cart"));
//   if (savedCart) {
//     context.commit("SET_CART", savedCart);
//   }
//   const products = await fetchProducts();
//   const categories = await fetchCategories();
//   context.commit("SET_PRODUCTS", products);
//   context.commit("SET_CATEGORIES", categories);
//   context.commit("SET_LOADING_STATUS", "notLoading");
// },
// async getProducts(context) {
//   context.commit("SET_LOADING_STATUS", "loading");
//   const products = await fetchProducts();
//   context.commit("SET_PRODUCTS", products);
//   context.commit("SET_LOADING_STATUS", "notLoading");
// },
// async getProductCategories(context) {
//   context.commit("SET_LOADING_STATUS", "loading");
//   const categories = await fetchCategories();
//   context.commit("SET_CATEGORIES", categories);
//   context.commit("SET_LOADING_STATUS", "notLoading");
// },
// getCart(context) {
//   const savedCart = JSON.parse(window.localStorage.getItem("saved_cart"));

//   if (savedCart) {
//     context.commit("SET_CART", savedCart);
//   }
// },
// addToCart(context, payload) {
//   context.commit("ADD_TO_CART", payload);
// },
// removeFromCart(context, product) {
//   context.commit("REMOVE_FROM_CART", product);
// },
// clearCart(context) {
//   context.commit("CLEAR_CART");
// }
//   },
//   getters: {
// getProductById: state => id => state.products.find(item => item.id == id)
//   }
// });
