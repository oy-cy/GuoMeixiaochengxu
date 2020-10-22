<template>
	<view class="user_container">
		<view class="yet-login" v-if="isLogin">
			<!-- 顶部用户信息 -->
			<view class="user">
				<view class="user-photo" @click="outLogin">
					<image :src="userInfo.avatarUrl" mode=""></image>
				</view>
				<view class="user-info">
					<view class="user-name">{{userInfo.nickName}}</view>
				</view>
			</view>
			<!-- 金额、返利 -->
			<view class="money">
				<block v-for="(item,index) in money" :key='index'>
<<<<<<< HEAD
					<navigator class="item" :url="index==0?'/pages/user/balance/balance':'/pages/user/rebate/rebate'">
=======
					<navigator class="item" :url="index==0?'/pages/user/balance/balance':`/pages/user/rebate/rebate?index=`+(index-1)">
>>>>>>> 3f92226f0f0103c181045eaa820ab7c56e9774ca
						<view class="count">&yen;<text>{{item.balance}}</text></view>
						<view class="info">{{item.info}}</view>
					</navigator>
					<view class="border-left" v-if="index != (money.length-1)"></view>
				</block>
			</view>
			<!-- 我的订单 -->
			<view class="order">
				<view class="title">我的订单</view>
				<view class="order-info">
					<!-- 全部订单 -->
					<navigator url="/pages/user/orderList/orderList" class="item">
						<image src="../../static/images/user/all-order.png" mode=""></image>
						<view class="info">全部订单</view>
					</navigator>
					<!-- 待付款 -->
					<navigator url="/pages/user/orderList/orderList?status=1" class="item">
						<image src="../../static/images/user/obligation.png" mode=""></image>
						<view class="info">待付款</view>
					</navigator>
					<!-- 待收货 -->
					<navigator url="/pages/user/orderList/orderList?status=2" class="item">
						<image src="../../static/images/user/receiving.png" mode=""></image>
						<view class="info">待收货</view>
					</navigator>
					<!-- 已完成 -->
					<navigator url="/pages/user/orderList/orderList?status=3" class="item">
						<image src="../../static/images/user/done.png" mode=""></image>
						<view class="info">已完成</view>
					</navigator>
				</view>
			</view>
			<!-- 我的分享活动 -->
			<view class="activity">
				<view class="title">我的分享活动</view>
				<view class="all-activity">
					<view class="group-booking">
						<navigator class="activity-title" url="/pages/user/group/group">
							<image src="../../static/images/user/group-booking.png" mode=""></image>
							<text>拼团</text>
						</navigator>
						<navigator class="info" url="/pages/user/group/group">
							<text>好友拼单享优惠</text>
							<text> > </text>
						</navigator>
					</view>
				</view>
			</view>
			<!-- 底部-客服热线 -->
			<view class="hotline">
				<view class="info">
					<image src="../../static/images/user/service.png" mode=""></image>
					<text class="phone-text">客服电话</text>
					<text class="phone">4008113333</text>
					<text class="time">(服务时间：9:00~21:00)</text>
				</view>
				<view class="version">v1.0.0</view>
			</view>
		</view>
		<view class="no-login" v-else>
			<view class="image">
				<image src="../../static/images/user/no-login.png" mode=""></image>
			</view>
			<button type="default" class="btn" open-type="getUserInfo" @getuserinfo="login">开启授权登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否登录
				isLogin:false,
				// 用户信息
				userInfo:{},
				// 模拟金额返利
				money:[
					{
						info:'可提现金额',
						balance:0
					},
					{
						info:'待入账返利',
						balance:0
					},
					{
						info:'已入账返利',
						balance:0
					}
				]
			};
		},
		onLoad() {
			this.isLogin = getApp().globalData.isLogin;
			this.userInfo = getApp().globalData.userInfo;
		},
		methods:{
			// 退出登录
			outLogin(){
				getApp().globalData.isLogin = false;
				this.isLogin = false;
				uni.setStorage({
					key:'isLogin',
					data:false
				})
			},
			// 登录
			login(){
				var _this = this;
				uni.login({
					provider:'wexin',
					// 登录成功
					success(info){
						// 获取openid start
						var appid = 'wxdc3ba8b14831e4db'; //填写微信小程序appid  
						var secret = '1dea52b5f60ada9dfe7dd87cc50b440b'; //填写微信小程序secret  
						//调用request请求api转换登录凭证  
						uni.request({
							url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&grant_type=authorization_code&js_code=' + loginCode.code,
							header: {
								'content-type': 'application/json'
							},
							success: function (res) {
								console.info(res.data.openid) //获取openid
							}
						})
						// 获取openid end
						
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function (infoRes) {
								var userInfo = infoRes.userInfo;
								// 登录成功，保存当前登陆用户信息
								getApp().globalData.userInfo = userInfo;
								getApp().globalData.isLogin = true;
								_this.isLogin = true;
								uni.setStorage({
									key:'userInfo',
									data:userInfo
								})
								uni.setStorage({
									key:'isLogin',
									data:true
								})
							},
							fail() {
								console.log("用户信息获取失败");
							}
						})
					},
					fail(res) {
						uni.showToast({
							title:"登录失败，请稍后再试",
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" >
.user_container {
	background-color: #eee;
	.yet-login {
		.user {
			display: flex;
			align-items: center;
			padding: 70rpx 30rpx;
			background: url(../../static/images/user/user-bgu.png) center no-repeat;
			background-size: 125%;
			.user-photo {
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
					overflow: hidden;
				}
			}
			.user-info {
				.user-name {
					color: #fff;
					font-size: 38rpx;
					margin-left: 20rpx;
				}
			}
		}
		.money {
			display: flex;
			align-items: center;
			padding: 40rpx 0;
			background-color: #fff;
			margin-bottom: 20rpx;
			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				.count {
					color: red;
					text {
						font-size: 42rpx;
					}
				}
				.info {
					margin-top: 10rpx;
					color: #999;
					font-size: 30rpx;
				}
			}
			.border-left {
				height: 50rpx;
				border-left: 2rpx solid #c5c5c5;
			}
		}
		.order {
			background-color: #fff;
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			.title {
				padding: 30rpx 0;
			}
			.order-info {
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 10rpx 0;
					image {
						width: 60rpx;
						height: 60rpx;
					}
					.info {
						margin-top: 20rpx;
						color: #777;
						font-size: 30rpx;
					}
				}
			}
		}
		.activity {
			background-color: #fff;
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			.title {
				padding: 30rpx 0;
			}
			.all-activity {
				padding: 20rpx 0;
				.group-booking {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.activity-title {
						display: flex;
						align-items: center;
						image {
							width: 60rpx;
							height: 60rpx;
						}
					}
					.info {
						color: #888;
					}
				}
			}
		}
		.hotline {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-top: 40rpx;
			font-size: 30rpx;
			.info {
				display: flex;
				align-items: center;
				image {
					width: 40rpx;
					height: 40rpx;
				}
				text {
					padding: 0 8rpx;
				}
				.phone-text {
					color: #555;
				}
				.phone {
					color: skyblue;
				}
				.time {
					color: #888;
				}
			}
			.version {
				margin-top: 50rpx;
				color: #888;
			}
		}
	}
	.no-login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		.image {
			display: flex;
			height: 400rpx;
			align-items: center;
			image {
				width: 400rpx;
				height: 230rpx;
			}
		}
		.btn {
			width: 80%;
			color: #fff;
			border-radius: 50rpx;
			background-color: rgb(250,30,130);
		}
	}
}
</style>
