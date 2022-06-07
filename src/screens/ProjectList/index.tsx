import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { cleanObjectNotContainerZero, useDebounce, useMount } from 'utils'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'
import { useUser } from 'utils/user'
import List, { Project } from './List'
import Search, { User, Params } from './Search'

const ProjectListStyle = styled.div`
	padding: 0 3.2rem;
	padding-top: 1rem;
`

export default function ProjectList({
	setProjectModelVisible
}: {
	setProjectModelVisible: (visible: boolean) => void
}) {
	// 如果不给params加useMemo，那么这里会造成循环更新，因为useDebounce中的useEffect依赖了params，当params变化的时候useEffect中的回调会执行，从而执行setDebounceValue， 当执行setDebounceValue的时候，整个组件会重新渲染，导致重新执行useUrlQueryParam， 而返回的值是一个新的值，就会导致preParams和nextParams不一样，从而useEffect的回调又重新执行，然后又执行setDebounceValue。整个组件又被重新刷新
	const [urlParamsState] = useState(['name', 'personId']) // 如果不用useState来创建这个变量的话，useMemo的依赖值加上keys，那么还会造成无限的re-render

	const [params, setParams] = useUrlQueryParam(urlParamsState)

	// 路由数据
	const debounceParams = useDebounce(params, 1000)

	// project的hook
	const {
		isLoading: loading,
		data: list,
		error,
		retry,
		setData,
		a,
		setA,
		b,
		setB
	} = useProject(debounceParams as Params)

	// user的hook
	const { data: users } = useUser()
	// console.log(retry,'retryretry');

	return (
		<ProjectListStyle>
			<Button onClick={() => setA([1, 2, Math.random()])}>{a}</Button>
			<Button onClick={() => setB(Math.random())}>555</Button>
			<Search
				params={params}
				setParams={setParams}
				users={users || []}
				setProjectModelVisible={(visible: boolean) => setProjectModelVisible(visible)}
			></Search>
			{error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
			<List
				setProjectModelVisible={(visible: boolean) => setProjectModelVisible(visible)}
				retry={retry}
				loading={loading}
				list={list || []}
				users={users || []}
			></List>
		</ProjectListStyle>
	)
}

ProjectList.whyDidYouRender = false
