<template>
		<view class="goge">
			<van-grid :column-num="hang" icon-size="60" :border="false">
				<van-grid-item v-for="(item,index) in gogeidata" :icon="item.g_img" :text="item.g_title"  @click="select(item.g_title)"/>
			</van-grid>
		</view>
</template>

<script>
	import {getGrid} from "@/api/common.js"
		export default {
			
			props:['hang',"pageid"],
			data(){
				return{
					gogeidata:[]
				}
			},
			methods:{
				select(title){
					uni.navigateTo({
						url:"/pages/goodsList/goodsList?goodsName="+title
					})
				},
				async getGaidData(){
					var {message} = await getGrid(this.pageid);
					this.gogeidata = message;
				}
			},
			created() {
				this.getGaidData();
			}
		}
</script> 

<style lang="scss" scoped>

	.goge{
			margin:20rpx 0;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 30rpx;
		}
</style>
