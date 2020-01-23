<template>
  <div class="avds">
    <div
      class="avds_container d-flex flex-lg-row flex-column align-items-start justify-content-between"
    >
      <div class="avds_small">
        <div
          class="avds_background"
          :style="{ backgroundImage: `url('${Ad_Small}')` }"
        ></div>
        <div class="avds_small_inner">
          <div class="avds_discount_container">
            <img src="images/discount.png" alt="" />
            <div>
              <div class="avds_discount">
                <div>20<span>%</span></div>
                <div>Discount</div>
              </div>
            </div>
          </div>
          <div class="avds_small_content">
            <div class="avds_title">Smart Phones</div>
            <div class="avds_link">
              <nuxt-link to="/search/phone">
                See More
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="avds_large">
        <div
          class="avds_background"
          :style="{ backgroundImage: `url('${Ad_Large}')` }"
        ></div>
        <div class="avds_large_container">
          <div class="avds_large_content">
            <div class="avds_title">Professional Cameras</div>
            <div class="avds_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
              ultricies metus. Sed nec molestie eros. Sed viver ra velit
              venenatis fermentum luctus.
            </div>
            <div class="avds_link avds_link_large">
              <nuxt-link to="/search/camera">
                See More
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ad_Small from "@/assets/images/avds_small.jpg";
import Ad_Large from "@/assets/images/avds_large.jpg";
export default {
  name: "Ads",
  data: function() {
    return {
      Ad_Large: Ad_Large,
      Ad_Small: Ad_Small
    };
  }
};
</script>
