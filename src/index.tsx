import ReactDOM from 'react-dom/client'
import { DevTools, loadServer } from 'jira-dev-tool'
import 'antd/dist/antd.less'
import { AppProviders } from 'context'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// React.StrictMode
loadServer(() =>
	root.render(
		<AppProviders>
			<DevTools />
			<App />
		</AppProviders>
	)
)
