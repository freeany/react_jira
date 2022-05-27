import './App.css'
import { useAuth } from 'context/auth-context'
import UnAuthenticated from 'unauthenticated-app'
import AuthenticatedApp from 'authenticated-app'

function App() {
	const { user } = useAuth()
	return (
		<div className="App">
			{/* <TryUseArray></TryUseArray> */}
			{user ? <AuthenticatedApp></AuthenticatedApp> : <UnAuthenticated></UnAuthenticated>}
		</div>
	)
}

export default App
