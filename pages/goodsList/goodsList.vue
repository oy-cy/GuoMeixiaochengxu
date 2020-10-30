<template>
	<view class="goodsList-container">
		<!-- 首页头部 -->
		<view class="header-search">
			<view class="search" @tap="goSearch">
				<van-search class="van-search" :value="goodsName" background="background:transparen(0)" shape="round" placeholder="搜索国美商品" />
			</view>
			<navigator url="../mycar/mycar" open-type="switchTab">
				<view class="cart">
					<image src="../../static/images/goodsList/cart-logo.png" mode=""></image>
				</view>
			</navigator>
		</view>
		<view class="navBar-content">
			<view class="navbar">
				<view class="navbar-item" :class="{current:filterIndex === 0}" @tap.stop="tabClick(0)">
					<text>综合</text>
				</view>
				<view class="navbar-item" :class="{current:filterIndex === 1}" @tap.stop="tabClick(1)">
					<text>价格</text>
				</view>
				<view class="navbar-item" :class="{current:filterIndex === 2}" @tap.stop="tabClick(2)">
					<text>销量</text>

				</view>
				<view class="navbar-item" :class="{current:filterIndex === 3}" @tap.stop="tabClick(3)">
					<text>筛选</text>
				</view>
			</view>
			<view class="p-box">
				<image :src="price.priceSort" mode=""></image>
			</view>
			<view class="s-box">
				<image src="../../static/images/goodsList/screen.png" mode=""></image>
			</view>
		</view>
		<view class="right-popup">
			<van-popup :show="isShow" position="right" round custom-style="height: 100%; width: 90%;" @close="onClose">
				<view class="price_input">
					<view class="label">价格区间</view>
					<input type="number" class="min_price" v-model="minPrice" placeholder="最低价" />
					<view class="straight"></view>
					<input type="number" class="max_price" v-model="maxPrice" placeholder="最高价" />

				</view>
				<view class="brand">
					<view class="title">品牌</view>
					<view class="content">
						<view class="brand-list" v-for="(item,index) in brandList" :key="index" @tap.stop="getBrandName(item.brandName)">
							<view class="item-list" :class="[item.brandName==brandName ?'selectedItem' :'']">{{ item.brandName }}</view>
						</view>
					</view>
				</view>
				<view class="btn-content">
					<view class="reset" @tap="reset">重置</view>
					<view class="confirm" @tap="confirm">确认</view>
				</view>

			</van-popup>
		</view>
		<view v-if="hasGoods">
			<k-scroll-view ref="k-scroll-view" :loadTip="loadTip" :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight"
			 :height="height" :bottom="bottom" :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown"
			 @onPullUp="handleLoadMore">
				<view class="goods-list">
					<view class="item-list" v-for="item in goodsList" :key="item.id" @tap.stop="goGoodsDetail(item.id)">
						<view class="img-container">
							<image :src="item.sku_thumbImg_url" mode=""></image>
						</view>
						<view class="goods-info">
							<view class="title-content">
								<text class="tag">{{ item.extProperty }}</text>
								<text class="title">{{ item.sku_name }}</text>
							</view>
							<view class="price-content">
								<text class="symbol">￥</text>
								<text class="price">{{ item.sku_price }}</text>
							</view>
							<view class="easeCard-tag">{{ item.tagList[0].tagName }}</view>
							<view class="buy">{{ item.Sales }}人购买</view>
							<view class="shop">{{ item.shop_name }}</view>
						</view>
					</view>
				</view>
			</k-scroll-view>
			<goTop v-if="isShowLogo"></goTop>
		</view>
		<view v-else>
			<view class="empty-container">
				<view class="img-container">
					<image src="../../static/images/common/empty2.png" mode=""></image>
				</view>
				<view class="evaluate">宝贝没找到 T_T</view>
			</view>
			<view class="vanDivider">
				<van-divider contentPosition="center" customStyle="color: rgb(229, 54, 117); border-color: rgb(229, 54, 117); font-weight: bold; font-size: 14px;margin:0rpx 200rpx">
					<image class="likeImg" src="../../static/images/home/favour.png" mode=""></image>猜你喜欢
				</van-divider>
			</view>
			<k-scroll-view ref="k-scroll-view" :loadTip="loadTip" :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight"
			 :height="height" :bottom="bottom" :autoPullUp="autoPullUp" :stopPullDown="stopPullDown" @onPullDown="handlePullDown"
			 @onPullUp="onPullUp">
				<commodityTemplate :goodsList="likeGoodsData"></commodityTemplate>
			</k-scroll-view>
		</view>
		<goTop v-if="isShowLogo"></goTop>
	</view>
