import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'
export const useCityStore = defineStore('city', () => {
	const inputValue = ref('')
	const cityId = ref('')
	const provinceId = ref('')
	const setInputValue = (value) => {
		inputValue.value = value;
	}
	const setCityId = (value) => {
		cityId.value = value;
	}
	const setProvinceId = (value) => {
		provinceId.value = value;
	}
	return {
		inputValue,
		setInputValue,
		cityId,
		setCityId,
		provinceId,
		setProvinceId
	}
}, {
	persist: true
})