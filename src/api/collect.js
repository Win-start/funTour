import request from '@/utils/request'

export const CollectSave = (data) => {
	return request.post('/collects/save', data);
};
export const CollectDel = (data) => {
	return request.post('/collects/del', data);
};
export const GetCollectAll = (userId) => {
	return request.get(`/collects/all/${userId}`)
}