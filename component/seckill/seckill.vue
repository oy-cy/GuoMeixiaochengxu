<template>
	<view class="seckill-shelf">
		<view class="title">
			<image class="img" src="../../static/images/shop/seckill.png" mode=""></image>
			<u-count-down class="djs" border-color="#303133" :show-border="true" :show-days="false" font-size="24" color="#ffffff" bg-color="#303133"
			 :timestamp="timestamp">
			</u-count-down>
		</view>
		<scroll-view scroll-x="true" class="content">
			<block v-for="(item, index) in goodsData" :key="item.id"  >
				<view class="item" @tap.stop="goGoodsDetail(item.id)">
					<view class="img">
						<image :src="item.sku_thumbImg_url" mode=""></image>
					</view>
					<text class="goods-price">￥{{ item.sku_price }}</text>
					<text class="item-title">{{ item.sku_name }}</text>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: ['goodsData'],
		data() {
			return {
				timestamp: 86400,
			};
		},
		methods: { 
			goGoodsDetail(id) {
				uni.navigateTo({
					url:"/pages/goodsDetail/goodsDetail?goodsId=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.seckill-shelf {
		width: 715rpx;
		margin: 20rpx auto;
		border-radius: 32rpx;
		overflow: hidden;
		background-color: #FFFFFF;
		
		.title {
			display: flex;
			align-items: center;
			margin: 20rpx 30rpx;
			.img {
				width: 134rpx;
				height: 32rpx;
			}
			.djs {
				margin-left: 20rpx;
			}
		}

		.content {
			white-space: nowrap; // 滚动必须加的属性
			width: 100%;
			height: 290upx;
			// padding: 20upx;
			margin: 0 auto;

			.item {
				width: 24%;
				margin-left: 20upx;
				display: inline-block;
				vertical-align: top;

				.img {
					display: inline-block;

					image {
						width: 170upx;
						height: 200upx;
						border-radius: 6upx;
					}
					
				}

				.item-title {
					display: block; // 让字体换行
					font-size: 20upx;
					line-height: 40upx;
					text-overflow: ellipsis;
					// display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}


				.goods-price {
					display: block;
					margin-left: 52rpx;
					font-size: 28rpx;
					color: #f20c59;
					font-weight: 600;
				}

			}
		}
	}
</style>
