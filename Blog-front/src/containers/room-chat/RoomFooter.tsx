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
    <div className="bg-blue-1 p-2 flex-none flex items-end">
      <TextArea
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDownInput}
      />
      <Button
        disabled={message.replace(/\s{2,}/g, ' ').trim() === ''}
        className="!flex items-center"
        type="text"
        onClick={() => handleSendMessage(message)}
      >
        <SendOutlined />
      </Button>
    </div>
  )
}

export default RoomFooter
