import { useEffect, useState } from 'react'

export default function Test() {
	const [num, setNum] = useState(0)
	const add = () => setNum(num + 1)

	useEffect(() => {
		let id = setInterval(() => {
			console.log('num in setInterval: ', num)
		}, 1000)
		return () => clearInterval(id)
	}, [])

	useEffect(() => {
		return () => {
			console.log(num) // 打印的永远是0，因为闭包的问题。
		}
	}, [])

	return (
		<div>
			<button onClick={add}>num+1</button>
			<h2>{num}</h2>
		</div>
	)
}

function test() {
	let num = 0
	const effect = () => {
		return function unmount() {
			num += 1
			console.log(num)
		}
	}
	return effect
}

const add = test()
const unmount = add()

add()
add()
add()

unmount() // 打印1 因为闭包
