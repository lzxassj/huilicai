<template>
  <div class="leaveMsg">
    <div class="title clear">
      <span>回帖</span>
      <span class="btn" @click="submit()">发布</span>
    </div>
    <textarea v-model="form.content" name="" id="" placeholder="|  留下您的言论..."></textarea>
  </div>
</template>

<script>

export default {
  name: 'reply',
  data () {
    return {
      commentId: 0
    }
  },
  created () {
    this.commentId = parseInt(this.$route.query.commentId)
  },
  computed: {
    form () {
      return {
        commentId: this.commentId,
        content: '',
        replyId: 0
      }
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

      let that = this
      let api = JSON.parse(JSON.stringify(this.$api.commentReplyAdd))
      this.$indicator.open({ spinnerType: 'snake' })
      this.$axios.post(api.path, that.form).then(function (res) {
        that.$indicator.close()
        if (!res.data.code) {
          that.$messagebox({
            message: '回复成功',
            title: null,
            confirmButtonClass: 'font14'
          }).then(function () {
            history.go(-1)
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
