<template>
	<view class="home-component">
		<!-- 首页头部 -->
		<view class="home-top">
			<view class="location-photo">
				<image src="../../static/images/home/location.png" mode=""></image>
				<text class="text">深圳</text>
			</view>
			<navigator class="search" hover-class="none" url="../search/search">
				<van-search class="van-search" value="" background="background:transparen(0)" disabled="true" shape="round" placeholder="请输入搜索关键词" />
			</navigator>
			<view class="scan-photo" @click="scanCode()" >
				<image src="../../static/images/home/scan.png" mode=""></image>
				<text class="text">扫一扫</text>
				<!-- <button @click="show=true"></button> -->
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="page-section-spacing">
			<swiper class="swiper" indicator-dots="true" autoplay="ture" circular="ture">
				<swiper-item class="swiper-item-check">
					<view class="swiper-item uni-bg-red">
						<image src="http://gfs5.gomein.net.cn/wireless/T1kC_7Bj__1RCvBVdK_1065_390.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item-check">
					<view class="swiper-item uni-bg-green">
						<image src="https://gfs7.gomein.net.cn/wireless/T1joV7B7LT1RCvBVdK_1065_390.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item-check">
					<view class="swiper-item uni-bg-blue">
						<image src="https://gfs9.gomein.net.cn/wireless/T1g.x7B_Vv1RCvBVdK_1065_390.jpg" mode=""></image>
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
			<van-grid-item v-for="(item,index) in lbcdata" :icon="item.img_url" :text="item.name" @click="select(index)"/>
		</van-grid>
		<!-- 猜你喜欢 -->
		<view class="related">
			<van-divider
			  contentPosition="center"
			  customStyle="color: rgb(209, 20, 91); border-color: rgb(209, 20, 91); font-size: 14px;margin:0rpx 200rpx">
			  <image src="../../static/images/home/favour.png" mode=""></image>猜你喜欢
			</van-divider>
			<view class="list">
				<view class="goodslist">
					<view class="photo">
						<image src="../../static/images/home/favour.png" mode=""></image>
					</view>
					<view class="title">
						<image src="../../static/images/home/favour.png" mode=""></image>
						<text>国美体验店(观澜观光店霏霏城城)</text>
					</view>
					<view class="recommend">
						<view class="name"><text>国美超市</text>泸州老窖白酒52hiuh iuh i度500ml dfgdrfd </view>
					</view>
					<view class="price">￥78.9</view>
				</view>
				
				<view class="goodslist">
					<view class="photo">
						<image src="../../static/images/home/favour.png" mode=""></image>
					</view>
					<view class="title">
						<image src="../../static/images/home/favour.png" mode=""></image>
						<text>国美体验店(观澜观光店霏霏城城)</text>
					</view>
					<view class="recommend">
						<view class="name"><text>国美超市</text>泸州老窖白酒52hiuh iuh i度500ml dfgdrfd </view>
					</view>
					<view class="price">￥78.9</view>
				</view>
				
				<view class="goodslist">
					<view class="photo">
						<image src="../../static/images/home/favour.png" mode=""></image>
					</view>
					<view class="title">
						<image src="../../static/images/home/favour.png" mode=""></image>
						<text>国美体验店(观澜观光店霏霏城城)</text>
					</view>
					<view class="recommend">
						<view class="name"><text>国美超市</text>泸州老窖白酒52hiuh iuh i度500ml dfgdrfd </view>
					</view>
					<view class="price">￥78.9</view>
				</view>
				
				<view class="goodslist">
					<view class="photo">
						<image src="../../static/images/home/favour.png" mode=""></image>
					</view>
					<view class="title">
						<image src="../../static/images/home/favour.png" mode=""></image>
						<text>国美体验店(观澜观光店霏霏城城)</text>
					</view>
					<view class="recommend">
						<view class="name"><text>国美超市</text>泸州老窖白酒52hiuh iuh i度500ml dfgdrfd </view>
					</view>
					<view class="price">￥78.9</view>
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
	export default {
		data() {
			return {
				lbcdata:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'}
					],
					isShow:false,
					show:false
			};
		},
		methods: {
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
					url:"/pages/goodsList/goodsList"
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
			goTop
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
						border-bottom: 2rpx dotted gray;
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
							text{
								font-size: 28rpx;
								background-color: rgb(250, 29, 137);
							}
						}
					}
					.price{
						font-size: 40rpx;
						color: rgb(243, 30, 101);
						margin: 25rpx 20rpx;
						
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
