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
		ScenicGetAll
	} from '@/api/city.js'
	import {
		useRouter
	} from 'vue-router'
	const router = useRouter()

	const state = reactive({
		scenic: [],
	})

	onMounted(async () => {
		// 在组件挂载后执行的代码
		// 这里可以进行异步操作，比如发送请求获取数据
		state.scenic = await ScenicGetAll(useCityStore().inputValue);
		console.log(state.scenic)
	})
</script>

<template>
	<div class="scenic">
		<el-row>
			<el-col :span="24" v-for="(item,index) in state.scenic" :key="item.scenicId">
				<el-row :gutter="20" @click="router.push(`/detail/${item.scenicId}`)">
					<el-col :span="10">
						<img class="imgUrl" :src="item.imgUrl" />
					</el-col>
					<el-col :span="14">
						<div class="content">
							<h1>{{item.scenicName}}</h1>
							<p>评分：{{item.scenicStar}}</p>
							<p>位于：{{item.provinceName}}</p>
							<button>{{item.scenicType}}</button>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>


<style lang="scss" scope>
	.scenic {
		margin-top: 30px;

		.imgUrl {
			width: 100%;
			height: 50vh;
		}

		.content {
			line-height: 44px;

			p {
				font-size: 20px;
			}

			button {
				position: absolute;
				bottom: 20px;
				right: 5px;
				width: 100px;
				height: 44px;
				line-height: 44px;
				background-color: green;
				border: none;
				color: white;
				border-radius: 10px
			}
		}
	}
</style>