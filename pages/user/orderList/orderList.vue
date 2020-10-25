<template>
	<view class="order-list-container">
		<!-- 顶部导航栏 -->
		<van-sticky>
			<view class="tabs">
				<view :class="['item',active==0?'select':'']" @click="setActive(0)">全部</view>
				<view :class="['item',active==1?'select':'']" @click="setActive(1)">待付款</view>
				<view :class="['item',active==2?'select':'']" @click="setActive(2)">待收货</view>
				<view :class="['item',active==3?'select':'']" @click="setActive(3)">已完成</view>
				<view :class="['item',active==4?'select':'']" @click="setActive(4)">已取消</view>
			</view>
		</van-sticky>
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
							<view class="cancel" v-if="item.status != 0 && item.status != 1 && item.status != 4" @click="deleteOrder">
								<image src="/static/images/user/delete.png" mode=""></image>
							</view>
						</view>
					</view>
					<navigator class="content-box" :url="'/pages/order/orderDetails/orderDetails?orderId='+item.id">
						<block v-for="(good,indexs) in item.buyGoods" :key="indexs">
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
					</navigator>
					<view class="bottom">
						<view class="total">
							共<text class="count">{{item.count}}</text>件商品，实付:<text class="total_price">&yen;{{getTotalPrice(item.buyGoods)}}</text>
						</view>
					</view>
				</view>
				<!-- 订单对应操作 -->
				<view class="order_no_pay" v-if="getTime(item)">
					<view class="time">
						剩余支付时间：
						<text>{{getHour(item)}}</text>：
						<text>{{getMinute(item.create_time)}}</text>：
						<text>{{getSecond(item.create_time)}}</text>
					</view>
					<view class="cancel" v-if="item.status == 0" @click="cancelOrder(item.id)">取消订单</view>
					<view class="cancel" v-if="item.status == 4">等待发货</view>
					<view class="to_pay" v-if="item.status == 0" @click="payOrder(item.id)">立刻支付</view>
					<view class="to_pay" v-if="item.status ==1" @click="confirm(item.id)">确认收货</view>
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
						id:1,
						status:2,
						buyGoods:[
							{
								goodName:'七河源大米25kg 长粒粳米 东北大米 长粒香米',
								price:20,
								count:4,
								goodImg:'http://gfs17.gomein.net.cn/T17OD5BKAT1RCvBVdK_80.jpg?v=2?v=2'
							}
						],
					},
					{
						id:2,
						status:3,
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
					}
				]
			}
		},
		methods: {
			setActive(active){
				this.active = active;
			},
			// 取消订单
			cancelOrder(id){
				// todo 将订单转为已取消
			},
			// 立刻支付
			payOrder(id){
				// todo 将订单转为未收货
			},
			// 删除订单
			deleteOrder(id){
				// 将订单修改成已删除
			},
			// 确认订单
			confirm(id){
				// 将订单修改成已完成
			}
		},
		onLoad(option) {
			var status = option.status;
			if(status){
				this.active = status;
			}
			// 调用接口返回对应的状态订单(todo)
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
						case 4:
							return '待发货';
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
			// 判断未付款订单或未收货或未发货订单是否已到时间(过期：转为已取消并返回false，未过期返回true)
			getTime(){
				return function(item){
					// 将当前时间戳-生成时间戳
					var timestamp = (new Date()).getTime();
					timestamp -= item.create_time;
					if(item.status == 0 && (timestamp > (60*60*24))){
						// todo 将订单转为已取消状态
						return false;
					}else if(item.status == 4 && (timestamp > (60*60*24*7))){
						// todo 7天未发货自动转为已取消
						return false;
					}else if(item.status == 1 && (timestamp > (60*60*24*7))){
						// todo 发货并过7天自动转为已完成
						return false;
					}else if(item.status == 2 || item.status == 3){
						return false;
					}else {
						return true;
					}
				}
			},
			// 返回剩余小时
			getHour(){
				return function(item){
					var currentTimestamp = (new Date()).getTime();
					currentTimestamp -= item.create_time;
					if(item.status == 0){
						var time = currentTimestamp/60/60%24;
						if(time == 0){
							return '00';
						}else if(time.length == 1 && time != 0){
							return '0'+time;
						}
						return time;
					}else {
						var time = currentTimestamp/60/60;
						if(time == 0){
							return '00';
						}else if(time.length == 1 && time != 0){
							return '0'+time;
						}
						return time;
					}
				}
			},
			// 返回剩余分钟
			getMinute(){
				return function(timestamp){
					var currentTimestamp = (new Date()).getTime();
					currentTimestamp -= timestamp;
					var time = currentTimestamp/60%24;
					if(time == 0){
						return '00';
					}else if(time.length == 1 && time != 0){
						return '0'+time;
					}
					return time;
				}
			},
			// 返回剩余秒
			getSecond(){
				return function(timestamp){
					var currentTimestamp = (new Date()).getTime();
					currentTimestamp -= timestamp;
					var time = currentTimestamp%60;
					if(time.length == 1 && time != 0){
						return '0'+time;
					}
					return time;
				}
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
						font-size: 30rpx;
						padding-right: 16rpx;
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
		.order_no_pay {
			display: flex;
			font-size: 24rpx;
			justify-content: flex-end;
			align-items: center;
			background-color: #fff;
			padding: 14rpx 0;
			view {
				margin: 0 10rpx;
			}
			.cancel {
				color: #555;
				border: 2rpx solid #555;
				padding: 6rpx 12rpx;
				border-radius: 40rpx;
			}
			.to_pay {
				color: #F20C59;
				border: 2rpx solid #F20C59;
				padding: 6rpx 12rpx;
				border-radius: 40rpx;
			}
			.time {
				display: flex;
				font-size: 26rpx;
				text {
					background-color: #000;
					color: #fff;
					padding: 4rpx;
				}
			}
		}
	}
}
</style>
