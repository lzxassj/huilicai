<template>
  <div class="search white-content">
    <div class="title clear">
      <span>搜索</span>
      <span class="btn" @click="getSearch()">搜索</span>
    </div>
    <div class="search_div">
      <input type="text" class="search_key" placeholder="输入关键词搜索评论" v-model="searchKey">
      <span class="clear_search" v-if="searchKey" @click="searchKey = ''"></span>
    </div>

    <dl class="hot" v-if="hotData && !isSubmit">
      <dt>热门</dt>
      <router-link :to="{path: '/tagSearchRes', query: {tagId: item.hotId, tagName: item.name, fromModule: 'comment', isComment: false}}" tag="dd" v-for="item in hotData" :key="item.hotId">#{{ item.name }}#</router-link>
    </dl>

    <div class="result" v-if="isSubmit">
      <dl class="tag">
        <dt>标签({{ result.length }})</dt>
        <router-link :to="{path: '/tagSearchRes', query: {tagId: item.hotId, tagName: item.name, fromModule: 'comment', isComment: false}}" tag="dd" v-for="item in result" :key="item.hotId" v-html="highlight('#'+item.name+'#', searchKey, 'red')"></router-link>
      </dl>
    </div>
  </div>
</template>

<script>

export default {
  name: 'commentSearch',
  data () {
    return {
      searchKey: '',
      hotData: {},
      result: [],
      isSubmit: false
    }
  },
  watch: {
    searchKey: function (newValue) {
      if (!newValue) {
        this.isSubmit = false
      }
    }
  },
  mounted () {
    this.getHot()
  },
  methods: {
    getHot () {
      let api = JSON.parse(JSON.stringify(this.$api.searchCommentHotPage))
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

      let api = JSON.parse(JSON.stringify(this.$api.searchCommentHotSearchList))
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
          message: '获取热门标签失败',
          duration: 800
        })
        that.$indicator.close()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './static/scss/config.scss';
</style>
