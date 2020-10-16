<template>
	<view class="home">
		
		<!-- 轮播图 -->
		<lb :lbdata='lbdata'></lb>
		
		<!-- 宫格 -->
		<view class="goge">
			<gogei hang='4' :data='data'></gogei>
		</view>
		
		<!-- 抢购 -->
		
		<!-- 换新推荐 -->
		<view class="renew">
			<view class="headline">
				换新推荐
			</view>
			
			<scroll-view :scroll-x="true" class="strip">
				<view class="box">
					<view class="goodbox">
						1
					</view>
					<view class="goodbox">
						1
					</view>
					<view class="goodbox">
						1
					</view>
					<view class="goodbox">
						1
					</view>
					<view class="goodbox">
						1
					</view>
					<view class="goodbox">
						1
					</view>
					<view class="goodbox">
						1
					</view>
				</view>
			</scroll-view>
		</view>
		
		
		<!-- 热卖榜单 -->
		
		<!-- 大家都在买 -->
		
	</view>
</template>

<script>
	// import topSrarch from "../../component/topSearch/topSearch.vue"
	// import gogei from '../../../component/gongge/gogei.vue'
	// import lb from "../../../component/gongge/lb.vue"
	
	export default {
		
		data(){
			return{
				lbdata:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'}],
				data:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
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
		created() {
			
		},

		components:{
			// gogei,
			// lb
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		background-color: #F2F2F2;
		
		.goge{
			margin:20rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 30rpx;
		}
		
		.renew{
			margin: 20rpx;
			padding: 20rpx;
			background-color: #fff;
			
			.strip{
				white-space: nowrap;
					width: 10000rpx;
				// height: 50rpx;
				.box{
					white-space: nowrap;
					display: flex;
					// flex-wrap: wrap;
					.goodbox{
						width: 300rpx;
					}
				}
			}
		}
		
		
	}
</style>
