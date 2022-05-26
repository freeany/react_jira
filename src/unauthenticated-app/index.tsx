import { useState } from 'react'
import Login from './login'
import Register from './register'

export default function UnAuthenticated() {
	const [isRegister, setIsRegister] = useState(false)
	return (
		<div>
			{isRegister ? <Register></Register> : <Login></Login>}
			<button onClick={() => setIsRegister(!isRegister)}>切换</button>
		</div>
	)
}
