import { Table } from 'antd'
import { User } from './Search'

export interface Project {
	id: number
	name: string
	personId: number
	organization: string
	created: number
}

interface ListPanelProps {
	users: User[]
	list: Array<Project>
}

export default function List({ users, list }: ListPanelProps) {
	return (
		<Table
			pagination={false}
			dataSource={list}
			columns={[
				{
					title: '名称',
					dataIndex: 'name',
					key: 'name',
					sorter(a, b) {
						return a.name.localeCompare(b.name)
					}
				},
				{
					title: '负责人',
					key: 'personId',
					render(person) {
						return <span>{users.find(user => user.id === person.personId)?.name || '未知'}</span>
					}
				}
			]}
		></Table>
	)
}
