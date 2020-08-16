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
      myLikedTracks: {},
      detailsPlaylist: {},
      tracksFromPlaylist: {}
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
      (user.myLikedTracks = tracks),
    [TYPES.FETCH_PLAYLIST_TRACKS]: ({ user }, tracks) =>
      (user.tracksFromPlaylist = tracks)
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
    [TYPES.PLAYLIST_VIEWS]: async ({ commit, dispatch }, options) => {
      commit(TYPES.START_LOADING)
      await dispatch(TYPES.PROVIDE_TOKEN)
      await dispatch(TYPES.FETCH_PLAYLISTS)
      await dispatch(TYPES.FETCH_PLAYLIST, options)
      commit(TYPES.FINISH_LOADING)
    },
    [TYPES.PROVIDE_TOKEN]: async () =>
      spotifyApi.setAccessToken(getToken()),
    [TYPES.FETCH_PLAYLISTS]: async ({ commit }) =>
      commit(
        TYPES.FETCH_PLAYLISTS,
        await spotifyApi.getUserPlaylists()
      ),
    [TYPES.FETCH_PLAYLIST]: async ({ commit, dispatch }, options) => {
      let params = {}
      if (options.url) {
        const index = options.url.indexOf('?')
        params = options.url
          .slice(index + 1)
          .split('&')
          .reduce((initial: any, item: any) => {
            const parts = item.split('=')
            console.log(parts[0], parts[1])
            initial[parts[0]] = parts[1]

            return initial
          }, {})
      }
      // console.log(params)
      if (Object.keys(params).length > 0) {
        let url = `${window.location.href}?`

        const arrayParams = []
        for (const key in params) {
          const param = `${key}=${params[key]}`
          arrayParams.push(param)
        }
        url = window.location.pathname + '?' + arrayParams.join('&')

        window.history.pushState(null, '', url)
      }

      commit(
        TYPES.FETCH_PLAYLIST_TRACKS,
        await spotifyApi.getPlaylistTracks(options.id, params)
      )

      commit(
        TYPES.FETCH_PLAYLIST,
        await spotifyApi.getPlaylist(options.id)
      )
    },
    [TYPES.FETCH_ME_PROFILE]: async ({ commit, dispatch }) =>
      commit(TYPES.FETCH_ME_PROFILE, await spotifyApi.getMe()),
    [TYPES.FETCH_MY_SAVED_TRACKS]: async ({ commit, dispatch }) =>
      commit(
        TYPES.FETCH_MY_SAVED_TRACKS,
        await spotifyApi.getMySavedTracks()
      ),
    [TYPES.PLAY_SONG]: async (ctx, options) => {
      const devices = await spotifyApi.getMyDevices()
      options['device_id'] = devices.devices[0].id
      spotifyApi.play(options)
    }
  },
  modules: {}
})
