<template>
		
			<van-grid :column-num="hang">
				<van-grid-item v-for="(item,index) in data" :icon="item.img_url" :text="item.name" @click="select(index)"/>
			</van-grid>
</template>

<script>
		export default {
			
			props:['hang','data'],
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


</style>
