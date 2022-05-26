import { useEffect, useState } from 'react'
import { Person } from 'try-use-array'
const isFalsy = (value: unknown) => (value === '0' ? false : !value)
// 我们是否要把cleanObjectNotContainerZero这个函数写成hook呢？
// 其实是不需要的
// 自定义hook的内部是要有使用react内置的hook的。 而cleanObjectNotContainerZero内部并没有使用到内部的hook
// 如果一个函数我们需要使用react提供的自定义钩子，那么可以做一个自定义hook来方便复用。
export function cleanObjectNotContainerZero(obj: any) {
	const newObj = { ...obj }
	Object.keys(newObj).forEach((key: string) => {
		const v = newObj[key]
		if (isFalsy(v)) {
			delete newObj[key]
		}
	})
	return newObj
}

export function debounce(callback: Function, delay: number) {
	// 闭包
	let timeId: NodeJS.Timeout
	return (...params: any) => {
		if (timeId) {
			clearTimeout(timeId)
		}
		timeId = setTimeout(() => {
			callback(params)
		}, delay)
	}
}

export function useMount(callback: () => void) {
	useEffect(() => {
		callback()
	}, [])
}

// 对数组进行一些操作的hook
export function useArray<T>(intalState: T[]) {
	const [value, setValue] = useState(intalState)
	const add = (data: T) => {
		setValue([...value, data])
	}
	const clear = () => setValue([])
	const removeIndex = (index: number) => {
		const newValue = [...value]
		newValue.splice(index, 1)
		setValue(newValue)
	}
	return {
		value,
		clear,
		removeIndex,
		add
	}
}

// react hooks实现防抖
export function useDebounce<T>(value: T, delay: number) {
	const [debounceValue, setDebounceValue] = useState(value)
	useEffect(() => {
		const timeId = setTimeout(() => setDebounceValue(value), delay)
		// 当下次此useEffect的回调执行的时候，会执行return的这个函数。当value一直变化时，return的函数会一直执行， 所以定时器会一直被清理。
		return () => {
			clearTimeout(timeId)
		}
	}, [value, delay])

	return debounceValue
}
