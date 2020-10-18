<template>
	<view class="container">
		<!-- 搜索框 -->
		<uni-search-bar @input="input" placeholder="请输入搜索名称或拼音查询" cancelButton="auto" :radius='20' v-model="search"></uni-search-bar>
		<!-- 当前定位城市 -->
		<view class="current-city" v-if="!search.value.length" @click="setCity(currentCity)">
			<view class="text">当前城市定位</view>
			<view class="city" v-if="currentCity">{{currentCity}}</view>
			<view class="fail" v-if="!currentCity">定位失败</view>
		</view>
		<!-- 城市列表 -->
		<view class="city-list" v-if="!search.value.length">
			<van-index-bar highlight-color="#444"> 
				<view v-for="(item, index) in list" :id="item.idx" :key="item.idx">
					<van-index-anchor :index="item.idx">
						{{ item.idx }}
					</van-index-anchor>
					<view class="city-div" v-for="(city, i) in item['cities']" :key="i" @click="setCity(city.city_name)">
						<text class="text">
							{{city.city_name}}
						</text>
					</view>
				</view>
			</van-index-bar>
		</view>
		
		<!-- 搜索结果 -->
		<view class="search-result" v-if="search.value.length">
			<!-- 搜索到结果 -->
			<view class="list" v-if="arr.length != 0" v-for="(item,index) in arr" :key="index">
				<view class="item" @click="setCity(item.city_name)">
					{{item.city_name}}
				</view>
			</view>
			<!-- 未搜索到结果 -->
			<view class="empty" v-if="arr.length == 0">
				<view class="text">暂未能找到相关城市，请重新查询</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import Citys from '@/static/js/acity.js';
import amap from '@/static/js/amap-wx.js';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	export default {
		data() {
			return {
				// 地址数组
				list: [],
				// 当前定位城市
				currentCity:'',
				// 搜索值
				search:'',
				// 搜索结果
				arr:[]
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
				// this.amapPlugin.getRegeo({  
				// 	success: (data) => {
				// 		this.currentCity = data[0].regeocodeData.addressComponent.city;//把"市"去掉
				// 	},
				// 	fail:(data)=>{
				// 		console.log("请求失败：");
				// 		console.log(data)
				// 	}
				// }); 
			},
			// 监听value
			input(){
				var value = this.search.value;
				
				// 为空退出
				if(value.trim() == ''){
					return;
				}
				// 保存搜索到的值
				var arr = [];
				
				this.list.map(v => {
					v.cities.map(city => {
						if((city.city_name.indexOf(value) != -1) || (city.city_pinyin.indexOf(value) != -1) || (city.py.indexOf(value) != -1)){
							arr.push(city);
						}
					})
				});
				this.arr = arr;
			},
			// 修改所选城市
			setCity(name){
				if(name==''){
					return;
				}
				// 保存地址
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	height: 70vh;
	.current-city{
		display: flex;
		background-color: #fff;
		z-index: 2;
		padding:0 20rpx;
		height: 60rpx;
		align-items: center;
		image {
			width: 50rpx;
			height: 50rpx;
		}
		.fail {
			margin-left: 20rpx;
			color: red;
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
		background-color: #fff;
		.city-div {
			padding: 20rpx;
			border-bottom: 2rpx solid #ebebeb;
		}
	}
	.search-result {
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		.list {
			width: 100%;
			.item {
				padding: 20rpx;
				border-bottom: 2rpx solid #ebebeb;
			}
		}
		.empty {
			position: relative;
			display: flex;
			justify-content: center;
			width: 600rpx;
			height: 500rpx;
			background: url('@/static/images/site/empty.png') no-repeat;
			.text {
				position: absolute;
				bottom: 20rpx;
			}
		}
	}
}
</style>