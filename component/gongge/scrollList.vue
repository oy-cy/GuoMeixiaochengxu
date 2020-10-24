<template>
	<view class="scrollList" >
		<view class="headline" v-if="headline != undefined">
			{{headline}}
		</view>
		
		<scroll-view scroll-x class="strip">
				<view class="goodbox" v-for="(item,index) in goodlist" :key="index" @click="skipGood(item.id)">
					<view class="img">
						<view class="ranking" v-if="headline == '热卖榜单'">
							<image :src="'../../static/images/gongge/LeaderboardNO'+(index+1)+'.png'" style="width: 100%;height: 100%;"></image>
						</view>
						<image :src="item.sku_thumbImg_url" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="message">
						<view class="text">
							{{item.sku_name}}
						</view>
						<view class="price">
							<text class="money">
								￥{{item.sku_price}}
							</text>
							<view class="car" @click.stop="addCar(index)">
								<image src="../../static/images/gongge/car.png" style="width: 100%;height: 100%;"></image>
							</view>
						</view>
					</view>
					
				</view>
				
		</scroll-view>
	</view>
</template>

<script>
	import {getRecommend,getSellingList,getSeckill} from "../../api/common.js"
	export default {
		props:["title",'catId'],
		data(){
			return{
				headline:'',
				goodlist:[]
			}
		},
		created() {
			if(this.title == "rob"){
				this.headline = "抢购"
				this.getSeckillData();
				
			}else if(this.title == "exchange"){
				this.headline = "换新推荐"
				this.getRecommendData()
			}else if(this.title == "hot"){
				this.headline = "热卖榜单"
				this.getSellingListData()
			}else{
				this.getSellingListData()
			}
			
			
		},
		methods:{
			skipGood(index){
				uni.navigateTo({
					url:'/pages/goodsDetail/goodsDetail?goodsId='+goodsId
				})
			},
			addCar(index){
				console.log(index)
			},
			async getSeckillData(){
				var {message} = await getSeckill();
				this.goodlist = message;
				console.log("zz",this.goodlist)
			},
			async getRecommendData(){
				var {message} = await getRecommend(1);
				this.goodlist = message
			},
			async getSellingListData(){
				var {message} = await getSellingList(1);
				this.goodlist = message
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.scrollList{
		margin: 20rpx 0;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 30rpx;
		overflow: hidden;
		.headline{
			margin: 20rpx; 
			font-size: 40rpx;
			font-weight: 700;
		}
		.strip{
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			margin-top: 30rpx;
			.goodbox{
				white-space:normal !important; 
				display: inline-block;
				margin-right: 10rpx;
				width: 210rpx;
				font-size: 30rpx;
				 word-wrap: break-word;
					
				
				.img{
					
					position: relative;
					width: 210rpx;
					height: 210rpx;
					border-radius: 10rpx;
					overflow: hidden;
					.ranking{
						position: absolute;
						top: 0rpx;
						left: 0rpx;
						width: 40rpx;
						height: 40rpx;
						
					}
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
							width: 40rpx;
							height: 40rpx;
							text-align: right;
						}
					}
				}
				
			}
		}
	}
</style>
