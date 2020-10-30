<template>
	<view class="home">
		 
		<!-- 轮播图 -->
		
		<lb :pageid="pageid"></lb>
		
		<!-- 宫格 -->
		<gogei hang='4' :pageid="pageid"></gogei>
		
		<!-- 抢购 -->
		<scrollList title="rob" ></scrollList>
		
		<!-- 换新推荐 -->
		<scrollList title="exchange"></scrollList>
		
		
		<!-- 热卖榜单 -->
		<scrollList title="hot"></scrollList>
		
		<!-- 大家都在买 -->
		<everyone :pageid="pageid"></everyone>
		
		
	</view>
</template>

<script>
	import gogei from '../../../component/gongge/gogei.vue'
	import lb from "../../../component/gongge/lb.vue"
	import scrollList from "../../../component/gongge/scrollList.vue"
	import everyone from "../../../component/gongge/everyone.vue"
	export default {
		
		data(){
			return{
				pageid:"appliances"
			} 
		},
		components:{
			gogei,
			lb,
			scrollList,
			everyone
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		background-color: #F2F2F2;
		padding: 0 20rpx;
	}
</style>