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
		GetHotel
	} from '@/api/hotel.js'
	import {
		useRouter
	} from 'vue-router'
	const router = useRouter()
	const state = reactive({
		hotels: [],
	});
	onMounted(async () => {
		// 等待评论数据加载完毕
		state.hotels = await GetHotel(useCityStore().inputValue);
	});
</script>

<template>
	<div class="hotel">
		<el-row :gutter="20">
			<el-col :span="12" v-for="(hotel,index) in state.hotels" :key="hotel.hotelId">
				<div class="detail">
					<img :src="hotel.hotelImg" width="50" height="350px" />
					<div class="hotel-title">
						<p>{{hotel.hotelName}}</p>
						<div class="webite"><a :href="hotel.hotelEmail">点击跳转该酒店</a></div>
						<div class="locate"><van-icon name="location-o" /><span>位于: {{hotel.hotelCity}}</span></div>
						<div class="email">邮箱：{{hotel.hotelEmail}}</div>
						<div class="price">￥{{hotel.hotelPrice}}</div>
					</div>
				</div>
			</el-col>

		</el-row>
	</div>

</template>

<style lang="scss" scoped>
	.el-row {
		margin-bottom: 20px;
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.el-col {
		border-radius: 4px;
		margin-top: 20px;
	}

	.hotel {
		margin-top: 20px;
	}

	.detail {
		display: flex;

		img {
			width: 330px;
			height: 300px;
			margin-right: 3%;
		}

		.hotel-title {
			position: relative;
			line-height: 28px;

			p {
				font-size: 20px;
				color: green;
			}

			.locate {
				span {
					font-size: 14px;
				}
			}

			.price {
				position: absolute;
				bottom: 0;
				color: darkgreen;
				font-size: 26px;
			}

			.webite a {
				color: #aaa;
				font-size: 12px;
			}

			a:hover {
				color: seagreen;
			}
			.email{
				font-size: 12px;
			}

		}
	}
</style>