import qs from 'qs'
import { useEffect, useState } from 'react'
import { cleanObjectNotContainerZero, useDebounce } from 'utils'
import List, { Project } from './List'
import Search, { User, Params } from './Search'

const apiPrefix = process.env.REACT_APP_API_URL
export default function ProjectList() {
	// 查询参数
	const [params, setParams] = useState<Params>({
		name: ''
		// personId: ''
	})

	// 列表数据
	const [list, setList] = useState<Array<Project>>([])
	// 查询用户列表
	const [users, setUsers] = useState<Array<User>>([])

	const debounceParams = useDebounce(params, 2000)

	useEffect(() => {
		fetch(`${apiPrefix}/users`).then(async res => {
			const u = await res.json()
			setUsers(u)
		})
	}, [])

	useEffect(() => {
		fetch(`${apiPrefix}/projects?${qs.stringify(cleanObjectNotContainerZero(debounceParams))}`).then(async res => {
			setList(await res.json())
		})
	}, [debounceParams])

	return (
		<div>
			<Search params={params} setParams={setParams} users={users}></Search>
			<List list={list} users={users}></List>
		</div>
	)
}
