<template>
	<view class="sacon-container">
		<view class="img-box">
			<!-- <image src="../../static/images/shop/sacon.webp" mode=""></image> -->
			<image src="https://gfs9.gomein.net.cn/wireless/T1XeZ4B4YT1RCvBVdK_750_360.jpg" mode=""></image>
		</view>
		<view class="tabs-content">
			<u-tabs :list="tabsList" bg-color="#F3F5F7" :is-scroll="true" active-color="#f20c59" :current="currentTitle" @change="change"></u-tabs>
		</view>
		<k-scroll-view ref="k-scroll-view" :loadTip="loadTip" :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight"
		 :height="height" :bottom="bottom" :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown"
		 @onPullUp="handleLoadMore">
			<commodityTemplate :goodsList="goodsList"></commodityTemplate>
		</k-scroll-view>
	<!-- 	<view class="bottom-content">
			<view class="template-no-more">看完啦</view>
		</view> -->
		<goTop v-if="isShowLogo"></goTop>
	</view>
</template>

<script>
	import goTop from '@/component/goTop/goTop.vue';
	import commodityTemplate from "@/component/commodityTemplate/commodityTemplate.vue"
	import { getGoodsList } from "@/api/common.js";
	export default {
		data() {
			return {
				isShowLogo: false,
				isLogo: false,
				tabsList: [{cat_id:2,name:"国美超市"},{cat_id:1,name:"厨卫大店"}],
				currentTitle: 0,
				goodsId: 2,
				page: 1,
				goodsList: [],
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
		methods:{
			change(obj) {
				this.page = 1;
				this.goodsId = obj.id
				this.currentTitle = obj.index;
				this.getGoodsListData();
			},
			// 根据id获取商品数据
			async getGoodsListData() {
				var { message } = await getGoodsList(this.goodsId, this.page);
				message.map(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				this.goodsList = message;
			},
			// 上拉刷新
			async handleLoadMore(stopLoad) {
				this.page++;
				var { message } = await getGoodsList(this.goodsId, this.page);
				stopLoad ? stopLoad() : '';
				if (message.length == 0) {
					uni.showToast({
						title: "客官已到底了哦~",
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
			if (scrollTop > position && this.isLogo == false) {
				this.isShowLogo = true;
				this.isLogo = true;
			} else if (scrollTop < position && this.isLogo == true) {
				this.isShowLogo = false;
				this.isLogo = false;
			}
		},
		created(){
			this.getGoodsListData();
		},
		components:{
			goTop,
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
			// width: 400rpx;
			// margin: auto;
			margin-left: 210rpx;
		}
		
	/* 	.bottom-content {
			padding: 30rpx 0;
		
			.template-no-more {
				text-align: center;
				font-size: 24rpx;
				background: url("@/static/images/shop/bottom.png") no-repeat 50%;
				background-size: 390rpx 12rpx;
			}
		} */
	}
</style>
