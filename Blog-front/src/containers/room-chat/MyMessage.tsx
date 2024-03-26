import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { format } from 'date-fns'

type Props = {
  message: string
  createdAt: string
}
const MyMessage = ({ message, createdAt }: Props) => {
  return (
    <div className="flex gap-4 justify-end pb-4">
      <div className="flex  flex-col items-end">
        <div className="border-dashed rounded bg-[#D9E5F4] p-3">{message}</div>
        <div className="text-[10px] ">
          {format(createdAt, 'yyyy-MM-dd HH:mm')}
        </div>
      </div>
      <div>
        <Avatar size="default" icon={<UserOutlined />} />
      </div>
    </div>
  )
}

export default MyMessage
