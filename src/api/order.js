import request from '@/utils/request'
//预定
export const SaveOrder = (params) =>
	request.post('/order', params)
//获取全部订单
export const GetOrderAll = (userId) => {
	return request.get(`/order/all/${userId}`)
}
//确认预约
export const ConfirmOrder = (orderId) => {
	return request.post(`/order/${orderId}/confirm`)
}

export const CancelOrder = (orderId) => {
	return request.post(`/order/${orderId}/cancel`)
}