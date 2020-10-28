<template>
	<view class="supermarket">
		<scroll-view class="lbt">
			<swiper class="swiper" :indicator-dots='true' indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" :circular="true" :autoplay="true">  
				<swiper-item class="imgbox" v-for="(item,index) in lbdata" :key="index">
						<image :src="item.s_img" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</swiper>
		</scroll-view>
		
		<van-grid column-num="4" class="gogei" icon-size="50">
			<van-grid-item v-for="(item,index) in gogeidata" :icon="item.g_img" :text="item.g_title" @click="select(index)"/>
		</van-grid>
		
		<view class="refinedselect">
			<view class="top">
				精选好货
			</view>
			<view class="goodbox">
				<van-grid column-num="3" class="gogei" gutter="3">
					 <van-grid-item use-slot  v-for="(item,index) in goodlist" :key="index" class="gridItem" @click="goodDetail(item.id)">
						 
					    <image
					      style="width: 100%; height: 280rpx;"
					      :src="item.sku_thumbImg_url"
					    />
						<view class="describe">
							<view class="title">
								{{item.sku_name}}
							</view>
							<view class="price">
								￥{{item.sku_price}}
							</view>
						</view>
					  </van-grid-item>
				</van-grid>
			</view>
		</view>
	
		
		<view class="listtop" style="position: sticky; top: 0;">
			
			<u-tabs :list="tabsList" :is-scroll="true" active-color="#f20c59" :current="currentTitle" @change="change"></u-tabs>
		</view>
	
			<view class="goodbox" v-for="(item,index) in goodlist" @click="goodDetail(item.id)">
				<image :src="item.sku_thumbImg_url" style="width: 200rpx;height: 200rpx;"></image>
				<view class="describe">
					<view class="title">
						
						<text class="title_text"><text class="title_tag">国美超市</text>{{item.sku_name}}</text>
					</view>
					<view class="price">
						￥{{item.sku_price}}
					</view>
					
				</view>
			</view>
			<view class="finish">
				看完了( •̀ ω •́ )✧
			</view>
		
		<view class="">
			
		</view>
	</view>
</template>

<script>
	import {getLunbotu} from "@/api/common.js"
	import {getGrid} from "@/api/common.js"
	import {getSeckill,getCategory} from "@/api/common.js"
	export default {
		data() {
			return {
				currentTitle:1,
				tabsList: [],
				lbdata:[],
				gogeidata:[],
				goodlist:[],
				catId:"coles"
			}
		},
		methods:{
			select(index){
				console.log(index)
			},
			change(obj){
				this.currentTitle = obj.index
				console.log(obj)
			},
			async getLunboData(){
				var {message} = await getLunbotu(this.catId);
				this.lbdata = message
			},
			async getGridData(){
				var {message} = await getGrid(this.catId);
				this.gogeidata = message
			},
			async getSeckillData(){
				var {message} = await getSeckill(1);
				this.goodlist = message
			},
			async getCategoryData(){
				var {message} = await getCategory(this.catId);
				this.tabsList = message;
			},
			
			change(obj){
				this.currentTitle = obj.index;
				this.getSeckillData()
			},
			
			
			goodDetail(id){
				uni.navigateTo({
					url:"/pages/goodsDetail/goodsDetail?goods="+id
				})
			}
		},
		created() {
			this.getLunboData();
			this.getGridData();
			this.getSeckillData();
			this.getCategoryData()
		}
	}
</script>

<style lang="scss" scoped>
	.supermarket{
		background-color: #F2F2F2;
		.lbt{
			margin: 20rpx 0;
		}
		
		.gogei{
			background-color: #fff;
		}
		
		.refinedselect{
			margin: 20rpx 0;
			.top{
				margin: 20rpx 0;
				padding: 20rpx;
				background-color: #fff;
			}
			.goodbox{
				.gogei{
					/deep/.van-grid-item__content{
						border-radius: 10rpx;
						overflow: hidden;
					}
					.describe{
						.title{
							font-size: 30rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.price{
							margin-top: 20rpx; 
							font-size: 38rpx;
							font-weight: 700;
							color: #F20C59;
						}
					}
				}
			}
		}
		
		.goodbox{
			background-color: #fff;
			display: flex;
			margin: 15rpx;
			.describe{
				flex: 1;
				padding: 10rpx;
				.title{
					
					.title_text{
						.title_tag{
							font-size: 24rpx;
							margin-right: 10rpx;
							background: -webkit-gradient(linear,left top,right top,from(#fa1e8c),to(#f20c59));
							background: linear-gradient(90deg,#fa1e8c,#f20c59);
						}
					
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				.price{
					margin-top: 20rpx;
					font-size: 40rpx;
					font-weight: 700;
					color: #fa1e8c;
				}
			}
		}
	
		.finish{
			text-align: center;
			font-size: 40rpx;
			padding: 20rpx 0;
			color: #ccc;
		}
		
		
	}
</style>
