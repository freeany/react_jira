import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'
import { LoginUserInfo } from 'auth-provider'
import { useAsync } from 'utils/useAsync'
interface RegisterUserInfo extends LoginUserInfo {
	cpassword: string
}

export default function Register({ setError }: { setError: (error: Error) => void }) {
	const { register } = useAuth()
	const { run, isLoading: loading } = useAsync()
	async function handleSubmit({ cpassword, ...values }: RegisterUserInfo) {
		if (cpassword !== values.password) {
			setError(new Error('确认密码错误'))
			return
		}
		try {
			await run(register(values))
		} catch (error) {
			setError(error as Error)
		}
	}
	return (
		<Form onFinish={handleSubmit} labelAlign="left" labelCol={{ span: 6 }}>
			<Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder="请输入用户名" />
			</Form.Item>
			<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
				<Input placeholder="请输入密码" />
			</Form.Item>
			<Form.Item label="确认密码" name="cpassword" rules={[{ required: true, message: '请输入确认密码' }]}>
				<Input placeholder="请输入确认密码" />
			</Form.Item>
			<Form.Item>
				<Button loading={loading} type="primary" htmlType="submit">
					注册
				</Button>
			</Form.Item>
		</Form>
	)
}
