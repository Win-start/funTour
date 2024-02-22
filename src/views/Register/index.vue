<script setup>
	import {
		Toast
	} from 'vant';
	import {
		ref
	} from 'vue';
	import {
		useRouter
	} from 'vue-router'
	import {
		userRegisterService,
		userLoginService
	} from '@/api/user.js'
	const router = useRouter()
	const username = ref('');
	const phone = ref('');
	const verificationCode = ref('');
	const password = ref('');
	const repassword = ref('');
	const isSendingCode = ref(false);

	const sendVerificationCode = () => {
		//手机校验规则
		const reg = /^1[3-9]\d{9}$/;
		if (reg.test(phone.value)) {
			isSendingCode.value = true;
			Toast('验证码为：123456');
			setTimeout(() => {
				isSendingCode.value = false;
			}, 6000);
		} else {
			Toast.fail("手机号码不合法");
		}

	};

	const register = async () => {
		let errorMessage = document.getElementById("error-message");
		if (password.value !== repassword.value) {
			errorMessage.textContent = "两次密码输入不一致";
			event.preventDefault(); // 阻止表单提交
		} else if (!isSendingCode.value) {
			errorMessage.textContent = "";
			Toast.fail('点击发送验证码')
		} else if (verificationCode.value !== "123456") {
			errorMessage.textContent = "";
			Toast.fail('验证码不正确')
		} else {
			const res = await userRegisterService({
				username: username.value,
				password: password.value,
				phone: phone.value
			})
			if (res == "success") {
				Toast("注册成功")
				router.push("/login")
			} else {
				console.log(res)
				errorMessage.textContent = res;
			}
			username.value = '';
			phone.value = '';
			verificationCode.value = '';
			password.value = '';
			repassword.value = '';
		}


	};
</script>

<template>
	<div class="register-page">
		<h2>注册</h2>
		<form @submit.prevent="register">
			<div class="form-group">
				<label for="username">用户名：</label>
				<input type="text" id="username" v-model="username" placeholder="请输入用户名" required>
			</div>
			<div class="form-group">
				<label for="phone">手机号：</label>
				<input type="text" id="phone" v-model="phone" placeholder="请输入手机号" required>
			</div>
			<div class="form-group code-group">
				<label for="verification">验证码：</label>
				<input type="text" id="verification" v-model="verificationCode" placeholder="请输入验证码" required>
				<button @click.prevent="sendVerificationCode" :disabled="isSendingCode">
					{{ isSendingCode ? '发送中...' : '发送验证码' }}
				</button>
			</div>
			<div class="form-group">
				<label for="password">密码：</label>
				<input type="password" id="password" v-model="password" placeholder="请输入密码" required>
			</div>
			<div class="form-group">
				<label for="password">再次输入密码：</label>
				<input type="password" id="repassword" v-model="repassword" placeholder="请再次输入密码" required>
			</div>
			<div id="error-message"></div>
			<button type="submit" class="submit-btn">注册</button>
		</form>
	</div>
</template>

<style lang="scss">
	.register-page {
		width: 500px;
		margin: 0 auto;
		padding: 50px 20px;

		h2 {
			font-size: 28px;
			color: #4CAF50;
			margin-bottom: 30px;
		}

		form {
			.form-group {
				margin-bottom: 20px;

				label {
					display: block;
					margin-bottom: 10px;
					font-size: 16px;
					color: #555;
					width: 120px;
				}

				input {
					width: 100%;
					height: 40px;
					padding: 10px;
					border: 1px solid #ccc;
					border-radius: 4px;
					font-size: 16px;
					color: #555;
					box-sizing: border-box;

					&:focus {
						outline: none;
						border-color: #4CAF50;
					}
				}
			}

			.code-group {
				display: flex;
				align-items: center;
				justify-content: space-between;

				button {
					height: 38px;
					line-height: 38px;
					margin-left: 10px;
					font-size: 14px;
					background-color: #4CAF50;
					color: #fff;
					border: none;
					border-radius: 4px;
					cursor: pointer;
					transition: all 0.2s ease-in-out;
					width: 150px;

					&:hover,
					&:focus {
						background-color: #4CAF50;
					}

					&:disabled {
						background-color: #ccc;
						cursor: not-allowed;
					}
				}
			}

			.submit-btn {
				width: 100%;
				height: 50px;
				margin-top: 30px;
				font-size: 18px;
				font-weight: bold;
				color: #fff;
				background-color: #4CAF50;
				border: none;
				border-radius: 4px;
				cursor: pointer;
				transition: all 0.2s ease-in-out;

				&:hover,
				&:focus {
					background-color: #4CAF50;
				}
			}

			#error-message {
				color: red;
			}
		}
	}
</style>