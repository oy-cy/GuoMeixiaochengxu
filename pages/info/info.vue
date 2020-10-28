<template>
	<view class="info-container">
		<view class="no-message">暂无客服聊天信息哟～</view>
		<view class="title">全程导购</view>
		<guideList :guideData="guideData"></guideList>
	</view>
</template>

<script>
	import guideList from "@/component/guideList/guideList.vue";
	import { getShoppingGuide } from "../../api/common.js";
	export default {
		data() {
			return {
				guideData: [],
			};
		},
		methods:{
			// 获取导购人员数据
			async getShoppingGuideData() {
				var {
					message
				} = await getShoppingGuide();
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
				console.log("info",message)
			},
		},
		components:{
			guideList
		},
		created() {
			this.getShoppingGuideData();
		}
	}
</script>

<style lang="scss" scoped>
	.info-container {
		.no-message {
		padding: 40rpx;
		font-size: 26rpx;
		color: #919599;
		text-align: center;
		background: #f3f5f7;
	}
		.title {
			font-size: 34rpx;
			padding-top: 20rpx;
			padding-left: 30rpx;
			
		}
	}
</style>
