<template>
	<view class="phone">
		<lb :pageid="pageid"></lb>
		<gogei hang="4" :pageid="pageid"></gogei>
		<scrollList title="换新推荐" :pageid="pageid"></scrollList>
		<scrollList title="热卖榜单" :pageid="pageid"></scrollList>
		<everyone  :pageid="pageid"></everyone>
	</view>
</template>

<script>
	import lb from "../../../component/gongge/lb.vue"
	import gogei from "../../../component/gongge/gogei.vue"
	import scrollList from "../../../component/gongge/scrollList.vue"
	import everyone from "../../../component/gongge/everyone.vue"
	export default {
		data() {
			return {
				pageid:2
			};
		},
		components:{
			lb,
			gogei,
			scrollList,
			everyone
		}
	}
</script>

<style lang="scss" scoped>
	.phone{
		background-color: #F2F2F2;
		padding: 0 20rpx;
	}
</style>
