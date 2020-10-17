<template>
	<view class="shop-container">
		<!-- 头部 -->
		<view class="header">
			<view class="guomei" v-if="isShowLogo">
				<image src="../../static/images/shop/guomei-logo.png" mode=""></image>
			</view>
			<view class="search">
				<van-search value="" shape="round" placeholder="请输入搜索关键词" />
			</view>
			<view class="scan-content">
				<image class="scan" src="../../static/images/shop/scan2.png" mode=""></image>
				<view class="text">扫一扫</view>
			</view>
			<view class="classify-content">
				<image class="classify" src="../../static/images/shop/classify2.png" mode=""></image>
				<view class="text">分类</view>
			</view>
		</view>
		<!-- 门店背景图 -->
		<view class="shop-info">
			<image src="../../static/images/shop/guomeiBgc.jpg" mode=""></image>
			<!-- 门店直送 -->
			<view class="shop-sending">
				<view class="info">
					<view class="shop-name">大中体验店（北京团结湖店）</view>
					<view class="electric">电器</view>
				</view>
				<view class="shopowner-info">
					<view class="head-portrait">
						<image src="https://s5.mogucdn.com/mlcdn/c45406/200914_2h0527b99edb7ik6j5gg9aekfeb6e_400x400.jpg_280x280.v1cAC.70.webp" mode=""></image>
					</view>
					<view class="name-flag">
						<view class="user-info">
							<text class="username">高小美</text>
							<image src="https://js.gomein.net.cn/ssr/statics/images/tag_jinpaidianzhang@2x.0bff75c.png" mode=""></image>
						</view>
						<view class="slogan">精英团队，为您服务</view>
					</view>
				</view>
				<view class="lightning">
					<image src="http://gfs10.gomein.net.cn/T1vjY5BKZv1RCvBVdK.png" mode=""></image>
				</view>
			</view>
			
		</view>
		<!-- 轮播图 -->
		<view class="wrap">
				<u-swiper name="src" mode="rect" height="220" :list="list"></u-swiper>
		</view>
		<view class="">
			哈哈
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowLogo: false,
				isLogo: false,
				list: [{
						"src": "https://s17.mogucdn.com/mlcdn/c45406/200921_87ldda0j8h471b350k3j4j385c4b0_1060x367.png_750x9999.v1c7E.81.webp"
					},
					{
						"src": "https://s18.mogucdn.com/mlcdn/c45406/200921_4e5bg8jhl9g2cfe5ceicg390hd0jk_1060x367.png_750x9999.v1c7E.81.webp"
					},
					{
						"src": "https://s11.mogucdn.com/mlcdn/c45406/200918_8ejchh64dibb26k7dij56jhkcg3e6_1060x367.jpg_750x9999.v1c7E.81.webp"
					},
					{
						"src": "https://s17.mogucdn.com/mlcdn/c45406/200918_5el5c299817hl8g79ikbjh7fh1li3_1060x367.jpg_750x9999.v1c7E.81.webp"
					},
					{
						"src": "https://s2.mogucdn.com/mlcdn/c45406/200921_42b2gi6cj54faak3lbah6c2abhh22_1060x367.png_750x9999.v1c7E.81.webp"
					}
				],
			};
		},
		methods: {

		},
		// 监听当前页面的滚动
		onPageScroll: function(event) {
			var {
				scrollTop
			} = event;
			var position = 50; // 设定高度50
			// console.log("滚动距离",scrollTop);
			if (scrollTop > position && this.isLogo == false) {
				this.isShowLogo = true;
				this.isLogo = true;
				console.log("大于50");
			} else if (scrollTop < position && this.isLogo == true) {
				this.isShowLogo = false;
				this.isLogo = false;
				console.log("小于50");
			}
		},
	}
</script>

<style lang="scss" scoped>
	.shop-container {
		height: 2000rpx;
		background-color: #F2F2F2;
		.br {
			border-radius: 32rpx;
			margin: 20rpx;
		}
		.header {
			position: fixed;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			background-color: #FFFFFF;
			// background-color: rgba($color: #fff, $alpha: 0.5);
			z-index: 999;
			// opacity: 0.6;
			.guomei {
				width: 60rpx;
				height: 60rpx;
				margin-left: 20rpx;
				border-radius: 100rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.search {
				flex: 1;
			}

			.scan-content {
				text-align: center;

				.scan {
					width: 44rpx;
					height: 44rpx;
					margin-top: 12rpx;
				}

				.text {
					font-size: 20rpx;
					color: #878787;
				}
			}

			.classify-content {
				text-align: center;

				.classify {
					width: 44rpx;
					height: 44rpx;
					padding: 0 20rpx;
					margin-top: 12rpx;
					// background-color: red;
				}

				.text {
					font-size: 20rpx;
					color: #878787;
				}
			}

		}

		.shop-info {
			position: relative;
			width: 100%;
			height: 552rpx;
			image {
				width: 100%;
				height: 100%;
			}

			.shop-sending {
				position: absolute;
				top: 640rpx;
				width: 715rpx;
				// height: 400rpx;
				border-radius: 32rpx;
				background-color: #FFFFFF;
				z-index: 1;
				left: 50%;
				transform: translate(-50%,-50%);	
				overflow: hidden;
				.info {
					display: flex;
					text-align: center;
					justify-content: center;
					align-items: center;
					.shop-name {
						font-size: 44rpx;
						color: #262c32;
						font-weight: 600;
						padding: 30rpx 0;
					}

					.electric {
						width: 70rpx;
						height: 42rpx;
						line-height: 42rpx;
						// text-align: center;
						font-size: 26rpx;
						color: #ee4980;
						background-image: linear-gradient(180deg, #ffecf3, #ffdee9);
						border-radius: 20rpx 8rpx 8rpx 5rpx;
					}
				}
				.shopowner-info {
					display: flex;
					align-items: center;
					height: 150rpx;
					.head-portrait {
						width: 118rpx;
						height: 118rpx;
						border-radius: 100rpx;
						overflow: hidden;
						margin: 30rpx;
						image {
							
						}
						
					}
					.name-flag {
						image {
							width: 132rpx;
							height: 32rpx;
						}
						.user-info {
							margin-bottom: 6rpx;
							.username {
								font-size: 32rpx;
								font-weight: 600;
							}
							image {
								margin-left: 10rpx;
							}
						}
						.slogan {
							font-size: 28rpx;
							color: #999999;
						}
					}
					
				}
				.lightning {
					height: 100rpx;
					padding-top: 20rpx;
					image {
						width: 100%;
					}
				}
			}
			
		}

		.wrap {
			width: 715rpx;
			margin: auto;
			margin-top: 304rpx;
			border-radius: 32rpx;
			overflow: hidden;
		}
	}
</style>
