import { Menu } from 'antd'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { ADMIN_SIDE_BAR_MENU, CLIENT_SIDE_BAR_MENU } from '@/common/constant'
import { useViewport } from '@/common/hooks/useViewport'

const AppHeader = dynamic(() => import('./app-header'), { ssr: false })

type Props = {
  noRightContentHeader?: boolean
  className?: string
}

const AppLayout = ({
  children,
}: React.PropsWithChildren<Props>): JSX.Element => {
  const [selectedKeys, setSelectedKeys] = useState(undefined)
  const { pathname } = useRouter()

  const [SIDE_BAR, setSideBar] = useState(ADMIN_SIDE_BAR_MENU)

  useEffect(() => {
    const role = Cookies.get('role')
    if (role === '4') {
      setSideBar(CLIENT_SIDE_BAR_MENU)
    }
  }, [])

  useEffect(() => {
    const index = SIDE_BAR.findIndex((m) => m.to === pathname)
    let key = undefined
    if (index >= 0) {
      key = [SIDE_BAR[index].key]
    }
    setSelectedKeys(key)
  }, [pathname])

  const { width } = useViewport()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (width > 890) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }, [width])

  return (
    <>
      <div className="w-full min-h-[100dvh]">
        <AppHeader email="test@gmail.com" />
        <div className="lg:w-full w-[100%] flex min-h-[calc(100dvh-41px)]">
          <Menu
            className="overflow-auto sideBar min-w-[70px] tablet:min-w-[200px]"
            style={{
              background: '#F5F8FF',
              boxShadow: '1px 0px 8.4px 0px rgba(124, 124, 124, 0.25)',
              padding: '40px 14px',
            }}
            selectedKeys={selectedKeys}
            inlineCollapsed={collapsed}
          >
            {SIDE_BAR.map((item) => (
              <Menu.Item icon={item.icon} key={item.key}>
                <Link href={item.to}>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
          <div className="w-full overflow-auto">{children}</div>
        </div>
        {/* <Footer></Footer> */}
      </div>
      <style jsx global>{`
        .sideBar .ant-menu-item {
          margin-top: 0px !important;
          margin-bottom: 16px !important;
          border-radius: 8px;
        }

        .ant-menu-item {
          display: flex;
          align-item: center;
        }

        .sideBar .ant-menu-item.ant-menu-item-selected {
          background-color: #2887f3 !important;
          color: white;
        }

        .ant-btn > span {
          display: inline-flex;
        }

        .ant-menu-item-selected a,
        .ant-menu-item-selected a:hover {
          color: white;
        }

        .ant-modal-body {
          border-radius: 8px;
        }

        .ant-modal-content {
          border-radius: 8px;
        }

        .ant-modal-header {
          border-radius: 8px 8px 0 0;
        }

        .ant-picker {
          border-radius: 8px !important;
        }

        @media (max-width: 1024px) {
          .ant-menu.ant-menu-inline-collapsed > .ant-menu-item {
            padding: 0 calc(40% - 8px) !important;
          }
        }
      `}</style>
    </>
  )
}

export default AppLayout
