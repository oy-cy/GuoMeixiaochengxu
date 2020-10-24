<template>
	<view class="order-container">
		<!-- 收货地址 -->
		<view class="deliverySite" @click="compileSite">
			<van-cell is-link v-if="!isSite">
			  <view slot="title" class="SiteSlot">
				 <van-icon name="add-o" color="#F30C59"  size="50rpx"/>
			    <view class="site">{{site}}</view>
			  </view>
			</van-cell>
			<view class="SiteMessage" v-else>
				<view class="info">
					<text class="isDefault" v-if="userSite.is_default == 1">
						默认
					</text>
					<view class="addr">
						{{userSite.addr}}
					</view>
				</view>
				<view class="addr_details">
					<van-cell :title="userSite.addr_details" is-link title-style="font-size:48rpx;font-weight: 600;" />
				</view>
				<view class="user-info">
					<view class="name">
						{{userSite.receiver}}
					</view>
					<view class="phone">
						{{userSite.phone}}
					</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
		<!-- 商品信息 -->
		<view class="goods-info">
			<view class="shop">
				<van-icon name="shop-o" />
				<view class="shop-name">
					国美家电(安防学院店)
				</view>
			</view>
			<view class="goods">
				<!-- 商品的信息 -->
				<view class="msg" v-for="(item,index) in goodsList" :key="index">
					<image :src="item.sku_thumbImg_url"></image>
					<view class="msgs">
						<view class="goods-title">
							{{item.sku_name}}{{item.shop_specification}}
						</view>
						<view class="price-count">
							<view class="price">
								¥<text class="prices">{{item.sku_price}}</text>.00
							</view>
							<view class="count">
								×{{item.com_count}}
							</view>
						</view>
						<view class="tag">
							7天无理由退货
						</view>
					</view>
				</view>
				<!-- 送货 -->
				<view class="deliver">
					<van-cell title="送货" value="商家配送" is-link />
					<view class="right">
						送货：{{deliveryTime}}
					</view>
				</view>
				<!-- 备注 -->
				<view class="leave">
					备注
					 <van-field
					    :value="leave"
					    placeholder="备注前建议先和商家沟通确认"
					    :border="false"
					    bind:change="onChange"
					  />
				</view>
			</view>
		</view>
		
		<!-- 支付方式 -->
		<view class="payment-way">
			<van-cell title="支付" value="在线支付" is-link />
			<van-cell title="发票" value="暂不需要发票" is-link />
		</view>
		
		<!-- 优惠 -->
		<view class="discounts">
			<van-cell title="优惠卷" value="无可用优惠卷" is-link />
			<van-cell>
			  <view slot="title" class="text">
			  	<view class="van-cell-text">
			  		美豆
			  	</view>
				<view class="van-cell-content">
					共0美豆,满100美豆可以使用 
					<u-icon name="info-circle" color="#ccc" size="40"></u-icon>
				</view>
				<view class="van-cell-value">
					<u-icon name="minus-circle" color="#ccc" size="50"></u-icon>
				</view>
			  </view>
			</van-cell>
		</view>
		<!-- 总价运费 -->
		<view class="countPrice">
			<view class="count">
				<view class="count-title">
					商品总计
				</view>
				<view class="price-content">
					¥ {{countPrice}}.00
				</view>
			</view>
			<view class="freight">
				<view class="freight-title">
					运费
				</view>
				<view class="freight-content">
					¥ {{freight}}.00
				</view>
			</view>
		</view>
		<!-- 支付 -->
		<view class="payment">
			<van-button type="primary" block @click="toPay" >微信支付 ¥ {{ countPrice + freight }}.00</van-button>
		</view>
	</view>
</template>

<script>
	import {getaddrs} from "@/api/order.js"
	export default {
		data() {
			return {
				isSite:false,
				site:"请先填写收货地址",
				userSite:{},
				userInfo:getApp().globalData.userInfo,
				goodsList:[
					{
						sku_name:"军装多袋裤工装裤纯色裤男长裤潮直筒加肥大码休闲军裤男户外裤子  AT(L 橙色)",
						sku_price:162,
						com_count:1,
						shop_specification:"",
						sku_thumbImg_url:"http://gfs17.gomein.net.cn/T1scKmBvVT1RCvBVdK"
					}
				],
				deliveryTime:"工作日,双休日与假日送",
				leave:"",
				countPrice:0,
				freight:0,
			}
		},
		methods: {
			// 初始化
			init(){
				this.getCountPrice();
			},
			// 获取地址
			async getaddrs(){
				let {message} = await getaddrs(this.userInfo.userId);
				if(message.length != 0){
					this.isSite = true;
					this.userSite = message[0];
					this.userSite.phone = this.userSite.phone.replace(this.userSite.phone.substring(3,7), "****")
				}
			},
			// 跳转到地址管理页面
			compileSite(){
				uni.navigateTo({
					url:"/pages/site/selectAddr/selectAddr?car=true"
				})
			},
			// 计算总价
			getCountPrice(){
				console.log(123321)
				this.goodsList.map(v=>{
					this.countPrice +=(v.sku_price * v.com_count)
				})
			},
			// 付款
			toPay() {
				
			 }
		},
		onLoad(option) {
			if(option.goodsInfo){
				
				this.goodsList = JSON.parse(option.goodsInfo);
			}
			this.init()
		},
		onShow() {
			this.getaddrs();
		}
	}
