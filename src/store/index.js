class Cart {
    constructor() {
        this.itemsNumber = 0;
        this.items = [];

        this.fetchData();
    }

    fetchData() {
        const savedCart = JSON.parse(window.localStorage.getItem("saved_cart"));

        if (savedCart) {
            this.itemsNumber = savedCart.itemsNumber;
            this.items = savedCart.items;
        }
    }

    saveCartData() {
        const items = [...this.items]
        const savedState = {
            itemsNumber: this.itemsNumber,
            items
        };
      window.localStorage.setItem("saved_cart", JSON.stringify(savedState))
    }

    addToCart(product, quantity = 1) {
        // Getting copy of list of products in cart
        let cartProducts = [...this.items];
        console.log('cartProducts', cartProducts);
        console.log('product', product);
  
        // Finding index of product in cart (-1 if not in cart)
        let foundProduct = this.findProductInCart(product.id);
  
        // Setting state by either adding product to cart or updating product's quantity in cart
        if (foundProduct !== -1) {
          cartProducts[foundProduct].quantity += quantity;
        } else {
          cartProducts.push({
            product,
            quantity
          })
        }
        
        this.itemsNumber += quantity;
        this.items = cartProducts;
        this.saveCartData();
    }

    findProductInCart(id) {
        return this.items.findIndex(item => item.product.id === id)
    }

    removeFromCart(product) {
        // Getting copy of list of products in cart
        let cartProducts = [...this.items];
  
        // Finding index of product in cart (-1 if not in cart)
        let index = this.findProductInCart(product.id);
  
        // Setting state by either adding product to cart or updating product's quantity in cart
        let productQuantity = this.items[index].quantity;
        if (productQuantity > 1) {
          cartProducts[index].quantity -= 1
        } else {
          console.log('NEED TO SPLICE OUT')
          console.log(index, cartProducts);
          cartProducts.splice(index, 1);
          console.log('cartproducts after', cartProducts);
        }
        
        this.itemsNumber -= 1;
        this.items = cartProducts;

        this.saveCartData();
    }

    clearCart() {
      this.items = [];
      this.itemsNumber = 0;
      this.saveCartData();
    }
}

export const store = new Cart();

export default { store };
