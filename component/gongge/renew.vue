<template>
	<view class="renew" >
		<view class="headline">
			{{title}}
		</view>
		
		<scroll-view scroll-x class="strip">
				<view class="goodbox" v-for="(item,index) in renewData" :key="index" @click="skipGood(index)">
					<view class="img">
						<image :src="item.img_url" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="message">
						<view class="text">
							{{item.text}}
						</view>
						<view class="price">
							<text class="money">
								￥{{item.price}}
							</text>
							<text class="car" @click.stop="addCar(index)">
								
							</text>
						</view>
					</view>
					
				</view>
				
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:["renewData","title"],
		methods:{
			skipGood(index){
				console.log(index)
				uni.navigateTo({
					url:'/pages/goodsDetail/goodsDetail'
				})
			},
			addCar(index){
				console.log(index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.renew{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 30rpx;
		overflow: hidden;
		.headline{
			margin: 20rpx 0; 
			font-size: 40rpx;
			font-weight: 700;
		}
		.strip{
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			margin: 30rpx 0;
			.goodbox{
				white-space:normal !important; 
				display: inline-block;
				// background: #0062CC;
				margin-right: 10rpx;
				width: 210rpx;
				font-size: 30rpx;
				 word-wrap: break-word;
					
				
				.img{
					width: 210rpx;
					height: 210rpx;
					border-radius: 10rpx;
					overflow: hidden;
				}
				
				.message{
					padding: 10rpx;
					.text{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.price{
						display: flex;
						margin-top: 20rpx;
						.money{
							flex: 1;
							color: #F20C59;
							font-weight: 700;
						}
						.car{
							// flex: 1;
							width: 60rpx;
							height: 60rpx;
							background-color: red;
							text-align: right;
						}
					}
				}
				
			}
		}
	}
</style>
