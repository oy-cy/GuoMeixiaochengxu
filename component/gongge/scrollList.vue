<template>
	<view class="scrollList" >
		<view class="headline" v-if="title != undefined">
			{{title}}
		</view>
		
		<scroll-view scroll-x class="strip">
				<view class="goodbox" v-for="(item,index) in goodlist" :key="index" @click="skipGood(index)">
					<view class="img">
						<view class="ranking" v-if="item.id == 1">
							
						</view>
						<image :src="item.img_url" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="message">
						<view class="text">
							{{item.text}}
						</view>
						<view class="price">
							<text class="money">
								￥{{item.price}}
							</text>
							<text class="car" @click.stop="addCar(index)">
								
							</text>
						</view>
					</view>
					
				</view>
				
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:["title"],
		data(){
			return{
				goodlist:[
					{listid:1,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"599"},
					{listid:1,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"599"},	
					{listid:1,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"599"},
					{listid:1,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"599"},
					{listid:2,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"699"},
					{listid:2,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"699"},
					{listid:2,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"699"},
					{listid:2,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"699"},
					{listid:2,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"699"},
					{listid:2,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"699"},
					{listid:3,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"799"},
					{listid:3,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"799"},
					{listid:3,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"799"},
					{listid:3,
					img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',
					text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',
					price:"799"}
				]
			}
		},
		created() {
			
		},
		methods:{
			skipGood(index){
				uni.navigateTo({
					url:'/pages/goodsDetail/goodsDetail'
				})
			},
			addCar(index){
				
				console.log(index)
			}
		},
		created() {
			console.log(this.title)
		}
	}
</script>

<style lang="scss" scoped>
	
	.scrollList{
		margin: 20rpx 0;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 30rpx;
		overflow: hidden;
		.headline{
			margin: 20rpx; 
			font-size: 40rpx;
			font-weight: 700;
		}
		.strip{
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			margin: 30rpx 0;
			.goodbox{
				white-space:normal !important; 
				display: inline-block;
				margin-right: 10rpx;
				width: 210rpx;
				font-size: 30rpx;
				 word-wrap: break-word;
					
				
				.img{
					
						position: relative;
					width: 210rpx;
					height: 210rpx;
					border-radius: 10rpx;
					overflow: hidden;
					.ranking{
						position: absolute;
						top: 0rpx;
						left: 0rpx;
						width: 30rpx;
						height: 30rpx;
						background-color: red;
						
					}
				}
				
				.message{
					padding: 10rpx;
					.text{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.price{
						display: flex;
						margin-top: 20rpx;
						.money{
							flex: 1;
							color: #F20C59;
							font-weight: 700;
						}
						.car{
							width: 60rpx;
							height: 60rpx;
							background-color: red;
							text-align: right;
						}
					}
				}
				
			}
		}
	}
</style>