</template>

<script>
	import commodityTemplate from "@/component/commodityTemplate/commodityTemplate.vue"
	import goTop from '@/component/goTop/goTop.vue';
	import {
		getGoodsList,
		getSearchGoods,
		getFilterPriceAndBrandName,
		getFilterPrice,
		getFilterBrandName
	} from "@/api/common.js";
	export default {
		data() {
			return {
				isShowLogo: false,
				isLogo: false,
				minPrice: '', //最低价
				maxPrice: '', //最高价
				brandName: '',
				isShow: false, // 点击的右侧弹出层
				filterIndex: 0, // navbar点击的下标
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				sales: 0,
				goodsId: '',
				goodsName: '',
				page: 1,
				asc: "asc",
				desc: "desc",
				tempArr: [], // 商品数据的临时数组数组
				goodsList: [],
				likeGoodsData: [], // 猜你喜欢存放的数据数组
				likeGoodsId: 1, // 猜你喜欢的id
				price: {
					default: "/static/images/goodsList/stateless.png",
					priceSort: "/static/images/goodsList/stateless.png",
					priceAsc: "/static/images/goodsList/price-asc.png",
					priceDesc: "/static/images/goodsList/price-desc.png",
				},
				brandList: [{
						brandName: "花花公子"
					},
					{
						brandName: "阿玛尼"
					},
					{
						brandName: "美的(Midea)"
					},
					{
						brandName: "TCL"
					},
					{
						brandName: "索尼(SONY)"
					},
					{
						brandName: "戴尔"
					},
					{
						brandName: "海尔(Haier)"
					},
					{
						brandName: "康佳(KONKA)"
					},
					{
						brandName: "三星(SAMSUNG)"
					},
					{
						brandName: "夏普(SHARP)"
					},
					{
						brandName: "华为"
					},
					{
						brandName: "国美(GOME)"
					},
				],
				hasData: true,
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '',
				touchHeight: 50,
				height: 0,
				bottom: 50,
				autoPullUp: true,
				stopPullDown: false, // 如果为 false 则不使用下拉刷新，只进行上拉加载
			};
		},
		methods: {
			// 跳转到搜索页面
			goSearch() {
				uni.redirectTo({
					url: "/pages/search/search?goodsName=" + this.goodsName
				})
			},
			//跳转到商品详情页
			goGoodsDetail(id) {
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail?goodsId=" + id
				})
			},
			// 获取筛选的品牌名
			getBrandName(name) {
				this.brandName = name;
				console.log(name);
			},
			// 确定筛选
			confirm() {
				// 点击确定的时候把筛选的品牌名赋值给搜索框
				this.goodsName = this.brandName;
				// 把page重新赋值为1
				this.page = 1;
				// 确定筛选后关闭右弹窗
				this.isShow = false;
				// 把goodsId和goodsName的值清空掉，防止上拉刷新时发送请求
				// 因为goodsId是从分类页面带过来的，goodsName是从搜索页面带过来的
				this.searchIndex = 0;

				if (this.minPrice && this.maxPrice && this.brandName) {
					// console.log("111111")
					this.screenIndex = 1;
					this.getFilterPriceAndBrandNameData();
					return;
				}
				if (this.minPrice && this.maxPrice) {
					// console.log("222222")
					this.screenIndex = 2;
					this.getFilterPriceData();
					return;
				}
				if (this.brandName) {
					// console.log("333333")
					this.screenIndex = 3;
					this.getFilterBrandNameData();
					return;
				}
			},
			// 重置
			reset() {
				// 清空
				this.minPrice = '';
				this.maxPrice = '';
				this.brandName = '';
			},
			onClose() {
				this.isShow = false;
			},
			// sales priceOrder赋值为0，用于上拉加载时的判断
			zero() {
				this.sales = 0;
				this.priceOrder = 0;
			},
			tabClick(index) {
				// 每次点击都把page赋值为1，用于后续发送请求时都是以第一页开始
				this.page = 1;
				// navbar点击的下标
				this.filterIndex = index;
				// 点击tabs切换的时候，把价格图片改为默认
				this.price.priceSort = this.price.default;
				if (index === 0) {
					// sales priceOrder赋值为0，用于上拉加载时的判断
					this.zero();
					// 点击综合，根据筛选的字段进行发送请求
					if (this.screenIndex == 1) {
						this.getFilterPriceAndBrandNameData();
						return;
					}
					if (this.screenIndex == 2) {
						this.getFilterPriceData();
						return;
					}
					if (this.screenIndex == 3) {
						this.getFilterBrandNameData();
						return;
					}
					
					// 点击综合 根据搜索过来的字段来发送请求
					if (this.searchIndex == 4) {
						this.getGoodsListData();
						return;
					} 
					if(this.searchIndex == 5){		
						this.getSearchGoodsNameData();
						return;
					}
						
					// 页面加载时触发，初始化的综合
					this.getGoodsListData();
				} else if (index === 1) {
					this.sales = 0;
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
					this.goodsList.sort((a, b) => {
						if (this.priceOrder == 1) {
							this.price.priceSort = this.price.priceAsc;
							// 已价格从低到高排序
							return a.sku_price - b.sku_price;
						} else {
							this.price.priceSort = this.price.priceDesc;
							// 已价格从高到底排序
							return b.sku_price - a.sku_price;
						}
					})
				} else if (index === 2) {
					// sales priceOrder赋值为0，用于上拉加载时的判断
					this.sales = 3;
					this.priceOrder = 0;

					// 按销量最高排序
					this.goodsList.sort((a, b) => b.Sales - a.Sales);
				} else if (index === 3) {
					// sales priceOrder赋值为0，用于上拉加载时的判断
					this.zero();
					// 打开右侧弹出层
					this.isShow = true;
				}
			},
			// 获取商品数据
			async getGoodsListData() {
				var {
					message
				} = await getGoodsList(this.goodsId, this.page);
				message.map(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				this.tempArr = message;
				this.goodsList = message;
			},
			// 根据名字获取商品数据
			async getSearchGoodsNameData() {
				var {
					message
				} = await getSearchGoods(this.goodsName, this.page);
				message.map(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				this.tempArr = message;
				this.goodsList = message;
			},
			// 根据价格和名字进行筛选商品
			async getFilterPriceAndBrandNameData() {
				var {
					message
				} = await getFilterPriceAndBrandName(this.maxPrice, this.minPrice, this.brandName, this.page);
				console.log("筛选", message);
				message.map(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				this.tempArr = message;
				this.goodsList = message;

			},
			// 根据价格进行筛选商品
			async getFilterPriceData() {
				var {
					message
				} = await getFilterPrice(this.maxPrice, this.minPrice, this.page);
				console.log("筛选价格", message);
				message.map(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				this.tempArr = message;
				this.goodsList = message;

			},
			// 根据品牌名进行筛选商品
			async getFilterBrandNameData() {
				var {
					message
				} = await getFilterBrandName(this.brandName, this.page);
				console.log("筛选品牌名", message);
				message.map(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				this.tempArr = message;
				this.goodsList = message;

			},
			// 上拉刷新
			async handleLoadMore(stopLoad) {
				// 判断hasData是否等false，等于false就不让再发送请求
				/* 	if (this.hasData == false) {
						uni.showToast({
							title:"客官已到底了哦~",
							icon: "none"
						})
						return;
					} */
				this.page++;
				// 根据价格和名字进行筛选商品、上拉加载
				if (this.screenIndex == 1) {
					console.log("根据价格和名字进行筛选商品")
					var {
						message
					} = await getFilterPriceAndBrandName(this.maxPrice, this.minPrice, this.brandName, this.page);
				}
				// 根据价格进行筛选商品、上拉加载
				if (this.screenIndex == 2) {
					console.log("根据价格进行筛选商品")
					var {
						message
					} = await getFilterPrice(this.maxPrice, this.minPrice, this.page);
				}
				// 根据品牌名进行筛选商品、上拉加载
				if (this.screenIndex == 3) {
					console.log("根据品牌名进行筛选商品")
					var {
						message
					} = await getFilterBrandName(this.brandName, this.page);
				}
				// 根据分类点过来的id、上拉加载
				if (this.searchIndex == 4) {
					console.log("根据分类")
					var {
						message
					} = await getGoodsList(this.goodsId, this.page);
				}
				// 根据所搜点过来的名字、上拉加载
				if (this.searchIndex == 5) {
					console.log("根据搜索名字")
					var {
						message
					} = await getSearchGoods(this.goodsName, this.page);
				}
				// var {
				// 	message
				// } = await getGoodsList(this.goodsId, this.page);
				stopLoad ? stopLoad() : '';
				if (message.length == 0) {
					// message.length等于0的时候，把hasData设为false；用于后续的判断；
					// this.hasData = false;
					uni.showToast({
						title: "客官已到底了哦~",
						icon: "none"
					})
					stopLoad ? stopLoad({
						isEnd: true
					}) : '';
					return;
				}
				message.forEach(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				// 把之前的数据拼接到一起
				this.tempArr = this.tempArr.concat(message);
				this.tempArr.sort((a, b) => {
					if (this.priceOrder == 1) {
						// 按价格从底到高排序
						return a.sku_price - b.sku_price;
					} else if (this.priceOrder == 2) {
						// 按价格从高到底排序
						return b.sku_price - a.sku_price;
					}
				})
				// 按销量最高排序
				if (this.sales == 3) {
					this.tempArr.sort((a, b) => b.Sales - a.Sales);
				}
				this.goodsList = this.tempArr;
			},
			// 获取猜你喜欢商品数据
			async getLikeGoodsData() {
				var {
					message
				} = await getGoodsList(this.likeGoodsId, this.page);
				message.forEach(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				this.likeGoodsData = message;
			},
			// 猜你喜欢的上拉刷新
			async onPullUp(stopLoad) {
				console.log("猜你喜欢");
				this.page++;
				var {
					message
				} = await getGoodsList(this.likeGoodsId, this.page);
				stopLoad ? stopLoad() : '';
				if (message.length == 0) {
					uni.showToast({
						title: "客官已到底了哦~",
						icon: "none"
					})
					stopLoad ? stopLoad({
						isEnd: true
					}) : '';
					return;
				}
				message.forEach(v => {
					v.tagList = JSON.parse(v.tagList);
				})
				// 把之前的数据拼接到一起
				this.likeGoodsData = this.likeGoodsData.concat(message);
			}
		},
		// 监听当前页面的滚动
		onPageScroll: function(event) {
			var {
				scrollTop
			} = event;
			var position = 50; // 设定高度50
			if (scrollTop > position && this.isLogo == false) {
				this.isShowLogo = true;
				this.isLogo = true;
			} else if (scrollTop < position && this.isLogo == true) {
				this.isShowLogo = false;
				this.isLogo = false;
			}
		},
		onLoad(e) {
			// 点击分类过来的id
			console.log("search",e)
			if (e.goodsId) {
				this.goodsId = e.goodsId;
				this.searchIndex = 4;
				this.getGoodsListData();
			} else {
				// 搜索过来的名字
				this.goodsName = e.goodsName;
				this.searchIndex = 5;
				this.getSearchGoodsNameData();
			}
			// 初始化猜你喜欢数据
			this.getLikeGoodsData();
		},
		computed: {
			hasGoods: function() {
				if (this.goodsList.length > 0) {
					return true;
				} else {
					return false;
				}
			}
		},

		components: {
			goTop,
			commodityTemplate
		},
	}
</script>

<style lang="scss" scoped>
	.goodsList-container {
		.header-search {
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			background-color: #FFFFFF;

			.cart {
				image {
					width: 42rpx;
					height: 42rpx;
				}
			}

			.search {
				flex: 1;
			}
		}

		.navBar-content {
			position: relative;

			.navbar {
				display: flex;
				justify-content: space-around;

				.navbar-item {
					text {
						display: block;
						font-weight: 700;
						margin-bottom: 6rpx;
						// color: #4B4B4B;
					}
				}

				.current {
					color: #F32368;
					font-weight: 700;
					border-bottom: 8rpx solid #F32368;
					// border-radius: 3rpx;
				}

			}

			.p-box {
				position: absolute;
				top: 0;
				left: 42%;

				image {
					width: 15rpx;
					height: 24rpx;
				}
			}

			.s-box {
				position: absolute;
				top: 0;
				left: 92%;

				image {
					width: 15rpx;
					height: 24rpx;
				}
			}
		}

		.goods-list {
			padding-top: 20rpx;
			background-color: #F2F2F2;

			.item-list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 260rpx;
				padding: 0 20rpx;
				background-color: #FFFFFF;

				.img-container {
					image {
						width: 250rpx;
						height: 250rpx;
					}

				}

				.goods-info {
					margin-left: 20rpx;
					border-bottom: 2rpx solid #eeeeee;

					.title-content {
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;

						.tag {
							padding: 1rpx 4rpx;
							font-size: 20rpx;
							border-radius: 6rpx;
							color: #fff;
							background: -webkit-gradient(linear, left top, right top, from(#fa1e8c), to(#f20c59));
							background: linear-gradient(90deg, #fa1e8c, #f20c59);
						}

						.title {
							margin-left: 10rpx;
						}
					}

					.price-content {
						margin-top: 20rpx;

						.symbol {
							font-size: 22rpx;
							color: #F20C59;
							font-weight: 500;
						}

						.price {
							font-size: 32rpx;
							color: #F20C59;
							font-weight: 700;
						}
					}

					.easeCard-tag {
						width: 100rpx;
						font-size: 22rpx;
						text-align: center;
						color: #f20c56;
						border-color: #f20c56;
						border: 1rpx solid #f20c56;
						margin: 10rpx 0;
						border-radius: 5rpx;
					}

					.buy {
						font-size: 22rpx;
						color: #929292;
					}

					.shop {
						font-size: 22rpx;
						color: #929292;
						padding-bottom: 30rpx;
					}
				}
			}
		}

		.right-popup {
			.price_input {
				display: flex;
				justify-content: space-around;
				padding: 30rpx 20rpx;
				font-size: 28rpx;

				input {
					width: 220rpx;
					height: 60rpx;
					text-align: center;
					font-size: 28rpx;
					border-radius: 50rpx;
					background-color: #e7e7e7;
				}

				.straight {
					width: 20rpx;
					height: 0;
					border-top: 1px solid #cbcbcb;
					margin: 34rpx 10rpx 0 10rpx;
				}

				.label {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 28rpx;
					text-align: center;
					font-weight: 700;
				}
			}

			.brand {
				padding: 0 20rpx;

				.title {
					font-weight: 700;
					margin-left: 10rpx;
					color: #333333;
				}

				.content {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					.brand-list {
						.item-list {
							width: 200rpx;
							height: 60rpx;
							line-height: 60rpx;
							font-size: 22rpx;
							margin-top: 20rpx;
							text-align: center;
							color: #000000;
							border-radius: 50rpx;
							background-color: #e7e7e7;
							box-sizing: border-box;
							
						}
						.item-list:hover {
							border: 2rpx solid #F42F71;
							color: #F42F71;
							background-color: #FFF3F7;
						}
					}
				}

			}

			.btn-content {
				position: absolute;
				bottom: 0;
				width: 100%;
				border-top: 1px solid #e6e6e6;
				text-align: center;
				box-sizing: border-box;
				
				.reset {
					display: inline-block;
					// width: 338.6rpx;
					width: 50%;
					height: 100rpx;
					line-height: 100rpx;
					background: #f9f9f9;

				}

				.confirm {
					display: inline-block;
					// width: 338.5rpx;
					width: 50%;
					height: 100rpx;
					line-height: 100rpx;
					background: -webkit-linear-gradient(left, #FA1E8C 0, #FC1E56 100%);
					background: linear-gradient(to right, #FA1E8C 0, #FC1E56 100%);
					color: #fff;
				}
			}
		}

		.empty-container {
			height: 500rpx;
			border-radius: 30rpx;
			padding-top: 100rpx;
			background-color: #F3F5F7;

			.img-container {
				width: 320rpx;
				height: 320rpx;
				margin: auto;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.evaluate {
				text-align: center;
				color: #C1C3C5;
			}
		}

		.vanDivider {
			background-color: #F3F5F7;

			.likeImg {
				width: 32rpx;
				height: 32rpx;
				margin-right: 4rpx;
			}
		}

	}
</style>
