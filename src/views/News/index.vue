<script setup>
	import {
		ref,
		computed
	} from 'vue'
	import {
		Pagination
	} from 'vant'

	const currentPage = ref(1);
	//显示的页码个数
	const pageSize = ref(4)
	//总数
	const total = ref()
	// 每页记录数
	const itemPage = ref(6)
	const newsList = ref([])
	const getNews = async () => {
		const response = await fetch(
			"https://apis.tianapi.com/areanews/index?key=6662dbe3e30af3db065fe054428bcb70&areaname=福建");
		const data = await response.json()

		total.value = data.result.list.length
		newsList.value = data.result.list
	}

	getNews();

	const getList = computed(() => {
		// 根据当前页码和每页显示条目数计算应该显示的数据
		const start = (currentPage.value - 1) * pageSize.value;
		const end = start + itemPage.value;
		return newsList.value.slice(start, end);
	})
</script>

<template>
	<div class="news">
		<div class="news-left">
			<img src="../../assets/s1.jpg" />
		</div>
		<div class="news-right">
			<h2>最新资讯</h2>
			<ul>
				<li v-for="item in getList" key="item.id">
					<a :href="item.url">{{item.title}}</a>
					<span class="itemright">{{item.ctime}}</span>
				</li>
			</ul>
			<Pagination v-model="currentPage" :total-items="total" :items-per-page="itemPage" :show-page-size="pageSize"
				class="custom-pagination">
				<template #prev-text>
					<van-icon name="arrow-left" />
				</template>
				<template #next-text>
					<van-icon name="arrow" />
				</template>
				<template #page="{ text }">{{ text }}</template>
			</Pagination>
		</div>
		<div class="clear"></div>
	</div>
</template>

<style lang="scss">
	.news {
		margin-top: 25px;

		.news-left {
			width: 50%;
			float: left;
			height: 400px;

			img {
				width: 100%;
			}
		}

		.news-right {
			width: 45%;
			float: right;

			ul {
				margin-top: 15px;

				li {
					font-size: 18px;

					a {
						width: 60%;
						overflow: hidden;
						text-overflow: ellipsis;
						display: inline-block;
						height: 44px;
						line-height: 44px;
					}

					.itemright {
						float: right;
					}
				}

			}

			a {
				color: black;
			}

			a:hover {
				color: #4CAF50;
			}

			//分页器css样式
			.van-pagination__item .van-pagination__item--disabled,
			.van-pagination__item--prev,
			.van-pagination__item--disabled,
			.van-pagination__item--next {
				background: none !important;
				color: #4CAF50 !important;
			}

			.pager-wrapper .van-pagination__item:hover {
				background-color: #ddd;
			}

			.van-pagination__item {
				background-color: white !important;
				color: #4CAF50 !important;
			}

			.van-pagination .van-pagination__item--active button {
				background-color: #4CAF50 !important;
				color: white;
				/* 设置点击时的背景颜色为绿色 */
			}
		}

		.clear {
			clear: both;
		}
	}
</style>