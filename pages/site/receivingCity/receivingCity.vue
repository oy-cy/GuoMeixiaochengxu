<template>
	<view class="receiving-container">
		<!-- 城市 --> 
		<view class="current-city">
			<van-search class="van-search" v-model="e" placeholder="请输入收货人地址" @change="bindInput" shape="round">
				<view slot="label" class="label">
					<navigator url="/pages/site/selectCity/selectCity">
						{{getCurrentCity}}
					</navigator>
				</view>
			</van-search>
		</view>
		<view class="my-addr" v-if="keywords==''">
			<!-- 收货地址 -->
			<uni-notice-bar
				v-if="receivingAddr.length != 0"
				:text="'送至：' + receivingAddr[0].addr"
				single="true"
			/>
			<!-- 定位地址 -->
			<view class="current-site">
				<text>当前定位</text>
				<text>{{currentSite}}</text>
			</view>
			<!-- 我的收货地址 -->
			<view class="receiving-site">
				<view class="my-receiving-site">
					<text class="text">我的收货地址</text>
					<navigator class="manage" :url="getUrl">
						<image src="../../../static/images/user/addr-manage.png" mode=""></image>
						<text>管理地址</text>
					</navigator>
				</view>
				<!-- 收货地址列表 -->
				<view class="list" v-for="(item,index) in receivingAddr" :key="index">
					<view class="item" @click="setSelectAddr(item.id)">
						<view class="addr">
							<view class="addr">{{item.addr}}</view>
							<view class="user-info">
								<view class="name">{{item.receiver}}</view>
								<view class="phone">{{item.phone.substr(0,3)+"****"+item.phone.substr(7)}}</view>
							</view>
						</view>
						<view class="select" v-if="item.is_select==1">
							<image src="../../../static/images/user/yes.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="no-addr" v-if="receivingAddr.length == 0">
					<view class="text">您还没有收货地址</view>
					<navigator url="/pages/site/addAddr/addAddr" class="button">新增地址</navigator>
				</view>
			</view>
			<!-- 附近地址 -->
			<view class="nearby">
				<view class="title">附近地址</view>
				<!-- 附近地址列表 -->
				<view class="pois" v-for="(item,index) in pois" :key="index">
					<navigator url="/pages/home/home" open-type="switchTab" class="item" :style="{'margin-top':(index==0?'20rpx':'')}">{{item.name}}</navigator>
				</view>
			</view>
		</view>
		<!-- 搜索结果 -->
		<view class="tips" v-else>
			<view class="list" v-for="(item,index) in tips" :key="index">
				<navigator class="item" url="/pages/home/home" open-type="switchTab">
					<view class="name">{{item.name}}</view>
					<view class="address">{{item.address}}</view>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
import amap from '@/static/js/amap-wx.js';
import {getAddrs,setSelectAddr} from '@/api/user.js';
	export default {
		data() {
			return {
				// 当前地址
				currentSite:'',
				// 搜索到的地址数据
				tips:[],
				// 附近地址
				pois:[],
				// 搜索框的对象
				e:'',
				// 收货地址
				receivingAddr:[
					// {addr:'深圳市龙华区观澜街道淑女路',name:'花花的贝贝',phone:'157****1010'}
				],
				// 搜索的值
				keywords:''
			}
		},
		async onLoad() {
			this.getSite();
			this.getNearbySiteData();
			// 获取当前用户的地址列表
			var data = await getAddrs(getApp().globalData.userInfo.userId);
			this.receivingAddr = data.message;
		},
		methods:{
			getSite(){
				this.amapPlugin = new amap.AMapWX({
					//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
					key: '99031ada35818bf92d6e349e218b83a5'  
				});
				// 定位地址
				this.amapPlugin.getRegeo({  
					success: (data) => {
						console.log(data[0])
						this.currentSite = data[0].name;
					},
					fail:(data)=>{
						console.log("请求失败：");
						console.log(data)
					}
				}); 
			},
			getNearbySiteData(){
				this.amapPlugin = new amap.AMapWX({
				    key: '99031ada35818bf92d6e349e218b83a5'
				});
				const that = this
				that.amapPlugin.getRegeo({
				    type: "gcj02",
				    success: function(res) {               
				        that.pois=res[0].regeocodeData.pois;
						that.pois.length = 10;
				        console.log(that.pois)
				    },
				    fail: (res) => {
				        console.log(JSON.stringify(res));
				    }
				});
			},
			// 监听搜索返回搜索值
			bindInput: function(e){
			    var that = this;
			    var keywords = e.detail;
				this.keywords = keywords;
			    // var key = config.Config.key;
			    var myAmapFun = new amap.AMapWX({key: '99031ada35818bf92d6e349e218b83a5'});
			    myAmapFun.getInputtips({
					keywords: keywords,
					location: that.longitude + ',' + that.latitude,
					success: function(data){
					  that.tips=data.tips;
					  console.log(that.tips)
					},
					fail:err=>{	
					  console.log(err)
					}
			    })
			},
			// 切换选中地址
			setSelectAddr(id){
				// 调用修改选中地址接口
				setSelectAddr(getApp().globalData.userInfo.userId,id);
				uni.switchTab({
					url:"/pages/home/home"
				})
			}
		},
		computed:{
			getCurrentCity(){
				return this.$store.getters.getCurrentCity;
			},
			getUrl(){
				return this.receivingAddr.length==0?'/pages/site/addAddr/addAddr':'/pages/site/selectAddr/selectAddr'
			}
		}
	}
</script>

<style lang="scss" scoped>
.receiving-container {
	height: 100vh;
	background-color: rgb(243,245,247);
	.current-city{
		display: flex;
		background-color: #fff;
		.van-search {
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 38rpx;
			font-weight: 600;
			.label {
				width: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 16rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
	}
	.my-addr {
		view {
			background-color: #fff;
		}
		.current-site {
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
		}
		.receiving-site {
			display: flex;
			flex-direction: column;
			padding: 30rpx;
			margin-top: 20rpx;
			.no-addr {
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				.button {
					background-color: #ff478e;
					border-radius: 30rpx;
					padding: 10rpx 20rpx;
				}
			}
			.my-receiving-site {
				display: flex;
				justify-content: space-between;
				.text {
					color: #888;
					font-size: 30rpx;
				}
				.manage {
					display: flex;
					align-items: center;
					image {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}
			.list {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.item {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30rpx 0;
					.addr {
						width: 100%;
						display: flex;
						flex-direction: column;
						.addr {
							font-size: 36rpx;
						}
						.user-info {
							display: flex;
							view {
								color: #777;
								font-size: 30rpx;
							}
							.phone {
								margin-left: 50rpx;
							}
						}
					}
					.select {
						image {
							width: 30rpx;
							height: 30rpx;
						}
					}
				}
			}
		}
		.nearby {
			padding: 30rpx;
			margin-top: 20rpx;
			.title {
				color: #888;
			}
			.pois {
				display: flex;
				flex-direction: column;
				.item {
					padding: 20rpx 0;
				}
			}
		}
	}
	.tips {
		.list {
			display: flex;
			flex-direction: column;
			padding: 0 30rpx;
			.item {
				padding: 20rpx 0;
				border-bottom: 2rpx solid #d3d3d3;
				font-size: 30rpx;
				.address {
					margin-top: 10rpx;
					color: #777;
				}
			}
		}
	}
	/deep/ .uni-noticebar {
		margin: 0;
	}
	/deep/ .van-button__text {
		font-size: 28rpx;
	}
}
</style>
