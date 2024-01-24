import axios, { type AxiosError, type AxiosInstance } from 'axios'
import Router from 'next/router'

import pageListUser from '@/common/helpers/page/user'

import { clearSessionCookie, getCurrentAccessToken } from './cookie'

const defaultConfig = {
  timeout: 10000,
  withCredentials: true,
}

const addRequestInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: any) => {
      const configCp = { ...config }
      const accessToken = getCurrentAccessToken()
      if (!configCp.headers) {
        configCp.headers = {
          Authorization: '',
        }
      }
      if (accessToken) {
        configCp.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return configCp
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}
const getErrorCode = (error: AxiosError) => error?.response?.status
const addResponseInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (!axios.isAxiosError(error)) return error
      const httpErrCode = getErrorCode(error)
      if (httpErrCode === 401) {
        clearSessionCookie()
        Router.push(pageListUser.login.url)
      }
      return error
    },
  )
}
const createApiPjc = (config = defaultConfig) => {
  const instance = axios.create(config)
  addRequestInterceptors(instance)
  addResponseInterceptors(instance)
  return instance
}
/**
 * api with interceptors
 */
const apiPjc = createApiPjc()
export * from 'axios'
export default apiPjc
