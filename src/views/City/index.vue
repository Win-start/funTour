<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	import {
		Swipe,
		SwipeItem,
		Rate,
		Toast,
		Popup,
	} from 'vant'
	import {
		useCityStore,
		useUserStore
	} from '@/stores'
	import {
		userGetScenic
	} from '@/api/city.js'
	import {
		CommentGetTop,
		CommentUpdateLike,
		CommentSave
	} from '@/api/comment.js'
	import {
		useRouter
	} from 'vue-router'
	const router = useRouter()
	const images = ref([
		'../../src/assets/s1.jpg',
		'../../src/assets/s2.jpg'
	])
	// reactive是Vue 3. x中的响应式系统API之一， 它可以将一个普通的JavaScript对象转换为响应式对象， 使得当这个对象发生变化时， 相关的视图会自动更新。
	// 使用reactive可以简单地实现响应式数据的绑定， 而无需手动维护依赖和触发更新。 当我们需要创建一个可变的数据对象， 并且希望将其与视图保持同步时， 可以使用reactive来创建响应式对象。
	const state = reactive({
		items: [],
		comments: []
	})

	onMounted(async () => {
		// 在组件挂载后执行的代码
		// 这里可以进行异步操作，比如发送请求获取数据
		state.items = await userGetScenic(useCityStore().inputValue);

		state.comments = await CommentGetTop(useCityStore().inputValue)
		console.log(state.comments)
	})

	// 点赞
	const saveLike = async (cid, clike) => {
		const res = await CommentUpdateLike(cid, clike)
		if (res) {
			Toast("点赞成功")
			state.comments = await CommentGetTop(useCityStore().inputValue)
		}

	}
	//景点详情
	const Detail = (scenicId) => {
		router.push(`/detail/${scenicId}`)
	}

	const drawer = ref(false)
	const textarea = ref('')
	//分享评论
	const addComment = async () => {
		if (textarea.value == '') {
			Toast.fail("请输入内容")
		} else {
			const res = await CommentSave(useCityStore().provinceId, useUserStore().user.id, textarea.value)
			if (res) {
				Toast.success("发布成功")
				drawer.value = false
				state.comments = await CommentGetTop(useCityStore().inputValue)
			}
		}

	}
</script>
<template>
	<div class="city-content">
		<div class="city-swipe">
			<div class="city-swipe-left">
				<Swipe :autoplay="3000" lazy-render>
					<SwipeItem v-for="image in images" :key="image">
						<img :src="image" />
					</SwipeItem>
				</Swipe>
			</div>
			<div class="city-swipe-right">
				<div class="right-content">
					<div class="title">
						<div class="title-left">
							<img src="../../assets/question.png">
							<span>精选评论</span>
						</div>
						<div class="title-right">
							<img src="../../assets/add.png" />
							<el-button link type="success" @click="drawer = true">分享我的印象
							</el-button>
							<el-drawer v-model="drawer" title="I am the title" :with-header="false">
								<p>分享我的印象</p>
								<el-input v-model="textarea" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
									placeholder="请输入您的感受" @focus="clear" />
								<el-button type="success" plain class="sub" @click="addComment">发布</el-button>
							</el-drawer>
							<!-- <span @click="showPopup">分享我的印象</span> -->
						</div>
						<div class="clear"></div>
					</div>
					<div class="content" v-if="state.comments.length>0">
						<div class="cont" v-for="(item,index) in state.comments" :key="item.cid">
							<div class="cont-top">
								<div class="left">
									<img :src="item.avatarUrl" />
									<span class="user">{{item.username}}</span>
								</div>
								<div class="right">
									<img src="../../assets/good.svg" @click="saveLike(item.cid,item.clike+1)" />
									<span class="number">{{item.clike}}</span>
								</div>
							</div>
							<div class="comment">
								<p>{{item.ccontent}}</p>
							</div>
						</div>
						<button @click="router.push('/area/comment')">查看更多评论……</button>
					</div>
					<div class="content" v-else>
						<div class="no-cont">
							<p>暂无评论</p>
							<p>欢迎分享</p>
						</div>
					</div>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
	<div class="hots">
		<div class="title">热门目的地</div>
		<div class="hots-content">
			<el-row :gutter="20">
				<el-col :span="6" v-for="(item,index) in state.items" :key="item.scenicId"
					@click="Detail(item.scenicId)">
					<div class="photo"><img :src="item.imgUrl"></div>
					<div class="hots-place">{{item.scenicName}}</div>
					<Rate v-model="item.scenicStar" allow-half readonly color="#ffc107c2" />
				</el-col>
			</el-row>
			<button @click="router.push('/area/scenic')">查看全部目的地</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.city-content {

		.city-swipe {
			padding-top: 20px;

			.city-swipe-left {
				width: 50%;
				height: 500px;
				float: left;

				.van-swipe {
					width: 100%;
					height: 100%;
				}

			}

			.city-swipe-right {
				float: right;
				width: 48%;

				.title {
					.title-left {
						position: relative;
						cursor: pointer;
						float: left;

						img {
							width: 17px;
						}

						span {
							display: inline-block;
							width: 96px;
							height: 33px;
							font-size: 24px;
							color: rgba(0, 0, 0, .8);
							line-height: 33px;
							margin-left: 6px;
						}
					}

					.title-right {
						float: right;

						img {
							width: 15px;
							height: 15px;
							vertical-align: middle;
						}

						span {
							vertical-align: middle;
							margin-left: 4px;
							color: #4CAF50;
						}

						p {
							color: #4CAF50;
							font-size: 24px;
							line-height: 44px;
						}

						.el-textarea {
							--el-input-focus-border: var(--van-success-color);
							--el-input-focus-border-color: var(--van-success-color);
						}

						.sub {
							float: right;
							margin-top: 25px;
						}
					}

					.clear {
						clear: both;
					}

				}

				.content {
					.cont {
						margin-top: 25px;

						.cont-top {
							height: 40px;

							.left {
								float: left;

								img {
									width: 30px;
									height: 30px;
									border-radius: 50%;
									position: absolute;
								}

								.user {
									top: 5px;
									position: relative;
									left: 40px;
								}
							}

							.right {
								float: right;

								img {
									width: 20px;
									height: 20px;
									vertical-align: middle;
								}

								.number {
									vertical-align: middle;
									font-size: 14px;
									color: #28b76c;
								}
							}
						}

						.comment {
							p {
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 3;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}
					}

					button {
						border: none;
						background: none;
						color: green;
						font-size: 24px;
						text-align: center;
						float: right;
						margin-top: 50px;
					}

				}

				.no-cont {
					border: 1px solid green;
					margin-top: 50px;
					border-radius: 15px;

					p {
						text-align: center;
						font-size: 26px;
						line-height: 44px;
					}
				}
			}

			.clear {
				clear: both;
			}
		}

	}

	.hots {
		margin-top: 20px;

		.title {
			margin-bottom: 20px;
			text-align: center;
			font: 36px/74px Hiragino Sans GB, Microsoft YaHei, SimHei, SimSun, sans-serif;
		}

		.hots-content {
			text-align: center;
			padding-bottom: 50px;

			.photo {
				width: 100%;
				overflow: hidden;
				height: 100%;

				img:hover {
					transform: scale(1.1);
				}
			}


			.hots-place {
				margin-top: 5px;
				margin-bottom: 10px;
				font-size: 18px;


			}

			button {
				font-weight: 600px;
				margin-top: 100px;
				border: 1px solid;
				color: #4CAF50;
				background: none;
				padding: 20px;
			}

		}
	}
</style>