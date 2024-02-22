import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'
// import {
// 	userGetInfoService
// } from '@/api/user'
// 用户模块token setToken removeToken
export const useUserStore = defineStore('user', () => {
	// const username = ref('')
	// const setUsername = (newUsername) => {
	// 	username.value = newUsername
	// }
	// const removeUsername = () => {
	// 	username.value = ''
	// }
	// const userId=ref('')
	const user = ref({})
	const getUser = async () => {
		const res = await userLoginService()
		user.value = res.data.data
	}
	const setUser = (obj) => (user.value = obj)
	return {
		// username,
		// setUsername,
		// removeUsername,
		user,
		getUser,
		setUser
	}
}, {
	persist: true
})