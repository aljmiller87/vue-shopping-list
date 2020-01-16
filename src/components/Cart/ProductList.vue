<template>
    <div class="cart_info">
		<div class="container">
			<div class="row">
				<div class="col">
					<!-- Column Titles -->
					<div class="cart_info_columns clearfix">
						<div class="cart_info_col cart_info_col_product">Product</div>
						<div class="cart_info_col cart_info_col_price">Price</div>
						<div class="cart_info_col cart_info_col_quantity">Quantity</div>
						<div class="cart_info_col cart_info_col_total">Total</div>
					</div>
				</div>
			</div>
			<div class="row cart_items_row">
				<div class="col">

					<!-- Cart Item -->
					<CartItem v-for="item in items" :cartItem="item" :key="item.product.name" />

				</div>
			</div>
		</div>		
	</div>
</template>

<script>
    // store
    import { store } from "@/store";

    // components 
    import CartItem from "@/components/Cart/CartItem";

    // utilities
    import { fetchProducts } from "@/utils/products";
    import { getImagePath } from "@/utils/getImagePath";

    export default {
        name: "CartProductList",
        components: {
            CartItem
        },
        props: {
            items: Array,
        },
        data() {
            return {
                cartItems: this.items,
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>