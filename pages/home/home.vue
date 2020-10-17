<template>
	<view class="home-component">
		<!-- 首页头部 -->
		<view class="home-top" @tap="search">
			<view class="location-photo">
				<image src="../../static/images/homeTop/location.png" mode=""></image>
				<text class="text">深圳</text>
			</view>
			<navigator class="search" url="../search/search">
				<van-search class="van-search" value="" background="background:transparen(0)" shape="round" placeholder="请输入搜索关键词" />
			</navigator>
			<view class="scan-photo">
				<image src="../../static/images/homeTop/scan.png" mode=""></image>
				<text class="text">扫一扫</text>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="page-section-spacing">
			<swiper class="swiper" indicator-dots="true" autoplay="ture" circular="ture">
				<swiper-item class="swiper-item-check">
					<view class="swiper-item uni-bg-red">
						<image src="http://gfs5.gomein.net.cn/wireless/T1kC_7Bj__1RCvBVdK_1065_390.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item-check">
					<view class="swiper-item uni-bg-green">
						<image src="https://gfs7.gomein.net.cn/wireless/T1joV7B7LT1RCvBVdK_1065_390.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item-check">
					<view class="swiper-item uni-bg-blue">
						<image src="https://gfs9.gomein.net.cn/wireless/T1g.x7B_Vv1RCvBVdK_1065_390.jpg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 广告 -->
		<view class="guanggao">
			<image src="https://gfs5.gomein.net.cn/wireless/T177J7B_CT1RCvBVdK_1125_300.png" mode=""></image>
		</view>
		<!-- 八空格 -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.home-component {
		background-color: rgb(243, 245, 247);
		.home-top {
			//头部使用绝对定位放在轮播图之上 不过弹性布局搜索框失效
			display: flex;
			// position: absolute;
			// z-index: 1;
			justify-content: space-around;
			align-items: center;
			padding: 0 20rpx;
			background-color: #FFFFFF;
			.location-photo {
				display: flex;
				flex-direction: column;
				align-items: center;
				image {
					width: 28rpx;
					height: 28rpx;
				}
				.text {
					font-size: 26rpx;
				}
			}
			.scan-photo {
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 42rpx;
					height: 42rpx;
				}
				.text {
					font-size: 20rpx;
				}
			}
			.search {
					flex: 1;
				.van-search{
				}
			}	
		}
		.page-section-spacing{
			.swiper{
				.swiper-item-check{
					.swiper-item{
						image{
							width: 750rpx;
							height: 320rpx;
						}
					}
				}
			}
		}
		.guanggao{
			width: 710rpx;
			height: 200rpx;
			background-color: #FFFFFF;
			margin:20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
