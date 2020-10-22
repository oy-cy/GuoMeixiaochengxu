<template>
	<view class="detail-container">
		<!-- 轮播图  -->
		<view class="swiper">
				<u-swiper 
				class="u-swiper"
				name="url"
				height="690" 
				mode="number" 
				:autoplay="false"
				indicator-pos="bottomRight" 
				:list="lunbotu"></u-swiper>
		</view>
		<!-- 商品基本信息 -->
		<view class="goods-title">
			<view class="title">
				<view class="goods-tag">{{goods.tag}}</view>
				{{goods.title}}
			</view>
			<view class="goods-price">¥{{goods.price}}</view>
			<view class="stages">
				<van-cell-group>
				  <van-cell 
					title="分期"
					value="查看分期付款方案" 
					is-link
					title-style="color:#999A9C;font-size:32rpx"
					@click="onStages"
					/>
				</van-cell-group>
				<van-dialog id="van-dialog"/>
			</view>
		</view>
		<!-- 商品规格 -->
		<view class="goods-select">
			<van-cell-group>
			  <van-cell 
				is-link
				title-style=""
				@click="isSelect = true"
				>
				<view slot="title">
				    <text class="van-cell-text">已选</text>
					<text class="checked" v-for="(item,index) in select.confirm" :key='index'>{{item}}</text>
				    <text class="checked">{{select.number}}个</text>
				  </view>
				</van-cell>
			</van-cell-group>
			<!-- 弹出框 -->
			<van-popup
			 :show="isSelect"
			  position="bottom"
			  custom-style="height: 72%"
			  closeable
			  @close="closeSelected"
			  @click-overlay="closeSelected">
				<view class="popup-select">
					<view class="info">
						<image :src="select.img"></image>
						<view class="infos">
							<view class="price">
								¥{{select.price || goods.price}}
							</view>
							<view>
								{{goods.count > 0 ? "有货":"无货"}}
							</view>
						</view>
					</view>
					<scroll-view scroll-y='true' style="height: 550rpx;">
						<view class="select" v-for="(item,index) in detailData.select" :key='index'>
							<view class="select-item">
								{{item.name}}
							</view>
							<view class="item-content">
								<block v-for="(items,indexs) in item.list" :key="indexs">
									<view class="default" @click="goodsSelect(index,indexs)" :class="[sureSelect[index] == indexs ? 'choose':'']" >
										{{items.title}}
									</view>
								</block>
							</view>
						</view>
					
						<view class="number">
							数量 <van-stepper :value="select.number" min="1" max="10"  @change='numberChange'/>
						</view>
					</scroll-view>
					<view class="goods-button">
						<van-button  size="large" color="linear-gradient(to right, #FFC71D, #FF8917)" @click="joinShopCart" >
						  加入购物车
						</van-button>
						<van-button  size="large" color="linear-gradient(to right, #FA1E8B, #FC1E58)" @click="promptlyBuy">
						  立即购买
						</van-button>
					</view>
				</view>
			  </van-popup>
		</view>
		<!-- 送至 -->
		<view class="goods-site">
			<van-cell-group>
				<!-- @click="isSite = true" -->
			  <van-cell
				is-link
				@click="siteCompile"
				>
				<view slot="title" class="site-title">
					<text class="van-cell-text">送至</text>
					<view class="site">
						<van-icon name="location-o" size="50rpx" color="#999A9C"/>
						{{getDefaultSite}}, 免运费
					</view>
				</view>
			  </van-cell>
			</van-cell-group>
			<!-- 保证 -->
			<view class="pledge">
				<view class="pledge-item" v-for="(item,index) in pledge" :key="index">
					<image src="@/static/images/goodsDetail/pledge.png" mode=""></image>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		
		<!-- 门店 -->
		<view class="good-shop" @click="goShop">
			<image src="//gfs10.gomein.net.cn/T1kXb4BCZg1RCvBVdK.png"></image>
			<view class="info">
				<view class="shop-name">
					<view class="name">
						国美体验店 (深圳观澜店)
					</view>
					<view class="site">
						<van-icon name="location-o" size="36rpx" color="#999A9C"/>
						龙华区 距您>500km
					</view>
				</view>
				<view class="into">
					进店逛逛 <van-icon name="arrow" />
				</view>
			</view>
		</view>
		
		<!-- 全程导购 -->
		<view class="goods-guide">
			 <view class="course">
			 	全程导购
			 </view>
			 <view class="item" v-for="(item,index) in guide" :key="index">
				<view class="left">
					<view class="img-container">
						<image :src="item.img"></image>
					</view>
					<view class="info">
						<view class="content">
							<text class="tip"></text>
							<text class="nickname">{{item.name}}</text>
						</view>
						<view class="flag">{{item.flag}}</view>
						<view class="serve">已服务 {{item.serve}} 单</view>
					</view>
				</view>
				<view class="right">
					<view class="icon first-icon">
						<image src="../../static/images/shop/consult.png" mode=""></image>
						<text class="text">咨询</text>
					</view>
					<view class="icon">
						<image src="../../static/images/shop/appointment.png" mode=""></image>
						<text class="text">预约</text>
					</view>
				</view>
			 </view>
		</view>
		<!-- 评论 -->
		<view class="goods-comment">
			<view class="nav">
				<view class="comment">
					评论
				</view>
				<view class="reputation">
					好评度  <text>99%</text>  <van-icon name="arrow" color="#999A9C"/>
				</view>
			</view>
			<view class="comment-info"  v-if="comment.remark" >
				<image :src="comment.photo"></image>
				{{comment.nickname}}
				<van-rate 
				:value="comment.Star_rating"
				  :disabled="true" 
				  size='26rpx'
				  gutter='2rpx'
				  disabled-color="#FFD635" />
			</view>
			<view class="comment-title" v-if="comment.remark">
				{{comment.remark}}
			</view>
			<view class="comment-title" v-else>
				此商品还没有评论
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="goods-fond">
			 <view class="fond-title">
				 猜你喜欢
			 </view>
			<swiper class="fond-swiper" :indicator-dots="true" :circular="true" indicator-active-color='#F20C59'>
				 <swiper-item class="fond-swiper-item" v-for="(item,index) in fondGoods" :key='index'>
				    <view class="fond-item" v-for="(items,indexs) in item" :key="indexs">
						<image :src="items.sku_thumbImg_url" ></image>
						<view class="fond-titles">
							{{items.sku_name}}
						</view>
						<view class="fond-price">
							¥{{items.sku_price}}
						</view>
					</view>
				 </swiper-item>
			</swiper>
		</view>
		<!-- 回到顶部 -->
		<view class="wrap">
				<u-back-top :scroll-top="scrollTop" ><u-icon name="arrow-upward"></u-icon></u-back-top>
		</view>
		<!-- 商品介绍 -->
		<view class="goods-recommend">
			<view class="recommend-title">
				<view class="img" @tap="onCut('product_desciption')" :class="[cut == 'product_desciption' ? 'cut':'']">商品介绍</view>
				<view class="param" @tap="onCut('specifications')" :class="[cut == 'specifications' ? 'cut':'']">规格参数</view>
				<view class="packaging" @tap="onCut('packaging')" :class="[cut == 'packaging' ? 'cut':'']">包装售后</view>
			</view>
		<!-- 富文本解析 -->
		<u-parse :html="recommend[cut]" :lazy-load="true" ></u-parse>
		</view>
		<!-- 底部商品导航 -->
		<view class="goods-action">
			<van-goods-action>
			  <van-goods-action-icon icon="shop-o" text="门店" @click="goShop"/>
			  <van-goods-action-icon icon="cart-o" text="购物车" info="5" @click="goShopCart"/>
			  <van-goods-action-button size="large" text="加入购物车" color="linear-gradient(to right, #FFC71D, #FF8917)" @click="joinShopCart" />
			  <van-goods-action-button size="large" text="立即购买" color="linear-gradient(to right, #FA1E8C, #FC1E58)" @click="promptlyBuy"/>
			</van-goods-action>
		</view>
		<site ref="show"></site>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import Dialog from '@/wxcomponents/dist/dialog/dialog';
	// import {obj} from '@/common/detailRichText.js';
	import {getGoodsLunbotu,getCommodityDetails,getcomment} from "@/api/goodsDetail.js";
	import {getguessLike,addShopCar} from "@/api/common.js";
	import site from "@/component/gongge/site.vue";
	export default {
		data() {
			return {
				cut:"product_desciption",
				scrollTop:0,
				goods:{
					id:3,
					title:"华硕(ASUS) Y5200FB 15.6英寸商务办公轻薄笔记本电脑(I5-8265 4G 512SSD MX110 2G独显)银",
					price:2199,
					tag:"自营",
					count:1
				},
				isSelect:false,
				select:{
					number:1,
					img:"//gfs17.gomein.net.cn/T1R0JKBjxT1RCvBVdK_160.jpg?v=20170727",
					price:0,
					confirm:[],
				},
				isSite:false,
				lunbotu:[
					{url:"https://img.yzcdn.cn/vant/custom-empty-image.png"}
				],
				detailData:{
					select:[]
				},
				sureSelect:[],
				pledge:['7天无理由退换','正品保障','包邮'],
				guide:[{
						name:"周田武",
						flag:"资深顾问",
						serve:23,
						img:"//gfs11.gomein.net.cn/T1o2xmBbAT1RCvBVdK_60_60.jpg"
					},
					{
						name:"卢路",
						flag:"资深顾问",
						serve:131,
						img:"//gfs12.gomein.net.cn/T19FxmB4Dv1RCvBVdK_60_60.jpg"
					},
					{
						name:"李莉",
						flag:"专业顾问",
						serve:60,
						img:"//gfs12.gomein.net.cn/T1p5LmBKdv1RCvBVdK_60_60.jpg"
					}
				],
				comment:{},
				fondGoods:[],
				recommend:[]
			};
		},
		methods:{
			init(){
				this.getGoodsLunbotu();
				this.getCommodityDetails();
				this.getcomment();
				
				
			},
			// 获取轮播图
			async getGoodsLunbotu(){
				let {message} = await getGoodsLunbotu(this.goods.id);
				if(message.length != 0){
					this.lunbotu = message
				}
			},
			// 获取评论
			async getcomment(){
				let {message} = await getcomment(this.goods.id);
				if(message.length != 0){
					this.comment = message[0]
				}
			},
			//获取商品详情
			async getCommodityDetails(){
				let {message} = await getCommodityDetails(this.goods.id);
				if(message.length != 0){
					this.recommend = message[0]
					this.detailData.select = JSON.parse(message[0].specification);
					this.sureSelect = Array.apply(null, Array(this.detailData.select.length)).map(() => 0)
					this.goodsConfirm();
					this.getguessLike();
				}
			},
			// 获取猜你喜欢
			async getguessLike(){
				let {message} = await getguessLike(1);
				
				if(message.length != 0){
					// this.fondGoods = message;
					var arr = [];
					this.fondGoods = []
					message.forEach( v =>{
						arr.push(v)
						if(arr.length == 6){
							this.fondGoods.push(arr);
							arr = []
						}
					})
				}
			},
			// 分期
			onStages(){
				Dialog.alert({
				  message: '请下载国美APP，使用国美APP分期购买',
				}).then(() => {
				  // on close
				});
			},
			// 关闭商品规格(弹出层)
			closeSelected(){
				this.goodsConfirm();
				this.isSelect = false;
			},
			// 关闭选择送至地址(弹出层)
			closeSite(){
				this.isSite = false;
			},
			// 选择购买的规格
			goodsConfirm(){
				if(this.detailData.select.length != 0){
					let confirm = [];
					this.detailData.select.forEach((v,index) =>{
						confirm.push(v.list[this.sureSelect[index]].title)
					})
					this.select.confirm = confirm
				}
			},
			// 点击切换规格
			goodsSelect(index,value){
				this.select.img = this.detailData.select[index].list[value].img || this.select.img;
				this.select.price = this.detailData.select[index].list[value].price || this.select.price;
				this.sureSelect.splice(index,1,value);
			},
			// 修改数量
			numberChange(e){
				this.select.number = e.detail;
			},
			// 跳转到门店
			goShop(){
				uni.switchTab({
					url:"/pages/shop/shop",
				})
			},
			// 回到顶部
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			// 切换商品介绍
			onCut(value){
				this.cut = value
			},
			// 跳转到购物车页面
			goShopCart(){
				uni.switchTab({
					url:"/pages/mycar/mycar",
				})
			},
			async joinShopCart(){
				console.log('加入购物车')
				let car = {
					userId : 1,
					comId : this.goods.id,
					comCount : this.select.number,
					specification : this.select.confirm,
					price : (this.select.price == 0 ? this.goods.price : this.goods.price),
				}
				console.log(car);
				// await addShopCar(car);
				this.$refs.uToast.show({
					title: '加入购物车成功',
					type: 'default',
				})
				
			},
			promptlyBuy(){
				console.log('立即购买')
			},
			siteCompile(){
				this.$refs.show.show()
				// this.siteShow = true;
			}
		},
		components:{
			site
		},
		onLoad() {
			this.init();
		},
		computed: {
			getDefaultSite(){
				return this.$store.getters.getDefaultSite;
			}
		},
	}
