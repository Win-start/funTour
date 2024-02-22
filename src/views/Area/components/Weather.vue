<script setup>
	import {
		ref
	} from 'vue'

	const real = ref('');
	const weather = ref('');
	const weatherImage = ref('');
	const tips = ref('');
	let weatherStatus = true;
	//获取父组件城市参数
	const props = defineProps(['value']);
	const getWeather = async () => {
		// 假设这里是获取天气数据的代码
		const response = await fetch(
			"https://apis.tianapi.com/tianqi/index?key=6662dbe3e30af3db065fe054428bcb70&city=" + props.value +
			"&type=1");
		const data = await response.json();
		console.log(data.result)
		if (data) {
			real.value = data.result.real;
			weather.value = data.result.weather;
			weatherImage.value = data.result.weatherimg;
			tips.value = data.result.tips;
			weatherStatus = true
		} else {
			weatherStatus = false
		}

	};

	getWeather();
</script>

<template>
	<div class="weather" v-if="weatherStatus">
		<div>
			<h3>{{weather}}<span>{{ real }}</span></h3>
			<p>{{tips}}</p>
		</div>
		<!-- <img :src="'src/assets/weather_icon/'+weatherImage" :alt="weather" :title="weather" /> -->
	</div>
</template>

<style lang="scss" scoped>
	.weather {
		width: 30%;
		font-size: 1rem;
		display: flex;
		text-align: left;

		h3 {
			margin-bottom: 10px;

			span {
				font-weight: 500;
				margin-left: 20px;
			}
		}

		p {
			font-size: 0.8rem;
		}

		img {
			width: 100px;
			height: auto;
		}
	}
</style>