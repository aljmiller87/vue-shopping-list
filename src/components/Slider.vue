<template>
  <div class="home_slider_container">

    <!-- Home Slider -->
    <div class="owl-carousel owl-theme home_slider">

      <!-- Slider Item -->
      <div class="owl-item home_slider_item">
        <div class="home_slider_background" :style="{ backgroundImage: `url('${image}')` }"></div>
        <div class="home_slider_content_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="home_slider_content" data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                  <div class="home_slider_title">A new Online Shop experience.</div>
                  <div class="home_slider_subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie eros. Sed viverra velit venenatis fermentum luctus.</div>
                  <div class="button button_light home_button"><a href="#">Shop Now</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slider Item -->
      <div class="owl-item home_slider_item">
        <div class="home_slider_background" :style="{ backgroundImage: `url('${image}')` }"></div>
        <div class="home_slider_content_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="home_slider_content" data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                  <div class="home_slider_title">A new Online Shop experience.</div>
                  <div class="home_slider_subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie eros. Sed viverra velit venenatis fermentum luctus.</div>
                  <div class="button button_light home_button"><a href="#">Shop Now</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slider Item -->
      <div class="owl-item home_slider_item">
        <div class="home_slider_background" :style="{ backgroundImage: `url('${image}')` }"></div>
        <div class="home_slider_content_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="home_slider_content" data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                  <div class="home_slider_title">A new Online Shop experience.</div>
                  <div class="home_slider_subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie eros. Sed viverra velit venenatis fermentum luctus.</div>
                  <div class="button button_light home_button"><a href="#">Shop Now</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Home Slider Dots -->

    <div class="home_slider_dots_container">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="home_slider_dots">
              <ul id="home_slider_custom_dots" class="home_slider_custom_dots">
                <li class="home_slider_custom_dot active">01.</li>
                <li class="home_slider_custom_dot">02.</li>
                <li class="home_slider_custom_dot">03.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  import image from "@/images/home_slider_1.jpg";

  export default {
    name: "Slider",
    data: function () {
      return {
        image: image
      }
    },
    mounted() {
      if (document.querySelectorAll('.home_slider').length)
		{
        const homeSlider = $('.home_slider');
			homeSlider.owlCarousel(
			{
				items:1,
				autoplay:true,
				autoplayTimeout:10000,
				loop:true,
				nav:false,
				smartSpeed:1200,
				dotsSpeed:1200,
				fluidSpeed:1200
			});

      /* Custom dots events */
		if($('.home_slider_custom_dot').length)
      {
        $('.home_slider_custom_dot').on('click', function ()
				{
					document.querySelector('.home_slider_custom_dot').classList.remove('active');
					$(this).addClass('active');
					homeSlider.trigger('to.owl.carousel', [$(this).index(), 1200]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			homeSlider.on('changed.owl.carousel', function(event)
			{
				$('.home_slider_custom_dot').removeClass('active');
				$('.home_slider_custom_dots li').eq(event.page.index).addClass('active');
			});

			// add animate.css class(es) to the elements to be animated
			function setAnimation ( _elem, _InOut )
			{
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function ()
				{
					var $elem = $(this);
					var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

					$elem.addClass($animationType).one(animationEndEvent, function ()
					{
						$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
					});
				});
			}

			// Fired before current slide change
			homeSlider.on('change.owl.carousel', function(event)
			{
				var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-out]");
				setAnimation ($elemsToanim, 'out');
			});

			// Fired after current slide has been changed
			homeSlider.on('changed.owl.carousel', function(event)
			{
				var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-in]");
				setAnimation ($elemsToanim, 'in');
			})
		}
    }
  }
</script>