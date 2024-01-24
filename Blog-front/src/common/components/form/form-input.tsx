import type { FormItemProps } from 'antd'
import { Form } from 'antd'
import cls from 'clsx'
import React from 'react'

type FormItemCustomProps = FormItemProps & {
  errorCustom?: string
  classNameError?: string
  classNameMain?: string
}

const FormItemCustom: React.FC<FormItemCustomProps> = ({
  children,
  className,
  errorCustom,
  classNameError,
  classNameMain,
  ...rest
}) => {
  return (
    <Form.Item
      help={
        <div>
          {!!errorCustom && (
            <div
              style={{ paddingTop: '4px', fontSize: '12px', marginBottom: '0' }}
              className={`alert p-0 ${classNameError}`}
            >
              {errorCustom}
            </div>
          )}
        </div>
      }
      // validateStatus={!errorCustom ? '' : 'error'}
      className={cls(`${className} ${classNameMain}`)}
      {...rest}
    >
      {children}
    </Form.Item>
  )
}

export default FormItemCustom
