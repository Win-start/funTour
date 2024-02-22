<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	import {
		Tab,
		Tabs,
		Toast,
	} from 'vant';
	import {
		useRouter
	} from 'vue-router'
	import {
		useUserStore
	} from '@/stores'
	import {
		userGetInfoService,
		userUpdateInfoService,
		userUploadAvatarService,
	} from "@/api/user.js"
	import {
		GetOrderAll,
		ConfirmOrder,
		CancelOrder
	} from "@/api/order.js"
	import {
		GetCollectAll
	} from "@/api/collect.js"
	import {
		Plus
	} from '@element-plus/icons-vue'
	const router = useRouter()

	const activeName = ref('user');

	const userStore = useUserStore()
	const logout = () => {
		event.preventDefault(); // 阻止默认的表单提交行为
		userStore.setUser([]);
		router.push("/")
	}

	const state = reactive({
		user: [],
		orders: [],
		collects: []
	})

	// const username = ref('');
	// const avatarUrl = ref('');
	// const phone = ref('');
	// const sex = ref('');
	// const email = ref('');
	// const address = ref('');
	onMounted(async () => {
		// 在组件挂载后执行的代码
		// 这里可以进行异步操作，比如发送请求获取数据
		state.user = await userGetInfoService(useUserStore().user.id);
		state.orders = await GetOrderAll(useUserStore().user.id);
		state.collects = await GetCollectAll(useUserStore().user.id)
	})
	const updateUser = async () => {
		event.preventDefault(); // 阻止默认的表单提交行为
		const res = await userUpdateInfoService(state.user);
		if (res) {
			Toast("修改成功")
		}
	}

	const handleAvatarSuccess = async () => {
		state.user = await userGetInfoService(useUserStore().user.id);
	};

	// 确认订单
	const confirm = async (orderId) => {
		const res = await ConfirmOrder(orderId)
		if (res) {
			Toast("期待您的下次预约")
		}
		state.orders = await GetOrderAll(useUserStore().user.id);
	}
	// 取消
	const cancel = async (orderId) => {
		const res = await CancelOrder(orderId)
		if (res) {
			Toast("取消成功")
		}
		state.orders = await GetOrderAll(useUserStore().user.id);
	}
</script>

