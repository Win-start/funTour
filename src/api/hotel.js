import request from '@/utils/request'


export const GetHotel = (keyword) => {
	return request.get('/hotel/search', {
		params: {
			keyword:keyword
		}
	});
};