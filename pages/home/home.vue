<template>
	<view class="home-component">
		<!-- 首页头部 -->
		<view class="home-top">
			<navigator url="../site/receivingCity/receivingCity">
				<view class="location-photo">
					<image src="../../static/images/home/location.png" mode=""></image>
					<text class="text">深圳</text>
				</view>
			</navigator>
			<navigator class="search" hover-class="none" url="../search/search">
				<van-search class="van-search" value="" background="background:transparen(0)" disabled="true" shape="round" placeholder="请输入搜索关键词" />
			</navigator>
			<view class="scan-photo" @click="scanCode()">
				<image src="../../static/images/home/scan.png" mode=""></image>
				<text class="text">扫一扫</text>
				<!-- <button @click="show=true"></button> -->
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="page-section-spacing">
			<swiper class="swiper" indicator-dots="true" autoplay="ture" circular="ture">
				<swiper-item class="swiper-item-check" v-for="item in goLunboData" :key="item.id">
					<view class="swiper-item uni-bg-red">
						<image :src="item.s_img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 广告 -->
		<view class="guanggao">
			<image src="https://gfs5.gomein.net.cn/wireless/T177J7B_CT1RCvBVdK_1125_300.png" mode=""></image>
		</view>
		<!-- 八空格 -->
		<van-grid column-num="4">
			<van-grid-item v-for="(item,index) in getGridData" :key="item.index" :icon="item.g_img" :text="item.g_title" @click="select(index)"/>
		</van-grid>	
		<!-- 国美秒杀 -->
		<view class="seckill-content">
			<seckill :goodsData="getSeckillData"></seckill>
		</view>
		<!-- 猜你喜欢 -->
		<view class="related">
			<van-divider
			  contentPosition="center"
			  customStyle="color: rgb(209, 20, 91); border-color: rgb(209, 20, 91); font-size: 14px;margin:0rpx 200rpx">
			  <image src="../../static/images/home/favour.png" mode=""></image>猜你喜欢
			</van-divider>
			<view class="list">
				<view class="goodslist" v-for="item in getguessLikeData" :key="item.id">
					<view class="photo">
						<image :src="item.sku_thumbImg_url" mode=""></image>
					</view>
					<view class="title">
						<image src="../../static/images/home/favour.png" mode=""></image>
						<text>{{item.shop_id}}</text>
					</view>
					<view class="recommend">
						<view class="name"><text>{{item.extProperty}}</text>{{item.sku_name}}</view>
					</view>
					<view class="price">
						<text>￥</text> 
						{{item.sku_price}}
					</view>
				</view>
			</view>
		</view>
		<!-- 回到顶部 -->
		<!-- <view class="go-top" @click="show" :style="{'display':(flag===true? 'flex':'none')}">
			<image src="../../static/images/home/top.png" mode=""></image>
			<text>顶部</text>
		</view> -->
		<goTop v-if="isShow">aa</goTop>
	</view>
</template>

<script>
	// import gogei from '../../component/gongge/gogei.vue';
	import goTop from '../../component/goTop/goTop.vue';
	import seckill from "@/component/seckill/seckill.vue";
	import {getLunbotu,getguessLike,getSeckill,getGrid} from "../../api/common.js";
	export default {
		data() {
			return {
					getSeckillData: [],
					isShow:false,
					show:false,
					goLunboData:[],
					getguessLikeData:[],
					getGridData:[]
			};
		},
		methods: {
			// 初始化
			init(){
				this.getLunboWay();
				this.getguesslikeWay();
				this.getSeckillWay();
				this.getGridWay();
			},
			async getGridWay(){
				var {message} = await getGrid("home");
				console.log("gonge",message);
				this.getGridData = message;
			},
			async getSeckillWay(){
				var {message} = await getSeckill();
				console.log(message)
				message.map(v=>{
					this.getSeckillData.push({
						"img": v.sku_thumbImg_url,
						"goodsPrice": v.sku_price,
						"goodsName": v.sku_name
					})
				})
				// this.getSeckillData = message;
			},
			async getguesslikeWay(){
				var {message} = await getguessLike(1);
				console.log("aaa",message);
				this.getguessLikeData = message;
			},
			async getLunboWay(){
				var {message} = await getLunbotu("home");
				this.goLunboData = message;
			},
			scanCode(){
				uni.scanCode({
					// onlyFromCamera: true,// 只允许通过相机扫码
					  // scanType: ['barCode'],// 调起条码扫描
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
				uni.showToast({
					fall:function(res){
						Toast:'aaaaaa'
					}
				})
			},
			select(index){
				console.log(index)
				uni.navigateTo({
					url:""
				})
			}
		},
		
		onPageScroll(e) {
			var { scrollTop } = e;
			var numerical = 50;
			if(scrollTop > numerical && this.isShow == false){
				this.isShow = true;
				console.log("大于50")
			}else if(scrollTop < numerical && this.isShow == true){
				this.isShow = false;
				console.log("小于50")
			}
		},
		components:{
			goTop,
			seckill
		},
		created() {
			this.init();
			
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
				// background-color: red;
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
		.seckill-content {
			margin: 25rpx 0;
		}
		.goge{
			margin:20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 15rpx;
		}
		.related{
			image{
				width: 32rpx;
				height: 32rpx;
				margin-right: 4rpx;
			}
			.list{
				display: flex;
				flex-wrap: wrap;//超出换行
				.goodslist{
					margin: 15rpx 0rpx 10rpx 15rpx;
					background-color: #FFFFFF;
					width: 350rpx;
					height: 622rpx;
					.photo{
						image{
							width: 350rpx;
							height: 350rpx;
						}
					}
					.title{
						display: flex;
						align-items: center;
						margin: 0rpx 20rpx;
						padding-bottom: 20rpx;
						// border-bottom: 2rpx dotted gray;
						 border-bottom: 2rpx dashed #dcddde;
						image{}
						text{
							flex: 1;
							color: gray;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
					.recommend{
						margin: 0rpx 20rpx;
						padding-top: 15rpx;
						.name{
							overflow: hidden;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							font-size: 26rpx;
							text{
								font-size: 26rpx;
								background-color: rgb(250, 29, 137);
								color: #FFFFFF;
							}
						}
					}
					.price{
						font-size: 38rpx;
						font-weight: bold;
						color: rgb(243, 30, 101);
						margin: 25rpx 20rpx;
						text{
							font-weight: bold;
							font-size: 20rpx;
						}
					}
				}
			}
		}
		.go-top{
			// display: flex;
			// flex-wrap: wrap;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 50rpx;
			right: 20rpx;
			// 
			// width: 90rpx;
			// height: 90rpx;
			padding: 4rpx;
			border-radius: 50%;
			background-color: rgba($color: orange, $alpha: 0.6);
			image{
				padding-top: 6rpx;
				width: 32rpx;
				height: 32rpx;
			}
			text{
				font-size: 30rpx;
			}
		}
	}
</style>
