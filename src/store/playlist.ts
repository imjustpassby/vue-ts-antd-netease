import { ActionTree, MutationTree } from 'vuex';
import { ISongFormat } from '@/utils/types/index.ts';
import { StateRoot } from '@/store/index';
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
  ADD_PLAYLIST: (state, list: ISongFormat | ISongFormat[]) => {
    const toString = (value: any) => Object.prototype.toString.call(value);
    const isArray = (value: any) => toString(value) == '[object Array]';
    if (isArray(list)) {
      state.playlist = [...state.playlist, ...(list as ISongFormat[])];
    } else {
      state.playlist.push(list as ISongFormat);
    }
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
  SET_CURRENT_MUSIC_ACTION: ({ state, commit }, song) => {
    commit('SET_CURRENT_MUSIC', song);
    commit('ADD_PLAYLIST', song);
    commit('SET_CURRENT_INDEX', length);
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
