import { useAuth } from '@/context'
import { Button, Form, Input } from 'antd'

import './style.less'

interface IForm {
  password: string
}

const Login = () => {
  const { login } = useAuth()
  const onFinish = (values: IForm) => {
    login(values)
  }

  return (
    <div className="login-page">
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            }
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
