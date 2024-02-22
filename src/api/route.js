import request from '@/utils/request'

//获取路线详情
export const GetRouteDeatil = (id) => {
	return request.get(`/route/${id}`);
};
//获取图片列表
export const GetRouteImage = (id) => {
	return request.get(`/route/${id}/img`);
};
//获取热门路线
export const GetRouteHot = () => {
	return request.get('/route/hot');
};
//获取城市相关路线
export const GetRouteAll = (provinceId) => {
	return request.get(`/route/all/${provinceId}`)
}