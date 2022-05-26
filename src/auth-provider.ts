import { User } from 'screens/ProjectList/Search'

export interface LoginUserInfo {
	username: string
	password: string
}
const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
	window.localStorage.setItem(localStorageKey, user.token || '')
	return user
}
export const logout = async () => window.localStorage.removeItem(localStorageKey)

export const login = (data: LoginUserInfo) => {
	return fetch(`${apiUrl}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(async response => {
		if (response.ok) {
			return handleUserResponse(await response.json())
		} else {
			return Promise.reject(await response.json())
		}
	})
}

export const register = (data: LoginUserInfo) => {
	return fetch(`${apiUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(async response => {
		if (response.ok) {
			return handleUserResponse(await response.json())
		} else {
			return Promise.reject(await response.json())
		}
	})
}
