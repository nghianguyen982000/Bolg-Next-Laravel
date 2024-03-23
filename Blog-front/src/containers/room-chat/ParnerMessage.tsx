import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

type Props = {
  message: string
}

const ParnerMessage = ({ message }: Props) => {
  return (
    <div className="flex gap-4">
      <div>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
      <div className="border-dashed rounded border p-1">{message}</div>
    </div>
  )
}

export default ParnerMessage
