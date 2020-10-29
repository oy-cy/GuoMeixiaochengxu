<template>
	<view class="guide-container">
		<view class="title-content">
			<view class="title">全心全意，为您服务</view>
			<view class="after"></view>
		</view>
		<view class="list">
			<view class="item" v-for="item in guideData" :key="item.id" @tap="goIntroduce(item)">
				<view class="container">
					<view class="left">
						<view class="img-container">
							<image :src="item.imgUrl" mode=""></image>
						</view>
						<view class="info">
							<view class="content">
								<text class="tip"></text>
								<text class="nickname">{{ item.sales_assistant_name }}</text>
							</view>
							<view class="flag">{{ item.grade }}</view>
							<view class="serve">已服务 {{ item.number_of_people_served }} 单</view>
						</view>
					</view>
					<view class="right">
						<view class="icon first-icon">
							<image src="../../static/images/shop/consult.png" mode=""></image>
							<text class="text">咨询</text>
						</view>
						<view class="icon">
							<image src="../../static/images/shop/appointment.png" mode=""></image>
							<text class="text">预约</text>
						</view>
					</view>
				</view> 
				<view class="bottom">
					<!-- <view class="" v-for="brand in item.good_at_brand"> -->
						<view class="good-brand">所属品牌：{{ item.good_at_brand }}</view>
					<!-- </view> -->
					<view class="tags-content">
						<view class="sale-tags-list" v-for="(category,index) in item.goods_category" :key="index">
							<view class="text-content" v-if="category">
								<text class="text">{{ category }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-content">
			<view class="template-no-more">看完啦</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['guideData'],
		data() {
			return {

			}
		},
		methods: {
			goIntroduce(item){
				var data = JSON.stringify(item)
				uni.navigateTo({
					url: "/pages/guideIntroduce/guideIntroduce?Introduce="+ data
				})
				console.log(item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.guide-container {
		.title-content {
			padding: 20rpx 0 10rpx 0;
			background-color: #FFFFFF;

			.title {
				font-size: 34rpx;
				text-align: center;
				color: #262c32;
			}

			.after {
				width: 55rpx;
				height: 8rpx;
				margin: 0 auto;
				background-color: #f20c59;
				border-radius: 10rpx;
			}
		}

		.list {
			margin-top: 10rpx;

			.item {
				padding: 30rpx 20rpx;
				margin: 10rpx 20rpx;
				border-radius: 25rpx;
				background-color: #FFFFFF;

				.container {
					display: flex;
					justify-content: space-between;

					.left {
						display: flex;
						align-items: center;

						.img-container {
							width: 132rpx;
							height: 132rpx;
							border-radius: 100rpx;
							overflow: hidden;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.info {
							margin-left: 20rpx;

							.content {
								display: flex;
								align-items: center;

								.tip {
									width: 16rpx;
									height: 16rpx;
									background-color: #09bb07;
									border-radius: 10rpx;
								}

								.nickname {
									font-size: 32rpx;
									color: #202020;
									margin-left: 10rpx;
								}
							}

							.flag {
								width: 120rpx;
								text-align: center;
								font-size: 22rpx;
								color: #FFFFFF;
								background-color: #e6b365;
								border-radius: 20rpx;
								margin: 10rpx 0;
							}

							.serve {
								font-size: 26rpx;
								color: #919599;
							}
						}
					}

					.right {
						display: flex;

						.icon {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							width: 92rpx;
							height: 92rpx;
							border-radius: 100rpx;
							background-color: #fff3e2;

							image {
								width: 32rpx;
								height: 32rpx;
							}

							.text {
								font-size: 22rpx;
								color: #c48d3a;
							}
						}

						.first-icon {
							margin-right: 20rpx;
						}
					}

				}

				.bottom {
					margin-left: 150rpx;

					.good-brand {
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
						font-size: 26rpx;
						color: #919599;
					}

					.tags-content {
						display: flex;
						.sale-tags-list {
							margin-top: 20rpx;

							.text-content {
								// display: flex;
								// width: 400rpx;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
								overflow: hidden;
								.text {
									display: inline-block;
									// width: 200rpx;
									padding: 10rpx 20rpx;
									text-align: center;
									font-size: 22rpx;
									border-radius: 30rpx;
									background-color: #f3f5f7;
									margin-right: 10rpx;
								}
							}

						}
					}

				}
			}

		}

		.bottom-content {
			padding: 30rpx 0;

			.template-no-more {
				text-align: center;
				font-size: 24rpx;
				background: url("@/static/images/shop/bottom.png") no-repeat 50%;
				background-size: 390rpx 12rpx;
			}
		}

	}
</style>
