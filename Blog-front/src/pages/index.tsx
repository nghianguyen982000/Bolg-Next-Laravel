import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppLayout from '@/containers/app-layout'

export default function Page() {
  return <>Home</>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
})

Page.getLayout = (page: React.ReactElement) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>{page}</AppLayout>
    </QueryClientProvider>
  )
}
