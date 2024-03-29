import axios from 'axios'
import router from '@/router'
import {
	useUserStore
} from '@/stores'
const service = axios.create({
	baseURL: "http://localhost:8083",
	timeout: 10000
})

// 请求拦截器
// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
service.interceptors.request.use(config => {
	config.headers['Content-Type'] = 'application/json;charset=utf-8';

	// config.headers['token'] = user.token;  // 设置请求头
	return config
}, error => {
	return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
service.interceptors.response.use(
	response => {
		  let res = response.data;
		    // 如果是返回的文件
		    if (response.config.responseType === 'blob') {
		        return res;
		    }
		    // 兼容服务端返回的字符串数据
		    if (typeof res === 'string') {
		        try {
		            res = res ? JSON.parse(res) : res;
		        } catch (err) {
		            console.error('JSON parse error:', err);
		        }
		    }
		    return res;
	},
	error => {
		console.log('err' + error) // for debug
		return Promise.reject(error)
	}
)


export default service