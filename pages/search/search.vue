<template>
	<view class="search">
		<van-search v-model="value" 
		placeholder="iPhone 12新品发布" 
		shape="circle"
		show-action 
		@change="onChange"
		@cancel="onCancel"
		@click="onClick" 
		class="style"
		/>
		<!-- <van-search  placeholder="请输入搜索关键词" /> -->
		<!-- 热门搜索 -->
		<view class="hot-search">
			<view class="hot-top">
				<image src="../../static/images/search/hot-search.png" mode=""></image>
				<text>热门搜索</text>
			</view>
			<view class="keyword">
				<view class="aa">iphone 12</view>
				<view class="aa">格力空调自营</view>
				<view class="aa">格力空调自营</view>
				<view class="aa">格力空调自营</view>
				<view class="aa">格力空调自营</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="keyword-box">
			<view class="history">
				<image src="../../static/images/search/history.png" mode=""></image>
				<text>搜索历史</text>
			</view>
			<view class="history-keyword">
				<view class="aa">iphone 12</view>
				<view class="aa">格力空调自营</view>
				<view class="aa">格力空调自营</view>
			</view>
			<view class="enpty">清空历史记录</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			};
		},
		methods:{
			// onChange输入内容
			onChange(e){
				this.value = e.detail
				console.log(this.value);
				var getValue = this.value;
				
			},
			// 清空输入内容
			onClick(e) {
				this.value = ""
			  },
			// onCancel 点击取消按钮
			onCancel(){
				console.log("取消");
				uni.reLaunch({
				  	url:'/pages/home/home'
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.search{
		/deep/.van-search__content {
			bocrder-radius: 100px;
		}
		.style{
			border-bottom: 2rpx solid rgb(230, 230, 230);
			padding-bottom: 10rpx;
		}
		.hot-search{
			border-bottom: 2rpx solid rgb(230, 230, 230);
			padding-bottom: 10rpx;
			.hot-top{
				margin: 20rpx;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
			.keyword{
				display: flex;
				flex-wrap: wrap;
				.aa{
					display: inline;
					margin: 10rpx ;
					padding: 10rpx 20rpx;
					border: 2rpx solid rgb(230, 230, 230);
					border-radius: 50px;
					font-size: 24rpx;
				}
			}
		}
		.keyword-box{
			border-bottom: 2rpx solid rgb(230, 230, 230);
			padding-bottom: 10rpx;
			.history{
				margin: 20rpx;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
			.history-keyword{
				display: flex;
				flex-wrap: wrap;
				.aa{
					display: inline;
					margin: 10rpx ;
					padding: 10rpx 20rpx;
					border: 2rpx solid rgb(230, 230, 230);
					border-radius: 50px;
					font-size: 24rpx;
				}
			}
			.enpty{
				margin: 40rpx auto;
				width: 220rpx;
				padding: 10rpx 100rpx;
				border: 2rpx solid rgb(230, 230, 230);
				border-radius: 50px;
			}
		}
	}
</style>
