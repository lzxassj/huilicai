// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import qs from 'qs'
import api from './constant/api'
import cFilter from './filter'
import '../static/scss/common.scss'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(Mint)

Vue.config.productionTip = false

Vue.prototype.$api = api

// v-html中无法用过滤器，所以在vue的原生链上增加function
Vue.prototype.highlight = function (str, key, className) {
  let newStr = str
  className = className === void 0 ? '' : className
  if (key) {
    newStr = str.replace(key, '<span class="' + className + '">' + key + '</span>')
  }
  return newStr
}

// 过滤器加载
Object.keys(cFilter).forEach(key => {
  Vue.filter(key, cFilter[key])
})

Vue.prototype.$isLogin = true

// 登录状态判断，以及授权登录跳转 START
router.beforeEach((to, from, next) => {
  let token = to.query.token
  let userId = to.query.userId
  if (token && userId) {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('userId', userId)
  } else {
    token = sessionStorage.getItem('token')
    userId = sessionStorage.getItem('userId')
  }

  // 是否微信判断
  let ua = window.navigator.userAgent.toLowerCase()
  if (!/micromessenger/.test(ua)) {
    location.replace('/page/index.html')
    return
  }

  if (!token || !userId) {
    new Vue().$axios.get(api.userLoginUrl.path).then(function (res) {
      if (!res.data.code) {
        location.href = res.data.data
        // next()
      } else {
        Vue.$toast(res.data.msg)
      }
    })
  } else {
    if (to.query.token || to.query.userId) {
      let path = to.fullPath.replace(/token=.*&userId=\d+|&token=.*&userId=\d+/, '')
      location.replace(path)
    } else {
      Vue.prototype.$axios.defaults.headers['token'] = token
      Vue.prototype.$axios.defaults.headers['userId'] = userId
      Vue.prototype.$isLogin = true
      next()
    }
  }
})
// 登录状态判断，以及授权登录跳转 END

// axios默认配置项
Vue.prototype.$axios = axios.create({
  baseURL: 'http://api.moneyfree.cn/',
  timeout: 10000,
  params: {
    // os: 'H5'
  },
  // transformRequest: [function (data) {
  //   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
  //   return qs.stringify(data)
  // }],
  headers: {
    'Content-Type': 'application/json',
    'token': sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    'userId': sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : ''
  }
  // withCredentials: true
})

// 服务端返回的未登录状态拦截
Vue.prototype.$axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.hasOwnProperty('response') || !error.response) {
      return {
        data: {
          code: 1,
          msg: 'Network Error'
        }
      }
    } else {
      if (error.response.status === 900) {
        location.href = error.response.data.data
        return false
      } else {
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
      }
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  watch: {
    '$route': function (to, from) {
      document.body.scrollTop = 0
    }
  },
  mounted: function () {
    let docEl = document.documentElement
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    let recalc = function () {
      let clientWidth = docEl.clientWidth
      // let clientHeight = docEl.clientHeight
      if (!clientWidth) {
        return
      }
      if (clientWidth >= 640) {
        docEl.style.fontSize = '100px'
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
      }
    }
    recalc()
    if (!document.addEventListener) {
      return
    }
    window.addEventListener(resizeEvt, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
  },
  methods: {}
})
