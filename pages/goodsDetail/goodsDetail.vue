<template>
	<view class="detail-container">
		<!-- 轮播图  -->
		<view class="swiper">
				<u-swiper 
				class="u-swiper"
				name="img"
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
				    <text class="checked">{{select.confirm}}{{select.number}}个</text>
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
					<view class="goods-button">
						<!-- <van-button  size="large" color="linear-gradient(to right, #FFC71D, #FF8917)">
						  加入购物车
						</van-button>
						<van-button  size="large" color="linear-gradient(to right, #FF5F34, #EE0B24)">
						  立即购买
						</van-button> -->
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
				@click="isSite = true"
				>
				<view slot="title" class="site-title">
					<text class="van-cell-text">送至</text>
					<view class="site">
						<van-icon name="location-o" size="50rpx" color="#999A9C"/>
						{{site}}, 免运费
					</view>
				</view>
			  </van-cell>
			</van-cell-group>
			<!-- 弹出框 -->
			<van-popup
			 :show="isSite"
			  position="bottom"
			  custom-style="height: 72%;"
			  closeable
			  @close="closeSite"
			  @click-overlay="closeSite">
				<view class="">
					联动选择地址//todo
				</view>
			</van-popup>
			  
			<!-- 保证 -->
			<view class="pledge">
				<view class="pledge-item" v-for="(item,index) in pledge" :key="index">
					<image src="@/static/images/goodsDetail/pledge.png" mode=""></image>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		
		<!-- 门店 -->
		<view class="good-shop">
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
		
			
	</view>
</template>

<script>
	import Dialog from '@/wxcomponents/dist/dialog/dialog';
	export default {
		data() {
			return {
				goods:{
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
					confirm:'',
				},
				isSite:false,
				site:"深圳市龙华区观澜街道",
				lunbotu:[
					{img:"//gfs17.gomein.net.cn/T14jD5B_xT1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs12.gomein.net.cn/T1PfV5BQAv1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs13.gomein.net.cn/T1J1E5BvDv1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs13.gomein.net.cn/T1Wr_5BCWT1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs11.gomein.net.cn/T1.QL5Bsdv1RCvBVdK_400.jpg?v=20170727"},
				],
				detailData:{
					select:[
						{
							name:"颜色",
							list:
							[{
								title:'白色',
								img:"//gfs17.gomein.net.cn/T1T7h7B5WT1RCvBVdK_400.jpg?v=20170727",
								
							}
							,{
								title:'黑色',
								img:"//gfs17.gomein.net.cn/T14cC7B_Av1RCvBVdK_400.jpg?v=20170727",
								
							}],
						},
						{
							name:"机身内存",
							list:[{
								title:'64G',
								price:6000
							}
							,{
								title:'128G',
								price:6998
							}],
						}]
				},
				sureSelect:[],
				pledge:['7天无理由退换','正品保障','包邮']
			};
		},
		methods:{
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
				let confirm = '';
				this.detailData.select.forEach((v,index) =>{
					confirm += (v.list[this.sureSelect[index]].title)+" "
				})
				this.select.confirm = confirm
			},
			// 点击切换规格
			goodsSelect(index,value){
				this.select.img = this.detailData.select[index].list[value].img || this.select.img;
				this.select.price = this.detailData.select[index].list[value].price || this.select.price;
				this.sureSelect.splice(index,1,value);
			},
			numberChange(e){
				this.select.number = e.detail;
			}
			
			
		},
		onLoad() {
			this.sureSelect = Array.apply(null, Array(this.detailData.select.length)).map(() => 0)
			this.goodsConfirm()
		}
	}
</script>

<style lang="scss">
	.detail-container{
		background-color: #F3F5F7;
		height: 3000rpx;
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
					.van-stepper{
						margin-left: 20rpx;
					}
				}
				.goods-button{
					margin-top: 20rpx;
					.van-button{
						width: 50%;
					}
				}
			}
		}
		.goods-site{
			margin: 20rpx 0;
			.site-title{
				display: flex;
				font-size:34rpx;
				align-items: flex-end;
				.van-cell-text{
					color:#999A9C;
					margin-right: 20rpx;
				}
				.site{
					display: flex;
					align-items: flex-end;
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
	}
</style>
