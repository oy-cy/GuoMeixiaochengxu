<template>
	<view class="shop-container">
		<!-- 头部 --> 
		<view class="header" :class="{selectedBgc:isShowLogo}">
			<view class="guomei" v-if="isShowLogo" @click="chooseLocation">
				<image src="../../static/images/shop/guomei-logo.png" mode=""></image>
			</view>
			<navigator class="search" url="../search/search">
					<van-search value="" background="rgba($color: #fff, $alpha: 0.3)" shape="round" placeholder="请输入搜索关键词" />
			</navigator>
			<view class="scan-content" @tap="scan">
				<image class="scan" :src="imgData.isScan" mode=""></image>
				<view class="text" :class="{scanSelected:isShowLogo}">扫一扫</view>
			</view>
			<navigator url="../classify/classify">
				<view class="classify-content">
					<image class="classify" :src="imgData.classify" mode=""></image>
					<view class="text" :class="{classifySelected:isShowLogo}">分类</view>
				</view>
			</navigator>
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
						<image src="https://s5.mogucdn.com/mlcdn/c45406/200914_2h0527b99edb7ik6j5gg9aekfeb6e_400x400.jpg_280x280.v1cAC.70.webp"
						 mode=""></image>
					</view>
					<view class="name-flag">
						<view class="user-info">
							<text class="username">高小美</text>
							<image src="https://js.gomein.net.cn/ssr/statics/images/tag_jinpaidianzhang@2x.0bff75c.png" mode=""></image>
						</view>
						<view class="slogan">精英团队，为您服务</view>
					</view>
				</view>
				<view class="lightning" @tap="lightning">
					<image src="http://gfs10.gomein.net.cn/T1vjY5BKZv1RCvBVdK.png" mode=""></image>
				</view>
			</view>
		</view>
		<van-popup
		  :show="isLightning"
		  closeable
		  round
		  z-index="99999"
		  close-icon="close"
		  position="bottom"
		  custom-style="height: 70%"
		  @close="onClose"
		>
		<view class="flash-express-logo">
			<image src="../../static/images/shop/shop-logo.png" mode=""></image>
			<view class="tip-info">
				国美依托线下门店的资源优势，
				为周边3-5公里社区提供中小件订单直送到家服务，
				用户下单后可享受最快30分钟闪电送达。
			</view>
		</view>
		</van-popup>
		
		<!-- 轮播图 -->
		<view class="wrap">
			<u-swiper name="s_img" mode="rect" height="220" :list="lunboData"></u-swiper>
		</view>
		<view class="china br">
			<view class="title">精选活动</view>
			<image src="../../static/images/shop/china2.jpg" mode=""></image>
		</view>
		<!-- 国美秒杀 -->
		<view class="seckill-content">
			<seckill :goodsData="goodsData"></seckill>
		</view>

		<!-- 新品热卖 -->
		<!-- <view class="video-container">
			<scroll-view scroll-x="true" class="content">
				<block v-for="(item,index) in videoData" :key="index">
					<view class="item" >
						<video :src="item.url"controls="controls"></video>
					</view>
				</block>
			</scroll-view>
		</view> -->
		<!-- 品牌推荐 -->
		<view class="brand-recommend">
			<view class="brand-title">品牌推荐</view>
			<view class="list">
				<view class="item" v-for="item in brandRecommend" :key="item.id" @tap="gobrandSpecial(item.id)">
					<image :src="item.bgcImg" mode=""></image>
					<image class="img" :src="item.goodsImg" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 精品推荐 -->
		<view class="goods-content">
			<view class="tabs-content">
				<view class="goods-tabs">
					<v-tabs v-model="current" :tabs="tabs" pillsBorderRadius="35rpx" :pills="true" line-height="0" activeColor="#fff"
					 pillsColor="#fa1e8c" height="60rpx" @change="changeTab" class="title-item">
					</v-tabs>
				</view>
			</view>
			<view class="goodsList" v-if="current === 0">
				<u-tabs :list="tabsList" :is-scroll="true" active-color="#f20c59" :current="currentTitle" @change="change"></u-tabs>
				
				<k-scroll-view ref="k-scroll-view" :loadTip="loadTip" :loadingTip="loadingTip"
				 :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom" :autoPullUp="autoPullUp"
				 :stopPullDown="stopPullDown" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
					<!-- 数据列表 -->
					<commodityTemplate :goodsList="goodsList"></commodityTemplate>
				</k-scroll-view>
			</view>
			<view class="" v-else-if="current === 1">
				<guideList :guideData="guideData"></guideList>
			</view>
		</view>
		<goTop v-if="isShowLogo"></goTop>
	</view>
</template>

