import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
type Props = {
  message: string
}
const MyMessage = ({ message }: Props) => {
  return (
    <div className="flex gap-4 justify-end pb-4">
      <div className="border-dashed rounded border p-1">{message}</div>
      <div>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </div>
  )
}

export default MyMessage
