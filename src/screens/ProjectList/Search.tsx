export interface Params {
	name: string
	personId?: number
}

interface SearchPanelProps {
	users: User[]
	params: Params
	setParams: (param: SearchPanelProps['params']) => void
}

export interface User {
	id: number
	name: string
}

export default function Search({ users, params, setParams }: SearchPanelProps) {
	return (
		<form>
			<input
				type="text"
				value={params.name}
				onChange={(evt: any) =>
					setParams({
						...params,
						name: evt.target.value
					})
				}
			/>
			<select
				value={params.personId}
				onChange={(evt: any) =>
					setParams({
						...params,
						personId: evt.target.value
					})
				}
			>
				<option value={''}>负责人</option>
				{users.map(user => (
					<option key={user.id} value={user.id}>
						{user.name}
					</option>
				))}
			</select>
		</form>
	)
}
