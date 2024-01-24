import AppLayout from '@/containers/app-layout'

export default function Page() {
  return <>Home</>
}

Page.getLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}
