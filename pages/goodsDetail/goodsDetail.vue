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
				title="已选"
				value="" 
				is-link
				title-style="color:#999A9C;font-size:32rpx"
				@click="isSelect = true"
				/>
			</van-cell-group>
			<!-- 弹出框 -->
			<van-popup
			 :show="isSelect"
			  position="bottom"
			  custom-style="height: 70%;"
			  closeable
			  @close="closeSelected"
			  @click-overlay="closeSelected">
			  </van-popup>
		</view>
		
		
	</view>
</template>

<script>
	import Dialog from '@/wxcomponents/dist/dialog/dialog';
	export default {
		data() {
			return {
				isSelect:false,
				lunbotu:[
					{img:"//gfs17.gomein.net.cn/T14jD5B_xT1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs12.gomein.net.cn/T1PfV5BQAv1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs13.gomein.net.cn/T1J1E5BvDv1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs13.gomein.net.cn/T1Wr_5BCWT1RCvBVdK_400.jpg?v=20170727"},
					{img:"//gfs11.gomein.net.cn/T1.QL5Bsdv1RCvBVdK_400.jpg?v=20170727"},
				],
				goods:{
					title:"华硕(ASUS) Y5200FB 15.6英寸商务办公轻薄笔记本电脑(I5-8265 4G 512SSD MX110 2G独显)银",
					price:2199,
					tag:"自营"
				},
				detailData:{
					"select":[
						{
							'颜色':['海蔚蓝','锐酷黑','水漾白'],
						},
						{
							'机身内存':['8G+128G','8G+256G','6G+128G'],
						}]
				}
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
			closeSelected(){
				this.isSelect = false
			}
		},
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
		.goods-select{
			margin: 20rpx 0;
		}
	}
</style>
