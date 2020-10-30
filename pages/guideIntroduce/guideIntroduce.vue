<template>
	<view class="guide-container">
		<view class="header">
			<view class="head-portrait">
				<view class="face_box">
					<image :src="introduceInfo.imgUrl"mode=""></image>
				</view>
				<view class="tag">{{ introduceInfo.grade }}</view>
			</view>
		</view>
		<view class="main"> 
			<view class="info">
				<view class="name">{{ introduceInfo.sales_assistant_name }}</view>
				<view class="serve">服务单数</view>
				<view class="number">{{ introduceInfo.number_of_people_served }}</view>
			</view>
			<view class="brand-container">
				<view class="their-brand"> 
					<view class="title">所属品牌</view>
					<view class="text-content">
						<view class="text">{{ introduceInfo.good_at_brand }}</view>
					</view>
				</view>
				<view class="category-content">
					<view class="title">擅长品类</view>
					<view class="text-content">
						<view class="box" v-for="(category,index) in introduceInfo.g_category" :key="index">
							<view class="text">{{ category }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="title">评价</view>
			<view class="img-container">
				<image src="../../static/images/common/empty.png" mode=""></image>
			</view>
			<view class="evaluate">暂无评价</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				introduceInfo: {}
			};
		},
		onLoad: function(options) {
			this.introduceInfo = JSON.parse(options.Introduce);
		}
	}
</script>

<style lang="scss" scoped>
	.guide-container {
		background: #F3F5F7;
		padding-bottom: 100rpx;
		.header {
			padding: 100rpx 20rpx 20rpx 20rpx;
			border-radius: 30rpx;
			margin: 0 20rpx;
			.head-portrait {
				position: absolute;
				top: 5%;
				left: 50%;
				transform: translate(-50%, -50%);
				padding-top: 100rpx;
				.face_box {
					width: 130rpx;
					height: 130rpx;
					border-radius: 100rpx;
					;
					border: 3rpx solid #E6B365;
					// overflow: inherit;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.tag {
					position: absolute;
					top: 100%;
					left: 50%;

					transform: translate(-50%, -50%);
					width: 110rpx;
					text-align: center;
					font-size: 22rpx;
					color: #FFFFFF;
					background-color: #e6b365;
					border-radius: 20rpx;
					// margin: 10rpx 0;

				}
			}
			
		}
		.main {
			padding-top: 90rpx;
			border-radius: 30rpx;
			background-color: #FFFFFF;
			margin: 0 20rpx;
			.info {
				text-align: center;
				.name{
					font-size: 32rpx;
				}
				.serve {
					font-size: 24rpx;
					color: #BEC2C6;
					margin-top: 10rpx;
				}
			}
			.brand-container {
				padding: 30rpx 20rpx;
				.their-brand {
					display: flex;
					.title {
						margin-right: 27rpx;
					}
					.text-content {
						
						display: flex;
						flex-wrap: wrap;
						flex: 1;
						.text {
							
						}
					}
				
				}
				.category-content {
					display: flex;
					padding: 20rpx 0;
					.title {
						margin-right: 27rpx;
					}
					.text-content {
						display: flex;
						flex-wrap: wrap;
						flex: 1;
						.box {
							.text {
								padding: 10rpx 20rpx;
								text-align: center;
								font-size: 22rpx;
								border-radius: 30rpx;
								background-color: #f3f5f7;
								margin-right: 10rpx;
								margin-top: 10rpx;
							}
						}
					
					}
				}
			}
		}
		.bottom {
			height: 654rpx;
			border-radius: 30rpx;
			margin: 20rpx;
			background-color: #FFFFFF;
			.img-container {
				width: 320rpx;
				height: 320rpx;
				margin: auto;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.title {
				font-size: 32rpx;
				padding: 30rpx;	
			}
			.evaluate {
				text-align: center;
				color: #C1C3C5;
			}
		}
	}
</style>
