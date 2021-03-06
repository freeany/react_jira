import styled from '@emotion/styled'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import ProjectList from 'screens/ProjectList'
// import { } from 'react-'
import Test from './hook和闭包'
import { useDoucumentTitle } from 'utils/index'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import ProjectDetail from 'screens/project'
import { useUrlQueryParam } from 'utils/url'
import { useState } from 'react'
import CreateProject from 'components/createProject'
import ProjectPopover from 'components/project-popover'

import { useUpdateEffect } from 'utils/index'
export default function AuthenticatedApp() {
	useDoucumentTitle('项目管理', false)
	const [projectModelVisible, setProjectModelVisible] = useState(false)
	return (
		<Container>
			<PageHeader setProjectModelVisible={(visible: boolean) => setProjectModelVisible(visible)}></PageHeader>
			{/* <Button onClick={() => setProjectModelVisible(true)}>打开</Button> */}
			<Router>
				<Routes>
					<Route
						path="/project-list"
						element={<ProjectList setProjectModelVisible={(visible: boolean) => setProjectModelVisible(visible)} />}
					></Route>
					<Route path={`/project/:id/*`} element={<ProjectDetail />}></Route>
					{/* <Navigate to={"/project-list"} /> */}
					<Route path="*" element={<Navigate to={'/project-list'} replace />}></Route>
				</Routes>
			</Router>
			{/* <Test></Test> */}
			<CreateProject visible={projectModelVisible} onClose={() => setProjectModelVisible(false)}></CreateProject>
		</Container>
	)
}

const MenuFn = () => {
	const { logout } = useAuth()
	return (
		<Menu
			items={[
				{
					key: 'logout',
					label: (
						<Button type={'link'} onClick={() => logout()}>
							退出
						</Button>
					)
				}
			]}
		/>
	)
}

const User = () => {
	const { user } = useAuth()
	const [dep, setDep] = useState(1)
	useUpdateEffect(() => console.log(dep), [dep])
	setTimeout(() => {
		setDep(2)
	}, 2000)
	return (
		<Dropdown overlay={MenuFn()}>
			{/* <a onClick={e => e.preventDefault()}> */}
			<Button type={'link'}>
				<Space>
					{user ? `Hi, ${user.name}` : '登录'}
					<DownOutlined />
				</Space>
			</Button>
			{/* </a> */}
		</Dropdown>
	)
}

const PageHeader = ({ setProjectModelVisible }: { setProjectModelVisible: (visible: boolean) => void }) => {
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
				{/* <h2>项目</h2> */}
				<ProjectPopover open={setProjectModelVisible}></ProjectPopover>
				<h2>用户</h2>
			</HeaderLeft>
			<HeaderRight>
				<User></User>
			</HeaderRight>
		</Header>
	)
}

// temporal dead zone(暂时性死区)
const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem 1fr;
	height: 100vh;
`

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
	padding: 0 3.2rem;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
