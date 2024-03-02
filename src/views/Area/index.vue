<script setup>
	import {
		ref,
		computed
	} from 'vue'
	import {
		Swipe,
		SwipeItem,
		Rate
	} from 'vant'
	import {
		useRoute
	} from 'vue-router'
	import {
		useCityStore
	} from '@/stores'
	import pinyin from 'pinyin';
	const route = useRoute()
	import Weather from '@/views/Area/components/Weather.vue'
	const images = [
		'../../src/assets/s1.jpg',
		'../../src/assets/s2.jpg',
	]

	const value = ref(3.5)
	// 获取城市名
	const store = useCityStore();
	const CityVaule = computed(() => store.inputValue);
	const CityText = pinyin(CityVaule.value, {
		style: pinyin.STYLE_NORMAL // 指定拼音风格为普通风格（不带声调）
	}).map(word => {
		return word.map(pinyin => pinyin.charAt(0).toUpperCase() + pinyin.slice(1)).join('');
	}).join('');
</script>

<template>
	<main>
		<div class="city">
			<div class="city-name">
				<h3>{{CityVaule}}</h3>
				<br>
				<h5>{{CityText}}</h5>
			</div>
			<!-- 天气预报 -->
			<Weather :value="CityVaule"></Weather>
		</div>
		<!-- 导航栏 -->
		<Nav></Nav>
		<hr>
		<router-view></router-view>
	</main>
</template>

<style lang="scss" scoped>
	.city {
		display: flex;
		justify-content: space-between;

		.city-name {
			width: 20%;
			margin-top: 20px;

			h3 {
				font-size: 40px;
				color: #28b76c;
				display: inline-block;
				height: 40px;
				line-height: 40px;
				font-weight: 500;
			}

			h5 {
				margin-top: 6px;
				display: inline-block;
				height: 22px;
				font-size: 20px;
				color: #28b76c;
				line-height: 20px;
				font-weight: 500;
			}
		}
	}

	hr {
		background: linear-gradient(180deg, #6dd27c, #1bcdae);
		height: 2px;
		border: none;
	}
</style>