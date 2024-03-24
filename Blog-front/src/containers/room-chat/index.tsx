import { ChatService } from '@root/client_sdk'
import { getCurrentAccount } from '@root/client_sdk/request/cookie'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useSocket } from '@/common/hooks/SocketIoProvider'

import MyMessage from './MyMessage'
import ParnerMessage from './ParnerMessage'
import RoomFooter from './RoomFooter'
import RoomHead from './RoomHead'
import RoomItem from './RoomItem'

const RoomChat = () => {
  const { query } = useRouter()
  const roomId = query.id
  const userId = getCurrentAccount()?.id ?? ''
  const [message, setMessage] = useState<string>('')
  const queryClient = useQueryClient()
  const socket = useSocket()

  const { data: rooms } = useQuery({
    queryKey: ['list-rooms'],
    queryFn: async () => {
      const res = await ChatService.getConversations()
      return res
    },
  })

  const { data: detail } = useQuery({
    queryKey: ['detai-room', roomId],
    queryFn: async () => {
      const res = await ChatService.getInfoConversation({
        id: Number(roomId),
      })
      return res
    },
    enabled: !!roomId,
  })

  const { data: messages } = useQuery({
    queryKey: ['list-messages', roomId],
    queryFn: async () => {
      const res = await ChatService.getMessageConversation({
        id: Number(roomId),
      })
      return res
    },
    enabled: !!roomId,
  })

  useEffect(() => {
    if (socket && roomId) {
      socket.on('connect', () => {
        console.log('Connected to server')
      })
      socket.on(`laravel_database_chat:message.${roomId}`, (data) => {
        if (data.user_id !== userId) {
          queryClient.setQueryData(
            ['list-messages', roomId],
            (oldData: {
              success?: boolean
              data?: {
                id?: number
                message?: string
                messageType?: number
              }[]
            }) => {
              return {
                ...oldData,
                data: [
                  ...(oldData?.data ?? []),
                  {
                    id: data.id,
                    message: data.content,
                    messageType: 1,
                  },
                ],
              }
            },
          )
        }
      })
      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.io server')
      })
    }
  }, [socket, roomId])

  const handleSendMessage = (messageSend: string) => {
    ChatService.createConversation({
      id: Number(roomId),
      requestBody: {
        content: messageSend,
      },
    }).then((res) => {
      setMessage('')
      queryClient.setQueryData(
        ['list-messages', roomId],
        (oldData: {
          success?: boolean
          data?: {
            id?: number
            message?: string
            messageType?: number
          }[]
        }) => {
          return {
            ...oldData,
            data: [...(oldData?.data ?? []), res.data],
          }
        },
      )
    })
  }

  return (
    <div className="flex justify-center">
      <div className="flex w-[1000px] h-[800px] bg-yellow-2 border ">
        <div className="w-[200px] bg-green-1 p-2 flex flex-col gap-2">
          {rooms?.data?.map((item) => {
            return (
              <RoomItem id={item.id} roomName={item.room_name} key={item.id} />
            )
          })}
        </div>
        <div className="w-full flex flex-col">
          <RoomHead roomName={detail?.data?.room_name ?? ''} />
          <div
            className="bg-white-1 grow  p-2 h-[600px] overflow-y-auto flex flex-col-reverse "
            id="scrollableDiv"
          >
            {messages?.data && (
              <InfiniteScroll
                dataLength={messages?.data.length}
                next={() => {
                  console.log('first')
                }}
                hasMore={false}
                inverse
                className="flex flex-col-reverse"
                style={{
                  overflow: 'inherit',
                }}
                loader={<h4>Loading</h4>}
                scrollableTarget="scrollableDiv"
              >
                {messages?.data
                  ?.slice()
                  .reverse()
                  .map((message) => {
                    if (message?.messageType === 0) {
                      return (
                        <MyMessage message={message.message} key={message.id} />
                      )
                    } else {
                      return (
                        <ParnerMessage
                          message={message.message}
                          key={message.id}
                        />
                      )
                    }
                  })}
              </InfiniteScroll>
            )}
          </div>
          <RoomFooter
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default RoomChat
