import { ActionTree, MutationTree } from 'vuex';
import { checkMusic, getLyric, getSongUrl } from '@/api/song';
import { ISongFormat, ISongUrl } from '@/utils/types/index.ts';
import { StateRoot } from '@/store/index';
import Vue from 'vue';
export const namespaced: Boolean = true;

interface IStatePlaylist {
  currentIndex: number;
  currentMusic: ISongFormat | null;
  playlist: ISongFormat[];
}

export const state: IStatePlaylist = {
  currentIndex: -1,
  currentMusic: null,
  playlist: []
};

export const mutations: MutationTree<IStatePlaylist> = {
  SET_CURRENT_INDEX: (state, idx: number) => {
    state.currentIndex = idx;
  },
  SET_CURRENT_MUSIC: (state, song: ISongFormat) => {
    state.currentMusic = song;
  },
  ADD_PLAYLIST: (state, list: ISongFormat[]) => {
    const arr = [...state.playlist, ...list];
    const set = new Set();
    state.playlist = arr.reduce((cur: ISongFormat[], next: ISongFormat) => {
      set.has(next.id) ? '' : set.add(next.id) && cur.push(next);
      return cur;
    }, []);
  },
  CLEAR_PLAYLIST: state => {
    state.playlist.splice(0);
    state.currentIndex = -1;
    state.currentMusic = null;
  },
  DELETE_SONG: (state, idx: number) => {
    if (idx < state.currentIndex) {
      state.currentIndex -= 1;
    }
    state.playlist.splice(idx, 1);
  }
};

export const actions: ActionTree<IStatePlaylist, StateRoot> = {
  SET_CURRENT_MUSIC_ACTION: ({ state, commit }, song: ISongFormat) => {
    return new Promise(async (resolve, reject) => {
      checkMusic(song.id)
        .then(async result => {
          // 若有版权
          if (result.data.success) {
            // 获取 url
            const res = await getSongUrl<ISongUrl[]>(song.id);
            song.url = res.data.data[0].url;
            // 获取歌词, dj类型不获取
            if (song.songType !== 'dj') {
              const res = await getLyric(song.id);
              if (res.data.lrc !== undefined) {
                song.lrc = res.data.lrc.lyric;
              }
            }
            const colorThief = new ColorThief();
            const color = colorThief.getColorAsync(
              song.cover,
              (color: [number, number, number]) => {
                song.theme = color;
              }
            );
            let hasSong = false;
            const length = state.playlist.length;
            for (let i = 0; i < length; i++) {
              if (song.id === state.playlist[i].id) {
                hasSong = true;
                commit('SET_CURRENT_MUSIC', song);
                commit('SET_CURRENT_INDEX', i);
                resolve(song);
                break;
              }
            }
            if (!hasSong) {
              commit('SET_CURRENT_MUSIC', song);
              commit('ADD_PLAYLIST', [song]);
              commit('SET_CURRENT_INDEX', length);
              resolve(song);
            }
          }
        })
        .catch((err: Error) => {
          Vue.prototype.$message.warning('亲爱的，暂无版权。');
          reject('亲爱的，暂无版权');
        });
    });
  },
  NEXT_SONG: ({ state, dispatch }) => {
    return new Promise(resolve => {
      if (state.currentIndex === state.playlist.length - 1) {
        resolve(dispatch('SET_CURRENT_MUSIC_ACTION', state.playlist[0]));
      } else {
        resolve(
          dispatch(
            'SET_CURRENT_MUSIC_ACTION',
            state.playlist[state.currentIndex + 1]
          )
        );
      }
    });
  },
  LAST_SONG: ({ state, dispatch }) => {
    return new Promise(resolve => {
      if (state.currentIndex === 0) {
        resolve(
          dispatch(
            'SET_CURRENT_MUSIC_ACTION',
            state.playlist[state.playlist.length - 1]
          )
        );
      } else {
        resolve(
          dispatch(
            'SET_CURRENT_MUSIC_ACTION',
            state.playlist[state.currentIndex - 1]
          )
        );
      }
    });
  }
};
