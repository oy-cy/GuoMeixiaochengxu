<template>
	<view class="goods-container">
		<view class="classifyGoods">
			<view class="goods-item" v-for="item in goodsList" :key="item.id" @tap.stop="goGoodsDetail(item.id)">
				<view class="img-container">
					<image class="img" :src="item.sku_thumbImg_url"></image>
				</view>
				<view class="info">
					<view class="text">
						<text class="title_tag" v-if="item.extProperty">{{ item.extProperty }}</text>
						<text class="title">{{ item.sku_name }}</text>
					</view>
					<view class="goods-tag-list">{{ item.tagList[0].tagName }}</view>
					<view class="price">
						<view class="content">
							<text class="symbol">￥</text>
							<text class="money">{{ item.sku_price }}</text>
						</view>
						<view class="car-logo"  @tap.stop="addcar(item)">
							<image class="img" src="../../static/images/shop/car-tag.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['goodsList'],
		data() {
			return {
				
			};
		},
		methods:{
			//跳转到商品详情页
			goGoodsDetail(id){
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail?goodsId="+ id
				})
			},
			addcar(data){
				uni.showToast({
					title:"成功加入购物车",
					icon:"none"
				})
				this.$store.commit('setaddcar',data);
			}
		}
	}
</script>

<style lang="scss">
	.goods-container {
		.classifyGoods {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 20rpx;
			background-color: #F3F5F7;
		
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
