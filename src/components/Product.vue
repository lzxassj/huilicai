<template>
  <div class="product">
    <div id="prInfo">
      <h3>{{ detail.name }}</h3>

      <div class="tag clear" v-if="detail.tagList.length || detail.logo">
        <div class="img-div">
          <img :src="detail.logo" alt="" v-if="detail.logo">
        </div>
        <router-link 
          :to="{path: item.hotType == 3 ? '/tagSearchRes?tagId=' + item.hotId + '&tagName=' + item.name + '&fromModule=platform&isComment=false' : '/platForm/' + item.hotId}" 
          tag="span" 
          v-for="(item, key) in detail.tagList" 
          :key="key">#{{ item.name }}#
        </router-link>
      </div>

      <ul class="info">
        <li class="clear desc">
          <div>平台简介</div>
          <div>{{ detail.desc }}</div>
        </li>
        <li class="clear">
          <span class="span-1">口碑</span>
          <span class="span-2">第{{ detail.rank }}名/{{ detail.score }}分</span>
        </li>
        <li class="clear">
          <span class="span-3">年化收益</span>
          <span class="span-4">{{ detail.yield }}%</span>
        </li>
        <li class="clear li-line">
          <span class="span-5">周期</span>
          <span class="span-6">{{ detail.stage }}天</span>
        </li>
        <li class="clear">
          <span class="span-7">资产类型</span>
          <span class="span-8">{{ detail.assetsType ? detail.assetsType : '未知' | substr(5) }}</span>
        </li>
        <li class="clear li-line li-line-last">
          <span class="span-9">还款方式</span>
          <span class="span-10">{{ detail.repaymentType }}</span>
        </li>
        <li class="view-info">
          <a :href="detail.homeurl ? detail.homeurl : 'javascript:;'">
            查看详情
            <i></i>
          </a>
        </li>
      </ul>
    </div>
    <c-comment :params="{fixedScroll: scrollTop}"></c-comment>
  </div>
</template>

<script>
import cComment from './children/cComment'

export default {
  name: 'product',
  data () {
    return {
      scrollTop: 0,
      id: 0,
      detail: {
        tagList: []
      }
    }
  },
  components: {
    cComment
  },
  mounted () {
    this.getData()
  },
  created () {
    this.id = parseInt(this.$route.params.id)
  },
  methods: {
    getData () {
      let that = this
      if (this.id) {
        let path = this.$api.product.path.replace('{productId}', this.id)
        this.$axios.post(path).then(function (res) {
          if (!res.data.code) {
            that.detail = res.data.data
          } else {
            alert(res.data.msg)
            history.back()
          }
          setTimeout(function () {
            that.scrollTop = document.getElementById('prInfo').clientHeight
          })
        }).catch(function () {
          that.$toast({
            message: '获取热门标签失败',
            duration: 800
          })
          that.$indicator.close()
        })
      } else {
        alert('参数错误')
        history.back()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './static/scss/config.scss';

.product {
  background-color: #fff;
  h3 {
    margin: 0;
    padding: pxToRem(16px) pxToRem(20px) pxToRem(10px) pxToRem(20px);
    font-size: pxToRem(24px);
    color: #19191f;
    line-height: 130%;
  }
  .tag {
    padding: 0 pxToRem(20px);
    color: #949494;
    margin-bottom: pxToRem(18px);

    span {
      margin-left: pxToRem(4px);
      &.title {
        margin-left: pxToRem(3px);
      }
    }

    * {
      float: left;
    }

    .img-div {
      margin-right: 8px;
      height: pxToRem(20px);
      overflow: hidden;
    }
    img {
      height: 100%;
    }
  }

  .info {
    width: pxToRem(298px);
    border: 1px solid #a1a1a1;
    margin: 0 auto;
    @include compatible(box-shadow, 0 pxToRem(2px) pxToRem(3px) 0px #bebebe);
    @include compatible(border-radius,
    pxToRem(4px));
    position: relative;
    padding: pxToRem(15px) pxToRem(20px) pxToRem(0px) pxToRem(20px);

    li {
      height: pxToRem(32px);
      line-height: pxToRem(32px);
      .span-1,
      .span-3,
      .span-5,
      .span-7,
      .span-9 {
        text-indent: pxToRem(20px);
        float: left;
        color: #666666;
        padding: pxToRem(8px) 0;
        line-height: 100%;
      }

      .span-1 {
        background: url('../assets/bg_9.png') left center no-repeat;
        background-size: pxToRem(14px) pxToRem(16px);
      }

      .span-3 {
        background: url('../assets/bg_10.png') left center no-repeat;
        background-size: pxToRem(13px) pxToRem(14px);
      }

      .span-5 {
        background: url('../assets/bg_11.png') left center no-repeat;
        background-size: pxToRem(14px) pxToRem(15px);
      }

      .span-7 {
        background: url('../assets/bg_12.png') left center no-repeat;
        background-size: pxToRem(17px) pxToRem(12px);
      }

      .span-9 {
        background: url('../assets/bg_13.png') left center no-repeat;
        background-size: pxToRem(15px) pxToRem(14px);
      }

      .span-2,
      .span-4,
      .span-6 {
        font-size: pxToRem(16px);
        float: right;
        color: #ff0000
      }

      .span-8,
      .span-10 {
        float: right;
        font-size: pxToRem(16px);
        color: #0b182c;
      }

      &.view-info {
        height: auto;
        line-height: pxToRem(60px);
        text-align: center;

        a {
          display: block;
        }

        i {
          display: inline-block;
          width: pxToRem(12px);
          height: pxToRem(12px);
          background: url('../assets/bg_14.png') center center no-repeat;
          background-size: pxToRem(12px);
          vertical-align: middle;
        }
      }

      &.li-line {
        border-bottom: 1px solid rgba(#cecece, .5);
        padding-bottom: pxToRem(8px);
        margin-bottom: pxToRem(8px);
      }

      &.li-line-last {
        margin-bottom: 0;
      }

      &.desc {
        height: auto;
        

        div:first-child {
          color: #666666;
          text-indent: pxToRem(24px);
          background: url('../assets/bg_26.png') pxToRem(2px) center no-repeat;
          background-size: pxToRem(14px) pxToRem(16px);
        }

        div:last-child {
          line-height: 180%;
          padding-left: pxToRem(24px);
        }
      }
    }
  }
}
</style>
