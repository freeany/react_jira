import { Rate } from 'antd'

interface PinProps extends React.ComponentProps<typeof Rate> {
	checked: boolean
	onChangeChecked?: (checked: boolean) => void
}
export default function Pin(props: PinProps) {
	const { checked, onChangeChecked = () => {} } = props
	return <Rate count={1} value={checked ? 1 : 0} onChange={value => onChangeChecked(!!value)} />
}
