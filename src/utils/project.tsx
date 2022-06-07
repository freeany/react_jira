import { useEffect, useMemo } from 'react'
import { Project } from 'screens/ProjectList/List'
import { Params } from 'screens/ProjectList/Search'
import { cleanObjectNotContainerZero } from 'utils'
import { useHttp } from './http'
import { useUrlQueryParam } from './url'
import { useAsync } from './useAsync'

export const useProject = (params?: Params) => {
	const client = useHttp()
	const { run, ...result } = useAsync<Project[]>()

	let runProject = () => client('projects', { data: cleanObjectNotContainerZero(params) })
	useEffect(() => {
		run(runProject(), {
			run: runProject
		})
	}, [params])

	console.log(result, 'resultresult')

	return result
}

// 编辑项目
export const useEditProject = () => {
	const client = useHttp()
	const { run, ...reset } = useAsync()

	const editRun = (params: Partial<Project>) => {
		return run(
			client(`projects/${params.id}`, {
				data: params,
				method: 'PATCH'
			})
		)
	}

	return {
		editRun,
		...reset
	}
}
