<template>
	<view class="order_details_container">
		<view class="order_details" :style="{'padding-bottom':(order.status==0?'150rpx':'0')}">
			<!-- 订单顶部 -->
			<view class="top">
				<view class="status">
					<view class="text">
						{{getOrderStatus}}
					</view>
					<view class="time">
						剩余支付时间：
						<text>{{getHour}}</text>：
						<text>{{getMinute}}</text>：
						<text>{{getSecond}}</text>
					</view>
				</view>
				<view class="image">
					<image :src="getImgUrl()" mode=""></image>
				</view>
			</view>
			<!-- 订单地址 -->
			<view class="dispatching">
				<!-- <view class="situation" v-if="order.status!=0 && order.status!=4">
					<view class="image"><image src="/static/images/order/car.png" mode=""></image></view>
					<view class="situation_info">
						<view class="text">配送单{{getOrderStatus}}</view>
						<view class="time">
							{{order.update_time}}
						</view>
					</view>
				</view> -->
				<view class="addr">
					<view class="image"><image src="/static/images/order/addr.png" mode=""></image></view>
					<view class="addr_info">
						<view class="text">
							<text class="addr_text">配送地址</text>
							<text class="recipients_name">{{order.user_name}}</text>
							<text class="recipients_phone">{{order.phone}}</text>
						</view>
						<view class="receiving_addr">
							{{order.receiving_addr}}
						</view>
					</view>
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="order_info">
				<block v-for="(good,indexs) in order.buyGoods" :key="indexs">
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
				<view class="prompt">配送时间：工作日、双休日与节日均可送货</view>
			</view>
			<!-- 在线客服 -->
			<view class="online_service">
				<view class="image"><image src="/static/images/order/server.png" mode=""></image></view>
				<view class="text">在线客服</view>
			</view>
			<!-- 支付方式 -->
			<view class="way">
				<view class="left">支付方式：</view>
				<view class="right">在线支付</view>
			</view>
			<!-- 发票 -->
			<view class="way">
				<view class="left">发票内容：</view>
				<view class="right">不开发票</view>
			</view>
			<!-- 金额 -->
			<view class="price">
				<view class="main_info">
					<view class="good_total">
						<view class="text">商品总价</view>
						<view class="info">
							<text>{{getTotalCount}}件</text>
							<text>{{getTotalPrice}}</text>
						</view>
					</view>
					<view class="freight">
						<view class="text">运费</view>
						<view class="info">+&yen;0.00</view>
					</view>
				</view>
				<view class="pay_price">
					<text class="text">实付款：</text>
					<text class="count">&yen;{{getTotalPrice}}</text>
				</view>
			</view>
			<!-- 下单时间 -->
			<view class="orders_time">
				<text>下单时间：</text>
				<text>{{order.create_time}}</text>
			</view>
		</view>
		<!-- 订单操作 -->
		<view class="control">
			<view class="pay_price" v-if="order.status == 0">
				<text class="text">实付款：</text>
				<text class="count">&yen;{{getTotalPrice}}</text>
			</view>
			<view class="order_control" v-if="order.status==0">
				<view class="control_color m-right" v-if="order.status == 0" @click="payOrder(order.id)">立刻支付</view>
				<view class="control_color" v-if="order.status == 0" @click="cancelOrder(order.id)">取消订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order:{
					id:1,
					status:1,
					user_name:'xi',
					phone:'157****1234',
					update_time:'2020-10-22 11:10:23',
					create_time:'2020-10-22 11:10:23',
					receiving_addr:'广东省广州市越秀区光塔街道无',
					buyGoods:[
						{
							goodName:'七河源大米25kg 长粒粳米 东北大米 长粒香米1',
							price:20,
							count:4,
							goodImg:'http://gfs17.gomein.net.cn/T17OD5BKAT1RCvBVdK_80.jpg?v=2?v=2'
						},
						{
							goodName:'七河源大米25kg 长粒粳米 东北大米 长粒香米2',
							price:80,
							count:4,
							goodImg:'http://gfs17.gomein.net.cn/T17OD5BKAT1RCvBVdK_80.jpg?v=2?v=2'
						}
					]
				}
			}
		},
		onLoad(option) {
			if(option){
				this.orderId = option.orderId;
			}
		},
		computed: {
			// 获取订单状态
			getOrderStatus(){
				switch (this.order.status){
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
				var timestamp = this.order.create_time;
				var currentTimestamp = (new Date()).getTime();
				currentTimestamp -= timestamp;
				if(this.order.status == 0){
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
			},
			// 返回剩余分钟
			getMinute(){
				var timestamp = this.order.create_time;
				var currentTimestamp = (new Date()).getTime();
				currentTimestamp -= timestamp;
				var time = currentTimestamp/60%24;
				if(time == 0){
					return '00';
				}else if(time.length == 1 && time != 0){
					return '0'+time;
				}
				return time;
			},
			// 返回剩余秒
			getSecond(){
				var timestamp = this.order.create_time;
				var currentTimestamp = (new Date()).getTime();
				currentTimestamp -= timestamp;
				var time = currentTimestamp%60;
				if(time.length == 1 && time != 0){
					return '0'+time;
				}
				return time;
			}
		},
		methods: {
			// 获取对应订单图片
			getImgUrl(){
				switch (this.order.status){
					case 0:
						return '/static/images/order/unpaid.png';
					case 1:
						return '/static/images/order/drop-shipping.png';
					case 2:
						return '/static/images/order/accomplish.png';
					case 3:
						return '/static/images/order/cancel.png';
					case 4:
						return '/static/images/order/delivery.png';
					default:
						break;
				}
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.order_details_container {
	background-color: rgb(243,245,247);
	font-size: 28rpx;
	.order_details {
		.top {
			height: 200rpx;
			display: flex;
			align-items: center;
			background-color: #439bce;
			padding: 0 60rpx;
			justify-content: space-between;
			.status {
				color: #fff;
				font-size: 38rpx;
				.time {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					text {
						background-color: #000;
						color: #fff;
						padding: 4rpx;
					}
				}
			}
			.image {
				image {
					width: 140rpx;
					height: 140rpx;
				}
			}
		}
		.dispatching {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-top: 20rpx;
			.situation {
				display: flex;
				padding: 20rpx;
				.image {
					display: flex;
					align-items: center;
					image {
						width: 50rpx;
						height: 40rpx;
					}
				}
				.situation_info {
					flex: 1;
					display: flex;
					flex-direction: column;
					border-bottom: 2rpx solid #aaa;
					margin: 0 20rpx;
					.text {
						color: #07C160;
					}
					.time {
						color: #777;
						font-size: 26rpx;
						padding: 6rpx 0 16rpx 0;
					}
				}
			}
			.addr {
				display: flex;
				padding: 20rpx;
				padding-top: 6rpx;
				.image {
					display: flex;
					align-items: center;
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
				.addr_info {
					display: flex;
					flex-direction: column;
					margin: 0 20rpx;
					.text {
						.addr_text {
							color: rgb(242, 12, 89);
							border: 2rpx solid rgb(242, 12, 89);
							font-size: 26rpx;
						}
						.recipients_name {
							padding: 0 20rpx;
						}
					}
					.receiving_addr {
						color: #777;
						font-size: 26rpx;
						padding-top: 14rpx;
					}
				}
			}
		}
		.order_info {
			margin-top: 20rpx;
			padding: 20rpx;
			.good-item {
				display: flex;
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
			.prompt {
				margin-top: 14rpx;
				color: #777;
			}
		}
		.online_service {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			.image {
				image {
					width: 40rpx;
					height: 40rpx;
					vertical-align: bottom;
				}
			}
			.text{
				margin-left: 20rpx;
			}
		}
		.way {
			display: flex;
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			.left {
				color: #888;
			}
		}
		.price {
			display: flex;
			flex-direction: column;
			padding: 0 20rpx;
			margin-top: 20rpx;
			.main_info {
				display: flex;
				flex-direction: column;
				border-bottom: 2rpx solid #aaa;
				.good_total {
					display: flex;
					justify-content: space-between;
					padding-top: 14rpx;
					.text {
						color: #888;
					}
				}
				.freight {
					display: flex;
					justify-content: space-between;
					padding: 14rpx 0;
					.text {
						color: #888;
					}
				}
			}
			.pay_price {
				display: flex;
				font-size: 36rpx;
				padding: 26rpx 0;
				justify-content: flex-end;
				.count {
					color: rgb(242, 12, 89);
				}
			}
		}
		.orders_time {
			display: flex;
			font-size: 26rpx;
			color: #888;
			background-color: #fff;
			padding: 20rpx;
		}
		
	}
	.control {
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		.pay_price {
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			background-color: #ffff7f;
			padding: 0 20rpx;
			.count {
				color: red;
				font-weight: 600;
			}
		}
		.order_control {
			height: 90rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0 20rpx;
			.control_color {
				color: #555;
				border: 2rpx solid #555;
				padding: 6rpx 12rpx;
				border-radius: 40rpx;
			}
		}
		.m-right {
			margin-right: 26rpx;
		}
	}
}
</style>
