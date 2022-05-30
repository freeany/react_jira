import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useEffect, useState } from 'react'
import { cleanObjectNotContainerZero, useDebounce, useMount } from 'utils'
import { useProject } from 'utils/project'
import { useUser } from 'utils/user'
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
	// const [list, setList] = useState<Array<Project>>([])
	// 查询用户列表
	// // 表格loading效果
	// const [loading, setLoading] = useState<boolean>(false)
	// // 出错效果
	// const [error, setError] = useState<null | Error>(null)

	// 都封装起来了
	// const { isLoading: loading, data: list, error} = useAsync<Project[]>()

	const debounceParams = useDebounce(params, 200)
	// project的hook
	const { isLoading: loading, data: list, error } = useProject(debounceParams)

	// user的hook
	const { data: users } = useUser()
	// 清晰明了
	// useMount(() => {
	// 	// fetch(`${apiPrefix}/users`).then(async res => {
	// 	// 	const u = await res.json()
	// 	// 	setUsers(u)
	// 	// })
	// 	client('users').then(setUsers)
	// })

	// useEffect(() => {
	// 	// 第一次注释
	// 	// fetch(`${apiPrefix}/projects?${qs.stringify(cleanObjectNotContainerZero(debounceParams))}`).then(async res => {
	// 	// 	setList(await res.json())
	// 	// })

	// 	// 第二次注释
	// 	// setLoading(true)
	// 	// client('projects', { data: cleanObjectNotContainerZero(debounceParams) })
	// 	// 	.then(setList)
	// 	// 	.catch((error) => {
	// 	// 		setError(error)
	// 	// 		setList([])
	// 	// 	})
	// 	// 	.finally(() => {
	// 	// 		setLoading(false)
	// 	// 	})
	// 	// 第三次注释
	// 	run(client('projects', { data: cleanObjectNotContainerZero(debounceParams) }))
	// }, [debounceParams])
	// const error1:any = {}
	return (
		<ProjectListStyle>
			<Search params={params} setParams={setParams} users={users || []}></Search>
			{error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
			<List loading={loading} list={list || []} users={users || []}></List>
		</ProjectListStyle>
	)
}
