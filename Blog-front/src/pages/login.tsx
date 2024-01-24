import Head from 'next/head'

import pageListUser from '@/common/helpers/page/user'
import { LoginContainer } from '@/containers/login'

export default function Page() {
  return (
    <>
      <Head>
        <title>{pageListUser.login.text}</title>
      </Head>

      <LoginContainer />
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return <>{page}</>
}
