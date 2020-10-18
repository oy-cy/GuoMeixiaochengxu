<template>
	<view class="ranking">
		<view class="headline">
			热卖榜单
		</view>
			<scroll-view scroll-x class="listbox" :enable-flex="true"  >
				<view class="list " 
				v-for="(item,index) in rankingdata[0]" 
				:key="index" @click="listclick(item.id)"
				:class="[select==item.id?'listselect':'',rankingdata[0].length <=3?'listcenter':'']"

				>
						{{item.name}}
						<view></view>
				</view>
			</scroll-view>
			<scroll-view scroll-x class="strip">
				<view class="goodbox" v-for="(item,index) in rankingdata[1]" :key="index" v-if="item.listid == select" @click="skipGood(index)">
					<view class="img">
						<view class="location">
							
						</view>
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
		props:["rankingdata"],
		data(){
			return {
				select:1
			}
		},
		created() {
			console.log(this.rankingdata)
			this.select = this.rankingdata[0][0].id
		},
		methods:{
			listclick(id){
				this.select = id
			},
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
	.ranking{
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
		
		.listbox{
			height: 80rpx;	
			display: flex;
			white-space: nowrap;
			
			.list{
				font-size: 40rpx;
				text-align: center;	
				width: 20%;
				margin: 0 20rpx;
				
			}
			.listselect{
				font-weight: 800;
				color: #F54882;
				view{
					margin: 0 auto;
					width: 50rpx;
					height: 6rpx;
					background-color: #F54882;
				}
			}
		}
		.strip{		
			display: flex;
			white-space: nowrap;
			justify-content: center;
			.goodbox{
				white-space:normal !important; 
				display: inline-block;
				margin-right: 10rpx;
				width: 210rpx;
				font-size: 30rpx;
				.img{
					position: relative;
					.location{
						position:absolute;
						top: 0rpx;
						left: 0rpx;
						width: 50rpx;
						height: 50rpx;
						background-color: red;
					}
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
							width: 60rpx;
							height: 60rpx;
							background-color: red;
							text-align: right;
						}
					}
				}
				
			}
		}
		.listcenter{
			justify-content: center;
		}
	}
</style>
