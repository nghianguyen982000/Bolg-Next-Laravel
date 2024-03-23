import React from 'react'

import MyMessage from './MyMessage'
import ParnerMessage from './ParnerMessage'
import RoomFooter from './RoomFooter'
import RoomHead from './RoomHead'
import RoomItem from './RoomItem'

type Message = {
  id: number
  message: string
  messageType: string
}

const listMessage: Message[] = [
  {
    id: 1,
    message:
      'bsdjkg asdf fsduif sad fhasdiuf sdaf sdufi  fasd fsd oujop fjasdo pf fasd ffasd f sdaf asdf asdf asdf sdafsdafas fds  ',
    messageType: '0',
  },
  {
    id: 1,
    message:
      'bsdjkg asdf fsduif sad fhasdiuf sdaf sdufi  fasd fsd oujop fjasdo pf ',
    messageType: '1',
  },
  {
    id: 1,
    message:
      'bsdjkg asdf fsduif sad fhasdiuf sdaf sdufi  fasd fsd oujop fjasdo pf ',
    messageType: '0',
  },
  {
    id: 1,
    message:
      'bsdjkg asdf fsduif sad fhasdiuf sdaf sdufi  fasd fsd oujop fjasdo pf ',
    messageType: '1',
  },
  {
    id: 1,
    message:
      'bsdjkg asdf fsduif sad fhasdiuf sdaf sdufi  fasd fsd oujop fjasdo pf ',
    messageType: '0',
  },
]

const RoomChat = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-[1000px] h-[800px] bg-yellow-2 bor">
        <div className="w-[200px] bg-green-1 p-2 flex flex-col gap-2">
          {[1, 2, 3, 4, 5].map((item) => {
            return <RoomItem id={item} roomName={item.toString()} key={item} />
          })}
        </div>
        <div className="w-full flex flex-col">
          <RoomHead />
          <div className="bg-white-1 grow flex flex-col gap-4">
            {listMessage.map((message) => {
              if (message.messageType === '0') {
                return <MyMessage message={message.message} key={message.id} />
              } else {
                return (
                  <ParnerMessage message={message.message} key={message.id} />
                )
              }
            })}
          </div>
          <RoomFooter />
        </div>
      </div>
    </div>
  )
}

export default RoomChat
