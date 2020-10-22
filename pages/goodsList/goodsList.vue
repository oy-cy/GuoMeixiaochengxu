<template>
	<view class="goodsList-container">
		<!-- 首页头部 -->
		<view class="header-search" @tap="search">
			<navigator class="search" url="../search/search">
				<van-search class="van-search" value="" background="background:transparen(0)" shape="round" placeholder="搜索国美商品" />
			</navigator>
			<view class="cart">
				<image src="../../static/images/goodsList/cart-logo.png" mode=""></image>
			</view>
		</view>
		<view class="navBar-content">
			<view class="navbar">
				<view class="navbar-item" :class="{current:filterIndex === 0}" @tap="tabClick(0)">
					<text>综合</text>
				</view>
				<view class="navbar-item" :class="{current:filterIndex === 1}" @tap="tabClick(1)">
					<text>价格</text>
				</view>
				<view class="navbar-item" :class="{current:filterIndex === 2}" @tap="tabClick(2)">
					<text>销量</text>
					
				</view>
				<view class="navbar-item" :class="{current:filterIndex === 3}" @tap="tabClick(3)">
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
			<van-popup
			  :show="isShow"
			  position="right"
			  round
			  custom-style="height: 100%; width: 90%;"
			  @close="onClose"
			>
			<view class="price_input">
				<view class="label">价格区间</view>
				<input type="number" class="min_price" v-model="minimumPrice" placeholder="最低价" />
				<view class="straight"></view>
				<input type="number" class="max_price" v-model="topPrice" placeholder="最高价"/>
				
			</view>
			<view class="brand">
				<view class="title">品牌</view>
				<view class="content">
					<view class="brand-list" v-for="(item,index) in brandList" :key="index" @tap="getBrandName(item.brandName)">
						<view class="item-list">{{ item.brandName }}</view>
					</view>
				</view>	
			</view>
			<view class="btn-content">
				<view class="reset" @tap="reset">重置</view>
				<view class="confirm" @tap="confirm">确认</view>
			</view>
			
			</van-popup>
		</view>
		<view class="goods-list">
			<view class="item-list">
				<view class="img-container">
					<image src="https://gfs17.gomein.net.cn/T1mcxQB5LT1RCvBVdK_260.jpg" mode=""></image>
				</view>
				<view class="goods-info">
					<view class="title-content">
						<text class="tag">自营</text>
						<text class="title">海尔(Haier) LE32A30G 32英寸 高清至臻画质 内置WiFi 智能电视（黑色）</text>
					</view>
					<view class="price-content">
						<text class="symbol">￥</text>
						<text class="price">3199</text>
					</view>
					<view class="easeCard-tag">易卡分期</view>
					<view class="buy">10000购买</view>
					<view class="shop">国美体验店(深圳观澜店)</view>
				</view>
			</view>
			<view class="item-list">
				<view class="img-container">
					<image src="https://gfs17.gomein.net.cn/T1mcxQB5LT1RCvBVdK_260.jpg" mode=""></image>
				</view>
				<view class="goods-info">
					<view class="title-content">
						<text class="tag">自营</text>
						<text class="title">海尔(Haier) LE32A30G 32英寸 高清至臻画质 内置WiFi 智能电视（黑色）</text>
					</view>
					<view class="price-content">
						<text class="symbol">￥</text>
						<text class="price">3199</text>
					</view>
					<view class="easeCard-tag">易卡分期</view>
					<view class="buy">10000购买</view>
					<view class="shop">国美体验店(深圳观澜店)</view>
				</view>
			</view>
			<view class="item-list">
				<view class="img-container">
					<image src="https://gfs17.gomein.net.cn/T1mcxQB5LT1RCvBVdK_260.jpg" mode=""></image>
				</view>
				<view class="goods-info">
					<view class="title-content">
						<text class="tag">自营</text>
						<text class="title">海尔(Haier) LE32A30G 32英寸 高清至臻画质 内置WiFi 智能电视（黑色）</text>
					</view>
					<view class="price-content">
						<text class="symbol">￥</text>
						<text class="price">3199</text>
					</view>
					<view class="easeCard-tag">易卡分期</view>
					<view class="buy">10000购买</view>
					<view class="shop">国美体验店(深圳观澜店)</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				minimumPrice: '', //最低价
				topPrice: '', 	//最高价
				brandName: '',
				isShow: false, // 点击的右侧弹出层
				filterIndex: 0, // navbar点击的下标
				priceOrder: 0,  //1 价格从低到高 2价格从高到低
				price: {
					default: "/static/images/goodsList/stateless.png",
					priceSort: "/static/images/goodsList/stateless.png",
					priceAsc: "/static/images/goodsList/price-asc.png",
					priceDesc: "/static/images/goodsList/price-desc.png",
				},
				brandList: [
					{brandName:"海信(Hisense)"},
					{brandName:"创维(Skyworth)"},
					{brandName:"小米(MI)"},
					{brandName:"TCL"},
					{brandName:"索尼(SONY)"},
					{brandName:"长虹(CHANGHONG)"},
					{brandName:"海尔(Haier)"},
					{brandName:"康佳(KONKA)"},
					{brandName:"三星(SAMSUNG)"},
					{brandName:"夏普(SHARP)"},
					{brandName:"三洋(SANYO)"},
					{brandName:"国美(GOME)"},
				]
			};
		},
		methods: {
			getBrandName(name){
				this.brandName = name;
				console.log(name);
			},
			// 确定筛选
			confirm(){
				console.log(this.minimumPrice);
				console.log(this.topPrice);
			},
			// 重置
			reset(){
				this.minimumPrice = '';
				this.topPrice = '';
				this.brandName ='';
			},
			onClose(){
				this.isShow = false;
			},
			tabClick(index) {
				this.filterIndex = index;
				this.price.priceSort = this.price.default;
				if(index === 0){
					// console.log("综合",index)
				}else if(index === 1){
	
					this.priceOrder = this.priceOrder === 1 ?2 :1;
					console.log("价格",this.priceOrder)
					if(this.priceOrder == 1){
						this.price.priceSort = this.price.priceAsc;
					}else {
						this.price.priceSort = this.price.priceDesc;
					}
				}else if(index === 2){
					
				}else if(index === 3){
					// 打开右侧弹出层
					this.isShow = true;
				}
			},
		}
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
							background: -webkit-gradient(linear,left top,right top,from(#fa1e8c),to(#f20c59));
							background: linear-gradient(90deg,#fa1e8c,#f20c59);
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
					display:flex;
					flex-wrap: wrap;
					.brand-list {
						.item-list {
							width: 200rpx;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							font-size: 20rpx;
							border-radius: 50rpx;
							background-color: #e7e7e7;
							margin-left: 12rpx;
							margin-top: 20rpx;
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
				 border-top: 1px solid #e6e6e6;
				 text-align: center;
				.reset {
					display: inline-block;
					width: 338.6rpx;
					height: 100rpx;
					line-height: 100rpx;
					background: #f9f9f9;
					
				}
				.confirm {
					display: inline-block;
					width: 338.5rpx;
					height: 100rpx;
					line-height: 100rpx;
					background: -webkit-linear-gradient(left,#FA1E8C 0,#FC1E56 100%);
					background: linear-gradient(to right,#FA1E8C 0,#FC1E56 100%);
					color: #fff;
				}
			}
		}
	}
</style>
