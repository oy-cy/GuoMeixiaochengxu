<template>
	<view class="addcar">
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			getAddCar(good){
				var boot = true;
				carList.forEach(v=>{
					if(v.id==good.id){
						v.num++;
						boot = false;
					}
				})
				
				if(boot == false){
					// good把购物车需要的提交到数组
					carList.push()
				}
			} 
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
