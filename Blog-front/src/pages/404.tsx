import AppLayout from '@/containers/app-layout'
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-[30px] md:pt-[60px] pb-[100px] md:pb-[130px]">
      <h1 className="!text-pink-4 text-lg !font-bold  md:text-2xl leading-[36px] mb-10">
        404 Error.
      </h1>
    </div>
  )
}

NotFoundPage.getLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}
