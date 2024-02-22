<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	import {
		useCityStore
	} from '@/stores'
	import {
		GetRouteAll
	} from '@/api/route.js'
	import {
		useRouter
	} from 'vue-router'
	const router = useRouter()
	const state = reactive({
		routes: [],
	});
	onMounted(async () => {
		// 等待评论数据加载完毕
		state.routes = await GetRouteAll(useCityStore().provinceId);
		console.log(state.routes)
	});
</script>

<template>
	<div class="routes">
		<el-row :gutter="20" v-for="(item,index) in state.routes" :key="item.routeId" class="route">
			<el-col :span="8">
				<img :src="'http://localhost:8083/'+item.rimage" />
			</el-col>
			<el-col :span="10" class="routeContent">
				<h3>{{item.routeName}}</h3>
				<p>{{item.routeIntroduce}}</p>
			</el-col>
			<el-col :span="6" class="price">
				<h2>￥{{item.routePrice}}起</h2>
				<a :href="`/route/${item.routeId}`">查看详情</a>
			</el-col>
		</el-row>
	</div>
</template>

<style lang="scss" scoped>
	.routes {
		.route {
			margin-top: 30px;

			.routeContent {
				margin-top: 20px;

				p {
					margin-top: 20px;
				}
			}
			.price{
				margin-top: 50px;
				text-align: center;
				a{
					color: green;
				}
			}
		}
	}
</style>