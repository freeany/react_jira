import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { cleanObjectNotContainerZero, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import List, { Project } from './List'
import Search, { User, Params } from './Search'

const ProjectListStyle = styled.div`
	padding: 0 3.2rem;
	padding-top: 1rem;
`

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

	const debounceParams = useDebounce(params, 200)
	const client = useHttp()

	useMount(() => {
		// fetch(`${apiPrefix}/users`).then(async res => {
		// 	const u = await res.json()
		// 	setUsers(u)
		// })
		client('users').then(setUsers)
	})

	useEffect(() => {
		// fetch(`${apiPrefix}/projects?${qs.stringify(cleanObjectNotContainerZero(debounceParams))}`).then(async res => {
		// 	setList(await res.json())
		// })
		client('projects', { data: cleanObjectNotContainerZero(debounceParams) }).then(setList)
	}, [debounceParams])
	return (
		<ProjectListStyle>
			<Search params={params} setParams={setParams} users={users}></Search>
			<List list={list} users={users}></List>
		</ProjectListStyle>
	)
}
