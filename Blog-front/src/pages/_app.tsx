/* eslint-disable no-console */
import 'styles/globals.css'
import 'styles/index.scss'
import 'nprogress/nprogress.css'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ReactElement, ReactNode } from 'react'
import { SWRDevTools } from 'swr-devtools'

export type NextPageWithLayout<P = any> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  pageProps: AppProps['pageProps'] & {
    // hydrationData: RootStoreHydration
  }
}

function MyApp({ Component, pageProps }: AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <SWRDevTools>{getLayout(<Component {...pageProps} />)}</SWRDevTools>
}

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

export default MyApp
