// import { UserEntity } from 'client_sdk/models/UserEntity'
import Cookies from 'js-cookie'

// import { type any } from '../models/any'

export type CookieType = {
  role?: number
  NEXT_LOCALE?: string
  client_redirect?: string
}

export const COOKIE_KEY = {
  role: 'role',
  redirect_client: 'redirect_client',
  NEXT_LOCALE: 'NEXT_LOCALE',
}

export const LOCAL_STORAGE_KEY = {
  account: 'account',
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  role: 'role',
}

export const setLocalStorage = (result: any) => {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.setItem(LOCAL_STORAGE_KEY.account, JSON.stringify(result.user))
  localStorage.setItem(
    LOCAL_STORAGE_KEY.role,
    JSON.stringify(result.user.role_id),
  )
  localStorage.setItem(LOCAL_STORAGE_KEY.access_token, result.access_token)
  localStorage.setItem(LOCAL_STORAGE_KEY.refresh_token, result.refreshToken)
}

export const setLocalStorageRefreshTokenApi = (result: any) => {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.setItem(LOCAL_STORAGE_KEY.account, JSON.stringify(result.user))
  localStorage.setItem(
    LOCAL_STORAGE_KEY.role,
    JSON.stringify(result.user.role_id),
  )
  localStorage.setItem(LOCAL_STORAGE_KEY.access_token, result.accessToken)
  localStorage.setItem(LOCAL_STORAGE_KEY.refresh_token, result.refreshToken)
}

export const setSessionCookie = (result: any) => {
  setLocalStorage(result)
  if (result.user.role_id) {
    Cookies.set(COOKIE_KEY.role, String(result.user.role_id))
    return
  }
}

export const setSessionCookieRefreshTokenApi = (result: any) => {
  setLocalStorageRefreshTokenApi(result)
  if (result.user.role_id) {
    Cookies.set(COOKIE_KEY.role, String(result.user.role_id))
    return
  }
}

export const clearLocalStorage = () => {
  if (typeof window === 'undefined') {
    return
  }
  Object.keys(LOCAL_STORAGE_KEY).forEach((key) => localStorage.removeItem(key))
}

export const clearSessionCookie = () => {
  Object.keys(COOKIE_KEY).forEach((key) => Cookies.remove(key))
  clearLocalStorage()
}

export function setCurrentAccount(req: any | null): any {
  if (typeof window === 'undefined') {
    return null
  }
  localStorage.setItem(LOCAL_STORAGE_KEY.account, JSON.stringify(req.user))
}

export function getCurrentRole(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem(COOKIE_KEY.role) || null
}

export function getCurrentAccount(): any | null {
  if (typeof window === 'undefined') {
    return null
  }
  const account = localStorage.getItem(LOCAL_STORAGE_KEY.account)
  if (!account || account === 'undefined') return null
  return JSON.parse(account)
}

export function getCurrentAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem(LOCAL_STORAGE_KEY.access_token) || null
}

export function getCurrentRefreshToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem(LOCAL_STORAGE_KEY.refresh_token) || null
}

export function setAccountLocalStorage(user: any): any {
  if (typeof window === 'undefined') {
    return null
  }
  localStorage.setItem(LOCAL_STORAGE_KEY.account, JSON.stringify(user))
}