</script>

<style lang="scss">
	
	.interlayer {
		display: flex !important;
		flex-direction: column !important;
	}
	.detail-container{
		background-color: #F3F5F7;
		height: 5000rpx;
		// 轮播图
		.swiper{
			width: 100%;
			.u-swiper-indicator{
				width: 92%;
			}
		}
		// 标题信息
		.goods-title{
			padding-top: 30rpx;
			background-color: #fff;
				
				.title{
					padding: 0 30rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					
					font-size: 38rpx;
					.goods-tag{
						margin-right: 14rpx;
						display: inline-block;
						font-size: 28rpx;
						padding: 6rpx;
						border: 2rpx solid #f20c59;
						color: #f20c59;
					}
				}
				.goods-price{
					color: #f20c59;
					font-size: 60rpx;
					padding: 30rpx 26rpx;
					border-bottom: 2rpx solid #e8e8e8;
				}
				
		}
		// 商品规格
		.goods-select{
			margin: 20rpx 0;
			.van-cell-text{
				color:#999A9C;
				font-size:34rpx;
			}
			.checked{
				margin-left:20rpx;
			}
			.popup-select{
				.info{
					padding: 20rpx 30rpx;
					display: flex;
					align-items: center;
					border-bottom: 2rpx solid #ccc;
					image{
						border: 2rpx solid #DCDDDE;
						width:190rpx;
						height: 190rpx;
					}
					.infos{
						margin-left: 30rpx;
						color: #F20C59;
						font-size: 40rpx;
						.price{
							margin-bottom: 10rpx;
						}
					}
				}
				.select{
					.select-item{
						padding: 30rpx;
						font-size: 36rpx;
					}
					.item-content{
						display: flex;
						flex-wrap: wrap;
						.default{
							margin: 0  20rpx 30rpx;
							padding: 20rpx 40rpx;
							border: 2rpx solid #E0E0E0;
						}
						.choose{
							border: 2rpx solid #F20C59;
							color: #F20C59;
						}
					}
				}
				.number{
					display: flex;
					margin: 30rpx 0 ;
					align-items: center;
					.van-stepper{
						margin-left: 20rpx;
					}
				}
				.goods-button{
					position: fixed;
					bottom: 0;
					width: 100%;
					.van-button{
						width: 50%;
					}
				}
			}
		}
		//送至地址
		.goods-site{
			margin: 20rpx 0;
			.site-title{
				display: flex;
				font-size:34rpx;
				// color: #FF0000;
				align-items: flex-end;
				.van-cell-text{
					color:#999A9C;
					margin-right: 20rpx;
					// flex: 1;
				}
				.site{
					flex: 1;
					position: relative;
					padding-left:40rpx;
					.van-icon{
						position: absolute;
						top: 0;
						left: -6rpx;
					}
					// display: flex;
					// align-items: flex-end;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}
			.pledge{
				padding: 30rpx;
				background-color: #fff;
				display: flex;
				.pledge-item{
					display: flex;
					align-items: center;
					image{
						width: 30rpx;
						height: 30rpx;
					}
					text{
						margin: 0rpx 10rpx;
						color: #A2A4A6;
					}
				}
			}
		}
		// 门店
		.good-shop{
			display: flex;
			justify-content: space-around;
			background-color: #fff;
			padding: 30rpx;
			image{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
			.info{
				display: flex;
				.shop-name{
					display: flex;
					flex-wrap: wrap;
					width: 420rpx;
					.name{
						font-size: 34rpx;
						color: #333;
						margin-bottom: 8rpx;
					}
					.site{
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #757A7F;
						
					}
				}
			}
			.into{
				display: flex;
				height: 30rpx;
				align-items: center;
				color: #757A7F;
			}
		}	
		// 导师
		.goods-guide{
			padding: 30rpx;
			background-color: #fff;
			margin: 20rpx 0;
			.course{
				color: #333;
				font-size: 34rpx;
			}
			.item{
				display: flex;
				justify-content: space-between;
				margin-top: 60rpx;
				overflow: hidden;
				.left {
					display: flex;
					align-items: center;
					.img-container {
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
						overflow: hidden;
			
						image {
							width: 100%;
							height: 100%;
						}
					}
			
					.info {
						margin-left: 20rpx;
			
						.content {
							display: flex;
							align-items: center;
			
							.tip {
								width: 16rpx;
								height: 16rpx;
								background-color: #09bb07;
								border-radius: 10rpx;
							}
			
							.nickname {
								font-size: 32rpx;
								color: #202020;
								margin-left: 10rpx;
							}
						}
			
						.flag {
							width: 120rpx;
							text-align: center;
							font-size: 22rpx;
							color: #FFFFFF;
							background-color: #e6b365;
							border-radius: 20rpx;
							margin: 10rpx 0;
						}
			
						.serve {
							font-size: 26rpx;
							color: #919599;
						}
					}
				}
			
				.right {
					display: flex;
			
					.icon {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 92rpx;
						height: 92rpx;
						border-radius: 100rpx;
						background-color: #fff3e2;
			
						image {
							width: 32rpx;
							height: 32rpx;
						}
			
						.text {
							font-size: 22rpx;
							color: #c48d3a;
						}
					}
			
					.first-icon {
						margin-right: 20rpx;
					}
				}
				
			}
		}
		// 评论
		.goods-comment{
			background-color: #fff;
			padding: 30rpx;
			.nav{
				display: flex;
				justify-content: space-between;
				.comment{
					color: #333;
					font-size: 34rpx;
				}
				.reputation{
					display: flex;
					align-items: center;
					color: #333;
					font-size: 30rpx;
					text{
						margin: 0 10rpx;
						color: #F20C59;
					}
				}
			}
			.comment-info{
				display: flex;
				align-items: center;
				padding: 30rpx 0;
				image{
					width: 58rpx;
					height: 58rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.van-rate{
					margin-left:20rpx ;
				}
			}
			.comment-title{
				color: #333;
				font-size: 30rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
		// 猜你喜欢
		.goods-fond{
			margin: 20rpx 0rpx;
			padding: 30rpx 0;
			background-color: #fff;
			.fond-title{
				padding: 0 0 30rpx 30rpx;
				color: #333;
				font-size: 34rpx;
			}
			.fond-swiper{
				padding: 0rpx;
				height: 800rpx;
				.fond-swiper-item{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					.fond-item{
						width: 30%;
						margin-bottom: 34rpx;
						image{
							width: 100%;
							height: 200rpx;
						}
						.fond-titles{
							margin: 20rpx 0;
							margin-top: 6rpx;
							font-size: 24rpx;
							color: #919599;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.fond-price{
							color: 3333;
							font-size: 32rpx;
						}
					}
				}
			}
		}
		// 商品介绍
		.goods-recommend{
			background-color: #fff;
			margin-bottom: 100rpx;
			.recommend-title{
				display: flex;
				font-size: 38rpx;
				color: #919599;
				border-top: 2rpx solid #d0d3d3;
				border-bottom: 2rpx solid #d0d3d3;
				view{
					margin: 30rpx 0;
					padding: 0 30rpx;
					flex: 1;
					text-align: center;
					border-right: 2rpx solid #d0d3d3;
					&:last-child {
						border-right: none;
					}
				}
				.cut{
					color: #00050A;
				}
			}
		}
		
	}
</style>
