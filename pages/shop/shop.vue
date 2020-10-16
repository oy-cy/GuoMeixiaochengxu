<template>
	<view class="shop-container">
		<!-- 头部 -->
		<view class="header">
			<view class="guomei" v-if="isShowLogo">
				<image src="../../static/images/shop/guomei-logo.png" mode=""></image>
			</view>
			<view class="search">
				<van-search  value="" shape="round" placeholder="请输入搜索关键词" />
			</view>
			<view class="scan-content">
				<image class="scan" src="../../static/images/shop/scan2.png" mode=""></image>
				<view class="text">扫一扫</view>
			</view>
			<view class="classify-content">
				<image class="classify" src="../../static/images/shop/classify2.png" mode=""></image>
				<view class="text">分类</view>
			</view>
		</view>
		<!-- 门店背景图 -->
		<view class="shop-info">
			<image src="../../static/images/shop/guomeiBgc.jpg" mode=""></image>
		</view>
		<!-- 门店直送 -->
		<view class="shop-sending">
			门店
		</view>
		<view class="">
			你好啊
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowLogo: false,
				isLogo: false,
			};
		},
		methods:{
			
		},
		// 监听当前页面的滚动
		onPageScroll: function (event) {
			var { scrollTop } = event;
			var position = 50; // 设定高度50
			// console.log("滚动距离",scrollTop);
			if(scrollTop > position && this.isLogo == false){
				this.isShowLogo = true;
				this.isLogo = true;
				console.log("大于50");
			}else if(scrollTop < position && this.isLogo == true){
				this.isShowLogo = false;
				this.isLogo = false;
				console.log("小于50");
			}
		},
	}
</script>

<style lang="scss" scoped>
	.shop-container {
		height: 2000rpx;
		.header {
			position: fixed;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			background-color: #FFFFFF;
			z-index: 1;
			
			.guomei {
				width: 60rpx;
				height: 60rpx;
				margin-left: 20rpx;
				border-radius: 100rpx;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.search {
				flex: 1;
			}
			.scan-content {
				text-align: center;
				.scan {
					width: 44rpx;
					height: 44rpx;
					margin-top: 12rpx;
				}
				.text {
					font-size: 20rpx;
					color: #878787;
				}
			}
			.classify-content {
				text-align: center;
				.classify {
					width: 44rpx;
					height: 44rpx;
					padding: 0 20rpx;
					margin-top: 12rpx;
					// background-color: red;
				}
				.text {
					font-size: 20rpx;
					color: #878787;
				}
			}
			
		}
		.shop-info {
			position: absolute;
			width: 100%;
			height: 552rpx;
			// background:rgba(0,0,0,.55));
			image {
				width: 100%;
				height: 100%;
			}
		}
		.shop-sending {
			position: relative;
			top: 448rpx;
			width: 100%;
			height: 300rpx;
			border-radius: 32rpx;
			background-color: red;
			z-index: 1;
		}
	}
</style>
