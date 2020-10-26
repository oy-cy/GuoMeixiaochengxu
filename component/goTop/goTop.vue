<template>
	<view>
		<!-- <view class="go-top" @click="show" :style="{'display':(flag===true? 'flex':'none')}"> -->
		<view class="go-top" @click="show">
			<image src="../../static/images/home/top.png" mode=""></image>
			<text>顶部</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:false
			};
		},
		methods: {
			show(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration:300
				})
			},
		},
		
		// onPageScroll(e) {
		// 	console.log(e)
		// 	if(e.scrollTop>50){
		// 		this.flag=true;
		// 	}else{
		// 		this.flag=false;
		// 	}
		// }
	}
</script>

<style lang="scss">
	.go-top{
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		bottom: 30rpx;
		right: 30rpx;
		padding: 4rpx 18rpx;
		border-radius: 50%;
		background-color: rgba($color: #ffffff, $alpha: 0.8);
		z-index: 100;
		image{
			padding-top: 6rpx;
			width: 32rpx;
			height: 32rpx;
		}
		text{
			font-size: 20rpx;
		}
		
	}
</style>
