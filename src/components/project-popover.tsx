import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useState } from 'react'
import { useProject } from 'utils/project'
import { ButtonNoPadding } from './lib'

export default function ProjectPopover({ open }: { open: (visible: boolean) => void }) {
	const { data: projects, isLoading } = useProject()
	const pinnedProjects = projects?.filter(project => project.pin)
	const [popoverVisible, setPopoverVisible] = useState(false)
	const handleVisibleChange = (newVisible: boolean) => {
		setPopoverVisible(newVisible)
	}
	const handleCreateProject = () => {
		setPopoverVisible(false)
		open(true)
	}
	const content = (
		<ContentContainer>
			<Typography.Text type={'secondary'}>收藏项目</Typography.Text>
			<List>
				{pinnedProjects?.map(project => (
					<List.Item key={project.id}>
						<List.Item.Meta title={project.name} />
					</List.Item>
				))}
			</List>
			<Divider />
			<ButtonNoPadding onClick={handleCreateProject} type={'link'}>
				创建项目
			</ButtonNoPadding>
		</ContentContainer>
	)
	return (
		<Popover
			onVisibleChange={handleVisibleChange}
			visible={popoverVisible}
			placement="bottom"
			content={content}
			trigger="click"
		>
			<h2>项目</h2>
		</Popover>
	)
}

const ContentContainer = styled.div`
	min-width: 30rem;
`
