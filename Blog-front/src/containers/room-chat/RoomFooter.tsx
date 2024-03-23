import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'
const { TextArea } = Input

const RoomFooter = () => {
  return (
    <div className="bg-blue-1 p-2 flex-none flex items-end">
      <TextArea rows={4} />
      <Button className="!flex items-center" type="text">
        <SendOutlined />
      </Button>
    </div>
  )
}

export default RoomFooter
