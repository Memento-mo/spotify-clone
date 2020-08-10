import Vue from 'vue'
import Vuex from 'vuex'
import * as TYPES from '@/store/types'
import SpotifyAPI from 'spotify-web-api-js'

Vue.use(Vuex)

const spotifyApi = new SpotifyAPI()
const getToken = () => Vue.$cookies.get('token').token

export default new Vuex.Store({
  state: {
    myPlaylists: {},
    myProfile: {},
    isLoading: true
  },
  mutations: {
    [TYPES.START_LOADING]: state => {
      state.isLoading = true
    },
    [TYPES.FINISH_LOADING]: state => {
      state.isLoading = false
    },
    [TYPES.FETCH_PLAYLISTS]: (state, playlists) => {
      state.myPlaylists = playlists
    },
    [TYPES.FETCH_ME_PROFILE]: (state, profile) => {
      state.myProfile = profile
    }
  },
  actions: {
    [TYPES.FETCH_INIT]: async ({ commit, dispatch }) => {
      commit(TYPES.START_LOADING)

      spotifyApi.setAccessToken(getToken())
      dispatch(TYPES.FETCH_ME_PROFILE)
      dispatch(TYPES.FETCH_PLAYLISTS)

      commit(TYPES.FINISH_LOADING)
    },
    [TYPES.FETCH_PLAYLISTS]: async ({ commit }) => {
      const playlists = await spotifyApi.getUserPlaylists()
      commit(TYPES.FETCH_PLAYLISTS, playlists || {})
    },
    [TYPES.FETCH_ME_PROFILE]: async ({ commit }) => {
      const profile = await spotifyApi.getMe()
      commit(TYPES.FETCH_ME_PROFILE, profile)
    }
  },
  modules: {}
})
