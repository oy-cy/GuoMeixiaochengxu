<template>
	<view class="order_details_container">
		<view class="order_details" :style="{'padding-bottom':(order.status==0?'150rpx':'0')}">
			<!-- 订单顶部 -->
			<view class="top">
				<view class="status">
					<view class="text">
						{{getOrderStatus}}
					</view>
				</view> 
				<view class="image">
					<image :src="getImgUrl()" mode=""></image>
				</view>
			</view>
			<!-- 订单地址 -->
			<view class="dispatching">
				<view class="addr">
					<view class="image"><image src="/static/images/order/addr.png" mode=""></image></view>
					<view class="addr_info">
						<view class="text">
							<text class="addr_text">配送地址</text>
							<text class="recipients_name">{{order.name}}</text>
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
				<block v-for="(good,indexs) in order.orderLlsts" :key="indexs">
					<navigator class="good-item" :url="'/pages/goodsDetail/goodsDetail?goodsId='+good.good_id">
						<view class="good-img"><image :src="good.skuThumbImgUrl" mode=""></image></view>
						<view class="info">
							<view class="good-name">{{good.skuName}}</view>
							<view class="price-box">
								<view class="price">&yen;{{good.price}}</view>
								<view class="count">x{{good.count}}</view>
							</view>
						</view>
					</navigator>
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
				<text>{{$moment(item.update_time).format('YYYY-MM-DD hh:mm')}}</text>
			</view>
		</view>
		<!-- 订单操作 -->
		<view class="control">
			<view class="pay_price" v-if="order.status == 0">
				<text class="text">实付款：</text>
				<text class="count">&yen;{{getTotalPrice}}</text>
			</view>
			<view class="order_control" v-if="order.status==0||order.status==1">
				<view class="control_color m-right" v-if="order.status == 0" @click="payOrder(order.id)">立刻支付</view>
				<view class="control_color" v-if="order.status == 0" @click="cancelOrder(order.id)">取消订单</view>
				<view class="control_color" v-if="order.status == 1" @click="receiving(order.id)">确认收货</view>
			</view>
		</view>
		<!-- 支付密码框 -->
		<jpPwd ref="jpPwds"  @completed="completed" contents=" " forgetName=" "></jpPwd>
		<!-- 密码错误 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { updateOrderStatus,getOrder } from '@/api/order.js';
import jpPwd from '@/components/jp-pwd/jp-pwd.vue';
	export default {
		data() {
			return {
				order:{}
			}
		},
		components:{
			jpPwd
		},
		async onLoad(option) {
			this.orderId = option.orderId;
			this.order = await getOrder(this.orderId);
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
			// 计算订单总金额
			getTotalPrice(){
				if(!this.order.orderLlsts){
					return;
				}
				var sum = 0;
				this.order.orderLlsts.map(v => {
					var price = (v.price * 1000);
					var total = price * v.count;
					sum += total;
				})
				return (sum/1000);
			},
			// 计算总数量
			getTotalCount(){
				if(!this.order.orderLlsts){
					return;
				}
				var sum = 0;
				this.order.orderLlsts.map(v => {
					sum += v.count;
				})
				return sum;
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
			},
			// 支付判断
			async completed(e) {
				  if (e == '123456') {
					this.$refs.jpPwds.toCancel()
					await updateOrderStatus(this.order.id,4);
					uni.navigateBack({
					  success: () => {
					    let page = getCurrentPages().pop();  //跳转页面成功之后
					    if (!page) return;
					    let options = {
							bool:true
					    }
					    page.onLoad(options);
					  }
					})
				 } else {
					 this.$refs.uToast.show({
						title: '密码错误',
						type: 'default',
					 })
				   this.$refs.jpPwds.backs()
				 }
			 },
			// 订单支付
			async payOrder(id){
				this.$refs.jpPwds.toOpen()
			},
			// 取消支付
			async cancelOrder(id){
				await updateOrderStatus(id,3);
				uni.navigateBack({
				  success: () => {
				    let page = getCurrentPages().pop();  //跳转页面成功之后
				    if (!page) return;
				    let options = {
						bool:true
				    }
				    page.onLoad(options);
				  }
				})
			},
			// 确认收货
			async receiving(id){
				await updateOrderStatus(id,2);
				uni.navigateBack({
				  success: () => {
				    let page = getCurrentPages().pop();  //跳转页面成功之后
				    if (!page) return;
				    let options = {
						bool:true
				    }
				    page.onLoad(options);
				  }
				})
			},
		}
		
	}
</script>

<style lang="scss" scoped>
.order_details_container {
	height: 100vh;
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
