<template>
  <div>
    <div class="nav-div">
      <nav :class="{fixed: navFixedVisible}">
        <div class="item-1" @click="changeApiParma({commentType : 0})">好评</div>
        <div class="item-2" @click="changeApiParma({commentType : 1})">差评</div>
        <div class="item-3" @click="changeApiParma({commentType: 2})">一般</div>
        <div class="line" :class="{'line-1': commentListApiParams.data.commentType === 1, 'line-2': commentListApiParams.data.commentType === 2}"></div>
        <div class="item-4" @click="showPopup('sort')">排序</div>
      </nav>
    </div>

    <div class="content">
      <router-link class="ly-div" :to="{path: '/leaveMsg', query: {productId: productId, platId: platId, fromModule: fromModule}}" tag="div">留下您的评论...</router-link>

      <div class="comment-div" v-for="comment in commentList.subList" :key="comment.autoId">
        <div class="comment-author">
          <div class="img-div">
            <img :src="comment.headUrl" alt="" v-if="comment.headUrl">
            <div class="no-img" v-else></div>
          </div>
          <ul>
            <li>
              <span class="nickname">{{ comment.userName }}</span>
              <span class="date">{{ comment.remarkTime }}</span>
            </li>
            <li class="tag">
              <!-- <span v-for="(value, key) in comment.tips" :key="key">#{{ value }}#</span> -->
              <router-link 
                :to="{path: item.hotType == 3 ? '/tagSearchRes?tagId=' + item.hotId + '&tagName=' + item.name + '&fromModule=comment&isComment=false' : '/platForm/' + item.hotId}" 
                tag="span" v-for="(item, key) in comment.tips" 
                :key="key">#{{ item.name }}#
              </router-link>
            </li>
            <li class="item-3">{{ comment.remark }}</li>
            <li class="item-4">
              <span class="zan">{{ comment.useful }}个赞</span>
              <a href="javascript:;" class="reply" @click="showPopup('reply', comment.autoId, key)"></a>
            </li>
          </ul>
        </div>

        <div class="comment-follow" v-for="item in comment.replyList" :key="item.autoId">
          <div class="floor">{{ item.floor }}</div>
          <div class="follow-content">
            <div>
              <div class="img-div">
                <img :src="item.headUrl" alt="" v-if="item.headUrl">
                <div class="no-img" v-else></div>
              </div>
              <span class="nickname">{{ item.userName }}</span>
              <span class="date">{{ item.remarkTime }}</span>
            </div>
            <p>{{ item.remark }}</p>
          </div>
        </div>
      </div>
      <c-scroll-load v-on:pullUpLoad="getData" v-on:fixed="navFixed" :params="{fixedScroll: scrollTop, loading: loading}"></c-scroll-load>
    </div>

    <mt-popup v-model="sortPopupVisible" position="bottom" class="common-popup">
      <ul>
        <li @click="changeApiParma({sortKey: 'replaycount'})" :class="{red: commentListApiParams.data.sortKey === 'replaycount'}">回复数</li>
        <li @click="changeApiParma({sortKey: 'useful'})" :class="{red: commentListApiParams.data.sortKey === 'useful'}">点赞数</li>
        <li @click="changeApiParma({sortKey: 'time'})" :class="{red: commentListApiParams.data.sortKey === 'time'}">发表时间</li>
        <li @click="changeApiParma({sortKey: 'platHot'})" :class="{red: commentListApiParams.data.sortKey === 'platHot'}" v-if="!productId && !platId">平台口碑</li>
        <router-link :to="{ path: '/commentSearch' }" tag="li" class="item-search" v-if="!productId && !platId">
          <i></i>
          <span>搜索</span>
        </router-link>
      </ul>
    </mt-popup>
    <mt-popup v-model="replyPopupVisible" position="bottom" class="common-popup">
      <ul>
        <li @click="commentRaise()">点赞</li>
        <router-link :to="{path: '/reply', query: {commentId: commentRaiseParams.data.commentId}}" tag="li">回复</router-link>
      </ul>
    </mt-popup>

  </div>
</template>

<script>
import cScrollLoad from './cScrollLoad'

