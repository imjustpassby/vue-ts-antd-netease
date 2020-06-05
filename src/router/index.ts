import { ErrorHandler } from 'vue-router/types/router';
import Vue from 'vue';
import VueRouter, { RawLocation, Route, RouteConfig } from 'vue-router';

// 重写 router 的 push 方法，添加全局异常捕获
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(
  location: RawLocation,
  onComplete?: Function,
  onAbort?: ErrorHandler
) {
  if (onComplete || onAbort) {
    return originalPush.call(this, location, onComplete, onAbort);
  }
  return (
    originalPush
      .call(this, location)
      // @ts-ignore
      .catch((err: Error) => {
        // 不需要输出报错信息，请注释掉
        console.log(err);
        return err;
      })
  );
};

Vue.use(VueRouter);

/**
 * 页面路由 + 侧边栏菜单配置
 *
 * vue-router 的基本配置项：
 * path: string
 * name?: string, // name 作为菜单的 key 值，唯一的，需要显示的菜单必须添加此数据
 * component?: Component
 * components?: Dictionary<Component>
 * redirect?: RedirectOption, // 若当前根路由有 redirect，且子路由只有一个时，根菜单仅显示子路由
 * alias?: string | string[]
 * children?: RouteConfig[]
 * beforeEnter?: NavigationGuard
 * props?: boolean | Object | RoutePropsFunction
 * caseSensitive?: boolean
 * pathToRegexpOptions?: PathToRegexpOptions
 *
 */
const routes: RouteConfig[] = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/components/Layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: 'rankingList',
        name: 'rankingList',
        component: () => import('@/views/RankingList/index.vue')
      },
      {
        path: 'playlistDetail',
        name: 'playlistDetail',
        component: () => import('@/views/PlaylistDetail/index.vue')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/Search/index.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

/**
 * 全局前置守卫
 * 参数或查询的改变并不会触发进入/离开的导航守卫
 */
router.beforeEach(
  (
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
  ) => {
    // const isLogin = window.localStorage.getItem('sessionId');
    if (to.matched.length !== 0) {
      // if (!isLogin && !to.meta.noAuth && to.name !== 'login') {
      //   // 未登录，并且需要登录才能访问的页面，跳转至登录页。
      //   next({ name: 'login' });
      // }
      next();
    } else {
      // 路由不存在，跳转至404页面。
      next({ name: '404' });
    }
  }
);

export default router;
