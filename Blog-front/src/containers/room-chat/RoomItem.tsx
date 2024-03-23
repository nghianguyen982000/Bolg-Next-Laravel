import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  id: number
  roomName: string
}

const RoomItem = ({ id, roomName }: Props) => {
  const { push, query } = useRouter()

  return (
    <div
      className={`cursor-pointer  rounded p-1 line-clamp-1 hover:bg-pink-4 ${
        query.id === id.toString() ? 'bg-pink-4' : 'bg-yellow-2 '
      }`}
      onClick={() => push(`home?id=${id}`)}
    >
      Room Name {roomName}
    </div>
  )
}

export default RoomItem
