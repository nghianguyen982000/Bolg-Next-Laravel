import { Input, InputProps } from 'antd'
import clsx from 'clsx'

export type InputPasswordProps = InputProps & {
  className?: string
  error?: boolean
  size?: 'small' | 'middle' | 'large'
}
export function InputPassword({
  className,
  error,
  size = 'small',
  ...props
}: InputPasswordProps) {
  return (
    <>
      <Input.Password
        {...props}
        status={error ? 'error' : ''}
        className={clsx('input-text-component relative', className, {
          '!h-9': size === 'small',
          '!h-10': size === 'middle',
        })}
      />
    </>
  )
}
