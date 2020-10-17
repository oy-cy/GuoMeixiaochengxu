<template>
	<view class="container">
		<!-- 搜索框 -->
		<uni-search-bar @input="input" placeholder="请输入搜索名称或拼音查询" cancelButton="auto" ></uni-search-bar>
		<!-- 当前定位城市 -->
		<view class="current-city">
			<!-- <image src="" mode=""></image> -->
			<view class="text">当前城市定位</view>
			<view class="city">{{city}}</view>
		</view>
		<!-- 城市列表 -->
		<view class="city-list">
			<van-index-bar highlight-color="#444">
				<view v-for="(item, index) in list" :id="item.idx" :key="item.idx">
					<van-index-anchor :index="item.idx">
						{{ item.idx }}
					</van-index-anchor>
					<view class="city-div" v-for="(city, i) in item['cities']" :key="i">
						<text class="text">
							{{city.city_name}}
						</text>
					</view>
				</view>
			</van-index-bar>
		</view>
		<!-- </scroll-view> -->
		
	</view>
</template>

<script>
import Citys from '/static/js/acity.js';
import amap from '/static/js/amap-wx.js';
import uniSearchBar from '/components/uni-search-bar/uni-search-bar.vue';
	export default {
		data() {
			return {
				// 地址数组
				list: [],
				// 当前定位城市
				city:'',
				// 搜索值
				value:''
			}
		},
		components: {
			uniSearchBar
		},
		onLoad() {
			this.list = Citys.data.city_nav;
			this.getSite();
		},
		methods: {
			// 获取当前定位城市
			getSite(){
				this.amapPlugin = new amap.AMapWX({  
					//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
					key: '7c235a9ac4e25e482614c6b8eac6fd8e'  
				});
				//定位地址
				this.amapPlugin.getRegeo({  
					success: (data) => {
						this.city = data[0].regeocodeData.addressComponent.city;//把"市"去掉
					}
				}); 
			},
			focus(){
				console.log('asdf')
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.current-city{
		display: flex;
		background-color: #fff;
		z-index: 2;
		margin:0 20rpx;
		height: 60rpx;
		align-items: center;
		image {
			width: 50rpx;
			height: 50rpx;
		}
		.text {
			font-size: 30rpx;
			color: #aaa;
		}
		.city {
			font-size: 36rpx;
			margin-left: 20rpx;
		}
	}
	.city-list {
		.city-div {
			padding: 30rpx 20rpx;
			border-bottom: 2rpx solid #ebebeb;
			
		}
	}
}
</style>