import { useEffect } from 'react'
import { Project } from 'screens/ProjectList/List'
import { Params } from 'screens/ProjectList/Search'
import { cleanObjectNotContainerZero } from 'utils'
import { useHttp } from './http'
import { useAsync } from './useAsync'

export const useProject = (params?: Params) => {
	const client = useHttp()
	const { run, ...result } = useAsync<Project[]>()

	useEffect(() => {
		run(client('projects', { data: cleanObjectNotContainerZero(params) }))
	}, [params])

	return result
}
