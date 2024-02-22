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
		CommentGetAll,
		CommentUpdateLike
	} from '@/api/comment.js'
	import {
		useRouter
	} from 'vue-router'
	import {
		Toast
	} from 'vant';
	const router = useRouter()
	const state = reactive({
		comments: [],
	});

	const pagination = reactive({
		currentPage: 1,
		pageSize: 5,
	});

	onMounted(async () => {
		// 等待评论数据加载完毕
		state.comments = await CommentGetAll(useCityStore().inputValue);
		// 初始化分页器
		pagination.total = state.comments.length;
	});

	function paginatedComments() {
		const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
		const endIndex = startIndex + pagination.pageSize;
		return state.comments.slice(startIndex, endIndex);
	}

	const handleSizeChange = (pageSize) => {
		pagination.pageSize = pageSize;
		pagination.currentPage = 1; // 切换每页显示数量时回到第一页
	};

	const handleCurrentChange = (currentPage) => {
		pagination.currentPage = currentPage;
	};

	// 点赞
	const saveLike = async (cid, clike) => {
		const res = await CommentUpdateLike(cid, clike)
		if (res) {
			Toast("点赞成功")
			state.comments = await CommentGetAll(useCityStore().inputValue);
		}

	}
</script>


<template>

	<div class="comments">
		<!-- 展示当前页的评论列表 -->
		<div v-for="comment in paginatedComments()" :key="comment.cid" class="comment">
			<div class="info">
				<img :src="comment.avatarUrl" class="imgUrl" />
				<span class="info-name">{{ comment.username }}</span>
				<div class="right">
					<img src="../../assets/good.svg" @click="saveLike(comment.cid,comment.clike+1)" />
					<span class="number">{{comment.clike}}</span>
				</div>
			</div>
			<div class="content">
				<p>{{ comment.ccontent }}</p>
			</div>
			<div class="creatTime">{{comment.createTime.replace("T", " ")}}</div>
		</div>
		<el-pagination v-model:current-page="pagination.currentPage" :page-size="pagination.pageSize" :small="small"
			:background="background" layout="total, prev, pager, next" :total="pagination.total"
			@size-change="handleSizeChange" @current-change="handleCurrentChange" class="custom-pagination" />
	</div>



</template>

<style lang="scss" scoped>
	.comments {
		.comment {
			border: 1px solid green;
			margin-top: 20px;
			padding: 10px;
		}

		.info {
			display: flex;
			align-items: center;
			height: 50px;

			.imgUrl {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}

			.info-name {
				width: 84%;
				font-size: 20px;
				padding-left: 10px;
			}

			.right {
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

		.content {
			padding-top: 10px;
			padding-bottom: 10px;

			p {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.creatTime {
			text-align: right;
		}

		.custom-pagination {
			margin-top: 20px;
		}

	}
</style>