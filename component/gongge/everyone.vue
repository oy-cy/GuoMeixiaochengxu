<template>
	<view class="everyone">
		<view class="top">
			<view class="title">
				<image src="../../static/images/gongge/everyone.jpg" style="width: 100%;height: 100%;"></image>
			</view>
			<u-tabs :list="tabsList" :is-scroll="true" active-color="#f20c59" :current="currentTitle" bg-color="#F2F2F2" @change="change"></u-tabs>
		</view>
		
		<k-scroll-view ref="k-scroll-view" :loadTip="loadTip" :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight"
		 :height="height" :bottom="bottom" :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown"
		 @onPullUp="handleLoadMore" >
			 <view class="nogoodList" v-if="goodlist.length == 0">
				暂无商品数据
			 </view>
			<view class="classifyGoods" v-if="goodlist.length != 0">
				<view class="goods-item" v-for="(item,index) in goodlist" :key="index" @click="goodDetails(item.id)">
					<view class="img-container">
						<image class="img" :src="item.sku_thumbImg_url"></image>
					</view>
					<view class="info">
						<view class="text">
							<text class="title_tag">{{item.extProperty}}</text>
							<text class="title">{{item.sku_name}}</text>
						</view>
						<view class="goods-tag-list-box">
							<text class="goods-tag-list" v-for="(color,indexs) in item.tagList" :key="indexs" 
							:style="{'border': '1rpx solid #'+color.tagColor, 'color': '#'+color.tagColor}">{{color.tagName}}</text>
						</view>
						
						<view class="price">
							<view class="content">
								<text class="symbol">￥</text>
								<text class="money">{{item.sku_price}}</text>
							</view>
							<view class="car-logo" @click.stop="addcar(item)">
								<image class="img" src="../../static/images/shop/car-tag.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</k-scroll-view>
		
		<goTop></goTop>
	</view>
</template>

<script>
	
	import {getGoodsList,getCategory} from "@/api/common.js";
	import goTop from "@/component/goTop/goTop";
	export default {
		props:["pageid"],
		data(){
			return{
				page:1,
				currentTitle:0,
				tabsList: [],
				goodlist:[],
				catId:1,
				
				
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '',
				touchHeight: 50,
				height: 1050,
				bottom: 50,
				autoPullUp: true,
				stopPullDown: false, // 如果为 false 则不使用下拉刷新，只进行上拉加载
			}
		},
		async created() {
			
			// console.log("asdfasdfsd",this.goodlist )
			this.getCategoryData(this.pageid);
		},
		methods:{
			addcar(data){
				this.$store.commit('setaddcar',data);
			},
			
			async change(obj){
				this.currentTitle = obj.index;
				this.page = 1;
				this.catId = obj.id;
				this.goodlist = await this.getGoodsListData(obj.id);
				 
			},
			
			async getGoodsListData(id){
				var {message} = await getGoodsList(id,this.page);
				
				message.forEach(v=>{
					v.tagList = JSON.parse(v.tagList)
				})
				return message;
			},
			goodDetails(id){
				uni.navigateTo({
					url:"/pages/goodsDetail/goodsDetail?goodsId="+id
				})
			},
			
			async getCategoryData(catId){
				var {message} = await getCategory(catId)
				console.log("sadfasdfsafsdf",message);
				this.tabsList = message;
				
				this.goodlist = await this.getGoodsListData(message[0].cat_id);
			},
			
			
			
			async handleLoadMore(stopLoad) {
	
				this.page++;
				var message = await this.getGoodsListData(this.catId);
				stopLoad ? stopLoad() : '';
				if (message.length == 0) {
					uni.showToast({
						title:"客官已到底了哦~",
						icon: "none"
					})
					stopLoad ? stopLoad({
						isEnd: true
					}) : '';
					return;
				}else{
					message.map(v => {
						this.goodlist.push(v)
					})
				}
				
			}
		},
		components:{
			goTop
		}
	}
</script>

<style lang="scss" scoped> 
	.everyone{
		.top{
			position: sticky;
			top: 0;
			z-index: 100;
			background-color: #F2F2F2;
			margin-bottom: 20rpx;
			.title{
				margin: 0 auto;
				width: 360rpx;
				height: 60rpx;
			}
		}
		
		.nogoodList{
			    display: flex;
			    justify-content: center;
			    font-size: 38rpx;
			    color: #F25D8F;
			    font-weight: 700;
		}
		.classifyGoods {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			background-color: #EFEFEF;
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
						margin: 10rpx 0;
						border-radius: 5rpx;
					}
				}
			}
		}
			
	}
</style>
