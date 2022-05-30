import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'
import { LoginUserInfo } from 'auth-provider'
import { useAsync } from 'utils/useAsync'
export default function Login({ setError }: { setError: (error: Error) => void }) {
	const { login } = useAuth()
	const { run, isLoading: loading } = useAsync(undefined, { throwOnError: true })

	async function handleSubmit(values: LoginUserInfo) {
		try {
			await run(login(values))
		} catch (error) {
			setError(error as Error)
		}
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
				<Button loading={loading} type="primary" htmlType="submit">
					登录
				</Button>
			</Form.Item>
		</Form>
	)
}
