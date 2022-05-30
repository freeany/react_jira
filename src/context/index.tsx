import { ReactNode } from 'react'
import AuthProvider from './auth-context'

// 为什么这里是AppProviders，加了s，说明未来可能有很多provider。
export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<>
			{/* 用户信息提供者，本来用户信息是放到redux中的，但是这里放到context中 */}
			<AuthProvider>{children}</AuthProvider>
		</>
	)
}
