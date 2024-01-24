import { Select, SelectProps } from 'antd'
import clsx from 'clsx'

export type SelectTextProps = SelectProps & {
  className?: string
  size?: 'small' | 'middle' | 'large'
  height?: 'normal'
}
export function SelectComponent({
  className,
  height = 'normal',
  ...props
}: SelectTextProps) {
  return (
    <>
      <div className="select-component">
        <Select {...props} allowClear className={clsx('', className, {})} />
      </div>
      <style jsx global>
        {`
          .select-component .ant-select-selector {
            border-radius: 8px !important;
            height: ${clsx('', {
              '36px !important': height === 'normal',
            })};
          }
        `}
      </style>
    </>
  )
}
