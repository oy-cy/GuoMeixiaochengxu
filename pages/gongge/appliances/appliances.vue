<template>
	<view class="home">
		
		<!-- 轮播图 -->
		<lb :lbdata='lbdata'></lb>
		
		<!-- 宫格 -->
		<gogei hang='4' :gogeidata='gogeidata'></gogei>
		
		
		<!-- 抢购 -->
		
		<!-- 换新推荐 -->
		<renew :renewData="renewdata" title="换新推荐"></renew>
		
		
		<!-- 热卖榜单 -->
		<ranking :rankingdata="rankingdata"></ranking>
		
		<!-- 大家都在买 -->
		
			<view class="top">
				<view class="title">
					--大家都在买--
				</view>
				<view class="classify">
					<scroll-view scroll-x class="listbox" :enable-flex="true"  >
						<view class="list ">
								123
								<view></view>
						</view>
						<view class="list ">
								123
								<view></view>
						</view>
						<view class="list ">
								123
								<view></view>
						</view>
						<view class="list ">
								123
								<view></view>
						</view>
					</scroll-view>
				</view>
			</view>
		
	</view>
</template>

<script>
	import gogei from '../../../component/gongge/gogei.vue'
	import lb from "../../../component/gongge/lb.vue"
	import renew from "../../../component/gongge/renew.vue"
	import ranking from "../../../component/gongge/ranking.vue"
	export default {
		
		data(){
			return{
				select:2,
				lbdata:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'}],
				gogeidata:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'}
					],
				renewdata:[
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',price:"599"},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',price:"599"},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',price:"599"},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',price:"599"},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',price:"599"},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',text:'mi8用户成功换机，入手一周了，各方面都十分满意，屏幕，震动，拍照，声音都...',price:"599"},
				],
				rankingdata:[[{id:1,name:'好评榜'},{id:2,name:'热卖榜'},{id:3,name:'收藏榜'}],
						[{listid:1,
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
						price:"799"},
						]
				]
			} 
		},
		created() {
			
		},

		components:{
			gogei,
			lb,
			renew,
			ranking
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		background-color: #F2F2F2;
		height: 30000rpx;
		
		// .everyone{
			// margin:20rpx;
			// padding: 20rpx;
			// background-color: #fff;
			// border-radius: 30rpx;
			.top{
				position: sticky;
				top: 0;
				.listbox{
					height: 80rpx;
					display: flex;
					white-space: nowrap;
					justify-content: center;
					
					.list{
						font-size: 40rpx;
						text-align: center;	
						width: 20%;
						margin: 0 20rpx;
						
					}
					.listselect{
						font-weight: 800;
						color: #F54882;
						view{
							margin: 0 auto;
							width: 50rpx;
							height: 6rpx;
							background-color: #F54882;
						}
					}
				}
				
			}
		// }
		
	}
</style>