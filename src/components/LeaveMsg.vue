<template>
  <div class="leaveMsg">
    <div class="title clear">
      <span>发帖</span>
      <span class="btn" @click="submit()">发布</span>
    </div>

    <textarea v-model="form.content" name="" id="" placeholder="留下您的言论..."></textarea>

    <div class="plat-form clear" @click="goSelectPlat()" v-if="(!productId && !platId) || fromModule=='comment'">
      <span class="pf-name">{{ platName ? platName : '选择您想评论的平台' }}</span>
      <span class="icon"></span>
    </div>

    <ul class="level">
      <li>
        <input type="radio" id="radio_1" name="level" :value="0" v-model="form.commentType">
        <label for="radio_1">好评</label>
      </li>
      <li>
        <input type="radio" id="radio_2" name="level" :value="1" v-model="form.commentType">
        <label for="radio_2">差评</label>
      </li>
      <li>
        <input type="radio" id="radio_3" name="level" :value="2" v-model="form.commentType">
        <label for="radio_3">一般</label>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'leaveMsg',
  data () {
    return {
      productId: 0,
      platId: 0,
      platName: '',
      form: {},
      fromModule: '' // ='comment'的时候，不需要选择平台
    }
  },
  created () {
    this.productId = parseInt(this.$route.query.productId)
    this.platId = parseInt(this.$route.query.platId)
    this.fromModule = this.$route.query.fromModule
  },
  mounted () {
    let form = sessionStorage.getItem('commentForm')
    if (form) {
      this.form = JSON.parse(form)
    } else {
      this.form = {
        commentType: 0,
        content: '',
        platId: this.platId,
        productId: this.productId
      }
    }

    let platId = parseInt(sessionStorage.getItem('commentPlatId'))
    if (!this.platId && platId) {
      this.form.platId = this.platId = platId
    }

    let platName = sessionStorage.getItem('commentPlatName')
    if (platName) {
      this.platName = platName
    }
  },
  methods: {
    submit () {
      if (!this.form.content) {
        this.$toast({
          message: '请输入您的言论',
          duration: 800
        })
        return false
      }
      if (this.fromModule === 'comment' && !this.form.platId) {
        this.$toast({
          message: '请选择您想评论的平台',
          duration: 800
        })
        return false
      }

      let that = this
      let api = JSON.parse(JSON.stringify(this.$api.commentAdd))
      this.$indicator.open({ spinnerType: 'snake' })
      this.$axios.post(api.path, that.form).then(function (res) {
        that.$indicator.close()
        if (!res.data.code) {
          sessionStorage.removeItem('commentForm')
          sessionStorage.removeItem('commentPlatId')
          sessionStorage.removeItem('commentPlatName')

          that.$messagebox({
            message: '评论成功',
            title: null,
            confirmButtonClass: 'font14'
          }).then(function () {
            if (that.fromModule === 'comment') {
              that.$router.push({ path: '/comment?footer=pinglun' })
            } else {
              history.go(-1)
            }
          })
        } else {
          that.$toast({
            message: res.data.msg,
            duration: 800
          })
        }
      }).catch(function (err) {
        console.log(err)
        that.$toast({
          message: '请求错误',
          duration: 800
        })
        that.$indicator.close()
      })
    },
    goSelectPlat () {
      sessionStorage.setItem('commentForm', JSON.stringify(this.form))
      sessionStorage.setItem('commentPath', this.$route.fullPath)
      this.$router.replace({ path: '/platSearch', query: { isComment: true } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/scss/config.scss';

.leaveMsg {
  width: pxToRem(338px);
  margin: 0 auto;
  .title {
    padding: pxToRem(15px) 0;
    span {
      float: left;
      line-height: pxToRem(21px);
    }

    .btn {
      float: right;
      width: pxToRem(61px);
      height: pxToRem(20px);
      @include compatible(border-radius, pxToRem(4px));
      background: url('../assets/bg_21.png') pxToRem(11px) pxToRem(4px) no-repeat #707070;
      background-size: pxToRem(11px);
      text-indent: pxToRem(27px);
      font-size: pxToRem(12px);
      color: #fff;
    }
  }

  textarea {
    width: pxToRem(306px);
    height: pxToRem(130px);
    border: 1px solid #a1a1a1;
    @include compatible(border-radius,
    pxToRem(4px));
    padding: pxToRem(15px);
  }

  .plat-form {
    padding: pxToRem(20px) 0;

    border-bottom: 1px solid #cecece;
    .pf-name {
      float: left;
    }

    .icon {
      float: right;
      width: pxToRem(12px);
      height: pxToRem(12px);
      background: url('../assets/bg_14.png') left center;
      background-size: contain;
      margin-top: pxToRem(3px);
    }
  }

  .level {
    margin-top: pxToRem(20px);

    li {
      display: inline;
    }

    label {
      float: left;
      background: url('../assets/bg_22.png') left center no-repeat;
      background-size: pxToRem(11px);
      padding-left: pxToRem(15px);
      margin-left: pxToRem(20px);
    }

    input[type='radio'] {
      display: none;
    }

    input[type='radio']:checked+label {
      background: url('../assets/bg_23.png') left center no-repeat;
      background-size: pxToRem(11px);
    }
  }
}
</style>
