<script setup>
	import {
		Toast
	} from 'vant';
	import {
		ref,
		inject
	} from 'vue'
	import {
		useRouter
	} from 'vue-router'
	import {
		userLoginService
	} from '@/api/user.js'
	import {
		useUserStore
	} from '@/stores'
	const userStore = useUserStore()
	const router = useRouter()

	const username = ref('')
	const password = ref('')
	//登录
	const logins = async () => {
		const params = {
			username: username.value,
			password: password.value
		}
		const res = await userLoginService(params);
		if (res.id) {
			Toast.success("登陆成功")
			userStore.setUser(res)
			// 跳转到首页
			router.push("/")
		} else {
			Toast.fail(res)
		}
	}
</script>

<template>
	<div class="container">
		<div class="content">
			<div class="c-left">
				<img src="../../assets/logo.png" class="cl-img" />
			</div>
			<div class="c-right">
				<form class="login-form" @submit.prevent="logins">
					<h2>用户登录</h2>
					<div class="form-group">
						<label for="username">用户名:</label>
						<input v-model="username" type="text" id="username" name="username" required>
					</div>
					<div class="form-group">
						<label for="password">密码:</label>
						<input v-model="password" type="password" id="password" name="password" required>
					</div>
					<div class="form-group">
						<input type="submit" value="登录">
						<a href="/forgot-password">忘记密码</a>
					</div>
				</form>
				<p>还没有账号？<a href="/register" class="register">立即注册</a></p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.container {
		background-color: white;
		width: 80%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		.content {
			margin: 20px;
			display: flex;

			.c-left {
				flex: 1;
				width: 50%;
				position: relative;

				img {
					width: 100%;
					max-width: 80%;
					height: auto;
					top: 25%;
					position: absolute;
					left: 10%;
				}
			}

			.c-right {
				flex: 1;
				margin-left: 50px;

				.login-form {
					background-color: #fff;
					border-radius: 5px;
					box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
					padding: 40px;
					width: auto;

					h2 {
						text-align: center;
					}

					.form-group {
						margin-bottom: 20px;

						label {
							display: block;
							font-weight: bold;
							margin-bottom: 5px;
						}

						input {
							width: 100%;
							padding: 8px;
							border-radius: 3px;
							border: 1px solid #ccc;
						}

						input[type="submit"] {
							background-color: #4CAF50;
							color: white;
							cursor: pointer;
						}

						a {
							text-decoration: none;
							color: green;
							font-size: 16px;
							position: relative;
							bottom: -30px;
						}
					}

					.form-group input,
					.form-group input[type="submit"] {
						box-sizing: border-box;
					}
				}

				.register {
					color: #4CAF50;
				}

			}
		}

	}
</style>