<script>
	import goTop from '@/component/goTop/goTop.vue';
	import seckill from "@/component/seckill/seckill.vue"
	import guideList from"@/component/guideList/guideList.vue";
	import commodityTemplate from "@/component/commodityTemplate/commodityTemplate.vue"
	import { getSeckill,getShoppingGuide,getCategory,getGoodsList,getLunbotu } from "../../api/common.js";
	export default {
		data() {
			return {
				isShowLogo: false,
				isLogo: false,
				current: 0,
				currentTitle: 0,
				isLightning: false,
				imgData: {
					classify: "../../static/images/shop/classify.png",
					classifyOne: "../../static/images/shop/classify.png",
					classifyTwe: "../../static/images/shop/classify2.png",
					isScan: "../../static/images/shop/scan.png",
					scanImgOne:"../../static/images/shop/scan.png",
					scanImgTwe:"../../static/images/shop/scan2.png",
				},
				lunboData: [],
				goodsData: [],
				videoData: [{
						"url": "http://47.112.194.162:82/Trousers/goods1/goods_show.mp4"
					},
					{
						"url": "http://47.112.194.162:82/Trousers/goods1/goods_show.mp4"
					},
					{
						"url": "http://47.112.194.162:82/Trousers/goods1/goods_show.mp4"
					},
					{
						"url": "http://47.112.194.162:82/Trousers/goods1/goods_show.mp4"
					},
				],
				tabs: ['精品推荐', '全程导购'],
				brandRecommend: [
					{id:1,bgcImg:"/static/images/shop/brand1.webp",goodsImg:"../../static/images/shop/water-heater.png"},
					{id:2,bgcImg:"../../static/images/shop/brand2.webp",goodsImg:"../../static/images/shop/gas-station.png"},
					{id:3,bgcImg:"../../static/images/shop/brand3.webp",goodsImg:"../../static/images/shop/shaver.png"},
				],
				tabsList: [],
				goodsList: [],
				guideData: [],
				goodsId: '',
				page: 1,
				shop: 'shop',
				hasData: true,
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '',
				touchHeight: 50,
				height: 0,
				bottom: 50,
				autoPullUp: true,
				stopPullDown: false, // 如果为 false 则不使用下拉刷新，只进行上拉加载
			};
		},
		methods: {
			// 初始化
			init(){
				this.getSeckillData();
				this.getCategoryData();
				this.getLunbotuData();
			},
			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						console.log(data)
						// this.addressData.addressName = data.name;
						// this.addressData.address = data.name;
					}
				})
			},
			changeTab(index) {
				// console.log('当前选中的项：' + index)
				this.current = index;
				if(index == 0){
					this.getCategoryData();
				}else {
					this.getShoppingGuideData();
				}
			},
			// 切换 tabs
			change(obj) {
				console.log("分类changeid",obj);
				// 当每次切换点击时,把page赋为1，不然每次请求的就以page的最后数值去发送请求
				this.page = 1;
				// 点击切换的时候，把hasData设为true，用于发送请求
				this.hasData = true;
				// 每次点击把emptyTip赋空 ，不然每次点击都会显示
				this.emptyTip = '', 
				// 把点击的分类id赋值给goodsId，用于发送请求
				this.goodsId = obj.id
				this.currentTitle = obj.index;
				this.getGoodsListData(obj.id);
			},
			lightning(){
				this.isLightning = true;
			},
			 onClose() {
			    this.isLightning = false;
			 },
			 // 扫一扫
			 scan(){
				uni.scanCode({
					// onlyFromCamera: true,
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				}); 
			 },
			 // 获取秒杀数据
			 async getSeckillData(){
				 var { message } = await getSeckill();
				 this.goodsData = message;
			 },
			 // 获取导购人员数据
			 async getShoppingGuideData(){
				 var { message } = await getShoppingGuide();
				message.forEach(v => {
					// 字符串转为数组
					v.good_at_brand = JSON.parse(v.good_at_brand);
					v.g_category = JSON.parse(v.goods_category);
					var temp = JSON.parse(v.goods_category);
					// 保留3个good_at_brand
					temp.length = 3;
					v.goods_category = temp;
				})
				 this.guideData = message;
			 },
			 // 获取精品推荐分类
			 async getCategoryData(){
				 var { message } = await getCategory(this.shop);
				 // console.log("分类",message);
				 // 保存分类的第一个id
				 var firstId = message[0].cat_id;
				 this.goodsId = message[0].cat_id;
				 this.tabsList = message;
				 this.getGoodsListData(firstId)
			 },
			 // 获取商品数据
			 async getGoodsListData(id){
				 var { message } = await getGoodsList(id,this.page);
				 message.forEach(v => {
					 // console.log(v.tagList);
					 v.tagList = JSON.parse(v.tagList);
				 })
				 this.goodsList = message;
 			 },
			 // 获取轮播图
			 async getLunbotuData(){
				 var { message } = await getLunbotu(this.shop);
				 this.lunboData = message;
			 },
			 // 跳转到对应的专场页
			 gobrandSpecial(id){
				switch(id){
					case 1:
						uni.navigateTo({
							url: "/pages/brand/sacon/sacon"
						})
						break;
					case 2:
						uni.navigateTo({
							url: "/pages/brand/guangdongMacro/guangdongMacro"
						})
						break;
					case 3:
						uni.navigateTo({
							url: "/pages/brand/lake/lake"
						})
						break;
				}
			 },
			 // 上拉刷新
			 async handleLoadMore(stopLoad) {
				 // 判断hasData是否等false，等于false就不让再发送请求
				 /* if(this.hasData == false){
					 return;
				 } */
				 this.page++;
				 var { message } = await getGoodsList(this.goodsId,this.page);
				 stopLoad ? stopLoad() : '';
				 // message.length等于0的时候，把hasData设为false；用于后续的判断；
			 	if (message.length == 0) {
					// this.hasData = false;
					uni.showToast({
						title:"客官已到底了哦~",
						icon: "none"
					})
			 		stopLoad ? stopLoad({
			 			isEnd: true
			 		}) : '';
					return;
			 	} 
				message.forEach(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				// 把之前的数据拼接到一起
				this.goodsList = this.goodsList.concat(message);
			 },
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
				// 改变头部搜索的图片
				this.imgData.isScan = this.imgData.scanImgTwe;
				this.imgData.classify = this.imgData.classifyTwe;
			} else if (scrollTop < position && this.isLogo == true) {
				this.isShowLogo = false;
				this.isLogo = false;
				// 改变头部搜索的图片
				this.imgData.isScan = this.imgData.scanImgOne;
				this.imgData.classify = this.imgData.classifyOne;
			}
		},
		onLoad(options){
			this.init();
		},
		components: {
			seckill,
			guideList,
			commodityTemplate,
			goTop
		}
	}
