import { LogoutOutlined } from '@ant-design/icons'
import {
  clearLocalStorage,
  clearSessionCookie,
  getCurrentAccount,
} from '@root/client_sdk/request/cookie'
import Router from 'next/router'

import pageListUser from '@/common/helpers/page/user'

type Props = {
  email: string
}

const AppHeader = ({}: React.PropsWithChildren<Props>): JSX.Element => {
  const account = getCurrentAccount()

  const onLogout = async () => {
    clearLocalStorage()
    clearSessionCookie()
    Router.push(pageListUser.login.url)
  }

  return (
    <>
      <div className="bg-black-3 text-white-1 py-2 px-5 flex flex-col md:flex-row justify-between">
        <div>Chat readtime</div>
        <div className="flex gap-3">
          <div>{account?.email || ''}</div>
          <div onClick={onLogout} className="cursor-pointer">
            <LogoutOutlined style={{ fontSize: '20px' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AppHeader
