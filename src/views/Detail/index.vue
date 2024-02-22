<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from 'vue';
	import {
		Rate,
		Toast
	} from 'vant'
	import {
		useRouter
	} from 'vue-router'
	import {
		GetScenicDeatil
	} from "@/api/city.js"
	import {
		useUserStore
	} from '@/stores'
	import {
		CollectSave,
		CollectDel
	} from '@/api/collect.js'
	const router = useRouter(); // 创建router实例
	const iconName = ref('like-o');

	//初始化
	const state = reactive({
		detail: [],
	});
	onMounted(async () => {
		// 等待评论数据加载完毕
		state.detail = await GetScenicDeatil(router.currentRoute.value.params.id);
		console.log(state.detail)
	});

	const toggleIcon = async () => {
		iconName.value = iconName.value === "like" ? "like-o" : "like";
		if (iconName.value === "like-o") {
			const res = await CollectDel({
				userId: useUserStore().user.id,
				scenicId: state.detail.scenicId
			})
			if (res) {
				Toast('取消收藏')
			}
		} else {
			const res = await CollectSave({
				userId: useUserStore().user.id,
				scenicId: state.detail.scenicId
			})
			if (res) {
				Toast('收藏成功')
			}
		}
	}
	const commentText = ref('');
	const comments = ref([{
			username: '小明',
			avatar: 'https://via.placeholder.com/40x40',
			text: '这是一条评论。'
		},
		{
			username: '小红',
			avatar: 'https://via.placeholder.com/40x40',
			text: '这是另一条评论。'
		}
	]);

	function submitComment() {
		if (commentText.value.trim() === '') {
			alert('请输入评论内容！');
			return;
		}
		const newComment = {
			username: '匿名用户',
			avatar: 'https://via.placeholder.com/40x40',
			text: commentText.value
		};
		comments.value.unshift(newComment);
		commentText.value = '';
	}
</script>

<template>
	<div class="container">
		<div class="header">
			<div class="header-left">
				<h1>{{state.detail.scenicName}}</h1>
				<Rate v-model="state.detail.scenicStar" allow-half readonly color="#ffc107c2" />
				<p>地址：{{state.detail.scenicAddress}}</p>
			</div>
			<div class="header-right">
				<van-icon :name="iconName" size="40" color="green" @click="toggleIcon" />
			</div>
		</div>


		<div class="image-gallery">
			<!-- 图片展示区域 -->
			<img :src="state.detail.imgUrl">
			<img :src="state.detail.imgUrl">
			<img :src="state.detail.imgUrl">
		</div>

		<div class="details">
			<h2>景点详情</h2>
			<p>{{state.detail.scenicContent}}</p>
		</div>

		<div class="reviews">
			<h2>发表评论</h2>
			<div class="comment-form">
				<textarea v-model="commentText" placeholder="请输入评论内容"></textarea>
				<button @click="submitComment">发表评论</button>
			</div>
			<h2>游客评论</h2>
			<!-- 游客评论列表 -->
			<div class="review" v-for="(comment, index) in comments" :key="index">
				<div class="user-info">
					<img :src="comment.avatar" alt="用户头像">
					<span>{{ comment.username }}</span>
				</div>
				<div class="comment">
					<p>{{ comment.text }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		display: flex;

		h1 {
			font-size: 2rem;
			margin-bottom: 10px;
		}

		p {
			font-size: 1.2rem;
			color: #999;
			margin-top: 15px;
		}

		.header-left {
			flex: 1;
		}

		.header-right {
			padding-top: 20px;

			.van-icon {
				cursor: pointer;
			}
		}
	}

	.image-gallery {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 20px;

		img {
			flex-basis: calc(33.33% - 20px);
			width: 31%;
			height: 200px;
			margin: 10px;
			box-shadow: 0 0 5px rgba(#000, .3);
		}
	}

	.details {
		h2 {
			font-size: 1.5rem;
			margin-bottom: 10px;
		}

		p {
			font-size: 1.2rem;
			line-height: 1.5;
		}
	}

	.reviews {
		margin-top: 20px;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-gap: 20px;

		.comment-form {
			display: flex;
			flex-direction: column;
			margin-top: 30px;

			textarea {
				border: 1px solid #ddd;
				padding: 10px;
				font-size: 1.2rem;
				line-height: 1.5;
				resize: none;
				margin-bottom: 10px;

				&:focus {
					outline: none;
					border-color: seagreen;
				}
			}

			button {
				background-color: seagreen;
				color: #fff;
				border: none;
				padding: 10px 20px;
				font-size: 1.2rem;
				cursor: pointer;

				&:focus {
					outline: none;
				}
			}
		}

		.review {
			margin-top: 20px;
			border: 1px solid #ddd;
			padding: 20px;
			display: flex;
			flex-direction: column;

			.user-info {
				display: flex;
				align-items: center;
				margin-bottom: 10px;

				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-right: 10px;
				}

				span {
					font-weight: bold;
				}
			}

			.comment {
				flex-grow: 1;
			}
		}
	}
</style>