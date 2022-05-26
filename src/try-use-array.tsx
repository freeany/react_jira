import { clear } from 'console'
import { useArray, useMount } from 'utils'

export interface Person {
	name: string
	age: number
}
export default function TsReactTest() {
	const persons: Person[] = [
		{ name: 'jack', age: 25 },
		{ name: 'ma', age: 22 }
	]
	const { value, clear, removeIndex, add } = useArray(persons)
	useMount(() => {
		// error
		// console.log(value.notExist)
		// error
		// add({name: 'john', age: 12})
		// error
		// removeIndex(1)
	})

	return (
		<div>
			{/* 期待： 点击以后增加john */}
			<button onClick={() => add({ name: 'john', age: 22 })}>add john</button>
			{/* 期待：点击以后删除第一项 */}
			<button onClick={() => removeIndex(0)}>remove 0</button>
			{/* 期待: 点击以后清空列表 */}
			<button style={{ marginBottom: '50px' }} onClick={() => clear()}>
				clear
			</button>
			{value.map((person, index) => (
				<div style={{ marginBottom: '30px' }} key={person.name + index}>
					<span style={{ color: 'red', marginRight: '20px' }}>{index}</span>
					<span style={{ marginRight: '20px' }}>{person.name}</span>
					<span>{person.age}</span>
				</div>
			))}
		</div>
	)
}
