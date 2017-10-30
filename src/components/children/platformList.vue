<template>
  <div class="pl-main">
    <ul>
      <router-link :to="{path: '/platForm/' + platform.platId}" tag="li" v-for="platform in platformData.subList" :key="platform.platId">
        <h3>{{ platform.name }}</h3>
        <div class="tag">
          <div class="img-div" v-if="platform.logo">
            <img :src="platform.logo" alt="" v-if="platform.logo">
          </div>

          <router-link 
            :to="{path: item.hotType == 3 ? '/tagSearchRes?tagId=' + item.hotId + '&tagName=' + item.name + '&fromModule=platform&isComment=false' : '/platForm/' + item.hotId}" 
            tag="span" v-for="(item, key) in platform.tagList" 
            :key="key">#{{ item.name }}#
          </router-link>
        </div>
        <div>
          <div class="ranking">
            <span class="item-1">{{ platform.rank }}</span>
            <span class="item-2">口碑排名</span>
          </div>
          <div class="cycle">
            <div>
              <span class="item-1 item-per">{{ platform.yield }}
                <i>%</i>
              </span>
              <span class="item-2">平均年化收益</span>
            </div>
            <div>
              <span class="item-1">{{ (platform.assetType ? platform.assetType : '未知') | substr(5) }}
                <i></i>
              </span>
              <span class="item-2">资产类型</span>
            </div>
          </div>
        </div>

        <div class="comment" v-if="platform.commentResp">
          <div class="img-div">
            <img :src="platform.commentResp.headUrl" alt="" v-if="platform.commentResp.headUrl">
            <div class="no-img" v-else></div>
          </div>
          <div class="content">
            <h4>{{ platform.commentResp.head }}</h4>
            <div class="item-1">{{ platform.commentResp.remark }}</div>
            <div class="item-2">—— {{ platform.commentResp.end }}</div>
          </div>
        </div>
      </router-link>
    </ul>
    <c-scroll-load v-on:pullUpLoad="getPlatformList" v-on:fixed="fixedEmit" :params="{fixedScroll: scrollTop, loading: loading}"></c-scroll-load>
  </div>
</template>

<script>
import cScrollLoad from './cScrollLoad'

export default {
  name: 'platformList',
  data () {
    return {
      scrollTop: 153,
      loading: false,
      allLoaded: false,
      platformData: {
        subList: []
      },
      platformListApi: JSON.parse(JSON.stringify(this.$api.platformList))
    }
  },
  props: ['apiParams'],
  watch: {
    'apiParams': {
      handler: function () {
        let apiParams = this.platformListApi
        apiParams.data.pageNo = 1
        apiParams.data.sortKey = this.apiParams.sortKey
        apiParams.data.sortType = this.apiParams.sortType
        apiParams.data.assetsType = this.apiParams.assetsType
        this.allLoaded = false
        this.getPlatformList('changeApiParma')
      },
      deep: true
    }
  },
  mounted () {
    this.getPlatformList()
  },
  methods: {
    fixedEmit (a) {
      this.$emit('headerFixed', a)
    },
    // 获取产品列表数据
    getPlatformList (type) {
      if (this.allLoaded) {
        return
      }
      // 改变检索条件，滚动条回到顶部
      if (type === 'changeApiParma') {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > this.scrollTop) {
          document.documentElement.scrollTop = this.scrollTop
          document.body.scrollTop = this.scrollTop
        }
      }

      let that = this
      this.loading = true
      this.$indicator.open({ spinnerType: 'snake' })
      // setTimeout(function () {
      this.$axios.post(that.platformListApi.path, that.platformListApi.data).then(function (res) {
        if (!res.data.code) {
          if (res.data.data.subList.length) {
            if (that.platformListApi.data.pageNo === 1) {
              that.platformData.subList = res.data.data.subList
            } else {
              res.data.data.subList.forEach(item => {
                that.platformData.subList.push(item)
              })
            }
            that.platformListApi.data.pageNo += 1
          } else {
            if (type === 'changeApiParma') {
              that.platformData.subList = []
            } else {
              that.allLoaded = true
              that.$toast({
                message: '没有数据了',
                duration: 800
              })
            }
          }
        } else {
          that.$toast({
            message: res.data.msg,
            duration: 800
          })
        }
        that.$indicator.close()
        that.loading = false
      }).catch(function (err) {
        console.log(err)
        that.$toast({
          message: '请求错误',
          duration: 800
        })
        that.$indicator.close()
        that.loading = false
      })
      // }, 2000)
    }
  },
  components: {
    cScrollLoad
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './static/scss/config.scss';

.pl-main {
  background-color: #dddddd;
  padding-top: pxToRem(16px);
  padding-bottom: pxToRem(20px);
  li {
    background-color: #fff;
    border: 1px solid #bfbfbf;
    width: pxToRem(338px);
    margin: 0 auto;
    margin-bottom: pxToRem(16px);
    padding-bottom: pxToRem(10px);
    @include compatible(box-shadow, 0 pxToRem(2px) pxToRem(3px) 0px #bebebe);
    @include compatible(border-radius, pxToRem(4px));

    div {
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }

  h3 {
    margin: pxToRem(16px) pxToRem(20px) pxToRem(10px) pxToRem(20px);
    font-size: pxToRem(20px);
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

  .ranking {
    float: left;
    width: pxToRem(80px);
    height: pxToRem(77px);
    background-color: #ff0000;
    color: #fff;

    span {
      display: block;
      text-align: center;
    }

    .item-1 {
      padding-top: pxToRem(18px);
      padding-bottom: pxToRem(12px);
      font-size: pxToRem(20px);
      line-height: 100%;
    }

    .item-2 {
      font-size: pxToRem(12px);
      line-height: 100%;
    }
  }

  .cycle {
    float: right;
    width: pxToRem(256px);
    height: pxToRem(77px);
    background-color: #0b182c;
    color: #fff;
    text-align: center;

    &>div {
      width: 50%;
      float: left;
      overflow: hidden;
    }

    span {
      display: block;
      text-align: center;
      width: 100%;
    }

    .item-1 {
      padding-top: pxToRem(18px);
      padding-bottom: pxToRem(12px);
      font-size: pxToRem(20px);
      line-height: 90%;

      i {
        vertical-align: middle;
        font-size: pxToRem(12px);
      }
    }
    .item-per {
      i {
        margin-left: pxToRem(-6px);
      }
    }

    .item-2 {
      font-size: pxToRem(12px);
      line-height: 100%;
    }
  }

  .comment {
    margin-top: pxToRem(18px);
    .img-div {
      width: pxToRem(40px);
      height: pxToRem(40px);
      @include compatible(border-radius, 50%);
      margin: 0 pxToRem(20px);
      float: left;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .content {
      float: left;
      padding-right: pxToRem(17px);
      width: pxToRem(241px);
      h4 {
        margin: 0;
        color: #949494;
        font-size: pxToRem(12px);
        font-weight: normal;
        margin-bottom: pxToRem(10px);
      }

      .item-1 {
        color: #1a1a1f;
        line-height: 130%;
      }

      .item-2 {
        margin: pxToRem(12px) 0;
        color: #949494;
      }
    }
  }
}
</style>
