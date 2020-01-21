export const findProductInCart = (productsArray, id) => {
  return productsArray.findIndex(item => item.product.id === id);
};

export const saveCartData = (cartProducts, cartProductCount) => {
  const savedState = {
    cartProductCount,
    cartProducts
  };
  window.localStorage.setItem("saved_cart", JSON.stringify(savedState));
};
