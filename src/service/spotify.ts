import axios from 'axios'
import querystring from 'querystring'
import Vue from 'vue'
type Config = {
  clientID: string
  clientSecret: string
  url: string
  redirectUri: string
  scope: string[]
}

const config: Config = {
  clientID: '9512ca5d72be43c69d5c26e8ca9d145e',
  clientSecret: process.env.VUE_APP_CLIENT_SECRET!,
  url: 'https://accounts.spotify.com/',
  redirectUri: 'http://localhost:8080/',
  scope: [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-email',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ]
}

const { url, clientID, clientSecret, redirectUri, scope } = config

export const authUrl = `${url}authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUri}&scope=${scope.join(
  '%20'
)}&show_dialog=false`

type ServerResponseToken = {
  access_token: string
  refresh_token?: string
  expires_in: number
  scope: string
  token_type: string
}

const getAccessAndRefreshTokens = async (code: string) => {
  return await axios
    .post(
      `${url}api/token`,
      querystring.stringify({
        ['grant_type']: 'authorization_code',
        code,
        ['redirect_uri']: redirectUri,
        ['client_id']: clientID,
        ['client_secret']: clientSecret
      }),
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }
    )
    .then((data): ServerResponseToken => data.data)
}

type CodeFromHashUrl = {
  code: string
}

const getCodeFromHashUrl = (): CodeFromHashUrl => {
  return window.location.search
    .substring(1)
    .split('&')
    .reduce((initial: any, item) => {
      const parts = item.split('=')
      initial[parts[0]] = parts[1]

      if (!('code' in initial)) return
      return initial
    }, {})
}

type SaveToken = {
  token: string
  refreshToken: string | undefined
  expires: number
}

const saveToken = ({
  token,
  refreshToken,
  expires
}: SaveToken): void => {
  Vue.$cookies.set(
    'token',
    { token, expires: Date.now() + expires * 1000 },
    Infinity
  )
  console.log('Токен установлен')
  Vue.$cookies.set('refresh_token', refreshToken, Infinity)
}

export const fetchToken = async () => {
  const { code } = getCodeFromHashUrl()
  if (!code) return

  const {
    access_token: token,
    refresh_token: refreshToken,
    expires_in: expires
  } = await getAccessAndRefreshTokens(code)

  saveToken({ token, refreshToken, expires })
}

export const fetchRefreshToken = async (refreshToken: string) => {
  const { access_token: token, expires_in: expires } = await axios
    .post(
      `${url}api/token`,
      querystring.stringify({
        ['grant_type']: 'refresh_token',
        ['refresh_token']: refreshToken,
        ['client_id']: clientID,
        ['client_secret']: clientSecret
      }),
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }
    )
    .then((data): ServerResponseToken => data.data)

  saveToken({ token, refreshToken, expires })
}

export async function tokenExpirationCheck() {
  console.log('check')
  const token = Vue.$cookies.get('token')
  const refreshToken = Vue.$cookies.get('refresh_token')
  if (!token || !refreshToken) {
    throw new Error('Token or refresh token not found')
  }

  if (Date.now() >= token.expires && token.expires) {
    console.log('yes', token.expires)
    fetchRefreshToken(refreshToken)
  }
}
