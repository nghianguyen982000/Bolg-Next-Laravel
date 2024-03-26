import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { Dispatch, KeyboardEvent, SetStateAction } from 'react'
const { TextArea } = Input

type Props = {
  handleSendMessage: (message: string) => void
  message: string
  setMessage: Dispatch<SetStateAction<string>>
}

const RoomFooter = ({ handleSendMessage, message, setMessage }: Props) => {
  const handleKeyDownInput = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === 'Enter' &&
      event.shiftKey &&
      !(message.replace(/\s{2,}/g, ' ').trim() === '')
    ) {
      event.preventDefault()
      handleSendMessage(message)
    }
  }
  return (
    <div className="border-t-[#E9E9E9] border-t p-5 flex-none flex items-center ">
      <TextArea
        placeholder="Type your message here"
        value={message}
        autoSize
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDownInput}
        className="textarea-custom"
      />
      <Button
        shape="circle"
        disabled={message.replace(/\s{2,}/g, ' ').trim() === ''}
        className="!flex items-center justify-center"
        type="text"
        size="large"
        onClick={() => handleSendMessage(message)}
      >
        <SendOutlined />
      </Button>
    </div>
  )
}

export default RoomFooter
