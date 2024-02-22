<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from 'vue';
	import {
		useRouter
	} from 'vue-router'
	import {
		useUserStore
	} from '@/stores'
	import {
		GetRouteDeatil,
		GetRouteImage
	} from "@/api/route.js"
	import {
		SaveOrder
	} from "@/api/order.js"
	import {
		Toast
	} from 'vant';
	import {
		ElNotification
	} from 'element-plus'
	const router = useRouter();
	const state = reactive({
		route: [],
		img: []
	});
	onMounted(async () => {
		// 等待评论数据加载完毕
		state.route = await GetRouteDeatil(router.currentRoute.value.params.id);
		state.img = await GetRouteImage(router.currentRoute.value.params.id);
		// console.log(state.route)
	});

	const dialogVisible = ref(false)
	const username = ref('')
	const phone = ref('')

	const save = async (routeId) => {
		dialogVisible.value = false
		const reg = /^1[3-9]\d{9}$/;
		if (reg.test(phone.value)) {
			const res = await SaveOrder({
				routeId: routeId,
				userId: useUserStore().user.id,
				userName: username.value,
				userPhone: phone.value
			})
			if (res) {
				Toast("预定成功，我们将会在三天内联系您")
			}
		} else {
			Toast.fail("请输入合法的手机号码")
		}
		username.value = ""
		phone.value = ""
	}
</script>

<template>
	<div class="route">
		<div class="header">
			<el-row :gutter="20">
				<el-col :span="14">
					<el-carousel indicator-position="outside">
						<el-carousel-item v-for="item in state.img" :key="item">
							<img :src="'http://localhost:8083/'+item.bigPic" />
						</el-carousel-item>
					</el-carousel>
				</el-col>
				<el-col :span="10">
					<h2>{{state.route.routeName}}</h2>
					<p>{{state.route.routeIntroduce}}</p>
					<h1>￥{{state.route.routePrice}}<span>起</span></h1>
					<el-button type="success" round @click="dialogVisible = true">点击预约</el-button>
				</el-col>
			</el-row>
			<el-dialog v-model="dialogVisible" title="预约详情" width="30%">
				<input type="text" placeholder="请输入联系人姓名" class="inp" v-model="username" /><br>
				<input type="text" placeholder="请输入联系人号码" class="inp" v-model="phone" />
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogVisible = false">取消</el-button>
						<el-button type="success" @click="save(state.route.routeId)">
							确认预约
						</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
		<div class="you_need_konw">
			<span>旅游须知</span>
			<div class="notice">
				<p>1、旅行社已投保旅行社责任险。建议游客购买旅游意外保险 </p>

				<p>2、旅游者参加打猎、潜水、海边游泳、漂流、滑水、滑雪、滑草、蹦极、跳伞、滑翔、乘热气球、骑马、赛车、攀岩、水疗、水上飞机等属于高风险性游乐项目的，敬请旅游者务必在参加前充分了解项目的安全须知并确保身体状况能适应此类活动；如旅游者不具备较好的身体条件及技能，可能会造成身体伤害。
				</p>

				<p>3、参加出海活动时，请务必穿着救生设备。参加水上活动应注意自己的身体状况，有心脏病、冠心病、高血压、感冒、发烧和饮酒及餐后不可以参加水上活动及潜水。在海里活动时，严禁触摸海洋中各种鱼类，水母，海胆，珊瑚等海洋生物，避免被其蛰伤。老人和小孩必须有成年人陪同才能参加合适的水上活动。在海边游玩时，注意保管好随身携带的贵重物品。
				</p>

				<p>4、根据中国海关总署的规定，旅客在境外购买的物品，在进入中国海关时可能需要征收关税。详细内容见《中华人民共和国海关总署公告2010年第54号文件》。</p>

				<p>5、建议出发时行李托运，贵重物品、常用物品、常用药品、御寒衣物等请随身携带，尽量不要托运。行李延误属于不可抗力因素，我司将全力协助客人跟进后续工作，但我司对此不承担任何责任。</p>
				<p>1、旅行社已投保旅行社责任险。建议游客购买旅游意外保险 </p>

				<p>2、旅游者参加打猎、潜水、海边游泳、漂流、滑水、滑雪、滑草、蹦极、跳伞、滑翔、乘热气球、骑马、赛车、攀岩、水疗、水上飞机等属于高风险性游乐项目的，敬请旅游者务必在参加前充分了解项目的安全须知并确保身体状况能适应此类活动；如旅游者不具备较好的身体条件及技能，可能会造成身体伤害。
				</p>

				<p>3、参加出海活动时，请务必穿着救生设备。参加水上活动应注意自己的身体状况，有心脏病、冠心病、高血压、感冒、发烧和饮酒及餐后不可以参加水上活动及潜水。在海里活动时，严禁触摸海洋中各种鱼类，水母，海胆，珊瑚等海洋生物，避免被其蛰伤。老人和小孩必须有成年人陪同才能参加合适的水上活动。在海边游玩时，注意保管好随身携带的贵重物品。
				</p>

				<p>4、根据中国海关总署的规定，旅客在境外购买的物品，在进入中国海关时可能需要征收关税。详细内容见《中华人民共和国海关总署公告2010年第54号文件》。</p>

				<p>5、建议出发时行李托运，贵重物品、常用物品、常用药品、御寒衣物等请随身携带，尽量不要托运。行李延误属于不可抗力因素，我司将全力协助客人跟进后续工作，但我司对此不承担任何责任。</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.route {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;

		.header {

			img {
				width: 100%;
				height: 100%;
			}

			p {
				line-height: 24px;
				margin-top: 10px;
				color: green;
				margin-bottom: 10px;
			}

			h1 {
				color: green;
				margin-bottom: 20px;

				span {
					font-size: 17px;
					font-weight: 100;
					color: black;
				}
			}

			.inp {
				width: 100%;
				height: 34px;
			}

			.inp:last-child {
				margin-top: 15px;
			}
		}

		.you_need_konw {
			span {
				font-size: 16px;
				border-bottom: 3px solid #71dd69;
			}

			.notice {
				border: solid 1px #ddd;
				padding: 35px 48px;

				p {
					line-height: 24px;
					font-size: 16px;
					margin-bottom: 20px;
				}
			}
		}

	}
</style>