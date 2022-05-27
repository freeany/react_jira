import styled from '@emotion/styled'
import { Form, Input, Select } from 'antd'

export interface Params {
	name: string
	personId?: string
}

interface SearchPanelProps {
	users: User[]
	params: Params
	setParams: (param: SearchPanelProps['params']) => void
}

export interface User {
	id: number
	name: string
	email: string
	title: string
	organization: string
	token: string
}

export default function Search({ users, params, setParams }: SearchPanelProps) {
	return (
		<div style={{ marginBottom: '2rem' }}>
			<h2>项目列表</h2>
			<Form layout={'inline'} size="small">
				<Form.Item>
					<Input
						placeholder="项目名"
						value={params.name}
						onChange={e =>
							setParams({
								...params,
								name: e.target.value
							})
						}
					/>
				</Form.Item>
				<Form.Item>
					<Select
						style={{ width: 90 }}
						defaultValue=""
						onChange={value =>
							setParams({
								...params,
								personId: value
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