</script>

<style lang="scss">
	.order-container{
		background-color: #F3F5F7;
		overflow: hidden;
		// 地址
		.deliverySite{
			padding: 20rpx 20rpx 0 20rpx;
			margin: 20rpx 30rpx;
			border-radius: 20rpx;
			background-color: #fff;
			.van-cell{
				// margin-bottom: 30rpx;
				.SiteSlot{
					display: flex;
					.site{
						margin-left: 10rpx;
						color: #333;
						font-size: 34rpx;
					}
				}
			}
		
			.line {
				background-color: #FF0000;
				background: url(../../static/images/line.png);
				background-size: 88rpx;
				height: 8rpx;
				width: 100%;
			}
			
			.SiteMessage{
				.info{
					display: flex;
					flex-direction: colum;
					align-items: center;
					.isDefault{
						margin-top: 8rpx;
						margin-right: 18rpx;
						font-size: 20rpx;
						color: #F20C59;
						border: 2rpx solid #F20C59;
					}
					.addr{
						font-size: 32rpx;
					}
				}
				.addr_details{
					padding: 20rpx 0 20rpx 0rpx;
					.van-cell{
						padding: 0;
					}
				}
				.user-info{
					display: flex;
					padding-bottom: 30rpx;
					color: #333;
 					.name{
						width: 170rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					.phone{
						flex: 1;
					}
				}
			}
		}
		
		// 商品信息
		.goods-info{
			margin: 30rpx;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 26rpx;
			.shop{
				display: flex;
				.van-icon{
					margin: 0 30rpx ;
					font-size: 38rpx;
					color: #B4B7BA;
				}
				.shop_name{
					font-size: 34rpx;
					color: #53585D;
				}
			}
			.goods{
				.msg{
					display: flex;
					
					margin-top: 50rpx;
					image{
						width: 180rpx;
						height: 180rpx;
						border-radius: 20rpx;
					}
					.msgs{
						margin-left: 16rpx;
						font-size: 26rpx;
						flex: 1;
						.goods-title{
							line-height: 40rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							margin-bottom: 18rpx;
						}
						.price-count{
							display: flex;
							justify-content: space-between;
							align-items: center;
							.price{
								color: #f20c59;
								.prices {
									font-size: 40rpx;
									font-weight: 700
								}
							}
							.count{
								color: #3F536E;
								
							}
						}
					}
					.tag{
						display: inline-block;
						color: #f20c59;
						background-color: #ffeff4;
						font-size: 24rpx;
					}
				}
				
				.deliver{
					margin-top: 30rpx;
					.van-cell{
						padding: 0;
						.van-cell__value{
							color: #333;
							font-weight: 600;
						}
					}
					.right{
						font-weight: 600;
						text-align: right;
						padding-right: 64rpx;
						font-size: 26rpx;
						color: #333;
					}
				}
			
				.leave{
					display: flex;
					align-items: center;
					margin-top: 30rpx;
					.van-field{
						margin-left: 30rpx;
					}
				}
			}
		}
		
		// 支付方式
		.payment-way{
			background-color: #fff;
			margin: 30rpx;
			border-radius: 25rpx;
			overflow: hidden;
			.van-cell{
				.van-cell__value{
					color: #333;
					font-weight: 600;
				}
			}
		}
		
		// 优惠
		.discounts{
			background-color: #fff;
			margin: 30rpx;
			border-radius: 25rpx;
			overflow: hidden;
			.van-cell{
				display: flex;
				.text{
					position: relative;
					display: flex;
					.van-cell-content{
						display: flex;
						align-items: center;
						margin-left: 60rpx;
						.u-icon{
							vertical-align:middle;
							margin-left: 14rpx;
						}
					}
					.van-cell-value{
						position: absolute;
						right: 0rpx;
						.u-icon{
							vertical-align:middle;
							margin-left: 14rpx;
						}
					}
				}
			}
		}
		
		.countPrice{
			background-color: #fff;
			margin: 30rpx;
			padding: 30rpx;
			border-radius: 25rpx;
			overflow: hidden;
			margin-bottom: 80rpx;
			.count{
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.count-title{
					color: #333;
				}
				.price-content{
					color: #f20c59;
					font-weight: 700;
				}
			}
			
			.freight{
				display: flex;
				justify-content: space-between;
				.freight-title{
					color: #333;
				}
				.freight-content{
					color: #f20c59;
					font-weight: 700;
				}
			}
		}
	
		.payment{
			background-color: #fff;
			padding: 20rpx;
		}
	}

</style>
