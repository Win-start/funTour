<script setup>

</script>
<template>
	<div class="container">
		<form class="reset-password-form" action="/reset-password" method="post">
			<h2>重置密码</h2>
			<div class="form-group">
				<label for="phone">手机号:</label>
				<input type="tel" id="phone" name="phone" placeholder="请输入手机号" required>
			</div>
			<div class="form-group">
				<label for="verification-code">验证码:</label>
				<div>
					<input type="text" id="verification-code" name="verification-code" placeholder="请输入验证码" required>
					<button type="button" id="send-verification-code" @click="$toast('验证码为123456');">发送验证码</button>
				</div>
			</div>
			<div class="form-group">
				<label for="new-password">新密码:</label>
				<input type="password" id="new-password" name="new-password" placeholder="请输入新密码" required>
			</div>
			<div class="form-group">
				<input type="submit" value="确认重置">
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.reset-password-form {
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		padding: 40px;
		width: 400px;
	}

	.reset-password-form h2 {
		text-align: center;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-group label {
		display: block;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.form-group input {
		width: 100%;
		padding: 8px;
		border-radius: 3px;
		border: 1px solid #ccc;
	}

	.form-group input[type="submit"] {
		background-color: #4CAF50;
		color: white;
		cursor: pointer;
	}

	.form-group a {
		text-decoration: none;
		color: blue;
		font-size: 14px;
		margin-left: 10px;
	}

	.form-group input,
	.form-group input[type="submit"] {
		box-sizing: border-box;
	}
</style>