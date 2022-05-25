const isFalsy = (value: string) => (value === '0' ? false : !value)
export function cleanObjectNotContainerZero(obj: any) {
	const newObj = { ...obj }
	console.log(newObj, 'x')

	Object.keys(newObj).forEach((key: string) => {
		const v = newObj[key]
		if (isFalsy(v)) {
			delete newObj[key]
		}
	})
	console.log(newObj, 'y')
	return newObj
}
