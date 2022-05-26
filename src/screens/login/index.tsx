import { FormEvent } from 'react'

interface User {
	username: string
	password: string
}
const apiPrefix = process.env.REACT_APP_API_URL

export const loginAuth = (params: User) => {
	fetch(`${apiPrefix}/login`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(params)
	}).then(async res => {
		const u = await res.json()
		console.log(u)
	})
}
export default function Login() {
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const username = (e.currentTarget.elements[0] as HTMLInputElement).value
		const password = (e.currentTarget.elements[1] as HTMLInputElement).value
		loginAuth({ username, password })
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">用户名</label>
				<input type="text" id="username" />
			</div>
			<div>
				<label htmlFor="password">密码</label>
				<input type="text" id="password" />
			</div>
			<div>
				<input type="submit" value="提交" />
			</div>
		</form>
	)
}
function body(arg0: string, headers: any, arg2: { 'Content-type': string }, body: any, arg4: string) {
	throw new Error('Function not implemented.')
}
