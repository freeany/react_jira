import { Button, Form, Input, Select } from 'antd'
import { Row } from 'components/lib'
import { Project } from './List'

export interface Params {
	name?: string
	personId?: string
}

interface SearchPanelProps {
	users: User[]
	params: Partial<Pick<Project, 'name' | 'personId'>>
	setParams: (param: SearchPanelProps['params']) => void
	setProjectModelVisible: (visible: boolean) => void
}

export interface User {
	id: number
	name: string
	email: string
	title: string
	organization: string
	token: string
}
// ({setProjectModelVisible}: {})
export default function Search({ users, params, setParams, setProjectModelVisible }: SearchPanelProps) {
	const createProject = () => {
		setProjectModelVisible(true)
	}
	return (
		<div style={{ marginBottom: '2rem' }}>
			<Row between={true} marginBottom={1}>
				<h2>项目列表</h2>
				<Button onClick={createProject}>创建项目</Button>
			</Row>
			<Form layout={'inline'} size="small">
				<Form.Item>
					<Input
						placeholder="项目名"
						value={params.name}
						onChange={e => {
							setParams({
								...params,
								name: e.target.value
							})
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Select
						style={{ width: 90 }}
						defaultValue=""
						onChange={value =>
							setParams({
								...params,
								personId: Number(value)
							})
						}
					>
						<Select.Option value="">负责人</Select.Option>
						{users.map(user => (
							<Select.Option key={user.id} value={user.id}>
								{user.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</div>
	)
}
