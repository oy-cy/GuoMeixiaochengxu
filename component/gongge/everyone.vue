<template>
	<view class="everyone">
		<view class="top">
			<view class="title">
				<!-- <image src="../../static/images/gongge/everyone.jpg" style="width: 100%;height: 100%;"></image> -->
			</view>
			<!--  -->
			<u-tabs :list="tabsList" :is-scroll="true" active-color="#f20c59" :current="currentTitle" @change="change"></u-tabs>
		</view>
			
			<view class="goodsList">
				
				<view class="classifyGoods">
					<view class="goods-item" v-for="(item,index) in goodlist" :key="index">
						<view class="img-container">
							<image class="img" src="../../static/images/shop/goods1.png"></image>
						</view>
						<view class="info">
							<view class="text">
								<text class="title_tag">国美超市</text>
								<text class="title">洋河蓝色经典天之蓝52度白酒520ml*6 旗舰版口感绵柔浓香型</text>
							</view>
							<view class="goods-tag-list">易卡分期</view>
							<view class="price">
								<view class="content">
									<text class="symbol">￥</text>
									<text class="money">2587</text>
								</view>
								<view class="car-logo">
									<image class="img" src="../../static/images/shop/car-tag.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				tabsList: [
					{
						name: '全部',
						id: 10,
					}, {
						name: '国美超市',
						id: 11
					}, {
						name: '空调',
						id: 12
					},
					{
						name: '彩电',
						id: 13
					},{
						name: '冰箱',
						id: 14
					},{
						name: '洗衣机',
						id: 15
					},{
						name: '手机',
						id: 16
					}
				],
				goodlist:[
					{id:1,shop:"国美超市",introduce:"洋河蓝色经典天之蓝52度白酒520ml*6 旗舰版口感绵柔浓香型",minute:"易卡分期",price:"2587",img:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360"},
					{id:1,shop:"国美超市",introduce:"洋河蓝色经典天之蓝52度白酒520ml*6 旗舰版口感绵柔浓香型",minute:"易卡分期",price:"2587",img:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360"},
					{id:1,shop:"国美超市",introduce:"洋河蓝色经典天之蓝52度白酒520ml*6 旗舰版口感绵柔浓香型",minute:"易卡分期",price:"2587",img:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360"},
					{id:1,shop:"国美超市",introduce:"洋河蓝色经典天之蓝52度白酒520ml*6 旗舰版口感绵柔浓香型",minute:"易卡分期",price:"2587",img:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360"},
					{id:1,shop:"国美超市",introduce:"洋河蓝色经典天之蓝52度白酒520ml*6 旗舰版口感绵柔浓香型",minute:"易卡分期",price:"2587",img:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360"}
				]
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped> 
	.everyone{
		.top{
			position: sticky;
			top: 0;
			display: flex;
			justify-content: center;
			z-index: 100;
			background-color: #F2F2F2;
			.title{
				width: 300rpx;
				height: 100rpx;
			}
		}
		
		.classifyGoods {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 20rpx;
				background-color: #EFEFEF;
			
				.goods-item {
					display: flex;
					position: relative;
					flex-direction: column;
					justify-content: space-between;
					width: 49%;
					padding-bottom: 10rpx;
					background-color: #fff;
					border-radius: 20rpx;
					overflow: hidden;
					display: block;
					margin-bottom: 14rpx;
			
					.img-container {
						
						.img {
							width: 100%;
							height: 366rpx;
							
						}
					}
			
					.info {
						padding: 0 10rpx;
			
						.text {
							display: flex;
							font-size: 24rpx;
							align-items: center;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
			
							.title_tag {
								display: inline-block;
								color: #FFFFFF;
								font-size: 24rpx;
								margin-right: 10rpx;
								background: -webkit-gradient(linear,left top,right top,from(#fa1e8c),to(#f20c59));
								background: linear-gradient(90deg,#fa1e8c,#f20c59);
								border-radius: 5rpx;
							}
						}
			
						.price {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.content {
								// display: flex;
								.money {
									font-size: 36rpx;
									color: #f20c59;
									font-weight: 700;
								}
								.symbol {
									font-size: 20rpx;
									color: #f20c59;
									font-weight: 700;
								}
							}
							
							.car-logo {
								.img {
									width: 55rpx;
									height: 55rpx;
								}
							}
						}
						.goods-tag-list {
							width: 100rpx;
							font-size: 24rpx;
							text-align: center;
							color: rgb(242, 12, 86);
							border-color: rgb(242, 12, 86);
							border: 1rpx solid rgb(242, 12, 86);
							margin: 10rpx 0;
							border-radius: 5rpx;
						}
					}
				}
			}
	}
</style>
