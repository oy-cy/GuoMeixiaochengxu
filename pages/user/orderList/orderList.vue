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
							<view class="img"><image src="/static/images/order/order-img.png" mode=""></image></view>
							<view class="shop-name">国美</view>
						</view>
						<view class="order-status">
							<view class="status">{{getOrderStatus(item.status)}}</view>
							<view class="cancel"><image src="/static/images/user/delete.png" mode=""></image></view>
						</view>
					</view>
					<view class="content-box">
						<block v-for="good in item.buyGoods" :key="good.id">
							<view class="good-item">
								<view class="good-img"><image :src="good.goodImg" mode=""></image></view>
								<view class="info">
									<view class="good-name">{{good.goodName}}</view>
									<view class="price-box">
										<view class="price">&yen;{{good.price}}</view>
										<view class="count">x{{good.count}}</view>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view class="bottom">
						<view class="total">
							共<text class="count">{{item.count}}</text>件商品，实付:<text class="total_price">&yen;{{getTotalPrice(item.buyGoods)}}</text>
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
					{
						shopName:'深圳观澜店',
						buyGoods:[
							{
								goodName:'七河源大米25kg 长粒粳米 东北大米 长粒香米',
								price:20,
								count:4,
								goodImg:'http://gfs17.gomein.net.cn/T17OD5BKAT1RCvBVdK_80.jpg?v=2?v=2'
							}
						],
						status:0
					},
					{
						shopName:'深圳观澜店',
						buyGoods:[
							{
								goodName:'七河源大米25kg 长粒粳米 东北大米 长粒香米',
								price:20,
								count:4,
								goodImg:'http://gfs17.gomein.net.cn/T17OD5BKAT1RCvBVdK_80.jpg?v=2?v=2'
							},
							{
								goodName:'七河源大米25kg 长粒粳米 东北大米 长粒香米',
								price:20,
								count:4,
								goodImg:'http://gfs17.gomein.net.cn/T17OD5BKAT1RCvBVdK_80.jpg?v=2?v=2'
							}
						],
						status:0
					}
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
		},
		computed: {
			// 根据订单状态返回文字
			getOrderStatus(){
				return function(status) {
					switch (status){
						case 0:
							return '等待付款';
						case 1:
							return '待收货';
						case 2:
							return '已完成';
						case 3:
							return '已取消';
						default:
							break;
					}
				}
			},
			// 计算订单总金额
			getTotalPrice(){
				return function(buyGoods){
					var sum = 0;
					buyGoods.map(v => {
						var price = (v.price * 1000);
						var total = price * v.count;
						sum += total;
					})
					return (sum/1000);
				}
			},
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
					.img {
						image {
							width: 74rpx;
							height: 34rpx;
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
				flex-direction: column;
				font-size: 30rpx;
				.good-item {
					display: flex;
					padding: 20rpx 0;
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