</script>
    
<style lang="scss" scoped>
	.shop-container {
		background-color: #F2F2F2;

		.br {
			width: 715rpx;
			border-radius: 32rpx;
			margin: 20rpx auto;
			background-color: #FFFFFF;
		}
		.selectedBgc {
			background-color: #FFFFFF;
		}
		.header {
			position: fixed;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			z-index: 9999;
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
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.scan {
					width: 44rpx;
					height: 44rpx;
				}

				.text {
					font-size: 20rpx;
					color: #FFFFFF;
				}
				.scanSelected {
					color: #878787;
				}
			}

			.classify-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.classify {
					width: 44rpx;
					height: 44rpx;
					padding: 0 20rpx;
				}

				.text {
					font-size: 20rpx;
					color: #FFFFFF;
				}
				.classifySelected {
					color: #878787;
				}
			}

		}
		.flash-express-logo {
			width: 100%;
			image {
				display: block;
				width: 210rpx;
				height: 110rpx;
				margin: 80rpx auto;
			}
			.tip-info {
				font-size: 30rpx;
				color: #262c32;
				margin: 0 30rpx;
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
				transform: translate(-50%, -50%);
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

						image {}

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
			margin-top: 300rpx;
			border-radius: 32rpx;
			overflow: hidden;
		}
		.seckill-content {
			margin: 25rpx 0;
		}

		.china {
			height: 318rpx;
			overflow: hidden;

			.title {
				// height: 110rpx;
				padding: 25rpx 25rpx;
				color: #262c32;
				font-weight: 700;
				font-size: 40rpx;
			}

			image {
				width: 100%;
				height: 268rpx;
				overflow: hidden;
			}
		}

		/deep/.uni-video-container {

			width: 400rpx;
			// height: 300rpx;	
			background-color: #FFFFFF;
		}

		/deep/.uni-video {
			width: 300rpx;
		}

		.video-container {
			.content {
				white-space: nowrap; // 滚动必须加的属性

				// width: 100%;
				// height: 290upx;
				// // padding: 20upx;
				// margin: 0 auto;
				.item {
					// width: 310rpx;
					// height: 200rpx;
					display: inline-block;

					/deep/.uni-video {
						width: 200rpx;
					}
				}
			}
		}

		.goods-content {
			.tabs-content {
				display: flex;
				justify-content: center;
				height: 80rpx;
				line-height: 70rpx;
				background-color: #FFFFFF;

				.goods-tabs {
					width: 300rpx;

					.title-item {
						height: 200rpx;
					}
				}
			}
			.goodsList {
				.classifyGoods {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					padding: 20rpx;
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
								color: rgb(242, 12, 86);
								border-color: rgb(242, 12, 86);
								border: 1rpx solid rgb(242, 12, 86);
								margin: 10rpx 0;
								border-radius: 5rpx;
							}
						}
					}
				}
			}
		}
		.brand-recommend {
			margin: 30rpx 20rpx;
			.brand-title {
				font-size: 38rpx;
				color: #262c32;
				font-weight: 700;
				margin: 30rpx;
			}
			.list {
				display: flex;
				justify-content: space-around;
				.item {
					position: relative;
					width: 230rpx;
					height: 338rpx;
					border-radius: 20rpx;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
					.img {
						position: absolute;
						top: 52%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 160rpx;
						height: 160rpx;
						border-radius: 100rpx;
					}
				}
			}
		
			
		}
	}
</style>
