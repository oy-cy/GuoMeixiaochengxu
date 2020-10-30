<template>
	<view class="balance-container"> 
		<uni-notice-bar single="true" text="为保障资金安全，建议您进行实名认证，点击去认证" showIcon="true" showClose="true"></uni-notice-bar>
		<view class="main">
			<view class="price">
				<text class="symbol">&yen;</text>
				<text class="big-price">0.</text>
				<text class="small-price">00</text>
			</view>
			<view class="withdraw" @click="withdraw">
				<image src="../../../static/images/user/toWithdraw.png" mode=""></image>
			</view>
		</view>
		<view class="provider">
			本服务由银盈提供
		</view>
	</view>
</template>

<script>
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			uniNoticeBar
		},
		methods: {
			withdraw(){
				uni.showModal({
				    content: '请前往国美APP提现哦',
					showCancel:false,
					confirmText:'我知道了'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.balance-container {
	height: 94vh;
	position: relative;
	.main {
		height: 500rpx;
		background-color: #ff5c5c;
		position: relative;
		.symbol {
			font-size: 40rpx;
		}
		.price {
			display: flex;
			height: 240rpx;
			margin-left: 40rpx;
			align-items: baseline;
			color: #fff;
			.big-price {
				font-size: 150rpx;
			}
			.small-price {
				font-size: 80rpx;
			}
		}
		.withdraw {
			width: 100%;
			height: 100rpx;
			position: absolute;
			bottom: 0;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.provider {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: center;
		bottom: 0;
		color: #888;
		font-size: 28rpx;
	}
	/deep/ .uni-noticebar {
		margin-bottom: 0;
	}
	/deep/ .uni-noticebar__content-text {
		font-size: 26rpx;
	}
}
</style>
