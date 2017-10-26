export default {
  productList: {
    path: '/financial-web/api/v1/product/list',
    method: 'POST',
    data: {
      pageNo: 1,
      pageSize: 10,
      sortKey: 'rank',
      sortType: 1,
      stageEnd: 1000,
      stageStart: 0
    }
  },
  platformList: {
    path: '/financial-web/api/v1/plat/list',
    method: 'POST',
    data: {
      pageNo: 1,
      pageSize: 10,
      sortKey: 'rank',
      sortType: 1,
      assetsType: '全部'
    }
  },
  product: {
    path: '/financial-web/api/v1/product/detail/{productId}',
    method: 'POST',
    data: {}
  },
  platform: {
    path: '/financial-web/api/v1/plat/detail/{platId}',
    method: 'POST',
    data: {}
  },
  commentList: {
    path: '/financial-web/api/v1/comment/list',
    method: 'POST',
    data: {
      commentType: 0,
      pageNo: 1,
      pageSize: 10,
      platId: 0,
      productId: 0,
      sortKey: '',
      sortType: 1
    }
  },
  commentRaise: {
    path: '/financial-web/api/v1/comment/comment/raise?commentId={commentId}',
    method: 'POST',
    data: {
      commentId: 0
    }
  },
  commentAdd: {
    path: '/financial-web/api/v1/comment/comment/add',
    method: 'POST',
    data: {
      commentType: 0,
      content: '',
      platId: 0,
      productId: 0
    }
  },
  commentReplyAdd: {
    path: '/financial-web/api/v1/comment/reply/add',
    method: 'POST',
    data: {
      commentId: 0,
      content: '',
      replyId: 0
    }
  },
  searchCommentHotPage: {
    path: '/financial-web/api/v1/search/comment/hotPage',
    method: 'GET',
    data: {}
  },
  searchPlatHotSearchList: {
    path: '/financial-web/api/v1/search/plat/hotSearchList',
    method: 'GET',
    data: {}
  },
  searchPlatByTag: {
    path: '/financial-web/api/v1/search/plat/searchByTag',
    method: 'GET',
    data: {
      tagId: 0
    }
  },
  searchPlatHotPage: {
    path: '/financial-web/api/v1/search/plat/hotPage',
    method: 'GET',
    data: {}
  },
  searchCommentHotSearchList: {
    path: '/financial-web/api/v1/search/comment/hotSearchList',
    method: 'GET',
    data: {
      key: ''
    }
  },
  searchCommentByTag: {
    path: '/financial-web/api/v1/search/comment/searchByTag',
    method: 'GET',
    data: {
      tagId: 0
    }
  },
  userLoginUrl: {
    path: '/financial-web/api/v1/user/loginUrl',
    method: 'GET',
    data: {
    }
  },
  banners: {
    path: '/financial-web/api/v1/index/banners',
    method: 'GET',
    data: {
    }
  }
}
