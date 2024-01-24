import { Input, InputProps } from 'antd'
import clsx from 'clsx'

export type InputTextProps = InputProps & {
  className?: string
  error?: boolean
  size?: 'small' | 'middle' | 'large'
}
export function InputText({
  className,
  error,
  size = 'small',
  ...props
}: InputTextProps) {
  return (
    <>
      <div>
        <Input
          {...props}
          status={error ? 'error' : ''}
          className={clsx('input-text-component relative', className, {
            '!h-9': size === 'small',
            '!h-10': size === 'middle',
          })}
        />
      </div>
      <style jsx global>
        {``}
      </style>
    </>
  )
}
