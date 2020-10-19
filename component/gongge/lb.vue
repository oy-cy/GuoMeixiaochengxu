<template>
	<scroll-view class="lbt">
			<swiper class="swiper" :indicator-dots='true' indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" :circular="true" :autoplay="true">  
				<swiper-item class="imgbox" v-for="(item,index) in lbdata" :key="index">
					<view class="img">
						<image :src="item.img_url" style="width: 100%;height: 100%;"></image>
					</view>
				</swiper-item>
			</swiper>
	</scroll-view>
</template>

<script>
		export default {
			data(){
				return{
					lbdata:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'},
						{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'},
						{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'}],
					
				}
			}
		}
</script>

<style lang="scss"scoped>
	.lbt{
		// width: 100vw;
		.swiper{ 
			padding: 20rpx 0;
			.imgbox{
				width: 96%;
				height: 96%;
				margin:0 2%;
				.img{
					border-radius: 30rpx;
					overflow: hidden;
					width: 96%;
					height: 100%;
				}
				
			}
		}
	}
</style>
