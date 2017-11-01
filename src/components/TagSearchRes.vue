<template>
  <div class="tag-search-res white-content">
    <h3>#{{ tagName }}#</h3>
    <dl v-if="fromModule === 'paltform'">
      <dt>平台({{ result.subList.length }})</dt>
      <dd class="clear" v-for="(item, key) in result.subList" :key="key" @click="selectPlat(item.platId, item.name)">
        <div class="item-1">{{ item.name }}</div>
        <div class="item-2">
          <span class="tag-span" v-for="(item_c, key_c) in item.tagList" :key="key_c" v-html="highlight('#'+item_c+'#', '#'+tagName+'#', 'red')"></span>
        </div>
      </dd>
    </dl>
    <dl v-else>
      <dt>评论({{ result.subList.length }})</dt>
      <dd class="clear" v-for="(item, key) in result.subList" :key="key" @click="selectPlat(item.platId)">
        <div class="item-1">{{ item.time }}</div>
        <div class="item-2" v-html="highlight(item.content, tagName, 'red')"></div>
      </dd>
    </dl>
  </div>
</template>

<script>

export default {
  name: 'tagSearchRes',
  data () {
    return {
      tagId: 0,
      tagName: '',
      fromModule: 'paltform',
      result: {
        subList: []
      },
      isComment: false
    }
  },
  computed: {
  },
  mounted () {
    this.tagId = parseInt(this.$route.query.tagId)
    this.tagName = this.$route.query.tagName
    this.fromModule = this.$route.query.fromModule === 'comment' ? 'comment' : 'paltform'

    if (this.$route.query.isComment === 'true' || this.$route.query.isComment === true) {
      this.isComment = true
    }

    this.getData()
  },
  methods: {
    getData () {
      let that = this
      this.$indicator.open({ spinnerType: 'snake' })

      // 通过标签搜索平台
      if (this.fromModule === 'paltform') {
        let api = JSON.parse(JSON.stringify(this.$api.searchPlatByTag))
        this.$axios.get(api.path, { params: { tagId: this.tagId } }).then(res => {
          if (!res.data.code) {
            that.result = res.data.data
          } else {
            that.$toast({
              message: res.data.msg,
              duration: 800
            })
          }
          that.$indicator.close()
        }).catch(function () {
          that.$toast({
            message: '请求错误',
            duration: 800
          })
          that.$indicator.close()
        })
      } else {
        let api = JSON.parse(JSON.stringify(this.$api.searchCommentByTag))
        this.$axios.get(api.path, { params: { tagId: this.tagId } }).then(res => {
          if (!res.data.code) {
            that.result = res.data.data
          } else {
            that.$toast({
              message: res.data.msg,
              duration: 800
            })
          }
          that.$indicator.close()
        }).catch(function () {
          that.$toast({
            message: '请求错误',
            duration: 800
          })
          that.$indicator.close()
        })
      }
    },
    selectPlat (platId, platName) {
      console.log(platId)
      if (this.isComment) {
        let commentPath = sessionStorage.getItem('commentPath')
        sessionStorage.setItem('commentPlatId', platId)
        sessionStorage.setItem('commentPlatName', platName)
        // sessionStorage.removeItem('commentPath')

        this.$router.replace({ path: commentPath })
      } else {
        this.$router.replace({ path: '/platForm/' + platId })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/scss/config.scss';

.tag-search-res {
  h3 {
    height: pxToRem(48px);
    border-bottom: 1px solid #ceceec;
    line-height: pxToRem(48px);
    margin: 0;
    text-indent: pxToRem(23px);
  }

  dl {
    margin-top: pxToRem(15px);
    padding: 0 pxToRem(23px);

    dt {
      font-size: pxToRem(12px);
    }

    dd {
      margin-top: pxToRem(10px);
      color: #949494;
      line-height: pxToRem(20px);

      .item-1 {
        float: left;
        width: pxToRem(88px);
      }
      .item-2 {
        float: right;
        width: pxToRem(240px);
      }
    }
  }
  .tag-span {
    float: left;
    margin-right: pxToRem(3px)
  }
}
</style>
