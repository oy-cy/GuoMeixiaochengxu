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
			props:['lbdata']
		}
</script>

<style lang="scss"scoped>
	.lbt{
		.swiper{ 
			padding: 20rpx;
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
