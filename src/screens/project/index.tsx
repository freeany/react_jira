import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom'
import Epic from 'screens/epic'
import Kanban from 'screens/kanban'

export default function ProjectDetail() {
	return (
		<div>
			<h1>ProjectScreen</h1>
			<Link to="kanban">看板</Link>
			<Link to="epic">列表</Link>
			<Routes>
				<Route path="kanban" element={<Kanban />}></Route>
				<Route path="epic" element={<Epic />}></Route>
				<Route path="*" element={<Navigate to={'kanban'} replace />}></Route>
			</Routes>
		</div>
	)
}
