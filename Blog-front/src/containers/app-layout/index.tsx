import dynamic from 'next/dynamic'
import React from 'react'

const AppHeader = dynamic(() => import('./app-header'), { ssr: false })

type Props = {
  noRightContentHeader?: boolean
  className?: string
}

const AppLayout = ({
  children,
}: React.PropsWithChildren<Props>): JSX.Element => {
  return (
    <>
      <div className="w-full min-h-[100dvh]">
        <AppHeader email="test@gmail.com" />
        <div className="lg:w-full w-[100%] flex min-h-[calc(100dvh-41px)]">
          <div className="w-full overflow-auto">{children}</div>
        </div>
      </div>
    </>
  )
}

export default AppLayout
