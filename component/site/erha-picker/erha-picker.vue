<template>
	<view class="level-container">
		<h1 class="title">选择区域</h1>
		<ul class="name-list">
			<li :class="currentSelect==0?'select':''" @click="anewSelect(0)">{{province}}</li>
			<li :class="currentSelect==1?'select':''" @click="anewSelect(1)" v-if="topIndex>=1">{{city}}</li>
			<li :class="currentSelect==2?'select':''" @click="anewSelect(2)" v-if="topIndex>=2">{{area}}</li>
			<li :class="currentSelect==3?'select':''" @click="anewSelect(3)" v-if="topIndex>=3">{{street}}</li>
		</ul>
		<ul v-if="showIndex==0" class="content" :style="'height:'+ heightCot + 'upx'">
			<li @click="selectPro(index,item.label)" v-for="(item,index) in provinceData" :key="index">
				<view>{{item.label}}</view>
				<view v-if="proIndex == index">
					<image src="/static/images/user/yes.png" mode=""></image>
				</view>
			</li>
		</ul>

		<ul v-if="showIndex==1" class="content" :style="'height:'+ heightCot + 'upx'">
			<li @click="selectCity(index,item.label)" v-for="(item,index) in cityData" :key="index">
				<view>{{item.label}}</view>
				<view v-if="cityIndex == index">
					<image src="/static/images/user/yes.png" mode=""></image>
				</view>
			</li>
		</ul>

		<ul v-if="showIndex==2" class="content" :style="'height:'+ heightCot + 'upx'">
			<li @click="selectaArea(index,item.label)" v-for="(item,index) in areaData" :key="index">
				<view>{{item.label}}</view>
				<view v-if="areaIndex == index">
					<image src="/static/images/user/yes.png" mode=""></image>
				</view>
			</li>
		</ul>

		<ul v-if="showIndex>=3" class="content" :style="'height:'+ heightCot + 'upx'">
			<li @click="selectStreet(index,item)" v-for="(item,index) in streetsData" :key="index">
				<view>{{item}}</view>
				<view v-if="strIndex == index">
					<image src="/static/images/user/yes.png" mode=""></image>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	import provinceData from './city-data/province.js';
	import getCity from './city-data/city.js';
	import getArea from './city-data/area.js';
	import getStreets from './city-data/streets.js';
	export default {
		props:['proName','cityName','areaName','strName'],
		data() {
			return {
				province: "请选择",
				city: "请选择",
				area: "请选择",
				street: "请选择",
				cityDataAll: '', // 市的所有數據
				getAreaAll: '', // 区的所有数据
				getStreetsAll: '', // 街道的所有数据
				// presentIndex: [],
				proIndex: -1,
				cityIndex: -1,
				areaIndex: -1,
				strIndex:-1,

				provinceData: '', // 当前展示的省数据
				cityData: '', // 当前展示的市数据
				areaData: '', //当前展示的区数据
				streetsData: '', //当前展示的街道数据
				showIndex: 0,
				currentSelect:0,
				topIndex:0,
				heightCot: 0,
			}
		},
		created() {
			this.initializePro();
			
			uni.getSystemInfo({
				success: res => {
					this.heightCot = ((res.safeArea.height * 2) / 2);
				}
			})
		},
		mounted() {
			// console.log(provinceData)
			this.provinceData = provinceData;
			this.cityDataAll = getCity;
			this.getAreaAll = getArea;
			this.getStreetsAll = getStreets
		},
		methods: {
			initializePro(){
				if(this.proName){
					for(let i = 0; i < provinceData.length; i++){
						var province = provinceData[i];
						if(province.label == this.proName){
							this.proIndex = i;
							this.province = province.label;
							this.cityData = getCity[i];
							this.showIndex = 1;
							this.currentSelect = 1;
							this.topIndex = 1;
							
							this.initializeCity(i);
							break;
						}
					}
				}
			},
			initializeCity(tempProIndex){
				if(this.cityName){
					for(let i = 0; i < getCity[tempProIndex].length; i++){
						var city = getCity[tempProIndex][i];
						if(city.label == this.cityName){
							this.cityIndex = i; // 当前市的下标
							this.city = city.label;
							this.areaData = getArea[tempProIndex][i];
							this.showIndex = 2;
							this.currentSelect = 2;
							this.topIndex = 2;
							this.initializeArea(tempProIndex,i);
							break;
						}
					}
				}
			},
			initializeArea(tempProIndex,tempCityIndex){
				if(this.proName){
					for(let i = 0; i < getArea[tempProIndex][tempCityIndex].length; i++){
						var area = getArea[tempProIndex][tempCityIndex][i];
						if(area.label == this.areaName){
							this.area = area.label;
							this.streetsData = getStreets[tempProIndex][tempCityIndex][i];
							this.showIndex = 3;
							this.currentSelect = 3;
							this.topIndex = 3;
							this.areaIndex = i;
							
							this.initializeStr(tempProIndex,tempCityIndex,i);
							break;
						}
					}
				}
			},
			initializeStr(tempProIndex,tempCityIndex,tempArea){
				if(this.proName){
					for(let i = 0; i < getStreets[tempProIndex][tempCityIndex][tempArea].length; i++){
						var str = getStreets[tempProIndex][tempCityIndex][tempArea][i];
						if(str == this.strName){
							this.strIndex = i;
							
							break;
						}
					}
				}
			},
			anewSelect(num) {
				switch (num) {
					case 0:
						this.currentSelect = 0;
						this.showIndex = 0;
						// this.areaData = [];
						// this.streetsData = [];
						// this.city = '请选择';
						// this.area = '请选择';
						// this.street = '请选择'
						break;
					case 1:
						this.currentSelect = 1;
						this.showIndex = 1;
						// this.areaData = [];
						// this.streetsData = [];
						// this.area = '请选择';
						// this.street = '请选择'
						break;
					case 2:
						this.currentSelect = 2;
						this.showIndex = 2;
						// this.streetsData = [];
						// this.street = '请选择'
						break;
					case 3:
						this.currentSelect = 3;
						this.showIndex = 3;
						// console.log(11111);
						break;
				}
			},
			selectPro(index, label) {
				console.log(index)
				const {
					cityDataAll
				} = this;
				this.proIndex = index; // 当前省的下标
				this.province = label;
				this.cityData = cityDataAll[index];
				this.showIndex = 1;
				this.currentSelect = 1;
				this.topIndex = 1;
				this.city = '请选择';
				this.area = '请选择';
				this.street = '请选择';
				this.areaData = [];
				this.streetsData = [];
				this.cityIndex= -1;
				this.areaIndex= -1;
				this.strIndex = -1;
			},
			selectCity(index, label) {
				const {
					proIndex
				} = this;
				// console.log(this.getAreaAll)
				this.city = label;
				this.cityIndex = index; // 当前市的下标
				this.areaData = this.getAreaAll[proIndex][index];
				this.showIndex = 2;
				this.currentSelect = 2;
				this.topIndex = 2;
				this.area = '请选择';
				this.street = '请选择';
				this.streetsData = [];
				this.areaIndex= -1;
				this.strIndex = -1;
			},
			selectaArea(index, label) {
				const {
					proIndex,
					cityIndex
				} = this;
				
				this.area = label;
				try{
					var streetsData = this.getStreetsAll[proIndex][cityIndex][index];
				} catch(e){
					const {
						province,
						city,
						area,
					} = this;
					this.$emit('conceal',{
						province,
						city,
						area,
						street:''
					})
				}
				
				this.showIndex = 3;
				this.currentSelect = 3;
				this.topIndex = 3;
				this.areaIndex = index;
				this.street = '请选择';
				this.strIndex = -1;
				this.streetsData = streetsData;
			},
			selectStreet(index, label) {
				this.street = label;
				const {
					province,
					city,
					area,
					street
				} = this;
				this.$emit('conceal',{
					province,
					city,
					area,
					street
				})
			}
		}
	}
</script>

<style lang="less">
	ul,li{
		list-style: none;
	}
	.level-container {
		width: 100%;
		background: #fff;
		position: fixed;
		bottom: 0;
		left:0;
		z-index: 101;
		.select {
			color: red;
			position: relative;

			&::after {
				content: '';
				width: 40upx;
				height: 6upx;
				background: red;
				position: absolute;
				left: 50%;
				bottom: -8upx;
				margin-left: -20upx;
			}
		}

		li {
			font-size: 26upx;
		}

		.content,
		.name-list {
			padding: 0 20upx;
		}

		.title {
			font-size: 32upx;
			margin: 30upx 20upx;
		}

		.name-list {
			display: flex;

			li {
				margin-right: 40upx;
				padding-bottom: 6upx;
			}
		}

		.content {
			margin-top: 20upx;
			height: 600upx;
			overflow-y: auto;

			li {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #f1f1f1;
				padding: 20upx 0;
				view {
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}

			li:last-child {
				border-bototm: none !important;
			}
		}
	}
</style>
