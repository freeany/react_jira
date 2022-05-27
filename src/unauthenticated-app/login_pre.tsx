import { FormEvent } from 'react'
import { useAuth } from 'context/auth-context'
export default function Login() {
	const { user, login } = useAuth()
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const username = (e.currentTarget.elements[0] as HTMLInputElement).value
		const password = (e.currentTarget.elements[1] as HTMLInputElement).value
		login({ username, password })
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>{user ? user.name : null}</div>
				<div>
					<label htmlFor="username">用户名</label>
					<input type="text" id="username" defaultValue={'jack'} />
				</div>
				<div>
					<label htmlFor="password">密码</label>
					<input type="text" id="password" defaultValue="123" />
				</div>
				<div>
					<input type="submit" value="提交" />
				</div>
			</form>
		</>
	)
}
