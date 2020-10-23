<template>
	<view class="everyone">
		<view class="top">
			<view class="title">
				<image src="../../static/images/gongge/everyone.jpg" style="width: 100%;height: 100%;"></image>
			</view>
			<!--  -->
			<u-tabs :list="tabsList" :is-scroll="true" active-color="#f20c59" :current="currentTitle" bg-color="#F2F2F2" @change="change"></u-tabs>
		</view>
			
			
				
		<view class="classifyGoods">
			<view class="goods-item" v-for="(item,index) in goodlist" :key="index" @click="goodDetails(item.id)">
				<view class="img-container">
					<image class="img" :src="item.sku_thumbImg_url"></image>
				</view>
				<view class="info">
					<view class="text">
						<text class="title_tag">{{item.extProperty}}</text>
						<text class="title">{{item.sku_name}}</text>
					</view>
					<view class="goods-tag-list">易卡分期</view>
					<view class="price">
						<view class="content">
							<text class="symbol">￥</text>
							<text class="money">{{item.sku_price}}</text>
						</view>
						<view class="car-logo">
							<image class="img" src="../../static/images/shop/car-tag.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadmore"/>
	</view>
</template>

<script>
	
	import {getGoodsList,getCategory} from "../../api/common.js"
	export default {
		props:["pageid"],
		data(){
			return{
				status: 'loadmore',
				iconType: 'circle',
				loadText: {
					loadmore: '加载更多(*^▽^*)',
					loading: '喝杯茶等一下正在努力加载中ヾ(≧▽≦*)o',
					nomore: '还没看够吗ψ(｀∇´)ψ'
				},
				page:1,
				currentTitle:1,
				tabsList: [],
				goodlist:[]
			}
		},
		created() {
			this.getGoodsListData(1);
			this.getCategoryData();
		},
		methods:{
			change(obj){
				this.currentTitle = obj.index;
				this.page = 1;
				this.getGoodsListData(obj.id)
				console.log(obj)
			},
			loadmore(obj){
				// if(data == null){
				// 	this.status = 'nomore'
				// }
				this.status = 'loading'
			},
			async getGoodsListData(id){
				var {message} = await getGoodsList(id,this.page);
				this.page++;
				this.goodlist = message;
			},
			goodDetails(id){
				uni.navigateTo({
					url:"/pages/goodsDetail/goodsDetail?id="+id
				})
			},
			
			async getCategoryData(){
				var {message} = await getCategory("shop")
				console.log("sadfasdfsafsdf",message);
				this.tabsList = message;
			}
		}
	}
</script>

<style lang="scss" scoped> 
	.everyone{
		.top{
			position: sticky;
			top: 0;
			z-index: 100;
			background-color: #F2F2F2;
			margin-bottom: 20rpx;
			.title{
				margin: 0 auto;
				width: 360rpx;
				height: 60rpx;
			}
		}
		
		.classifyGoods {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
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
