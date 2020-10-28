<template>
	<view class="search">
		<van-search v-model="value" 
		placeholder="iPhone 12新品发布" 
		shape="circle" 
		show-action 
		@change="onChange" 
		@search="onSearch" 
		@cancel="onCancel" 
		@click="onClick" class="style" />

		<view class="operate" v-if="value == ''">
			<!-- 热门搜索 -->
			<view class="hot-search">
				<view class="hot-top">
					<image src="../../static/images/search/hot-search.png" mode=""></image>
					<text>热门搜索</text>
				</view>
				<view class="keyword">
					<!-- <navigator url="../goodsList/goodsList"> -->
					<view class="word" v-for="(item,index) in hotSearchData" :key="index" @tap.stop="hotSearch(item)">{{item}}</view>
					<!-- </navigator> -->
				</view>
			</view>
			<!-- 搜索历史 -->
			<view class="keyword-box" v-if="isShow">
				<view class="history">
					<image src="../../static/images/search/history.png" mode=""></image>
					<text>搜索历史</text>
				</view>
				<view class="history-keyword">
					<view class="word" v-for="item in historyArray" @tap.stop="history(item)">{{item}}</view>
				</view>
				<view class="enpty" @click="onEmpty">清空历史记录</view>
			</view>
		</view>
		<view class="dimQuery" v-else>
			<view class="dim">
				<view class="text" v-for="item in fuzzyQueryData" @tap.stop="goGoodsList(item.sku_name)">{{item.sku_name}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		fuzzyQuery
	} from "../../api/common.js";
	export default {
		data() {
			return {
				value: '',
				historyArray: [],
				isShow: false,
				allShow: false,
				fuzzyQueryData: [],
				hotSearchData: [
					'iphone 12', '冰箱自营', '美的洗衣机', '冷暖空调', '休闲零食', '超薄电视', '电热水器', '微波炉'
				]
			};
		},
		created() {
			this.historyArray = this.$store.getters.getHistoryArray;
			if (this.historyArray.length > 0) {
				this.isShow = true
			}
		},
		methods: {
			hotClick(item) {
				console.log(item)
			},

			// 清空历史记录
			//如果没有数据 就把清空记录按钮隐藏掉
			//有数据的话 就把数据与按钮显示出来
			onEmpty() {
				console.log("清空")
				// this.historyArray = [];
				// var emptyData = this.historyArray;
				this.isShow = false;
				// 清空本地数据
				this.$store.commit('setHistoryArray', this.historyArray = []);
			},

			//确认搜索
			onSearch(e) {
				this.value = e.detail;
				console.log("确认", this.value);
				var getValue = this.value;
				// this.historyArray.push(getValue);
				this.value = e.detail.trim();
				// 判断输入内容是否空，空的话就return
				if(!this.value){
					this.hasData = false;
					return;
				}
				var getValue = this.value;
				var boot = false;
				// 判断输入的名字是否相同，相同就return
				this.historyArray.map(v=>{
					if(v == getValue){
						boot = true;
						return;
					}
				})
				
				// 条件为假才执行
				if(!boot){
					this.historyArray.unshift(getValue);
				}else{
					this.historyArray = this.first(getValue)
				}
				this.$store.commit('setHistoryArray',this.historyArray)
				this.isShow = true;

				uni.navigateTo({
					url: "/pages/goodsList/goodsList?goodsName=" + this.value
				})
				this.$store.commit('setHistoryArray', this.historyArray)
				this.value = "";
			},

			// onChange输入内容保存到数组中
			onChange(e) {
				this.value = e.detail.trim();
				// 判断输入内容是否空，空的话就return
				if(!this.value){
					this.hasData = false;
					return;
				}
				this.fuzzyQueryWay();
			},

			// 清空输入内容
			onClick(e) {
				this.value = ""
			},

			// onCancel 点击取消按钮
			onCancel() {
				console.log("取消");
				uni.reLaunch({
					url: '/pages/home/home'
				})
			},
			async fuzzyQueryWay() {
				var {message} = await fuzzyQuery(this.value);
				// if(message.length > 6){
				// 	 // message.length = 6
				// }
					this.fuzzyQueryData = [];
					message.map((item,i)=>{
						// console.log(v,i)
						if(i<6){
							this.fuzzyQueryData.push(item);
						}
					})
				console.log('fuzzyQueryData:',this.fuzzyQueryData);
			},
			goGoodsList(goodsName) {
				// console.log("对象",item)
				// var data = JSON.stringify(item);
				console.log("字符", goodsName)
				uni.navigateTo({
					url: "/pages/goodsList/goodsList?goodsName=" + goodsName
				})
			},
			hotSearch(goodsName) {
				console.log("热门", goodsName);
				uni.navigateTo({
					url: "../goodsList/goodsList?goodsName=" + goodsName
				})
			},
			// async fuzzyQueryWay(){
			
			// 	var {message} = await fuzzyQuery(this.value);
			// 	console.log("模糊",message)
			// 	this.fuzzyQueryData = message;
			// 	this.hasData = true;
				
			// 	if(this.value == ""){
			// 		this.hasData = false;
			// 	}
			// },
			// 历史记录
			history(goodsName){
				var list = this.first(goodsName)
				
				this.$store.commit('setHistoryArray',list)
				uni.redirectTo({
					url:"/pages/goodsList/goodsList?goodsName=" + goodsName
				})
			},
			goGoodsList(goodsName){
				uni.redirectTo({
					url:"/pages/goodsList/goodsList?goodsName=" + goodsName
				})
			},
			// 把搜索的名字和点击历史记录的名字放到第一位
			first(name){
				var list = [];
				list[0] = name;
				this.historyArray.map(v=>{
					if(v != name){
						list.push(v);
					}
				})
			}
		},
		onLoad(e){
			// console.log("搜索",e)
			this.value = e.goodsName;
			console.log(this.value)
		}
	}
</script>

<style lang="scss">
	.search {
		/deep/.van-search__content {
			bocrder-radius: 100px;
		}

		// .style{
		// 	border-bottom: 2rpx solid rgb(230, 230, 230);
		// 	padding-bottom: 10rpx;
		// }
		.operate {
			.hot-search {
				border-bottom: 2rpx solid rgb(230, 230, 230);
				padding-bottom: 10rpx;

				.hot-top {
					margin: 20rpx;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
				}

				.keyword {
					display: flex;
					flex-wrap: wrap;

					.word {
						display: inline;
						margin: 10rpx;
						padding: 10rpx 20rpx;
						border: 2rpx solid rgb(230, 230, 230);
						border-radius: 50px;
						font-size: 24rpx;
					}
				}
			}

			.keyword-box {
				border-bottom: 2rpx solid rgb(230, 230, 230);
				padding-bottom: 10rpx;

				.history {
					margin: 20rpx;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
				}

				.history-keyword {
					display: flex;
					flex-wrap: wrap;

					.word {
						display: inline;
						margin: 10rpx;
						padding: 10rpx 20rpx;
						border: 2rpx solid rgb(230, 230, 230);
						border-radius: 50px;
						font-size: 24rpx;
					}
				}

				.enpty {
					margin: 40rpx auto;
					width: 220rpx;
					padding: 10rpx 100rpx;
					border: 2rpx solid rgb(230, 230, 230);
					border-radius: 50px;
				}
			}
		}

		.dimQuery {
			.dim {
				.text {
					border-bottom: 2rpx solid #e6e6e6;
					padding: 20rpx 40rpx;
					font-size: 26rpx;
					color: gray;
				}
			}
		}
	}
</style>