<template>
	<div class="user">
		<!-- <h1>个人中心</h1> -->
		<div class="user-content">
			<Tabs v-model:active="activeName">
				<Tab title="个人信息" name="user">
					<form enctype="multipart/form-data">
						<div class="rows">
							<div class="row">
								<div class="label-name">用户名：</div>
								<input type="text" v-model="state.user.username" />
							</div>
							<div class="row">
								<div class="label-name">头像：</div>
								<el-upload class="avatar-uploader"
									:action="'http://localhost:8083/uploadAvatar/'+state.user.id"
									:show-file-list="false" :on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload" name="avatar">
									<img v-if="state.user.avatarUrl" :src="state.user.avatarUrl" class="avatar" />
									<el-icon v-else class="avatar-uploader-icon">
										<Plus />
									</el-icon>
								</el-upload>
								<!-- <input type="file" name="avatar" style="border: none;">
								<input type="hidden" name="userId" :value="state.user.id">
								<button>上传头像</button>
								<img :src="state.user.avatarUrl" class="user-img" /> -->
							</div>
						</div>
						<div class="rows">
							<div class="row">
								<div class="label-name">手机号：</div>
								<input type="text" v-model="state.user.phone" />
							</div>
							<div class="row">
								<div class="label-name">性别：</div>
								<input type="text" v-model="state.user.sex" />
							</div>
						</div>
						<div class="rows">
							<div class="row">
								<div class="label-name">邮箱：</div>
								<input type="email" v-model="state.user.email" />
							</div>
							<div class="row">
								<div class="label-name">地址：</div>
								<input type="text" v-model="state.user.address" />
							</div>
						</div>
						<div class="btn">
							<button @click="updateUser">修改信息</button>
						</div>
						<div class="btn">
							<button @click="logout">退出登录</button>
						</div>
					</form>
				</Tab>
				<Tab title="我的收藏" name="collect">
					<el-row :gutter="20">
						<el-col :span="6" v-for="(item,index) in state.collects" :key="item.collectId" class="collect">
							<el-card :body-style="{ padding: '0px' }" @click="router.push(`/detail/${item.scenicId}`)">
								<img :src="item.scenicImgUrl" class="image" />
								<div style="padding: 14px">
									<span>{{item.scenicName}}</span>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</Tab>
				<Tab title="我的预约" name="c">
					<div v-for="(item,index) in state.orders" :key="item.orderId" class="order">
						<span class="orderId">订单编号:000{{item.orderId}}</span>
						<span class="noti" v-if="item.type===1">预约待确认</span>
						<hr>
						<el-row :gutter="20" style="margin-top: 10px;">
							<el-col :span="3">
								<img :src="'http://localhost:8083/'+item.rimage" />
							</el-col>
							<el-col :span="13">
								<a :href="`/route/${item.routeId}`">{{item.routeName}}</a>
							</el-col>
							<el-col :span="3">
								￥{{item.routePrice}}起
							</el-col>
							<el-col :span="5" v-if="item.type===1">
								<el-button type="success" @click="confirm(item.orderId)">确认订单</el-button>
								<el-button type="success" @click="cancel(item.orderId)">取消预约</el-button>
							</el-col>
							<el-col :span="5" v-if="item.type===0">
								<p class="cont">预约已取消</p>
							</el-col>
							<el-col :span="5" v-if="item.type===2">
								<p class="cont">订单已完成</p>
							</el-col>
						</el-row>
					</div>
				</Tab>
			</Tabs>

		</div>
	</div>
</template>

<style lang="scss" scoped>
	.user {
		width: 70%;
		margin: auto;
		margin-top: 20px;
		min-height: 66vh;

		h1 {
			text-align: center;
			font-weight: 500;
		}

		.user-content {
			form {
				margin-top: 25px;

				.rows {
					display: flex;

					.row {
						width: 50%;
						margin-top: 20px;
						display: flex;
						line-height: 66px;
						height: 66px;

						.label-name {
							width: 30%;
							text-align: right;
						}

						.avatar-uploader .avatar {
							width: 100px;
							height: 100px;
							border-radius: 10px;
							display: block;
						}

						.avatar-uploader .el-upload {
							border: 1px dashed var(--el-border-color);
							border-radius: 6px;
							cursor: pointer;
							position: relative;
							overflow: hidden;
							transition: var(--el-transition-duration-fast);
						}

						.avatar-uploader .el-upload:hover {
							border-color: var(--el-color-primary);
						}

						.el-icon.avatar-uploader-icon {
							font-size: 28px;
							color: #8c939d;
							width: 178px;
							height: 178px;
							text-align: center;
						}


						input {
							width: 50%;
							border: none;
							background: none;
							border-bottom: 1px solid green;
						}

					}
				}

				.btn {
					display: flex;
					margin-top: 30px;

					button {
						background-color: green;
						border: none;
						border-radius: 2px;
						color: white;
						margin: auto;
						padding: 1% 3%;
					}
				}
			}
		}

		.collect {
			margin-top: 20px;
		}

		.order {
			border: 1px solid green;
			margin-top: 20px;
			padding: 20px;

			.orderId {
				line-height: 44px;
			}

			.noti {
				float: right;
				font-size: 14px;
				line-height: 44px;
				color: green;
				font-weight: bold;
			}

			img {
				width: 100%;
			}

			.cont {
				font-size: 18px;
				color: green;
				font-weight: bold;
				text-align: center;
			}

			a {
				color: black;
			}

			a:hover {
				color: green;
			}
		}
	}
</style>