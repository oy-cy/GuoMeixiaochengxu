<template>
		<view class="goge">
			<van-grid :column-num="hang">
				<van-grid-item v-for="(item,index) in gogeidata" :icon="item.img_url" :text="item.name" @click="select(index)"/>
			</van-grid>
		</view>
</template>

<script>
		export default {
			
			props:['hang',"pageid"],
			data(){
				return{
					
				gogeidata:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'}
				]
				}
			},
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
			margin:20rpx 0;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 30rpx;
		}
</style>
