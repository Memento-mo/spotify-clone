import Vue from 'vue'
import Vuex from 'vuex'
import * as TYPES from '@/store/types'
import SpotifyAPI from 'spotify-web-api-js'

Vue.use(Vuex)

const spotifyApi = new SpotifyAPI()
const getToken = () => Vue.$cookies.get('token').token

export default new Vuex.Store({
  state: {
    user: {
      myPlaylists: {},
      myProfile: {},
      myTracks: {},
      detailsPlaylist: {}
    },
    isLoading: true,
    isOpen: false
  },
  mutations: {
    [TYPES.START_LOADING]: state => (state.isLoading = true),
    [TYPES.FINISH_LOADING]: state => (state.isLoading = false),
    [TYPES.MENU]: (state, is) => (state.isOpen = is),
    [TYPES.FETCH_PLAYLISTS]: ({ user }, playlists) =>
      (user.myPlaylists = playlists),
    [TYPES.FETCH_PLAYLIST]: ({ user }, playlist) =>
      (user.detailsPlaylist = playlist),
    [TYPES.FETCH_ME_PROFILE]: ({ user }, profile) =>
      (user.myProfile = profile),
    [TYPES.FETCH_MY_SAVED_TRACKS]: ({ user }, tracks) =>
      (user.myTracks = tracks)
  },
  actions: {
    [TYPES.HOME_VIEWS]: async ({ commit, dispatch }) => {
      commit(TYPES.START_LOADING)
      await dispatch(TYPES.PROVIDE_TOKEN)
      await dispatch(TYPES.FETCH_ME_PROFILE)
      await dispatch(TYPES.FETCH_MY_SAVED_TRACKS)
      await dispatch(TYPES.FETCH_PLAYLISTS)
      commit(TYPES.FINISH_LOADING)
    },
    [TYPES.PLAYLIST_VIEWS]: async ({ commit, dispatch }, id) => {
      commit(TYPES.START_LOADING)
      await dispatch(TYPES.PROVIDE_TOKEN)
      await dispatch(TYPES.FETCH_PLAYLISTS)
      await dispatch(TYPES.FETCH_PLAYLIST, id)
      commit(TYPES.FINISH_LOADING)
    },
    [TYPES.PROVIDE_TOKEN]: async () => {
      spotifyApi.setAccessToken(getToken())
    },
    [TYPES.FETCH_PLAYLISTS]: async ({ commit }) => {
      commit(
        TYPES.FETCH_PLAYLISTS,
        await spotifyApi.getUserPlaylists()
      )
    },
    [TYPES.FETCH_PLAYLIST]: async ({ commit, dispatch }, id) => {
      commit(TYPES.FETCH_PLAYLIST, await spotifyApi.getPlaylist(id))
    },
    [TYPES.FETCH_ME_PROFILE]: async ({ commit, dispatch }) => {
      commit(TYPES.FETCH_ME_PROFILE, await spotifyApi.getMe())
    },
    [TYPES.FETCH_MY_SAVED_TRACKS]: async ({ commit, dispatch }) => {
      commit(
        TYPES.FETCH_MY_SAVED_TRACKS,
        await spotifyApi.getMySavedTracks()
      )
    },
    [TYPES.PLAY_SONG]: async (ctx, options) =>
      spotifyApi.play(options)
  },
  modules: {}
})
