<template>
	<view class="supermarket">
		<scroll-view class="lbt">
			<swiper class="swiper" :indicator-dots='true' indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" :circular="true" :autoplay="true">  
				<swiper-item class="imgbox" v-for="(item,index) in lbdata" :key="index">
						<image :src="item.s_img" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</swiper>
		</scroll-view>
		
		<van-grid column-num="4" class="gogei" icon-size="50">
			<van-grid-item v-for="(item,index) in gogeidata" :icon="item.g_img" :text="item.g_title" @click="select(index)"/>
		</van-grid>
		
		<view class="refinedselect">
			<view class="top">
				精选好货
			</view>
			<view class="goodbox">
				<van-grid column-num="3" class="gogei" gutter="3">
					<!-- <van-grid-item v-for="(item,index) in gogeidata" :icon="item.img_url" :text="item.name" @click="select(index)"/> -->
					 <van-grid-item use-slot  v-for="(item,index) in goodlist" :key="index" class="gridItem">
						 
					    <image
					      style="width: 100%; height: 280rpx;"
					      :src="item.sku_thumbImg_url"
					    />
						<view class="describe">
							<view class="title">
								{{item.sku_name}}
							</view>
							<view class="price">
								￥{{item.sku_price}}
							</view>
						</view>
					  </van-grid-item>
				</van-grid>
			</view>
		</view>
	
		
		<view class="listtop" style="position: sticky; top: 0;">
			
			<u-tabs :list="tabsList" :is-scroll="true" active-color="#f20c59" :current="currentTitle" @change="change"></u-tabs>
		</view>
	
			<view class="goodbox" v-for="(item,index) in goodlist">
				<image :src="item.sku_thumbImg_url" style="width: 200rpx;height: 200rpx;"></image>
				<view class="describe">
					<view class="title">
						
						<text class="title_text"><text class="title_tag">国美超市</text>{{item.sku_name}}</text>
					</view>
					<view class="price">
						￥{{item.sku_price}}
					</view>
					
				</view>
			</view>
			<view class="finish">
				看完了( •̀ ω •́ )✧
			</view>
		
		<view class="">
			
		</view>
	</view>
</template>

<script>
	import {getLunbotu} from "../../../api/common.js"
	import {getGrid} from "../../../api/common.js"
	import {getSeckill} from "../../../api/common.js"
	export default {
		data() {
			return {
				currentTitle:1,
				tabsList: [
					{
						name: '全部',
						id: 10,
					}, {
						name: '国美超市',
						id: 11
					}, {
						name: '空调',
						id: 12
					},
					{
						name: '彩电',
						id: 13
					},{
						name: '冰箱',
						id: 14
					},{
						name: '洗衣机',
						id: 15
					},{
						name: '手机',
						id: 16
					}
				],
				lbdata:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360'}],
				gogeidata:[{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
					{img_url:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1b2062c91c60cd5d8b3819626ada481.jpg?thumb=1&w=720&h=360',name:'123'},
				],
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
		methods:{
			select(index){
				console.log(index)
			},
			change(obj){
				this.currentTitle = obj.index
				console.log(obj)
			},
			async getLunboData(){
				var {message} = await getLunbotu("coles");
				this.lbdata = message
			},
			async getGridData(){
				var {message} = await getGrid("coles");
				this.gogeidata = message
			},
			async getSeckillData(){
				var {message} = await getSeckill(1);
				this.goodlist = message
			}
		},
		created() {
			this.getLunboData();
			this.getGridData();
			this.getSeckillData();
		}
	}
</script>

<style lang="scss" scoped>
	.supermarket{
		background-color: #F2F2F2;
		.lbt{
			margin: 20rpx 0;
		}
		
		.gogei{
			background-color: #fff;
		}
		
		.refinedselect{
			margin: 20rpx 0;
			.top{
				margin: 20rpx 0;
				padding: 20rpx;
				background-color: #fff;
			}
			.goodbox{
				.gogei{
					/deep/.van-grid-item__content{
						border-radius: 10rpx;
						overflow: hidden;
					}
					.describe{
						.title{
							font-size: 30rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.price{
							margin-top: 20rpx; 
							font-size: 38rpx;
							font-weight: 700;
							color: #F20C59;
						}
					}
				}
			}
		}
		
		.goodbox{
			background-color: #fff;
			display: flex;
			margin: 15rpx;
			.describe{
				flex: 1;
				padding: 10rpx;
				.title{
					
					.title_text{
						.title_tag{
							font-size: 24rpx;
							margin-right: 10rpx;
							background: -webkit-gradient(linear,left top,right top,from(#fa1e8c),to(#f20c59));
							background: linear-gradient(90deg,#fa1e8c,#f20c59);
						}
					
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				.price{
					margin-top: 20rpx;
					font-size: 40rpx;
					font-weight: 700;
					color: #fa1e8c;
				}
			}
		}
	
		.finish{
			text-align: center;
			font-size: 40rpx;
			padding: 20rpx 0;
			color: #ccc;
		}
		
		
	}
</style>
