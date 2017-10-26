<template>
  <div class="div-content">
    <c-header :nav-type="'comment'"></c-header>
    <c-comment></c-comment>
    <c-footer></c-footer>
  </div>
</template>

<script>
import cHeader from './children/cHeader'
import cFooter from './children/cFooter'
import cComment from './children/cComment'

export default {
  name: 'comment',
  data () {
    return {
    }
  },
  mounted () {
    sessionStorage.removeItem('commentPath')
    sessionStorage.removeItem('commentForm')
    sessionStorage.removeItem('commentPlatId')
    sessionStorage.removeItem('commentPlatName')
  },
  components: {
    cHeader, cFooter, cComment
  }
}
</script>

<style lang="scss" scoped>
@import './static/scss/config.scss';

nav {
  height: pxToRem(46px);
  background-color: #fff;
  padding-top: pxToRem(6px);
  position: relative;

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
    background: url('../assets/bg_1.png') left center no-repeat;
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
    background: url('../assets/bg_7.png') center center no-repeat;
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
  margin-top: pxToRem(15px);
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
    width: pxToRem(40px);
    height: pxToRem(40px);
    @include compatible(border-radius,
    50%);
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

  .replay {
    float: right;
    width: pxToRem(23px);
    height: pxToRem(14px);
    background: url('../assets/bg_8.png') center center no-repeat;
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
    img {
      float: left;
      width: pxToRem(24px);
      height: pxToRem(24px);
      @include compatible(border-radius,
      50%);
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
