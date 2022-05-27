import { Button, Card } from 'antd'
import { useAuth } from 'context/auth-context'
import ProjectList from 'screens/ProjectList'

export default function AuthenticatedApp() {
	const { logout } = useAuth()
	return (
		<Card title="列表" style={{ width: 500 }}>
			<ProjectList></ProjectList>
			<Button danger onClick={() => logout()} style={{ marginTop: '2rem' }}>
				退出
			</Button>
		</Card>
	)
}
