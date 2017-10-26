<template>
  <footer id="mainFooter">
    <router-link :to="{path: '/', query: { footer: 'licai' }}" class="item-1" :class="{unactive: tabType!='licai'}">
      <i></i>
      理财
    </router-link>

    <router-link :to="{path: '/comment', query: { footer: 'pinglun' }}" class="item-2" :class="{unactive: tabType!='pinglun'}">
      <i></i>
      评论
    </router-link>
  </footer>
</template>

<script>
export default {
  name: 'cFooter',
  data () {
    return {
      tabType: 'licai'
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let tabType = this.$route.query.footer
      if (tabType) {
        this.tabType = tabType
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './static/scss/config.scss';

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: red;
  width: 6.4rem;
  left: 50%;
  @include compatible(transform, translateX(-50%));
  height: pxToRem(44px);
  border-top: 1px solid #c1c1c1;
  background-color: #fff;

  &>a {
    height: 100%;
    float: left;
    width: 50%;
    text-align: center;
    line-height: pxToRem(44px);
    font-size: pxToRem(16px);

    i {
      vertical-align: middle;
      display: inline-block;
      width: pxToRem(15px);
      height: pxToRem(44px);
    }

    &.unactive {
      color: #9b9b9b;
    }

    &.unactive.item-1 {
      i {
        background: url('../../assets/bg_5.png') center 43% no-repeat;
        background-size: contain;
      }
    }

    &.unactive.item-2 {
      i {
        background: url('../../assets/bg_4.png') center 45% no-repeat;
        background-size: contain;
      }
    }
  }

  .item-1 {
    i {
      background: url('../../assets/bg_3.png') center 43% no-repeat;
      background-size: contain;
    }
  }

  .item-2 {
    i {
      background: url('../../assets/bg_6.png') center 45% no-repeat;
      background-size: contain;
    }
  }

  &:before {
    position: absolute;
    content: "";
    height: 100%;
    border-left: 1px solid #c1c1c1;
    left: 3.2rem;
    top: 0;
  }
}
</style>
