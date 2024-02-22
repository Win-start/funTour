import request from '@/utils/request'

// 注册接口
export const userRegisterService = (params) =>
	request.post('/register', params)
// 登录接口
export const userLoginService = (params) =>
	request.post('/login', params, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})



// 获取用户基本信息
export const userGetInfoService = (id) => request.get(`/user/${id}`)

export const userUpdateInfoService = ({
	id,
	username,
	phone,
	email,
	address,
	avatarUrl,
	sex
}) => {
	return request.put(`/update/${id}`, {
		id,
		username,
		phone,
		email,
		address,
		avatarUrl,
		sex
	});
};
// 上传头像
// export const userUploadAvatarService = (id,avatar) => request.post(`/${id}/upload-image`, avatar)
export const userUploadAvatarService = (avatar) => {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return request.post("/uploadAvatar", {
	  formData:formData
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
// 换密码
export const userUpdatePassService = ({
		old_pwd,
		new_pwd,
		re_pwd
	}) =>
	request.patch('/my/updatepwd', {
		old_pwd,
		new_pwd,
		re_pwd
	})