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
							<view class="status">{{orderStatus(item.status)}}</view>
							<view class="cancel" v-if="item.status != 0 && item.status != 1 && item.status != 4" @click="deleteOrder(item.id,index)">
								<image src="/static/images/user/delete.png" mode=""></image>
							</view>
						</view>
					</view>
					<navigator class="content-box" :url="'/pages/order/orderDetails/orderDetails?orderId='+item.id">
						<block v-for="(good,indexs) in item.orderLlsts" :key="indexs">
							<view class="good-item">
								<view class="good-img"><image :src="good.skuThumbImgUrl" mode=""></image></view>
								<view class="info">
									<view class="good-name">{{good.skuName}}</view>
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
							共<text class="count">{{item.count}}</text>件商品，实付:<text class="total_price">&yen;{{getTotalPrice(item.orderLlsts)}}</text>
						</view>
					</view>
				</view>
				<!-- 订单对应操作 -->
				<view class="order_no_pay">
					<view class="cancel" v-if="item.status == 0" @click="cancelOrder(item.id,index)">取消订单</view>
					<view class="cancel" v-if="item.status == 4">等待发货</view>
					<view class="to_pay" v-if="item.status == 0" @click="payOrder(item.id,index)">立刻支付</view>
					<view class="to_pay" v-if="item.status ==1" @click="confirm(item.id,index)">确认收货</view>
				</view>
			</block>
			<!-- 支付密码框 -->
			<jpPwd ref="jpPwds"  @completed="completed" contents=" " forgetName=" "></jpPwd>
			<!-- 密码错误 -->
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
import jpPwd from '@/components/jp-pwd/jp-pwd.vue';
import { getCommodityDetails } from '@/api/goodsDetail.js';
import { getUserOrders,getOrderByStatus,deleteOrder,updateOrderStatus } from '@/api/order.js';
	export default {
		data() {
			return {
				// 当前选中
				active: 0,
				// 订单数据
				orderList:[],
				userId:'',
				current:{id:'',index:''}
			}
		},
		components:{
			jpPwd
		},
		async onLoad(option) {
			this.userId = getApp().globalData.userInfo.userId;
			var status = option.status;
			var bool = option.bool;
			if(status){
				this.active = status;
				var data = await getOrderByStatus(this.userId,status-1);
				this.orderList = data;
				return;
			}
			if(bool){
				if(this.active!=0){
					var data = await getOrderByStatus(this.userId,this.active-1);
					this.orderList = data;
				}else {
					var data = await getUserOrders(this.userId);
					this.orderList = data;
				}
				return;
			}
			// 调用接口返回对应的状态订单(todo)
			var data = await getUserOrders(this.userId);
			this.orderList = data;
		},
		methods: {
			// 支付判断
			async completed(e) {
				  if (e == '123456') {
					this.$refs.jpPwds.toCancel()
					// todo 将订单转为等发货
					await updateOrderStatus(this.current.id,4);
					if(this.active != 0){
						this.orderList.splice(this.current.index,1);
					}else {
						var data = await getUserOrders(this.userId);
						this.orderList = data;
					}
					this.current = {};
				 } else {
					 this.$refs.uToast.show({
						title: '密码错误',
						type: 'default',
					 })
				   this.$refs.jpPwds.backs()
				 }
			 },
			async setActive(active){
				this.active = active;
				switch (active){
					case 0:
						var data = await getUserOrders(this.userId);
						this.orderList = data;
						break;
					case 1:
						var data = await getOrderByStatus(this.userId,0);
						this.orderList = data;
						break;
					case 2:
						var data = await getOrderByStatus(this.userId,1);
						this.orderList = data;
						break;
					case 3:
						var data = await getOrderByStatus(this.userId,2);
						this.orderList = data;
						break;
					case 4:
						var data = await getOrderByStatus(this.userId,3);
						this.orderList = data;
						break;
					default:
						break;
				}
			},
			// 取消订单
			async cancelOrder(id,index){
				// todo 将订单转为已取消
				await updateOrderStatus(id,3);
				if(this.active != 0){
					this.orderList.splice(index,1);
				}else {
					var data = await getUserOrders(this.userId);
					this.orderList = data;
				}
			},
			// 立刻支付
			payOrder(id,index){
				this.$refs.jpPwds.toOpen()
				this.current.id = id;
				this.current.index = index;
			},
			// 删除订单
			async deleteOrder(id,index){
				// 将订单修改成已删除
				await deleteOrder(id);
				this.orderList.splice(index,1);
			},
			// 确认订单
			async confirm(id,index){
				// 将订单修改成已完成
				await updateOrderStatus(id,2);
				if(this.active != 0){
					this.orderList.splice(index,1);
				}else {
					var data = await getUserOrders(this.userId);
					this.orderList = data;
				}
			},
		},
		computed: {
			// 根据订单状态返回文字
			orderStatus(){
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
					if(!buyGoods){
						return;
					}
					var sum = 0;
					buyGoods.map(v => {
						var price = (v.price * 1000);
						var total = price * v.count;
						sum += total;
					})
					return (sum/1000);
				}
			},
			getTotalPrice(){
				return function(buyGoods){
					if(!buyGoods){
						return ;
					}
					var sum = 0;
					buyGoods.map(v => {
						var price = v.price*1000;
						price *= v.count;
						sum += price;
					})
					return sum / 1000;
				}
			}
		},
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
						width: 100%;
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
