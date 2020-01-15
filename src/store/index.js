export const store = {
    state: {
        cart: {
            itemsNumber: 0,
            items: [],
        },
    },
    addToCart(product, quantity = 1) {
        // Getting copy of list of products in cart
        let cartProducts = [...this.state.cart.items];
        console.log('cartProducts', cartProducts);
        console.log('product', product);
  
        // Finding index of product in cart (-1 if not in cart)
        let foundProduct = this.findProductInCart(product.id);
  
        // Setting state by either adding product to cart or updating product's quantity in cart
        if (foundProduct !== -1) {
        //   let productQuantity = this.state.cart.items[foundProduct].quantity;
          cartProducts[foundProduct].quantity += quantity;
        } else {
          cartProducts.push({
            product,
            quantity
          })
        }
        
        this.state.cart.itemsNumber += 1;
        this.state.cart.items = cartProducts;
    },
    findProductInCart(id) {
        return this.state.cart.items.findIndex(item => item.product.id === id)
    },
    removeFromCart(productID) {
        // Getting copy of list of products in cart
        let cartProducts = [...this.state.cart.items];
  
        // Finding index of product in cart (-1 if not in cart)
        let index = this.findProductInCart(productID);
  
        // Setting state by either adding product to cart or updating product's quantity in cart
        let productQuantity = this.state.cart.items[index].quantity;
        if (productQuantity > 1) {
          cartProducts[index].quantity -= 1
        } else {
          cartProducts.splice(index, 1);
        }
        
        this.state.cart.itemsNumber -= 1;
        this.state.cart.items = cartProducts;  
    }
}

export default { store };
