import { useEffect, useRef } from 'react'

export const useDoucumentTitle = (title: string, keepOnUnMount = true) => {
	// const oldTitle = document.title
	// useRef保证该变量在组件生命周期内保持不变。
	const oldTitle = useRef(document.title).current

	useEffect(() => {
		document.title = title
	}, [title]) // 故意没有添加依赖

	useEffect(() => {
		return () => {
			if (!keepOnUnMount) {
				// console.log(oldTitle,'oldTitle');
				// 我们这个作用就是： 当我从这个组件出去的时候，这个title变成原来的了，正如: 我轻轻的来，轻轻的走不带走一点云彩。
				document.title = oldTitle
			}
		}
	}, [keepOnUnMount, oldTitle]) // 故意没有添加依赖，故意让拿到的值不是最新鲜的
}
