import { WarningOutlined } from '@ant-design/icons'
import { Button, Modal, ModalProps } from 'antd'
import React, { useState } from 'react'

type ConfirmModalProps = ModalProps & {
  typeIcon?: 'warning' | 'done'
  title?: string
  content?: string
  open?: boolean
  onClose?: () => void
  onConfirm?: () => Promise<void>
}

const ConfirmModal = ({
  typeIcon,
  title = '確認する',
  content,
  open,
  onClose,
  onConfirm,
}: React.PropsWithChildren<ConfirmModalProps>) => {
  const [loading, setLoading] = useState(false)

  return (
    <Modal
      className="confirm-modal"
      closable={false}
      centered
      open={open}
      onCancel={onClose}
      title={null}
      footer={null}
      style={{
        boxShadow: 'inset 0 0 5px #999',
        background: '#2F6AA0',
      }}
    >
      <div className="flex flex-col">
        <div className="flex gap-1 items-center">
          {typeIcon === 'warning' ? (
            <WarningOutlined
              style={{
                color: '#FAAC51',
                fontSize: '26px',
              }}
            />
          ) : undefined}
          <div className="text-[24px] font-medium leading-6">{title}</div>
        </div>
        {content && <div className="my-10">{content}</div>}
        <div className="text-right mt-[30px] flex gap-3 justify-end">
          <Button
            shape="round"
            size={'large'}
            type="primary"
            danger
            style={{
              borderRadius: '8px',
              fontSize: '14px',
              width: '126px',
              height: '44px',
            }}
            onClick={onClose}
          >
            キャンセル
          </Button>
          <Button
            shape="round"
            type="primary"
            size={'large'}
            style={{
              borderRadius: '8px',
              fontSize: '14px',
              width: '126px',
              height: '44px',
            }}
            onClick={async () => {
              setLoading(() => true)
              await onConfirm()
              setLoading(() => false)
            }}
            loading={loading}
          >
            OK
          </Button>
        </div>
      </div>
      <style>
        {`
          .confirm-modal .ant-modal-content  {
            border-radius: 8px;
          }
        `}
      </style>
    </Modal>
  )
}

export default ConfirmModal
