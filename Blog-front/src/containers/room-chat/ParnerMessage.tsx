import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { format } from 'date-fns'

type Props = {
  message: string
  createdAt: string
  userName: string
}

const ParnerMessage = ({ message, createdAt, userName }: Props) => {
  return (
    <div className="flex gap-4  pb-4">
      <div>
        <Avatar size="default" icon={<UserOutlined />} />
      </div>
      <div>
        <div className="text-[9px]">{userName}</div>
        <div className="border-dashed rounded bg-[#ECECEC] p-3">{message}</div>
        <div className="text-[10px]">
          {format(createdAt, 'yyyy-MM-dd HH:mm')}
        </div>
      </div>
    </div>
  )
}

export default ParnerMessage
