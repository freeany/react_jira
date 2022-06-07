import { Button, Dropdown, Menu, Table, TableProps } from 'antd'
import Pin from 'components/pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useEditProject } from 'utils/project'
import { User } from './Search'

export interface Project {
	id: number
	name: string
	personId: number
	pin: boolean
	organization: string
	created: number
}
interface TableType extends TableProps<Project> {
	retry: (() => void) | undefined
	users: User[]
	list: Project[]
	setProjectModelVisible: (visible: boolean) => void
}
export default function List({ users, list, retry, setProjectModelVisible, ...reset }: TableType) {
	const { editRun, ...editReset } = useEditProject()

	const changeChecked = (project: Project) => (checked: boolean) =>
		editRun({ id: project.id, pin: checked }).then(() => {
			if (retry) {
				console.log(12333)
				retry()
			}
		})

	return (
		<Table
			pagination={false}
			dataSource={list}
			columns={[
				{
					title: <Pin checked={false} disabled />,
					render(project) {
						// return <Pin checked={project.pin}  onChangeChecked={pin => editRun({...project, pin})}/>
						return <Pin checked={project.pin} onChangeChecked={changeChecked(project)} />
					}
				},
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
				},
				{
					title: '操作',
					key: 'operation',
					render(project) {
						return (
							<Dropdown
								overlay={
									<Menu>
										<Menu.Item>
											<Button type="link" onClick={() => setProjectModelVisible(true)}>
												编辑
											</Button>
										</Menu.Item>
									</Menu>
								}
							>
								<span>...</span>
							</Dropdown>
						)
					}
				}
			]}
			{...reset}
		></Table>
	)
}
