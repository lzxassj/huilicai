<template>
  <header id="mainHeader" v-show="swiperSlides">
    <!-- <img src="../../assets/banner-1.jpg" alt=""> -->
    <swiper :options="swiperOption" ref="bannerSwiper">
      <swiper-slide v-for="(item, key) in swiperSlides" class="swiper-item" :key="key">
        <a :href="item.jumpUrl ? item.jumpUrl : 'javascript:;'">
          <img :src="item.imageUrl">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </header>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'cHeader',
  data () {
    return {
      banners: {},
      swiperSlides: {},
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true
      }
    }
  },
  props: ['navType'],
  watch: {
    navType: function (newValue) {
      if (newValue === 'platform') {
        this.swiperSlides = this.banners.platBanners
      } else if (newValue === 'product') {
        this.swiperSlides = this.banners.productBanners
      } else {
        this.swiperSlides = this.banners.commentBanners
      }
      this.$refs.bannerSwiper.swiper.slideTo(0)
    }
  },
  mounted () {
    this.getBanner()
  },
  components: {
    swiper, swiperSlide
  },
  methods: {
    getBanner () {
      let that = this
      this.$axios.get(this.$api.banners.path).then(function (res) {
        that.banners = res.data.data
        that.swiperSlides = res.data.data.productBanners
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './static/scss/config.scss';

header {
  height: pxToRem(153px);
  width: 100%;
  display: block;
  img {
    width: 100%;
    height: 100%;
  }
}

.swiper-container {
  height: 100%;
}
</style>
