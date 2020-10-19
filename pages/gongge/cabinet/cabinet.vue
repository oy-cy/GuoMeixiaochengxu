<template>
	<view class="cabinet">
		<lb :pageid="pageid"></lb>
		<gogei hang="3" :pageid="pageid"></gogei>
		<scrollList :pageid="pageid"></scrollList>
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
	.cabinet{
		background-color: #F2F2F2;
		padding: 0 20rpx;
	}
</style>
