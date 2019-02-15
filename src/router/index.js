import Vue from 'vue'
import Router from 'vue-router'

// 引入页面 命名：子页面与父页面用 ‘_’ 分隔
const pages = {
  // 首页
  Index: resolve => require.ensure([], () => resolve(require('@/components/index'))),
  Showreel: resolve => require.ensure([], () => resolve(require('@/components/index/showreel'))),
  Showreel_Icons: resolve => require.ensure([], () => resolve(require('@/components/index/showreel/icons'))),
  Showreel_Toast: resolve => require.ensure([], () => resolve(require('@/components/index/showreel/toast'))),
  Showreel_Message: resolve => require.ensure([], () => resolve(require('@/components/index/showreel/message'))),

  // 后台
  Admin: resolve => require.ensure([], () => resolve(require('@/components/admin'))),
  Admin_Login: resolve => require.ensure([], () => resolve(require('@/components/admin/login'))),
  Admin_EditDatabase: resolve => require.ensure([], () => resolve(require('@/components/admin/edit-database'))),
  Admin_Users: resolve => require.ensure([], () => resolve(require('@/components/admin/users'))),

  // 未定义
  HelloWorld: resolve => require.ensure([], () => resolve(require('@/components/HelloWorld'))),
  Test: resolve => require.ensure([], () => resolve(require('@/components/test'))),
  Mask: resolve => require.ensure([], () => resolve(require('@/components/css-mask'))),
};

// 子路由
// pages.Index.children = [];
// pages.Admin.children = [];

// 配置路由
const setRoutes = function (routeItems, path = '', defaultRoute, callback) {
  if (!routeItems) return [];
  let res = [], first = true;
  defaultRoute = defaultRoute || path || '/';
  for (let key in routeItems) {
    let route = {
      path: path + '/' + key.toLocaleLowerCase().replace(/_/ig, '/'),
      name: key.replace(/_/ig, ''),
      meta: {},
      component: routeItems[key]
    };
    route.children = setRoutes(routeItems[key].children, route.path);
    first && (route.alias = defaultRoute);
    first = false;
    typeof callback === 'function' && callback(route);
    res.push(route);
  }
  res.push({path: '**', redirect: defaultRoute});
  return res;
};
let routes = setRoutes(pages, '', '', item => {
  switch (item.path) {
    case '/helloworld':
      item.alias = '/hello';
      break;
    default:
      break;
  }
});

// console.log(routes);

Vue.use(Router);

const router = new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  let loginType = localStorage.getItem('loginType');
  document.title = to.meta.title || 'some one';
  if(/^\/?admin/g.test(to.path) && loginType !== '2' && !/\/?admin\/login/.test(to.path)){
    return next('/admin/login');
  }
  next();
})

export default router
