import request from '@/utils/request'

//获取所有评价数据
export const CommentGetTop = (provinceName) => {
	return request.get('/comment/tops', {
		params: {
			provinceName: provinceName
		}
	});
};

export const CommentGetAll = (provinceName) => {
	return request.get('/comment', {
		params: {
			provinceName: provinceName
		}
	});
};
export const CommentUpdateLike = (cid, clike) => {
	const data = {
		cid: cid,
		clike: clike
	};

	return request.post('/comment/clike', data);
};
export const CommentSave = (provinceId, userId, ccontent) => {
	const data = {
		provinceId: provinceId,
		userId: userId,
		ccontent: ccontent
	};

	return request.post('/comment/save', data);
};