import { ErrorHandler } from 'vue-router/types/router';
import store from '@/store';
import Vue from 'vue';
import VueRouter, { RawLocation, Route, RouteConfig } from 'vue-router';
// 重写 router 的 push 方法，添加全局异常捕获
const originalPush = VueRouter.prototype.push;
import NProgress from 'nprogress';

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
        path: 'playlist',
        name: 'playlist',
        component: () => import('@/views/Playlist/index.vue')
      },
      {
        path: 'artist',
        name: 'artist',
        component: () => import('@/views/ArtistList/index.vue')
      },
      {
        path: 'newestAlbum',
        name: 'newestAlbum',
        component: () => import('@/views/NewestAlbum/index.vue')
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
        path: 'artistDetail',
        name: 'artistDetail',
        component: () => import('@/views/ArtistDetail/index.vue')
      },
      {
        path: 'albumDetail',
        name: 'albumDetail',
        component: () => import('@/views/AlbumDetail/index.vue')
      },
      {
        path: 'songDetail',
        name: 'songDetail',
        component: () => import('@/views/SongDetail/index.vue')
      },
      {
        path: 'djDetail',
        name: 'djDetail',
        component: () => import('@/views/DjDetail/index.vue')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/Search/index.vue')
      },
      {
        path: 'dj',
        name: 'dj',
        component: () => import('@/views/DjList/index.vue')
      },
      {
        path: 'copyright',
        name: 'copyright',
        component: () => import('@/views/CopyRight/index.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/MyMusic/index.vue')
      },
      {
        path: 'mv',
        name: 'mv',
        component: () => import('@/views/MvDetail/index.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

/* 
  需要登录才能访问的地址
*/
const needLoginPaths = ['/my'];
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
    NProgress.start();
    if (to.matched.length !== 0) {
      if (store.state.user.loginSuccess === 'true') {
        next();
      } else {
        if (needLoginPaths.includes(to.path)) {
          Vue.prototype.$message.warning('请先登录再体验该功能喔...');
        } else {
          next();
        }
      }
    } else {
      // 路由不存在，跳转至404页面。
      next({ name: '404' });
    }
  }
);

router.afterEach(() => {
  NProgress.done();
  window.scrollTo(0, 0);
});

export default router;
