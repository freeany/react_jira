import { Button, Drawer } from 'antd'

export default function CreateProject({ visible, onClose }: { visible: boolean; onClose: () => void }) {
	return (
		<Drawer title="创建项目" placement="right" onClose={onClose} visible={visible} width="100%">
			<h1>创建项目</h1>
			<Button onClick={onClose}>关闭</Button>
		</Drawer>
	)
}
