import { useAuth } from 'context/auth-context'
import ProjectList from 'screens/ProjectList'

export default function AuthenticatedApp() {
	const { logout } = useAuth()
	return (
		<div>
			<ProjectList></ProjectList>
			<button onClick={() => logout()}>退出</button>
		</div>
	)
}
