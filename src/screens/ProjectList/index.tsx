import qs from 'qs'
import { useEffect, useState } from 'react'
import { cleanObjectNotContainerZero } from 'utils'
import List, { Project } from './List'
import Search, { User, Params } from './Search'

const apiPrefix = process.env.REACT_APP_API_URL
export default function ProjectList() {
	const [params, setParams] = useState<Params>({
		name: ''
	})

	const [list, setList] = useState<Array<Project>>([])

	const [users, setUsers] = useState<Array<User>>([])
	useEffect(() => {
		fetch(`${apiPrefix}/users`).then(async res => {
			const u = await res.json()
			setUsers(u)
		})
	}, [])

	useEffect(() => {
		fetch(`${apiPrefix}/projects?${qs.stringify(cleanObjectNotContainerZero(params))}`).then(async res => {
			setList(await res.json())
		})
	}, [params])

	return (
		<div>
			<Search params={params} setParams={setParams} users={users}></Search>
			<List list={list} users={users}></List>
		</div>
	)
}
