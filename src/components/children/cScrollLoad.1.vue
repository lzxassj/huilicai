<template>
  <div class="c-scroll">
    <div class="c-scroll-load" v-show="loading">正在加载数据...</div>
    <div class="scroll-top" :class="{'scroll-top-show': scrollTop}" @click="cScrollTop()"></div>
  </div>
</template>

<script>
export default {
  name: 'cScrollLoad',
  data () {
    return {
      loading: false,
      scrollTop: false
    }
  },
  props: ['params'],
  watch: {
    'params': {
      handler: function () {
        if (this.params.hasOwnProperty('loading')) {
          this.loading = this.params.loading
        }
      },
      deep: true
    }
  },
  mounted () {
    let that = this
    window.onscroll = function () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let offsetH = document.documentElement.offsetHeight
      let clientH = document.documentElement.clientHeight
      let fixedScrollH = that.params.hasOwnProperty('fixedScroll') ? that.params.fixedScroll : 0

      if (scrollTop >= clientH - 40) {
        that.scrollTop = true
      } else {
        that.scrollTop = false
      }

      if (clientH + scrollTop === offsetH && offsetH >= clientH + fixedScrollH) {
        that.$emit('pullUpLoad')
      }

      if (that.params.hasOwnProperty('fixedScroll') && that.params.fixedScroll) {
        if (scrollTop >= that.params.fixedScroll) {
          that.$emit('fixed', true)
        } else {
          that.$emit('fixed', false)
        }
      }
    }
  },
  methods: {
    cScrollTop () {
      var x = document.body.scrollTop || document.documentElement.scrollTop
      var timer = setInterval(function () {
        x -= 20
        if (x <= 0) {
          x = 0
          document.body.scrollTop = x
          document.documentElement.scrollTop = x
          clearInterval(timer)
        }
        document.body.scrollTop = x
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/scss/config.scss';

.c-scroll {
  .c-scroll-load {
    text-align: center;
    font-size: pxToRem(12px);
    color: #888;
    @include compatible(text-shadow, 1px 1px 0px #eee);
    padding-bottom: pxToRem(10px)
  }

  .scroll-top {
    width: pxToRem(32px);
    height: pxToRem(32px);
    background: url('../../assets/bg_25.png') center center no-repeat #fff;
    background-size: contain;
    position: fixed;
    @include compatible(border-radius,
    50%);
    right: pxToRem(8px);
    bottom: pxToRem(60px);
    @include compatible(transform,
    translateX(pxToRem(100px)));
    @include compatible(transition-duration,
    0.5s);
  }

  .scroll-top-show {
    @include compatible(transform,
    translateX(0));
  }
}
</style>
