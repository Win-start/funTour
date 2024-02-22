import request from '@/utils/request'

//获取搜索数据
export const userGetScenic = (keyword) => {
	return request.get('/scenic/search', {
		params: {
			keyword: keyword
		}
	});
};
//获取搜索所有景点数据
export const ScenicGetAll = (keyword) => {
	return request.get('/scenic/all', {
		params: {
			keyword: keyword
		}
	});
};
//获取城市数据
export const GetCity = (keyword) => {
	return request.get('/city', {
		params: {
			keyword: keyword
		}
	});
};
//获取景点数据
export const GetScenicDeatil = (id) => {
	return request.get(`/scenic/${id}`);
};