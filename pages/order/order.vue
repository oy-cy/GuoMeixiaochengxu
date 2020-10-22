<template>
	<view class="order-container">
		<!-- 收货地址 -->
		<view class="deliverySite">
			<van-cell is-link v-if="!isSite">
			  <view slot="title" class="SiteSlot">
				 <van-icon name="add-o" color="#F30C59"  size="50rpx"/>
			    <view class="site">{{site}}</view>
			  </view>
			</van-cell>
			
			<view class="line"></view>
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
			}
		},
		methods: {
			// 初始化
			init(){
				this.getaddrs()
			},
			async getaddrs(){
				let {message} = await getaddrs(1);
				if(message.length != 0){
					this.isSite = true;
					this.userSite = message[0];
					console.log("this.userSite",this.userSite)
				}
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss">
	.order-container{
		background-color: #F3F5F7;
		height: 100vh;
		overflow: hidden;
		.deliverySite{
			padding: 20rpx 20rpx 0 20rpx;
			margin: 20rpx 30rpx;
			border-radius: 20rpx;
			background-color: #fff;
			.van-cell{
				margin-bottom: 30rpx;
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
				background: url(../../static/images/line.png) 0 100% repeat-x #fff;
				background-size: 100rpx;
				height: 10rpx;
				width: 100%;
			}
		}
	}

</style>
