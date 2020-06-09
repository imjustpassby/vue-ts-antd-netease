<template>
  <div>
    <a-row>
      <a-row class="topbar" type="flex">
        <a-col :span="8">
          <div class="logo animation-class">
            <h1 @click="goHome">
              <span>ipassbyMusic</span>
            </h1>
          </div>
        </a-col>

        <a-col :span="8">
          <div class="navbar">
            <ul>
              <li
                v-for="(item, index) in topLink"
                :key="index"
                :class="checkedTopLink == index ? 'isTopChecked' : ''"
                @click="clickTopLink(index)"
              >
                <router-link :to="item.link">
                  <span>{{ item.span }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </a-col>

        <a-col :span="6" :offset="2">
          <ul v-if="StateLoginSuccess === 'false'" class="flex--start--center">
            <li>
              <button class="loginBar_btn" @click="showLoginForm">
                登录
              </button>
            </li>
          </ul>
          <ul
            v-else
            class="flex--start--center flex--start--center--with--margin"
          >
            <li>
              <button class="loginBar_btn" @click="logout">登出</button>
            </li>
            <li>
              <button class="loginBar_btn" @click="goMyMusic">
                {{ StateNickname }}
              </button>
            </li>
            <li>
              <a-avatar icon="user" :src="StateAvatarUrl" />
            </li>
          </ul>
        </a-col>
      </a-row>

      <a-row type="flex" align="middle" justify="center">
        <a-col :span="24" class="subNavbar">
          <ul>
            <li
              v-for="(item, index) in subLink"
              :key="index"
              :class="checkedSubLink == index ? 'isSubChecked' : ''"
              @click="clickSubLink(index)"
            >
              <router-link :to="item.link">
                <span>{{ item.span }}</span>
              </router-link>
            </li>
          </ul>
        </a-col>
      </a-row>

      <login-form
        v-if="loginShow"
        @cancelLogin="cancelLogin"
        @loginSucceed="loginSucceed"
      ></login-form>
      <a-player class="aplayer"></a-player>
      <my-playlist></my-playlist>
      <a-back-top style="bottom: 100px;left:10%" />
    </a-row>

    <transition name="fade-transform" mode="out-in">
      <keep-alive include="Search,AlbumDetail">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import APlayer from '@/components/APlayer/index.vue';
import LoginForm from '@/components/Login/index.vue';
import MyPlaylist from '@/components/MyPlaylist/index.vue';
const userModule = namespace('user');
interface Link {
  span: string;
  link: string;
}
interface ResponseDataLogout {
  code: number;
}

@Component({
  components: { LoginForm, APlayer, MyPlaylist }
})
export default class Layout extends Vue {
  topLink: Link[] = [
    {
      span: '发现音乐',
      link: '/home'
    },
    {
      span: '我的音乐',
      link: '/my/daily-recommend'
    },
    {
      span: '搜索',
      link: '/search'
    }
  ];
  subLink: Link[] = [
    {
      span: '推荐',
      link: '/'
    },
    {
      span: '排行榜',
      link: '/rankingList'
    },
    {
      span: '歌单',
      link: '/playlist'
    },
    {
      span: '主播电台',
      link: '/dj'
    },
    {
      span: '歌手',
      link: '/artist'
    },
    {
      span: '新碟上架',
      link: '/newestAlbum'
    }
  ];
  loginShow = false;
  checkedTopLink = '0';
  checkedSubLink = '0';

  @userModule.State('nickname') StateNickname!: string | null;
  @userModule.State('avatarUrl') StateAvatarUrl!: string | null;
  @userModule.State('loginSuccess') StateLoginSuccess!: string;

  mounted() {
    window.sessionStorage.setItem('checkedTopLink', '0');
    window.sessionStorage.setItem('checkedSubLink', '0');
  }

  clickTopLink(idx: number) {
    if (idx == 0) {
      window.sessionStorage.setItem('checkedTopLink', `${idx}`);
      window.sessionStorage.setItem('checkedSubLink', '0');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.checkedTopLink = window.sessionStorage.getItem('checkedTopLink')!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.checkedSubLink = window.sessionStorage.getItem('checkedSubLink')!;
    } else if (idx == 1) {
      if (this.$store.getters.loginSuccess) {
        window.sessionStorage.setItem('checkedTopLink', `${idx}`);
        window.sessionStorage.setItem('checkedSubLink', '-1');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.checkedTopLink = window.sessionStorage.getItem('checkedTopLink')!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.checkedSubLink = window.sessionStorage.getItem('checkedSubLink')!;
      }
    } else if (idx == 2) {
      window.sessionStorage.setItem('checkedTopLink', `${idx}`);
      window.sessionStorage.setItem('checkedSubLink', '-1');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.checkedTopLink = window.sessionStorage.getItem('checkedTopLink')!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.checkedSubLink = window.sessionStorage.getItem('checkedSubLink')!;
    }
  }

  clickSubLink(idx: number) {
    window.sessionStorage.setItem('checkedTopLink', '0');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.checkedTopLink = window.sessionStorage.getItem('checkedTopLink')!;
    window.sessionStorage.setItem('checkedSubLink', `${idx}`);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.checkedSubLink = window.sessionStorage.getItem('checkedSubLink')!;
  }

  goHome() {
    window.sessionStorage.setItem('checkedTopLink', '0');
    window.sessionStorage.setItem('checkedSubLink', '0');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.checkedTopLink = window.sessionStorage.getItem('checkedTopLink')!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.checkedSubLink = window.sessionStorage.getItem('checkedSubLink')!;
    if (this.$route.path !== '/home') {
      this.$router.push({
        path: '/'
      });
    }
  }

  async logout() {
    await this.ACTION_LOGOUT()
      .then((res: ResponseDataLogout) => {
        this.$message.success('已退出登录');
        this.goHome();
      })
      .catch((err: Error) => {});
  }

  goMyMusic() {}

  showLoginForm() {
    this.loginShow = true;
  }

  cancelLogin() {
    this.loginShow = false;
  }

  loginSucceed() {
    this.loginShow = false;
  }

  @userModule.Action('LOGOUT') ACTION_LOGOUT!: Function;
}
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 99;
  height: 70px;
  background: #200122; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #242424,
    #200122
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #242424,
    #200122
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #ffffff;
}
.navbar {
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    li {
      font-size: 14px;
      line-height: 70px;
      a {
        color: #cccccc;
      }
      span {
        padding: 0 19px;
      }
    }
  }
}
.isTopChecked {
  background-color: #000;
  & a span {
    color: #fff;
  }
}
.loginBar_btn {
  font-size: 14px;
  line-height: 70px;
  color: #ccc;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
  cursor: pointer;
}
.subNavbar {
  position: relative;
  min-width: 800px;
  height: 34px;
  background: #833ab4; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #fcb045,
    #fd1d1d,
    #833ab4
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #fcb045,
    #fd1d1d,
    #833ab4
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  ul {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    li {
      display: inline-block;
      margin: 4px;
      text-align: center;
      width: 84px;
      height: 24px;
      outline: none;
      cursor: pointer;
      line-height: 24px;
      span {
        display: inline-block;
        width: 100%;
        color: #fff;
      }
    }
  }
  .isSubChecked {
    background: #ff7e5f; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to left,
      #feb47b,
      #ff7e5f
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to left,
      #feb47b,
      #ff7e5f
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 20px;
  }
}
.flex--start--center--with--margin {
  li {
    margin: 0px 10px;
  }
}
.aplayer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: -6px;
  z-index: 999;
  margin: 5px 0;
}
</style>
