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

		<view class="operate" v-if="!hasData">
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
		<view class="dimQuery" v-if="hasData">
			<view class="dim">
				<view class="text" v-for="(item,index) in fuzzyQueryData" :key="index" @tap.stop="goGoodsList(item.sku_name)">{{item.sku_name}}</view>
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
				hasData: false,
				value: '',
				historyArray: [],
				isShow: false,
				allShow: false,
				fuzzyQueryData: [],
				hotSearchData: [
					'华为', '花花公子', '戴尔DELL', '美的', '休闲零食', '海尔(Haier)', '三只松鼠', '联想ThinkBook'
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
				this.isShow = false;	
				// 清空本地数据
				this.$store.commit('setHistoryArray', this.historyArray = []);
			},

			//确认搜索
			onSearch(e) {
				this.value = e.detail.trim();
				console.log("确认", this.value);
				var getValue = this.value;
				
				// 判断输入内容是否空，空的话就return
				if(!this.value){
					this.hasData = false;
					return;
				}
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
				this.isShow = true;

				uni.redirectTo({
					url: "/pages/goodsList/goodsList?goodsName=" + this.value
				})
				this.$store.commit('setHistoryArray', this.historyArray);
				// 按确认的时候,清空数据
				this.value = "";
				this.fuzzyQueryData = [];
			},

			// onChange输入内容保存到数组中
			onChange(e) {
				console.log("输入",e)
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
					this.fuzzyQueryData = [];
					message.map((item,i)=>{
						if(i<6){
							this.fuzzyQueryData.push(item);
						}
					})
					// 输入有数据的话就显示设为true
					this.hasData = true;
				console.log('fuzzyQueryData:',this.fuzzyQueryData);
			},
			// 热搜
			hotSearch(goodsName) {
				var list = this.first(goodsName)
				this.$store.commit('setHistoryArray',list)
				uni.redirectTo({
					url: "../goodsList/goodsList?goodsName=" + goodsName
				})
			},
			// 历史记录
			history(goodsName){
				var list = this.first(goodsName)
				this.$store.commit('setHistoryArray',list)
				uni.redirectTo({
					url:"/pages/goodsList/goodsList?goodsName=" + goodsName
				})
			},
			
			goGoodsList(goodsName){
				this.historyArray.unshift(goodsName);
				this.$store.commit('setHistoryArray', this.historyArray)
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
				return list;
			}
		},
		onLoad(e) {
			this.value = e.goodsName;
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
