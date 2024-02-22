<script setup>
	import {
		ref
	} from 'vue';
	import {
		useRouter
	} from 'vue-router'
	import {
		useUserStore
	} from '@/stores'
	const userStore = useUserStore()
	const router = useRouter()

	const login = () => {
		router.push('/login')
	}
	const home = () => {
		router.push('/')
	}
</script>
<template>
	<header>
		<nav>
			<div class="banner" @click="home">
				<h1>趣味游</h1>
				<h2>Fun Tour</h2>
			</div>
			<div class="user">
				<ul>
					<li v-if="userStore.user.username" @click="router.push('/user')">您好，{{userStore.user.username}}</li>
					<li v-else @click="login">登录</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
	header {
		background: linear-gradient(180deg, #6dd27c, #1bcdae);
		color: white;
		height: 44px;
		line-height: 44px;

		nav {
			width: 80%;
			margin: auto;

			.banner {
				width: 210px;
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 5px;
				float: left;
				cursor: pointer;
			}

			.user {
				li {
					float: right;
					overflow: hidden;
				}

				cursor: pointer;

			}
		}
	}
</style>