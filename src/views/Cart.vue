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

			<Rows />

			<div class="row row_cart_buttons">
				<div class="col">
					<div class="cart_buttons d-flex flex-lg-row flex-column align-items-start justify-content-start">
						<div class="button continue_shopping_button"><a href="#">Continue shopping</a></div>
						<div class="cart_buttons_right ml-lg-auto">
							<div class="button clear_cart_button"><a href="#">Clear cart</a></div>
							<div class="button update_cart_button"><a href="#">Update cart</a></div>
						</div>
					</div>
				</div>
			</div>
			<div class="row row_extra">
				<div class="col-lg-4">
					
					<!-- Delivery -->
					<div class="delivery">
						<div class="section_title">Shipping method</div>
						<div class="section_subtitle">Select the one you want</div>
						<div class="delivery_options">
							<label class="delivery_option clearfix">Next day delivery
								<input type="radio" name="radio">
								<span class="checkmark"></span>
								<span class="delivery_price">$4.99</span>
							</label>
							<label class="delivery_option clearfix">Standard delivery
								<input type="radio" name="radio">
								<span class="checkmark"></span>
								<span class="delivery_price">$1.99</span>
							</label>
							<label class="delivery_option clearfix">Personal pickup
								<input type="radio" checked="checked" name="radio">
								<span class="checkmark"></span>
								<span class="delivery_price">Free</span>
							</label>
						</div>
					</div>

					<!-- Coupon Code -->
					<div class="coupon">
						<div class="section_title">Coupon code</div>
						<div class="section_subtitle">Enter your coupon code</div>
						<div class="coupon_form_container">
							<form action="#" id="coupon_form" class="coupon_form">
								<input type="text" class="coupon_input" required="required">
								<button class="button coupon_button"><span>Apply</span></button>
							</form>
						</div>
					</div>
				</div>

				<div class="col-lg-6 offset-lg-2">
					<div class="cart_total">
						<div class="section_title">Cart total</div>
						<div class="section_subtitle">Final info</div>
						<div class="cart_total_container">
							<ul>
								<li class="d-flex flex-row align-items-center justify-content-start">
									<div class="cart_total_title">Subtotal</div>
									<div class="cart_total_value ml-auto">${{ subtotal }}</div>
								</li>
								<li class="d-flex flex-row align-items-center justify-content-start">
									<div class="cart_total_title">Shipping</div>
									<div class="cart_total_value ml-auto">Free</div>
								</li>
								<li class="d-flex flex-row align-items-center justify-content-start">
									<div class="cart_total_title">Total</div>
									<div class="cart_total_value ml-auto">$790.90</div>
								</li>
							</ul>
						</div>
						<div class="button checkout_button"><a href="#">Proceed to checkout</a></div>
					</div>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>
    // store
    import { store } from "@/store";

    // components 
    import Rows from "@/components/Cart/Rows";

    // utilities
    import { getImagePath } from "@/utils/getImagePath";

    export default {
        name: 'cart',
        components: {
            Rows
        },
        data() {
            return {
                items: [],
            }
        },
        async created() {
            await this.loadCart();
        },
        computed: {
            subtotal: function() {
                if (!this.items || !this.items.length) {
                    return 0;
                }
                const subTotal = this.items.reduce((total, item) => total + (item.quantity * item.product.price), 0);
                return subTotal;
            }
        },
        methods: {
            async loadCart() {
                const cartItems = [...store.items];
                console.log('cartItems', cartItems);
                this.items = cartItems;
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>