import { AuthService, LoginRequest } from '@root/client_sdk'
import { setSessionCookie } from '@root/client_sdk/request/cookie'
import { Button, message } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import FormItemCustom from '@/common/components/form/form-input'
import { InputPassword } from '@/common/components/input/input-password'
import { InputText } from '@/common/components/input/input-text'
import { pageList } from '@/common/helpers/page'

export const LoginContainer = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: { email: '', password: '' },
  })

  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const onLogin = async (data: LoginRequest) => {
    setLoading(true)
    try {
      const ret = await AuthService.login({
        requestBody: data,
      })
      setSessionCookie(ret)
      router.push(pageList.home.url)
    } catch (error: any) {
      message.error('Please enter your name, email address and password')
    }
    setLoading(false)
  }

  return (
    <>
      <div className="w-auto flex flex-col justify-center items-center h-screen">
        <div className="w-[360px] flex flex-col items-start">
          <div className="text-title">Login</div>
          <div className="text-sm-b mt-6">Email</div>
          <FormItemCustom
            errorCustom={errors.email?.message}
            className="w-full"
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Please enter your e-mail address',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Email address format is incorrect',
                },
              }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  name="email"
                  id="email"
                  value={value}
                  onChange={onChange}
                  placeholder="example@gmail.com"
                  className="!w-full !rounded-lg mt-1"
                />
              )}
            />
          </FormItemCustom>

          <div className="text-sm-b">Password</div>
          <FormItemCustom
            errorCustom={errors.password?.message}
            className="w-full"
          >
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Please enter your password',
              }}
              render={({ field: { value, onChange } }) => (
                <InputPassword
                  name="password"
                  id="password"
                  value={value}
                  onChange={onChange}
                  className="!w-full !rounded-lg mt-1"
                  type="password"
                />
              )}
            />
          </FormItemCustom>
          <div className="w-full text-center">
            <Button
              shape="round"
              type="primary"
              size={'large'}
              style={{
                borderRadius: '8px',
                fontSize: '14px',
                width: '100%',
                height: '44px',
                background: '#3D83AD',
                marginTop: '20px',
              }}
              onClick={handleSubmit(onLogin)}
              loading={loading}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
