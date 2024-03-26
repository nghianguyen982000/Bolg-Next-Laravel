import { TeamOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  id: number
  roomName: string
}

const RoomItem = ({ id, roomName }: Props) => {
  const { push, query } = useRouter()

  return (
    <div className="flex border-b-[#E9E9E9] border-b">
      <div
        className={`cursor-pointer grow flex items-center p-4 gap-2 hover:bg-[#ffffff] ${
          query.id === id.toString() ? 'bg-[#ffffff]' : 'bg-transparent'
        }`}
        onClick={() => push(`chat?id=${id}`)}
      >
        <Avatar shape="circle" icon={<TeamOutlined />} />
        <div className="line-clamp-1">{roomName}</div>
      </div>
      {query.id === id.toString() && (
        <div className="min-w-[4px] bg-[#82A6E7]"></div>
      )}
    </div>
  )
}

export default RoomItem
