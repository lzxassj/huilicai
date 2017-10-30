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
      urlNavType: '',
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
      this.showBanner(newValue)
      this.$refs.bannerSwiper.swiper.slideTo(0)
    },
    banners: function (newValue) {
      this.showBanner(this.urlNavType)
    }
  },
  mounted () {
    this.getBanner()
    this.urlNavType = this.$route.query.navType
    this.showBanner(this.urlNavType)
  },
  // computed: {
  //   xx () {
  //     console.log(123)
  //     this.navType = this.$route.query.navType
  //     return true
  //   }
  // },
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
    },
    showBanner (navType) {
      console.log(navType)
      if (navType === 'platform') {
        this.swiperSlides = this.banners.platBanners
      } else if (navType === 'product') {
        this.swiperSlides = this.banners.productBanners
      } else {
        this.swiperSlides = this.banners.commentBanners
      }
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
