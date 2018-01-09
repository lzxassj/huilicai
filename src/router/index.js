import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Comment from '@/components/Comment'
import Product from '@/components/Product'
import PlatForm from '@/components/PlatForm'
import PlatSearch from '@/components/PlatSearch'
import CommentSearch from '@/components/CommentSearch'
import TagSearchRes from '@/components/TagSearchRes'
import LeaveMsg from '@/components/LeaveMsg'
import Reply from '@/components/Reply'
// import Loadmore from '@/components/Test/Loadmore'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/product/:id/:platId',
      name: 'Product',
      component: Product
    },
    {
      path: '/platForm/:id',
      name: 'PlatForm',
      component: PlatForm
    },
    {
      path: '/platSearch',
      name: 'PlatSearch',
      component: PlatSearch
    },
    {
      path: '/commentSearch',
      name: 'CommentSearch',
      component: CommentSearch
    },
    {
      path: '/tagSearchRes',
      name: 'TagSearchRes',
      component: TagSearchRes
    },
    {
      path: '/leaveMsg',
      name: 'LeaveMsg',
      component: LeaveMsg
    },
    {
      path: '/reply',
      name: 'Reply',
      component: Reply
    }
    // {
    //   path: '/test/loadmore',
    //   name: 'Loadmore',
    //   component: Loadmore
    // }
  ]
})
