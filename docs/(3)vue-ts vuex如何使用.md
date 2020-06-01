# vue-typescript 如何使用vuex

## store目录
``` typescript
// index.ts
import Vue from 'vue';
import Vuex, { ModuleTree } from 'vuex';

Vue.use(Vuex);

/**
 * 声明 root state
 */
export interface StateRoot {
  [x: string]: any;
}

const modules: ModuleTree<StateRoot> = {};

/**
 * 将 store 文件夹下的所有ts文件(index.ts除外)，全部导入到modules里面
 * store 的 module 名就是文件名(不含后缀.ts)
 */
const files = require.context('.', false, /.ts$/);
files.keys().forEach(key => {
  const fileName = key.replace(/(\.\/|\.ts)/g, '');
  if (fileName === 'index') {
    return;
  }
  modules[fileName] = files(key);
});

export default new Vuex.Store<StateRoot>({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: modules
});
```

``` typescript
// user.ts
import { ActionTree, MutationTree } from 'vuex';
import { StateRoot } from '@/store/index';
import User from '@/api/user';
export const namespaced: Boolean = true;

interface IStateUser {
  uid: string | null;
  nickname: string | null;
  avatarUrl: string | null;
}

type IProfile = {
  userId: number;
  nickname: string;
  avatarUrl: string;
};

export const state: IStateUser = {
  uid: window.sessionStorage.getItem('uid'),
  nickname: window.sessionStorage.getItem('nickname'),
  avatarUrl: window.sessionStorage.getItem('avatarUrl')
};

export const mutations: MutationTree<IStateUser> = {
  SET_UID: (state, uid: string) => {
    state.uid = uid;
    window.sessionStorage.setItem('uid', uid);
  },
  SET_NICKNAME: (state, nickname: string) => {
    state.nickname = nickname;
    window.sessionStorage.setItem('nickname', nickname);
  },
  SET_AVATAR_URL: (state, url: string) => {
    state.avatarUrl = url;
    window.sessionStorage.setItem('avatarUrl', url);
  }
};

export const actions: ActionTree<IStateUser, StateRoot> = {
LOGIN: ({ commit }, userInfo) => {
    return new Promise((resolve, reject) => {
      User.loginCellphone({
        phone: userInfo.phone,
        password: userInfo.password
      })
        .then(res => {
          commit('SET_LOGIN_SUCCESS', 'true');
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
 LOGIN_STATUS: async ({ commit }) => {
    // User.loginStatus<IProfile>() 传了IProfile这个泛型后，即可在res.data.profile访问IProfile里的属性，建议与store/user.ts一起看
    const res = await User.loginStatus<IProfile>();
    commit('SET_UID', res.data.profile.userId.toString());
    commit('SET_NICKNAME', res.data.profile.nickname);
   commit('SET_AVATAR_URL', res.data.profile.avatarUrl);
 },
}

```

## vue文件使用vuex
``` vue
<script lang="ts">
import { namespace } from 'vuex-class';
const userModule = namespace('user');
interface IUserInfo {
  phone: string;
  password: string;
}
@Component({
  components: { }
})
export default class Layout extends Vue {
  @userModule.State('nickname') StateNickname!: string | null;
  @userModule.State('avatarUrl') StateAvatarUrl!: string | null;
  @userModule.State('loginSuccess') StateLoginSuccess!: string;
  
  private async login() {
    const userInfo: IUserInfo = {
      phone: this.form
        .getFieldValue('phone')
        .toString()
        .trim(),
      password: this.form
        .getFieldValue('password')
        .toString()
        .trim()
    };
    await this.ACTION_LOGIN(userInfo)
      .then((result) => {
        // ...
      })
      .catch((err: Error) => {});
    await this.ACTION_LOGIN_STATUS();
  }
  
  @userModule.Action('LOGIN') ACTION_LOGIN!: Function;
  @userModule.Action('LOGIN_STATUS') ACTION_LOGIN_STATUS!: Function;
}
</script>
```
## ts文件使用vuex
``` typescript
// request.ts
import store from '@/store';
let loginSuccess = store.state.user.loginSuccess
...
```