import styled from '@emotion/styled'
import { Table } from 'antd'
import dayjs from 'dayjs'
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
		></Table>
	)
}
