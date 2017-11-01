<template>
  <div class="search white-content">
    <div class="title clear">
      <span>搜索</span>
      <span class="btn" @click="getSearch()">搜索</span>
    </div>
    <div class="search_div">
      <input type="text" class="search_key" placeholder="输入关键词搜索平台" v-model="searchKey">
      <span class="clear_search" v-if="searchKey" @click="searchKey = ''"></span>
    </div>

    <dl class="hot" v-if="hotData && !isSubmit">
      <dt>热门</dt>
      <router-link :to="{path: '/tagSearchRes', query: {tagId: item.hotId, tagName: item.name, fromModule: 'platform', isComment: isComment}}" tag="dd" v-for="item in hotData" :key="item.hotId">#{{ item.name }}#</router-link>
    </dl>

    <div class="result" v-if="isSubmit">
      <dl class="platform" v-if="result.plats.length || !result.tags.length" :class="{'bottom-line': result.tags.length}">
        <dt>平台({{ result.plats.length }})</dt>
        <dd v-for="item in result.plats" :key="item.hotId" v-html="highlight(item.name, searchKey, 'red')" @click="selectPlat(item.hotId, item.name)"></dd>
      </dl>

      <dl class="tag" v-if="result.tags.length || !result.plats.length">
        <dt>标签({{ result.tags.length }})</dt>
        <router-link :to="{path: '/tagSearchRes', query: {tagId: item.hotId, tagName: item.name, fromModule: 'platform', isComment: isComment}}" tag="dd" v-for="item in result.tags" :key="item.hotId" v-html="highlight('#'+item.name+'#', searchKey, 'red')"></router-link>
      </dl>
    </div>
  </div>
</template>

<script>

export default {
  name: 'platSearch',
  data () {
    return {
      searchKey: '',
      hotData: {},
      result: {},
      isComment: false,
      isSubmit: false
    }
  },
  computed: {
  },
  watch: {
    searchKey: function (newValue) {
      if (!newValue) {
        this.isSubmit = false
      }
    }
  },
  mounted () {
    if (this.$route.query.isComment === 'true' || this.$route.query.isComment === true) {
      this.isComment = true
    }
    this.getHot()
  },
  methods: {
    getHot () {
      let api = JSON.parse(JSON.stringify(this.$api.searchPlatHotPage))
      let that = this
      this.$indicator.open({ spinnerType: 'snake' })
      this.$axios.get(api.path).then(res => {
        that.$indicator.close()
        if (!res.data.code) {
          that.hotData = res.data.data
        }
      }).catch(function () {
        that.$toast({
          message: '获取热门标签失败',
          duration: 800
        })
        that.$indicator.close()
      })
    },
    getSearch () {
      if (!this.searchKey.replace(/^\s+|\s+$/g, '')) {
        this.$toast({
          message: '请输入关键词',
          duration: 800
        })
        return false
      }

      let api = JSON.parse(JSON.stringify(this.$api.searchPlatHotSearchList))
      let that = this

      this.$indicator.open({ spinnerType: 'snake' })
      this.$axios.get(api.path, { params: { key: this.searchKey } }).then(res => {
        this.$indicator.close()
        if (!res.data.code) {
          that.isSubmit = true
          that.result = res.data.data
        } else {
          that.$toast({
            messasge: res.data.msg,
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
    },
    selectPlat (platId, platName) {
      if (this.isComment) {
        let commentPath = sessionStorage.getItem('commentPath')
        sessionStorage.setItem('commentPlatId', platId)
        sessionStorage.setItem('commentPlatName', platName)
        // sessionStorage.removeItem('commentPath')

        this.$router.push({ path: commentPath })
      } else {
        this.$router.push({ path: '/platForm/' + platId })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './static/scss/config.scss';
</style>
