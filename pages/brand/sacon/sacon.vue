<template>
	<view class="sacon-container">
		<view class="img-box">
			<!-- <image src="../../static/images/shop/sacon.webp" mode=""></image> -->
			<image src="https://gfs6.gomein.net.cn/wireless/T1m._KB7ZT1RCvBVdK_750_360.jpg" mode=""></image>
		</view>
		<view class="tabs-content">
			<u-tabs :list="tabsList" bg-color="#F3F5F7" :is-scroll="true" active-color="#f20c59" :current="currentTitle" @change="change"></u-tabs>
		</view>
		<commodityTemplate :goodsList="goodsList"></commodityTemplate>
		<view class="bottom-content">
			<view class="template-no-more">看完啦</view>
		</view>
	</view>
</template>

<script>
	import commodityTemplate from "@/component/commodityTemplate/commodityTemplate.vue"
	export default {
		data() {
			return {
				tabsList: [{cat_id:1,name:"厨卫大店"}],
				currentTitle: 0,
				goodsList: [
					{id:1,sku_thumbImg_url:"https://gfs17.gomein.net.cn/T1.tbyBC_T1RCvBVdK_400.jpg",extProperty:"自营",tagList:[{tagName:"节能补贴"}],sku_name:"帅康热水器JSQ25-13BCL1",sku_price:"2998"},
					{id:1,sku_thumbImg_url:"https://gfs17.gomein.net.cn/T1.tbyBC_T1RCvBVdK_400.jpg",extProperty:"自营",tagList:[{tagName:"节能补贴"}],sku_name:"帅康热水器JSQ25-13BCL1",sku_price:"2998"},
					{id:1,sku_thumbImg_url:"https://gfs17.gomein.net.cn/T1.tbyBC_T1RCvBVdK_400.jpg",extProperty:"自营",tagList:[{tagName:"节能补贴"}],sku_name:"帅康热水器JSQ25-13BCL1",sku_price:"2998"},
					{id:1,sku_thumbImg_url:"https://gfs17.gomein.net.cn/T1.tbyBC_T1RCvBVdK_400.jpg",extProperty:"自营",tagList:[{tagName:"节能补贴"}],sku_name:"帅康热水器JSQ25-13BCL1",sku_price:"2998"},
					{id:1,sku_thumbImg_url:"https://gfs17.gomein.net.cn/T1.tbyBC_T1RCvBVdK_400.jpg",extProperty:"自营",tagList:[{tagName:"节能补贴"}],sku_name:"帅康热水器JSQ25-13BCL1",sku_price:"2998"},
					{id:1,sku_thumbImg_url:"https://gfs17.gomein.net.cn/T1.tbyBC_T1RCvBVdK_400.jpg",extProperty:"自营",tagList:[{tagName:"节能补贴"}],sku_name:"帅康热水器JSQ25-13BCL1",sku_price:"2998"},
					{id:1,sku_thumbImg_url:"https://gfs17.gomein.net.cn/T1.tbyBC_T1RCvBVdK_400.jpg",extProperty:"自营",tagList:[{tagName:"节能补贴"}],sku_name:"帅康热水器JSQ25-13BCL1",sku_price:"2998"},
				]
				
			};
		},
		methods:{
			change(obj) {
				console.log("分类changeid",obj);
				this.currentTitle = obj.index;
			},
		},
		
		created(){
		},
		components:{
			commodityTemplate
		}
	}
</script>

<style lang="scss" scoped>
	.sacon-container {
		// padding-bottom: 100rpx;
		background-color: #F3F5F7;
		.img-box {
			width: 100%;
			height: 376rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.tabs-content {
			margin-left: 293rpx;
		}
		
	.bottom-content {
		padding: 30rpx 0;
	
		.template-no-more {
			text-align: center;
			font-size: 24rpx;
			background: url("@/static/images/shop/bottom.png") no-repeat 50%;
			background-size: 390rpx 12rpx;
		}
	}
	}
</style>
