import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea'
import clsx from 'clsx'

type Props = Omit<TextAreaProps, 'content'> & {
  canEdit?: boolean
  className?: string
}

const TextAreaComponent = ({
  canEdit = true,
  className,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      <TextArea
        {...props}
        className={clsx('textarea', className, {
          '!bg-white-1 !border-none !p-0': !canEdit,
        })}
        readOnly={!canEdit}
      />
      <style>
        {`
          textarea.ant-input {
            outline:0px !important;
            -webkit-appearance:none;
            box-shadow: none !important;
            border-radius: 8px !important;
          }
        `}
      </style>
    </>
  )
}

export default TextAreaComponent
