<template>
  <div>
    <div class="div-content">
      <c-header :nav-type="navType"></c-header>
      <div class="nav-div">
        <nav :class="{fixed: headerFixedVisible}">
          <!-- <div class="item-1" @click="navSwitch('product')">产品</div> -->
          <!-- <div class="item-2" @click="navSwitch('platform')">平台</div> -->
          <router-link :to="{path: '/', query: {navType: 'product'}}" tag="div" class="item-1">产品</router-link>
          <router-link :to="{path: '/', query: {navType: 'platform'}}" tag="div" class="item-2">平台</router-link>
          <div class="line" :class="{platform: navType === 'platform'}"></div>
          <div class="item-4" @click="showPopup('type')" v-if="navType === 'platform'">类型</div>
          <div class="item-5" @click="showPopup('term')" v-if="navType === 'product'">期限</div>
          <div class="item-3" @click="showPopup(navType === 'product' ? 'prsort' : 'plsort')">排序</div>
        </nav>
      </div>

      <product-list v-if="navType === 'product'" :api-params="prApiParams" v-on:headerFixed="headerFixed"></product-list>
      <platform-list v-else :api-params="plApiParams" v-on:headerFixed="headerFixed"></platform-list>
    </div>
    <c-footer></c-footer>
    <mt-popup v-model="prsortPopupVisible" position="bottom" class="common-popup">
      <ul>
        <li @click="changePrApiParma('rank', 1)" :class="{red: prApiParams.sortKey === 'rank'}">口碑从高到低</li>
        <li @click="changePrApiParma('yield', 2)" :class="{red: prApiParams.sortKey === 'yield'}">收益率从高到低</li>
        <li @click="changePrApiParma('stage', 1)" :class="{red: prApiParams.sortKey === 'stage'}">理财周期从短到长</li>
        <!-- <li @click="changePrApiParma('hot', 1)" :class="{red: prApiParams.sortKey === 'hot'}">所属平台口碑从高到低</li> -->
        <router-link :to="{ path: '/platSearch', query: { isComment: false } }" tag="li" class="item-search">
          <i></i>
          <span>搜索</span>
        </router-link>
      </ul>
    </mt-popup>
    <mt-popup v-model="plsortPopupVisible" position="bottom" class="common-popup">
      <ul>
        <li @click="changePlApiParma('rank', 2)" :class="{red: plApiParams.sortKey === 'rank'}">口碑从高到低</li>
        <li @click="changePlApiParma('yield', 2)" :class="{red: plApiParams.sortKey === 'yield'}">平均收益率从高到低</li>
        <li @click="changePlApiParma('stage', 1)" :class="{red: plApiParams.sortKey === 'stage'}">平均理财周期从短到长</li>
        <router-link :to="{ path: '/platSearch', query: { isComment: false } }" tag="li" class="item-search">
          <i></i>
          <span>搜索</span>
        </router-link>
      </ul>
    </mt-popup>
    <mt-popup v-model="termPopupVisible" position="bottom" class="common-popup">
      <ul>
        <li @click="changePrApiParma('', '', 0, 1000)" :class="{red: prApiParams.stageStart == 0 && prApiParams.stageEnd == 1000}">全部</li>
        <li @click="changePrApiParma('', '', 0, 30)" :class="{red: prApiParams.stageStart == 0 && prApiParams.stageEnd == 30}">30天以内</li>
        <li @click="changePrApiParma('', '', 31, 90)" :class="{red: prApiParams.stageStart ==31 && prApiParams.stageEnd == 90}">31-90天</li>
        <li @click="changePrApiParma('', '', 91, 180)" :class="{red: prApiParams.stageStart == 91 && prApiParams.stageEnd == 180}">91-180天</li>
        <li @click="changePrApiParma('', '', 181, 365)" :class="{red: prApiParams.stageStart == 181 && prApiParams.stageEnd == 365}">181-365天</li>
        <li @click="changePrApiParma('', '', 365, 1000)" :class="{red: prApiParams.stageStart == 365 && prApiParams.stageEnd == 1000}">1年以上</li>
      </ul>
    </mt-popup>
    <mt-popup v-model="typePopupVisible" position="bottom" class="common-popup">
      <ul>
        <li @click="changePlApiParma('', '', '全部')" :class="{red: plApiParams.assetsType === '全部'}">全部</li>
        <li @click="changePlApiParma('', '', '消费贷')" :class="{red: plApiParams.assetsType === '消费贷'}">消费贷</li>
        <li @click="changePlApiParma('', '', '车贷')" :class="{red: plApiParams.assetsType === '车贷'}">车贷</li>
        <li @click="changePlApiParma('', '', '企业贷款')" :class="{red: plApiParams.assetsType === '企业贷款'}">企业贷款</li>
        <li @click="changePlApiParma('', '', '银行不良资产')" :class="{red: plApiParams.assetsType === '银行不良资产'}">银行不良资产</li>
        <li @click="changePlApiParma('', '', '综合资产')" :class="{red: plApiParams.assetsType === '综合资产'}">综合资产</li>
        <li @click="changePlApiParma('', '', '其他资产')" :class="{red: plApiParams.assetsType === '其他资产'}">其他资产</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import cHeader from './children/cHeader.vue'
