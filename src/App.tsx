import './App.css'
import { useAuth } from 'context/auth-context'
import UnAuthenticated from 'unauthenticated-app'
import AuthenticatedApp from 'authenticated-app'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib'

function App() {
	const { user } = useAuth()
	return (
		<div className="App">
			<ErrorBoundary fallbackRender={FullPageErrorFallback}>
				{/* <TryUseArray></TryUseArray> */}
				{user ? <AuthenticatedApp></AuthenticatedApp> : <UnAuthenticated></UnAuthenticated>}
			</ErrorBoundary>
		</div>
	)
}

export default App
