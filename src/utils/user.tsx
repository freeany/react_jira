import { User } from 'screens/ProjectList/Search'
import { cleanObjectNotContainerZero, useMount } from 'utils'
import { useHttp } from './http'
import { useAsync } from './useAsync'

export const useUser = (param?: Partial<User>) => {
	const client = useHttp()
	const { run, ...result } = useAsync<User[]>()
	useMount(() => {
		// fetch(`${apiPrefix}/users`).then(async res => {
		// 	const u = await res.json()
		// 	setUsers(u)
		// })
		run(client('users', { data: cleanObjectNotContainerZero(param || {}) }))
	})

	return result
}
