import { User } from './Search'

export interface Project {
	id: number
	name: string
	personId: number
	organization: string
	created: number
}

interface ListPanelProps {
	users: Array<User>
	list: Array<Project>
}

export default function List({ users, list }: ListPanelProps) {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<td>名称</td>
						<td>负责人</td>
					</tr>
				</thead>
				<tbody>
					{list.map(p => {
						return (
							<tr key={p.id}>
								<td>{p.name}</td>
								<td>{users.find(user => user.id === p.personId)?.name || '王者'}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