export default {
  name: 'cComment',
  data () {
    return {
      scrollTop: 153,
      loading: false,
      navFixedVisible: false,
      allLoaded: false,
      fromModule: '',
      sortPopupVisible: false,
      replyPopupVisible: false,
      productId: 0,
      platId: 0,
      dataIndex: 0,
      commentList: {},
      commentListApiParams: JSON.parse(JSON.stringify(this.$api.commentList)),
      commentRaiseParams: JSON.parse(JSON.stringify(this.$api.commentRaise))
    }
  },
  mounted () {
    this.fromModule = this.$route.name.toLocaleLowerCase()
    this.id = parseInt(this.$route.params.id)
    this.getData()
  },
  props: ['params'],
  watch: {
    'params': {
      handler: function () {
        this.scrollTop = this.params.fixedScroll
      },
      deep: true
    }
  },
  methods: {
    navFixed (a) {
      this.navFixedVisible = a
    },
    showPopup (key, id, dataIndex) {
      if (parseInt(id) > 0) {
        this.commentRaiseParams.data.commentId = id
      }
      this.dataIndex = dataIndex
      this[key + 'PopupVisible'] = true
    },
    getData (type) {
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
      let apiParams = this.commentListApiParams.data
      if (this.$route.name === 'Product') {
        this.productId = this.id
        apiParams.productId = this.id
        apiParams.platId = -1
      } else if (this.$route.name === 'PlatForm') {
        this.platId = this.id
        apiParams.productId = -1
        apiParams.platId = this.id
      }
      let that = this
      this.loading = true
      this.$indicator.open({ spinnerType: 'snake' })
      this.$axios.post(that.commentListApiParams.path, that.commentListApiParams.data).then(function (res) {
        if (!res.data.code) {
          if (res.data.data.subList.length) {
            if (that.commentListApiParams.data.pageNo === 1) {
              that.commentList = res.data.data
            } else {
              res.data.data.subList.forEach(item => {
                that.commentList.subList.push(item)
              })
            }
            that.commentListApiParams.data.pageNo += 1
          } else {
            if (type === 'changeApiParma') {
              that.commentList.subList = []
            } else {
              that.allLoaded = true
              if (that.commentListApiParams.data.pageNo > 1) {
                that.$toast({
                  message: '没有数据了',
                  duration: 800
                })
              }
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
    },
    changeApiParma (options) {
      this.commentListApiParams.data.pageNo = 1
      options = options === void 0 ? {} : options
      Object.keys(options).forEach(key => {
        if (this.commentListApiParams.data[key] === options[key]) {
          if (this.commentListApiParams.data.sortType === 1) {
            this.commentListApiParams.data.sortType = 2
          } else {
            this.commentListApiParams.data.sortType = 1
          }
        } else {
          this.commentListApiParams.data[key] = options[key]
          this.commentListApiParams.data.sortType = 2
        }
      })
      this.allLoaded = false
      this.getData('changeApiParma')
      this.sortPopupVisible = false
    },
    commentRaise () {
      this.replyPopupVisible = false
      this.$indicator.open({ spinnerType: 'snake' })
      let that = this
      if (parseInt(this.commentRaiseParams.data.commentId) > 0) {
        let path = this.commentRaiseParams.path.replace('{commentId}', this.commentRaiseParams.data.commentId)
        this.$axios.post(path).then(function (res) {
          that.$indicator.close()
          if (!res.data.code) {
            that.commentList.subList[that.dataIndex].useful += 1
            that.$toast({
              message: '点赞成功',
              duration: 800
            })
          } else {
            that.$toast({
              message: res.data.msg,
              duration: 800
            })
          }
        }).catch(function () {
          that.$toast({
            message: '请求错误',
            duration: 800
          })
          that.$indicator.close()
        })
      } else {
        that.$indicator.close()
        that.$toast({
          message: '参数错误',
          duration: 800
        })
      }
    }
  },
  components: {
    cScrollLoad
  }
}
</script>

<style lang="scss" scoped>
@import '../../../static/scss/config.scss';

.nav-div {
  height: pxToRem(53px);
}

nav {
  border-bottom: 1px solid #bfbfbf;
  height: pxToRem(46px);
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
  .item-2,
  .item-3 {
    float: left;
    width: pxToRem(65px);
    height: pxToRem(46px);
    text-align: center;
    line-height: pxToRem(46px);
  }

  .line {
    position: absolute;
    width: pxToRem(65px);
    height: pxToRem(3px);
    background-color: #0b182c;
    left: 0;
    bottom: 0;
    transform: translateX(0);
    transition-duration: 0.5s;

    &.line-1 {
      transform: translateX(pxToRem(65px));
      transition-duration: 0.5s;
    }

    &.line-2 {
      transform: translateX(pxToRem(130px));
      transition-duration: 0.5s;
    }
  }

  .item-4 {
    float: right;
    height: 100%;
    background: blue;
    width: pxToRem(60px);
    text-align: center;
    line-height: pxToRem(46px);
    color: #8d8d8d;
    margin-right: pxToRem(8px);
  }

  .item-4 {
    background: url('../../assets/bg_1.png') left center no-repeat;
    background-size: pxToRem(11px);
  }
}

.content {
  background-color: #dddddd;
  padding: pxToRem(15px) 0;
}

.ly-div {
  height: pxToRem(45px);
  width: pxToRem(338px);
  background-color: #ffffff;
  border: 1px solid #a1a1a1;
  margin: 0 auto;
  @include compatible(border-radius,
  pxToRem(4px));
  position: relative;
  line-height: pxToRem(45px);
  text-indent: pxToRem(25px);
  margin-bottom: pxToRem(15px);

  &:before {
    content: "";
    background-color: #1a1a1f;
    width: pxToRem(2px);
    height: pxToRem(15px);
    position: absolute;
    left: pxToRem(15px);
    top: 50%;
    @include compatible(transform,
    translateY(-50%));
  }

  &:after {
    content: "";
    width: pxToRem(11px);
    height: pxToRem(11px);
    background: url('../../assets/bg_7.png') center center no-repeat;
    background-size: contain;
    right: pxToRem(17px);
    top: 50%;
    @include compatible(transform,
    translateY(-50%));
    position: absolute;
  }
}

.comment-div {
  width: pxToRem(338px);
  background-color: #ffffff;
  border: 1px solid #a1a1a1;
  margin: 0 auto;
  margin-bottom: pxToRem(15px);
  @include compatible(box-shadow,
  0 pxToRem(2px) pxToRem(3px) 0px #bebebe);
  @include compatible(border-radius,
  pxToRem(4px));
  overflow: hidden;
}

.comment-author {
  padding: pxToRem(12px);
  border-bottom: 1px solid #cecece;
  * {
    float: left;
  }
  &:after {
    content: "";
    display: block;
    clear: both;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .img-div {
    width: pxToRem(40px);
    height: pxToRem(40px);
    @include compatible(border-radius,
    50%);
    overflow: hidden;
  }

  ul {
    width: pxToRem(253px);
    margin-left: pxToRem(15px);

    li {
      width: 100%;
      margin-top: pxToRem(8px);
      &:first-child {
        margin-top: 0;
      }
    }

    li:after {
      content: "";
      display: block;
      clear: both;
    }

    .item-4 {
      margin-top: pxToRem(15px);
    }
  }

  .nickname {
    float: left;
    color: #0c63ac;
    font-size: pxToRem(12px);
  }

  .date {
    float: right;
    color: #949494;
    font-size: pxToRem(12px);
  }

  .tag {
    color: #949494;
    font-size: pxToRem(12px);

    span {
      margin-right: pxToRem(3px)
    }
  }

  .zan {
    float: left;
    font-size: pxToRem(12px);
  }

  .reply {
    float: right;
    width: pxToRem(23px);
    height: pxToRem(14px);
    background: url('../../assets/bg_8.png') center center no-repeat;
    background-size: contain;

    &:active {
      opacity: .8;
    }
  }
}

.comment-follow {
  background-color: #fff;
  font-size: pxToRem(12px);

  &:last-child {
    .follow-content {
      border-bottom: 0;
    }
  }
  &:after {
    content: "";
    display: block;
    clear: both;
  }

  &>div {
    float: left;
  }

  .floor {
    width: pxToRem(82px);
    padding-top: pxToRem(18px);
    color: #949494;
    text-align: center;
  }

  .follow-content {
    width: pxToRem(240px);
    padding: pxToRem(15px) 0;
    border-bottom: 1px solid #cecece;

    &>p {
      margin: 0;
      margin-top: pxToRem(8px);
    }

    &>div {
      &:after {
        content: "";
        display: block;
        clear: both;
      }
    }
    .img-div {
      float: left;
      width: pxToRem(24px);
      height: pxToRem(24px);
      @include compatible(border-radius,
      50%);
      overflow: hidden;
    }

    img {
      width: 100%;
      height: 100%;
    }

    .nickname {
      float: left;
      color: #0c63ac;
      line-height: pxToRem(24px);
      margin-left: pxToRem(4px);
    }

    .date {
      float: right;
      color: #949494;
      line-height: pxToRem(24px);
    }
  }
}
</style>
