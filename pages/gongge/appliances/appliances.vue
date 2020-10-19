<template>
	<view class="home">
		
		<!-- 轮播图 -->
		
		<lb></lb>
		
		<!-- 宫格 -->
		
		<gogei hang='4'></gogei>
		
		<!-- 抢购 -->
		
		<scrollList title="抢购"></scrollList>
		
		<!-- 换新推荐 -->
		
		<scrollList title="换新推荐" ></scrollList>
		
		
		<!-- 热卖榜单 -->
		
		<scrollList title="热卖榜单"></scrollList>
		
		<!-- 大家都在买 -->   
		 
		<everyone></everyone>
		
		
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
				
			} 
		},
		created() {
			this.robselect = this.robData[0].id;
		},
		methods:{
			
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
		// height: 30000rpx;
		padding: 0 20rpx;
		
		
		
	}
</style>