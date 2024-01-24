import Head from 'next/head'

import pageListAdmin from '@/common/helpers/page/admin'
import AppLayout from '@/containers/app-layout'

const Page = () => {
  return (
    <>
      <Head>
        <title>{pageListAdmin.adminHome.text}</title>
      </Head>
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}

export default Page
