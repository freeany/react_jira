import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { User } from './Search'

export interface Project {
	id: number
	name: string
	personId: number
	organization: string
	created: number
}
interface TableType extends TableProps<Project> {
	users: User[]
	list: Project[]
}
export default function List({ users, list, ...reset }: TableType) {
	return (
		<Table
			pagination={false}
			dataSource={list}
			columns={[
				{
					title: '名称',
					// dataIndex: 'name',
					render(a) {
						// 等价于 to={`${a.id}`} 因为此组件是在 /project路由下的。所以当在这个路由下跳转的时候，会自动加上/project
						return <Link to={`/project/${a.id}`}>{a.name}</Link>
					},
					key: 'name',
					sorter(a, b) {
						return a.name.localeCompare(b.name)
					}
				},
				{
					title: '组织',
					dataIndex: 'organization',
					key: 'organization'
				},
				{
					title: '负责人',
					key: 'personId',
					render(project) {
						return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
					}
				},
				{
					title: '创建时间',
					key: 'ownerId',
					render(project) {
						return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
					}
				}
			]}
			{...reset}
		></Table>
	)
}
