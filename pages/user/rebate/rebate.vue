<template>
	<view class="rebate-container">
		<view class="money">
			<view class="recorded">
				<view class="count">
					<view class="symbol">&yen;</view>
					<view class="number">0</view>
				</view>
				<view class="info">已入账</view>
				<view class="reminder">(请去国美APP提现)</view>
			</view>
			<view class="other">
				<view class="item">
					<view class="info">待入账</view>
					<view class="count">
						<view>&yen;0</view>
					</view>
				</view>
				<view class="solid"></view>
				<view class="item">
					<view class="info">已失效</view>
					<view class="count">
						<view>&yen;0</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 导航栏 -->
		<u-tabs :list="list" active-color="red" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="message">
			<image src="../../../static/images/user/no-rebate.png" mode=""></image>
			<view class="text">暂无返利</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '待入账'
				}, {
					name: '已入账'
				}, {
					name: '已失效'
				}],
				current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
.rebate-container {
	.money {
		height: 450rpx;
		color: #fff;
		.recorded {
			height: 300rpx;
			background: url(../../../static/images/user/user-bgu.png) no-repeat;
			background-size: 150%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.count {
				display: flex;
				align-items: baseline;
				.number {
					font-size: 60rpx;
				}
			}
			.info {
				margin: 10rpx 0;
			}
			.reminder {
				color: #eee;
				font-size: 26rpx;
			}
		}
		.other {
			height: 150rpx;
			display: flex;
			align-items: center;
			background-color: rgb(236, 27, 31);
			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.count {
					font-size: 40rpx;
					margin-top: 10rpx;
				}
			}
			.solid {
				height: 40rpx;
				border: 2rpx solid #fff;
			}
		}
	}
	.message {
		display: flex;
		height: 500rpx;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		image {
			width: 260rpx;
			height: 260rpx;
		}
		.text {
			margin-top: 40rpx;
			color: #666;
		}
	}
}
</style>
