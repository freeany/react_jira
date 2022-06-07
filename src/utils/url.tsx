import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObjectNotContainerZero } from 'utils'

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
	const [searchParams, setSearchParams] = useSearchParams()
	// keys, searchParams都是引用数据类型，但是他们被react进行管理了，所以不会造成preObj !== nextObj, 从而不会造成无限循环。
	return [
		useMemo(
			() =>
				keys.reduce((prev: {}, key) => {
					return { ...prev, [key]: searchParams.get(key) || '' }
				}, {} as { [key in K]: string }),
			[keys, searchParams]
		),
		(params: Partial<{ [key in K]: unknown }>) => {
			const o = cleanObjectNotContainerZero({
				...Object.fromEntries(searchParams),
				...params
			}) as URLSearchParamsInit
			return setSearchParams(o)
		}
	] as const
}
