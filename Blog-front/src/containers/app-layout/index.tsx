import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import React from 'react'

import { SocketProvider } from '@/common/hooks/SocketIoProvider'

const AppHeader = dynamic(() => import('./app-header'), { ssr: false })

type Props = {
  noRightContentHeader?: boolean
  className?: string
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
})

const AppLayout = ({
  children,
}: React.PropsWithChildren<Props>): JSX.Element => {
  return (
    <>
      <SocketProvider url={process.env.NEXT_PUBLIC_SOCKET_SERVER}>
        <QueryClientProvider client={queryClient}>
          <div className="w-full min-h-[100dvh]">
            <AppHeader email="test@gmail.com" />
            <div className="lg:w-full w-[100%] flex min-h-[calc(100dvh-41px)]">
              <div className="w-full overflow-auto">{children}</div>
            </div>
          </div>
        </QueryClientProvider>
      </SocketProvider>
    </>
  )
}

export default AppLayout
