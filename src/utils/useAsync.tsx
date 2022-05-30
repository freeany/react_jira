import { useState } from 'react'

export interface State<D> {
	error: Error | null
	data: D | null
	stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitalState: State<null> = {
	stat: 'idle',
	data: null,
	error: null
}

const defaultConfig = {
	throwOnError: false
}
// useAsync 封装了获取异步请求的状态， 只要将异步操作传递进来，那么该custom hook返回的数据有数据的状态和数据内容，在外面直接使用即可。
export function useAsync<D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) {
	const config = { ...defaultConfig, ...initialConfig }

	const [state, setState] = useState({
		...defaultInitalState,
		...initialState
	})

	const setData = (data: D) =>
		setState({
			stat: 'success',
			data,
			error: null
		})

	const setError = (error: Error) =>
		setState({
			stat: 'error',
			data: null,
			error
		})

	const run = (promise: Promise<D>) => {
		if (!promise || !promise.then) {
			throw new Error('请传入promise类型的参数')
		}

		setState({ ...state, stat: 'loading' })
		return promise
			.then(data => {
				setData(data)
				return data
			})
			.catch(error => {
				setError(error)
				if (config.throwOnError) return Promise.reject(error)
				return error
			})
	}

	return {
		isIdle: state.stat === 'idle',
		isLoading: state.stat === 'loading',
		isError: state.stat === 'error',
		isSuccess: state.stat === 'success',
		run,
		setData,
		setError,
		...state
	}
}
