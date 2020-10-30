<template>
	<view class="select-addr-container">
		<view class="list" v-for="(item,index) in receivingAddr">
			<view class="item"> 
				<view class="info" @click="setSelectCity(item.id)">
					<view class="raduis-view">
						<view class="raduis">
							<view v-if="item.is_select==1" class="color"></view>
						</view>
					</view>
					<view class="consignee-info">
						<view class="basic-info">
							<view class="name">{{item.receiver}}</view>
							<view class="phone">{{item.phone.substr(0,3)+"****"+item.phone.substr(7)}}</view>
						</view>
						<view class="addr-info">
							<view class="default" v-if="item.is_default">默认</view>
							{{item.addr}}
						</view>
					</view>
				</view>
				<navigator :url="getEditPage(item)" class="edit">
					<view class="image"><image src="../../../static/images/site/edit.png" mode=""></image></view>
					<view class="text">编辑</view>
				</navigator>
			</view>
		</view>
		<navigator :url="getUrl" class="button">新增地址</navigator>
	</view>
</template>

<script>
import { getAddrs,setSelectAddr } from '@/api/user.js';
	export default {
		data() {
			return {
				// 收货地址
				receivingAddr:[
					// {addr:'深圳市龙华区观澜街道淑女路',name:'花花的贝贝',phone:'157****1010',isDeafault:1,select:0},
					// {addr:'深圳市龙华区观澜街道淑女路',name:'花花的贝贝',phone:'157****1010',isDeafault:1,select:1}
				],
				// 是否购物车过来的页面
				car:false
			}
		},
		async onLoad(option) {
			if(option && option.car){
				this.car = true;
			}
			// 获取当前用户的地址列表
			var data = await getAddrs(getApp().globalData.userInfo.userId);
			this.receivingAddr = data.message;
		},
		methods: {
			setSelectCity(id){
				// 调用修改默认地址
				setSelectAddr(getApp().globalData.userInfo.userId,id);
				if(this.car == true){
					uni.navigateBack();
					return;
				}
				uni.switchTab({
					url:"/pages/home/home"
				})
			}
		},
		computed:{
			getUrl(){
				if(this.car == true){
					return '/pages/site/addAddr/addAddr?car=true';
				}else {
					return '/pages/site/addAddr/addAddr';
				}
			},
			getEditPage(){
				return function(item){
					if(this.car == true){
						return `/pages/site/editAddr/editAddr?id=${item.id}&car=true`
					}else {
						return `/pages/site/editAddr/editAddr?id=${item.id}`
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.select-addr-container {
	position: relative;
	height: 100vh;
	background-color: rgb(243,245,247);
	margin-bottom: 100rpx;
	.list {
		display: flex;
		flex-direction: column;
		.item {
			margin: 20rpx;
			padding: 30rpx 0;
			display: flex;
			height: 150rpx;
			background-color: #fff;
			.info {
				flex: 1;
				display: flex;
			}
			.raduis-view {
				width: 50rpx;
				padding-left: 20rpx;
				.raduis {
					width: 16rpx;
					height: 16rpx;
					margin-top: 10rpx;
					border-radius: 50%;
					padding: 2rpx;
					border: 2rpx solid #aaa;
					.color {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						overflow: hidden;
						background-color: #f20c59;
					}
				}
			}
			.consignee-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				.basic-info {
					display: flex;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
					.phone {
						padding-left: 30rpx;
					}
				}
				.addr-info {
					margin-top: 20rpx;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					color: #555;
					font-size: 30rpx;
					.default {
						display: inline-block;
						color: #f20c59;
						border: 1px solid #f20c59;
						font-size: 22rpx;
						border-radius: 10%;
						margin-right: 10rpx;
					}
					.addr {
						flex: 1;
					}
				}
			}
			.edit {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 20rpx;
				width: 140rpx;
				border-left: 2rpx solid #eee;
				.image {
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
				.text {
					font-size: 30rpx;
					color: #555;
				}
			}
		}
	}
	.button {
		position: fixed;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		font-size: 38rpx;
		color: #fff;
		background-color: #f20c59;
	}
}
</style>
