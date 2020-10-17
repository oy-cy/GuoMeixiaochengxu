<template>
		<view class="goge">
			<van-grid :column-num="hang">
				<van-grid-item v-for="(item,index) in gogeidata" :icon="item.img_url" :text="item.name" @click="select(index)"/>
			</van-grid>
		</view>
</template>

<script>
		export default {
			
			props:['hang','gogeidata'],
			methods:{
				select(index){
					console.log(index)
					uni.navigateTo({
						
						url:"/pages/goodsList/goodsList"
					})
				}
			}
		}
</script> 

<style lang="scss" scoped>

.goge{
			margin:20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 30rpx;
		}
</style>
