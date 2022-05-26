import * as auth from 'auth-provider'
import React, { ReactNode, useState } from 'react'
import { User } from 'screens/ProjectList/Search'
import { useMount } from 'utils'
import { http } from 'utils/http'
const AuthContext = React.createContext<
	| {
			user: User | null
			login: (form: auth.LoginUserInfo) => Promise<void>
			register: (form: auth.LoginUserInfo) => Promise<void>
			logout: () => Promise<void>
	  }
	| undefined
>(undefined)

export const bootstrapUser = async () => {
	let user = null
	const token = auth.getToken()
	if (token) {
		const data = await http('me', { token })
		user = data.user
	}
	return user
}

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const login = (form: auth.LoginUserInfo) => auth.login(form).then(data => setUser(data))
	const register = (form: auth.LoginUserInfo) => auth.register(form).then(data => setUser(data))
	const logout = () =>
		auth.logout().then(() => {
			setUser(null)
		})
	useMount(() => {
		bootstrapUser().then(setUser)
	})
	return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth必须在AuthProvider中展示')
	}
	return context
}
