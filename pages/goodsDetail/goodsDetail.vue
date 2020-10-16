<template>
	<view class="detail-container">
		<view class="wrap">
				<u-swiper  :list="lunbotu"></u-swiper>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lunbotu:[
					{img:"//gfs17.gomein.net.cn/T14jD5B_xT1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs12.gomein.net.cn/T1PfV5BQAv1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs13.gomein.net.cn/T1J1E5BvDv1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs13.gomein.net.cn/T1Wr_5BCWT1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs11.gomein.net.cn/T1.QL5Bsdv1RCvBVdK_400.jpg?v=20170727"},
				],
			};
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">

</style>
