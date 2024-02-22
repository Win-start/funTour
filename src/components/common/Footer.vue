<template>
	<footer>
		<div class="site-footer">
			<div class="footer-content">
				<div class="footer-section">
					<h3>关于我们</h3>
					<h3>联系我们</h3>
					<h3>合作伙伴</h3>
				</div>
				<div class="footer-section">
					<h3>帮助中心</h3>
					<ul>
						<li><a href="#">新手上路</a></li>
						<li><a href="#">使用帮助</a></li>
						<li><a href="#">网站地图</a></li>
						<li><a href="#">旅行工具</a></li>
					</ul>
				</div>
				<div class="footer-section">
					<h3>联系方式</h3>
					<p>Email: info@example.com</p>
					<p>Phone: +1 123 4567890</p>
				</div>
			</div>
			<div class="bottom-bar">
				<p>&copy; 2023 Fun Tour Website. All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>

<script>
</script>

<style lang="scss" scoped>
	footer {
		width: 100%;
		background: linear-gradient(180deg, #6dd27c, #1bcdae);
		margin-top: 20px;
		line-height: 30px;
		.site-footer {
			width: 80%;
			margin: auto;
			color: #fff;
			padding: 20px;
			padding: 20px 0px 0px 0px;
		}

		.footer-content {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}

		.footer-section {
			flex-basis: 33.33%;
		}

		ul {
			list-style: none;
			padding: 0;
		}

		ul li a {
			color: #fff;
			text-decoration: none;
		}

		.bottom-bar {
			padding: 10px;
			text-align: center;
			font-size: 14px;
			font-weight: bold;
		}
	}
</style>