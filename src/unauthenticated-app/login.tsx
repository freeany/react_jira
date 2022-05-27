import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'
import { LoginUserInfo } from 'auth-provider'
export default function Login() {
	const { login } = useAuth()
	function handleSubmit(values: LoginUserInfo) {
		login(values)
	}

	return (
		<Form
			onFinish={handleSubmit}
			initialValues={{ username: 'jack', password: '123' }}
			labelAlign="left"
			labelCol={{ span: 6 }}
		>
			<Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder="请输入用户名" />
			</Form.Item>
			<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
				<Input placeholder="请输入密码" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					登录
				</Button>
			</Form.Item>
		</Form>
	)
}
