<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from 'vue';
	import {
		Search,
		Toast
	} from 'vant'
	import {
		useRouter
	} from 'vue-router'
	import {
		useCityStore
	} from '@/stores'
	import {
		GetCity
	} from "@/api/city.js"
	import {
		GetRouteHot
	} from "@/api/route.js"
	const router = useRouter()
	// 轮播图
	const images = [
		'../../src/assets/s1.jpg',
		'../../src/assets/s2.jpg',
		'../../src/assets/s3.jpg',
		'../../src/assets/s4.jpg',
		'../../src/assets/s5.jpg',
	]

	const searchValue = ref('')
	const store = useCityStore();
	const onSearch = async () => {
		console.log(searchValue.value)
		if (searchValue.value == '') {
			Toast("请输入目的地")
		} else {
			store.setInputValue(searchValue.value)
			const res = await GetCity(searchValue.value)
			store.setCityId(res[0].cityId)
			store.setProvinceId(res[0].provinceId)
			router.push('/area/city')
		}

	}

	const onClear = () => {
		console.log(value.value)
		value.value = ''
	}
	//热门路线
	const state = reactive({
		route: []
	});
	onMounted(async () => {
		// 等待评论数据加载完毕
		state.route = await GetRouteHot();
		// console.log(state.route)
	});
</script>
<script>

</script>


<template>
	<!-- 轮播图 -->
	<div class="carousel">
		<el-carousel :interval="5000" arrow="always">
			<el-carousel-item v-for="item in images" :key="item">
				<img :src="item">
			</el-carousel-item>
		</el-carousel>
	</div>
	<main>
		<!-- 搜索 -->
		<div class="search">
			<el-row :gutter="20">
				<el-col :span="5">
					<img src="../../assets/logo.png" />
				</el-col>
				<el-col :span="15">
					<Search v-model="searchValue" show-action background="#4fc08d" placeholder="搜目的地" shape="round"
						clearable clear-icon="clear" clear-trigger="always" @search="onSearch" @clear="onClear">
						<template #action>
							<div @click="onSearch">搜索</div>
						</template>
					</Search>

				</el-col>
			</el-row>
		</div>

		<!-- 内容 -->
		<div class="senction">
			<div class="title">今日推荐</div>
			<div class="content">
				<el-row :gutter="20">
					<el-col :span="6" class="card" v-for="(item,index) in state.route" :key="item.routeId"
						@click="router.push(`/route/${item.routeId}`)">
						<el-card :body-style="{ padding: '0px' }">
							<div class="photo">
								<img :src="'http://localhost:8083/'+item.rimage" class="image" />
							</div>
							<div style="padding: 10px">
								<p>{{item.routeName}}</p>
								<div class="bottom">
									<span class="place">{{item.provinceName}}</span>
									<span class="price">{{item.routePrice}}元起</span>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
	.carousel {
		width: 100%;
		margin: auto;
		height: 550px;

		.el-carousel {
			width: 100%;
			height: 100%;
		}

		.el-carousel__container {
			height: 100%;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}


	main {
		width: 80%;
		margin: auto;
		margin-top: 20px;
	}

	.search {
		.el-col-5 {
			img {
				width: 100%;
				height: 100%;
			}
		}

		.el-col-15 {
			margin-top: 25px;
			margin-left: 30px;

			.van-search {
				height: 45px;
				border-radius: 8px;
				padding: 7px;
			}

			.van-search__content--round {
				border-radius: 8px;
			}

			.van-search__action {
				color: var(--van-background-color-light);
				letter-spacing: 0.1em;
				font-size: 1.2em;
				background-color: transparent !important;
				/* 将背景色设置为透明 */

			}
		}
	}

	.senction {
		.title {
			text-align: center;
			font: 36px/74px Hiragino Sans GB, Microsoft YaHei, SimHei, SimSun, sans-serif;
		}

		.content {
			.card {
				margin-top: 20px;
				overflow: hidden;
			}

			.photo {
				width: 100%;
				overflow: hidden;
				height: 100%;

				img:hover {
					transform: scale(1.1);
				}
			}

			p {
				overflow: hidden;
				white-space: normal;
				height: 44px;
				font-weight: bold;
			}

			.bottom {
				margin-top: 20px;
				padding-bottom: 20px;

				.place {
					float: left;
				}

				.price {
					float: right;
				}
			}
		}
	}
</style>