import cFooter from './children/cFooter.vue'
import productList from './children/productList.vue'
import platformList from './children/platformList.vue'

export default {
  name: 'home',
  data () {
    return {
      headerFixedVisible: false,
      prsortPopupVisible: false,
      plsortPopupVisible: false,
      termPopupVisible: false,
      typePopupVisible: false,
      navType: 'product',
      prApiParams: {
        sortKey: 'rank',
        sortType: 2,
        stageEnd: 1000,
        stageStart: 0
      },
      plApiParams: {
        sortKey: 'rank',
        sortType: 2,
        assetsType: '全部'
      }
    }
  },
  watch: {
    '$route': function () {
      let navType = this.$route.query.navType
      this.navType = navType === 'platform' ? 'platform' : 'product'
    }
  },
  mounted () {
    let navType = this.$route.query.navType
    this.navType = navType === 'platform' ? 'platform' : 'product'
  },
  components: {
    cHeader, cFooter, productList, platformList
  },
  methods: {
    headerFixed (a) {
      this.headerFixedVisible = a
    },
    // 产品和平台选项卡切换
    // navSwitch (type) {
    //   this.$router.push({path: '/', query: this.$route.query})
    //   this.navType = type
    // },
    // 显示选择框
    showPopup (key) {
      this[key + 'PopupVisible'] = true
    },
    // 改变产品列表检索参数
    changePrApiParma (sortKey, sortType, stageStart, stageEnd) {
      if (sortKey) {
        this.prApiParams.sortKey = sortKey
      }

      if (sortType) {
        this.prApiParams.sortType = sortType
      }

      if (parseInt(stageEnd) >= 0) {
        this.prApiParams.stageEnd = parseInt(stageEnd)
      }

      if (parseInt(stageStart) >= 0) {
        this.prApiParams.stageStart = parseInt(stageStart)
      }
      this.prsortPopupVisible = false
      this.plsortPopupVisible = false
      this.termPopupVisible = false
      this.typePopupVisible = false
    },
    // 改变产品列表检索参数
    changePlApiParma (sortKey, sortType, assetsType) {
      if (sortKey) {
        this.plApiParams.sortKey = sortKey
      }

      if (sortType) {
        this.plApiParams.sortType = sortType
      }

      if (assetsType) {
        this.plApiParams.assetsType = assetsType
      }

      this.prsortPopupVisible = false
      this.plsortPopupVisible = false
      this.termPopupVisible = false
      this.typePopupVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './static/scss/config.scss';

.nav-div {
  height: pxToRem(47px);
  // border-bottom: 1px solid #bfbfbf;
}

nav {
  border-bottom: 1px solid #bfbfbf;
  height: pxToRem(40px);
  background-color: #fff;
  padding-top: pxToRem(6px);
  position: relative;
  &.fixed {
    top: 0;
    left: 0;
    width: 6.4rem;
    position: fixed;
    left: 50%;
    @include compatible(transform, translateX(-50%));
  }

  &:after {
    content: "";
    display: block;
    clear: both;
  }

  .item-1,
  .item-2 {
    float: left;
    width: pxToRem(99px);
    height: pxToRem(46px);
    font-size: pxToRem(18px);
    text-align: center;
    line-height: pxToRem(40px);
  }

  .line {
    position: absolute;
    width: pxToRem(99px);
    height: pxToRem(3px);
    background-color: #0b182c;
    left: 0;
    bottom: 0;
    transform: translateX(0);
    transition-duration: 0.5s;

    &.platform {
      transform: translateX(pxToRem(99px));
      transition-duration: 0.5s;
    }
  }

  .item-3,
  .item-4,
  .item-5 {
    float: right;
    height: 100%;
    background: blue;
    width: pxToRem(60px);
    text-align: center;
    line-height: pxToRem(40px);
    color: #8d8d8d;
    margin-right: pxToRem(8px);
  }

  .item-3 {
    background: url('../assets/bg_1.png') left center no-repeat;
    background-size: pxToRem(11px);
  }

  .item-4 {
    background: url('../assets/bg_2.png') left center no-repeat;
    background-size: pxToRem(11px);
  }

  .item-5 {
    background: url('../assets/bg_18.png') left center no-repeat;
    background-size: pxToRem(11px);
  }
}
</style>
