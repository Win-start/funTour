import {
	createRouter,
	createWebHistory,
} from 'vue-router'

import {
	useUserStore
} from '@/stores'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Area from '@/views/Area/index.vue'
import News from '@/views/News/index.vue'
import City from '@/views/City/index.vue'
import ForgotPassword from "@/views/ForgotPassword/index.vue"
import Register from "@/views/Register/index.vue"
import User from "@/views/User/index.vue"
import Hotel from "@/views/Hotel/index.vue"
import Detail from "@/views/Detail/index.vue"
import Scenic from "@/views/Scenic/index.vue"
import Comment from "@/views/Comment/index.vue"
import RouteDetail from "@/views/RouteDetail/index.vue"
import Route from "@/views/Route/index.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [{
			path: '/',
			component: Layout,
			children: [{
					path: '',
					component: Home
				},
				{
					path: 'area',
					component: Area,
					children: [{
						path: 'city',
						component: City
					}, {
						path: 'news',
						component: News
					}, {
						path: 'hotel',
						component: Hotel
					}, {
						path: 'scenic',
						component: Scenic
					}, {
						path: 'comment',
						component: Comment
					}, {
						path: 'route',
						component: Route
					}]
				}, {
					path: '/user',
					component: User
				}, {
					path: '/detail/:id',
					component: Detail,
					props: (route) => ({
						id: route.params.id
					})
				}, {
					path: '/route/:id',
					component: RouteDetail,
					props: (route) => ({
						id: route.params.id
					})
				}
			]
		},
		{
			path: '/login',
			component: Login,
		},
		{
			path: '/forgot-password',
			component: ForgotPassword
		},
		{
			path: '/search'
		}, {
			path: '/register',
			component: Register
		}
	]
});


// 登录访问拦截
router.beforeEach((to) => {
	const userStore = useUserStore()
	if (!userStore.user && to.path == '/user') return '/login'
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
	// 在每次路由离开时滚动到顶部
	window.scrollTo(0, 0)
	next()
})
// 全局解析守卫（beforeResolve）
router.beforeResolve((to, from, next) => {
	// 这里可以执行一些异步任务或处理逻辑
	next(); // 注意要调用 next() 来继续导航
});

// 全局后置守卫（afterEach）
router.afterEach((to, from) => {
	// 在这里可以执行一些页面跟踪或日志记录等操作
});

export default router