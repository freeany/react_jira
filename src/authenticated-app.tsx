import styled from '@emotion/styled'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import ProjectList from 'screens/ProjectList'

export default function AuthenticatedApp() {
	return (
		<Container>
			<PageHeader></PageHeader>
			<ProjectList></ProjectList>
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
	return (
		<Dropdown overlay={MenuFn()}>
			<a onClick={e => e.preventDefault()}>
				<Space>
					{user ? `Hi, ${user.name}` : '登录'}
					<DownOutlined />
				</Space>
			</a>
		</Dropdown>
	)
}

const PageHeader = () => {
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
				<h2>项目</h2>
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
