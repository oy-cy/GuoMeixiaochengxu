<template>
	<view class="order-list-container">
		<!-- 顶部导航栏 -->
		<view class="tabs">
			<view :class="['item',active==0?'select':'']" @click="setActive(0)">全部</view>
			<view :class="['item',active==1?'select':'']" @click="setActive(1)">待付款</view>
			<view :class="['item',active==2?'select':'']" @click="setActive(2)">待收货</view>
			<view :class="['item',active==3?'select':'']" @click="setActive(3)">已完成</view>
			<view :class="['item',active==4?'select':'']" @click="setActive(4)">已取消</view>
		</view>
		<!-- 无订单 -->
		<view class="no-order" v-if="orderList.length==0">
			<view class="image">
				<image src="/static/images/user/no-order.png" mode=""></image>
			</view>
			<view class="text">您还没有相关订单</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list" v-else>
			<block v-for="(item,index) in orderList" :key="index">
				<view class="item">
					<view class="top">
						<view class="shop-info">
							<view class="shop-img"><image src="/static/images/shop/guomeiBgc.jpg" mode=""></image></view>
							<view class="shop-name">{{item.shopName}}</view>
						</view>
						<view class="order-status">
							<view class="status">{{item.status}}</view>
							<view class="cancel"><image src="/static/images/user/delete.png" mode=""></image></view>
						</view>
					</view>
					<view class="content-box">
						<view class="good-img"><image :src="item.goodImg" mode=""></image></view>
						<view class="info">
							<view class="good-name">{{item.goodName}}</view>
							<view class="price-box">
								<view class="price">&yen;{{item.goodPrice}}</view>
								<view class="count">x{{item.count}}</view>
							</view>
						</view>
					</view>
					<view class="bottom">
						<view class="total">
							共<text class="count">{{item.count}}</text>件商品，实付:<text class="total_price">&yen;{{item.totalPrice}}</text>
						</view>
						<view class="manipulate">
							<view class="">
								
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前选中
				active: 0,
				// 订单数据
				orderList:[
					// {
					// 	shopName:'深圳观澜店',
					// 	status:'已完成',
					// 	goodImg:'http://gfs17.gomein.net.cn/T17OD5BKAT1RCvBVdK_80.jpg?v=2?v=2',
					// 	goodName:'七河源大米25kg 长粒粳米 东北大米 长粒香米',
					// 	goodPrice:20,
					// 	count:4,
					// 	totalPrice:80
					// },
					// {
					// 	shopName:'深圳观澜店',
					// 	status:'已完成',
					// 	goodImg:'http://gfs17.gomein.net.cn/T17OD5BKAT1RCvBVdK_80.jpg?v=2?v=2',
					// 	goodName:'七河源大米25kg 长粒粳米 东北大米 长粒香米',
					// 	goodPrice:20,
					// 	count:4,
					// 	totalPrice:80
					// }
				]
			}
		},
		methods: {
			setActive(active){
				this.active = active;
			}
			// 调用接口返回对应的状态订单(todo)
		},
		onLoad(option) {
			var status = option.status;
			if(status){
				this.active = status;
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-list-container {
	height: 100vh;
	color: #333;
	background-color: rgb(243,245,247);
	.tabs {
		position: sticky;
		display: flex;
		background-color: #fff;
		.item {
			flex: 1;
			display: flex;
			justify-content: center;
			padding: 20rpx;
		}
		.select {
			color: rgb(242,12,89);
			border-bottom: 4rpx solid rgb(242,12,89);
		}
	}
	.no-order {
		height: 800rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.image {
			image {
				width: 240rpx;
				height: 240rpx;
			}
		}
		.text {
			color: #999;
		}
	}
	.order-list {
		display: flex;
		flex-direction: column;
		.item {
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;
			.top {
				display: flex;
				justify-content: space-between;
				background-color: #fff;
				padding: 20rpx 0;
				.shop-info {
					display: flex;
					.shop-img {
						image {
							width: 60rpx;
							height: 40rpx;
							vertical-align: text-bottom;
						}
					}
					.shop-name {
						color: #111;
					}
				}
				.order-status {
					display: flex;
					.status {
						color: rgb(242,12,89);
					}
					.cancel {
						margin: 0 44rpx;
						image {
							vertical-align: bottom;
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
			.content-box {
				display: flex;
				margin: 16rpx;
				font-size: 26rpx;
				.good-img {
					image {
						width: 150rpx;
						height: 150rpx;
					}
				}
				.info {
					display: flex;
					.good-name {
						flex: 1;
						padding: 0 10rpx;
					}
					.price-box {
						display: flex;
						flex-direction: column;
						align-items: flex-end;
						width: 110rpx;
						font-size: 28rpx;
						.count {
							padding-top: 40rpx;
							color: #999;
						}
					}
				}
			}
			.bottom {
				display: flex;
				justify-content: flex-end;
				font-size: 28rpx;
				background-color: #fff;
				padding: 20rpx 0;
				.total {
					display: flex;
					align-items: baseline;
					color: #999;
					padding: 0 20rpx;
					.count {
						color: #111;
					}
					.total_price {
						color: #111;
						font-size: 38rpx;
						padding-left: 12rpx;
					}
				}
			}
		}
	}
}
</style>
