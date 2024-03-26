import Head from 'next/head'

import { pageList } from '@/common/helpers/page'
import AppLayout from '@/containers/app-layout'
import RoomChat from '@/containers/room-chat'

const Page = () => {
  return (
    <>
      <Head>
        <title>{pageList.home.text}</title>
      </Head>
      <RoomChat />
    </>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}

export default Page
