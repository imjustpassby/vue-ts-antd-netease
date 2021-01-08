import { ActionTree, MutationTree } from 'vuex'
import { IProfile } from '@/utils/types'
import { StateRoot } from '@/store/index'
import Cookies from 'js-cookie'
import User from '@/api/user'
interface IStateUser {
  uid: string | null
  nickname: string | null
  avatarUrl: string | null
  loginSuccess: 'true' | 'false'
  cookies: string | null
}

export const namespaced: Boolean = true

export const state: IStateUser = {
  uid: window.sessionStorage.getItem('uid'),
  nickname: window.sessionStorage.getItem('nickname'),
  avatarUrl: window.sessionStorage.getItem('avatarUrl'),
  loginSuccess: window.sessionStorage.getItem('loginSuccess')
    ? 'true'
    : 'false',
  cookies: window.sessionStorage.getItem('cookies')
}

export const mutations: MutationTree<IStateUser> = {
  SET_UID: (state, uid: string) => {
    state.uid = uid
    window.sessionStorage.setItem('uid', uid)
  },
  SET_NICKNAME: (state, nickname: string) => {
    state.nickname = nickname
    window.sessionStorage.setItem('nickname', nickname)
  },
  SET_AVATAR_URL: (state, url: string) => {
    state.avatarUrl = url
    window.sessionStorage.setItem('avatarUrl', url)
  },
  SET_LOGIN_SUCCESS: (state, isSuccess: 'true' | 'false') => {
    state.loginSuccess = isSuccess
    window.sessionStorage.setItem('loginSuccess', isSuccess)
  },
  INIT_STATE: state => {
    window.sessionStorage.removeItem('uid')
    window.sessionStorage.removeItem('nickname')
    window.sessionStorage.removeItem('avatarUrl')
    window.sessionStorage.removeItem('loginSuccess')
    window.sessionStorage.removeItem('cookie')
    state.uid = ''
    state.nickname = ''
    state.avatarUrl = ''
    state.loginSuccess = 'false'
    state.cookies = ''
  },
  SET_COOKIE: (state, cookies) => {
    state.cookies = JSON.stringify(cookies)
    window.sessionStorage.setItem('cookie', JSON.stringify(cookies))
  }
}

export const actions: ActionTree<IStateUser, StateRoot> = {
  LOGIN: ({ commit }, userInfo) => {
    return new Promise((resolve, reject) => {
      User.loginCellphone({
        phone: userInfo.phone,
        password: userInfo.password
      })
        .then(res => {
          if (res.data.code === 502) {
            reject(new Error(res.data.message))
            return
          }
          commit('SET_LOGIN_SUCCESS', 'true')
          commit('SET_COOKIE', Cookies.get()) //保存登录后返回的cookie到vuex
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  LOGIN_STATUS: async ({ commit }) => {
    const res = await User.loginStatus<IProfile>()
    commit('SET_UID', res.data.profile.userId.toString())
    commit('SET_NICKNAME', res.data.profile.nickname)
    commit('SET_AVATAR_URL', res.data.profile.avatarUrl)
  },
  LOGOUT: ({ commit }) => {
    return new Promise((resolve, reject) => {
      User.logout()
        .then(res => {
          commit('INIT_STATE')
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
