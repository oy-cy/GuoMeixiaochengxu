<template>
	<!-- 地址 -->
	<van-popup
	 :show="siteShow"
	  position="bottom"
	  custom-style="height: 72%"
	  closeable
	  @close="closeSelected"
	  @click-overlay="closeSelected">
				<view class="sitebox">
					<view class="sizetop">
						<view class="return" v-if="leftRight==false&&siteList.length != 0" @click="towards">
							<image src="../../static/images/gongge/return.png" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="xz"> 
							选择区域
						</view>
					</view>
						
						
					<view class="content" :class="leftRight==true?'towardsLeft':'towardsRight'">
						<!-- 等阿宇的收货地址数据 -->
						<view class="y">
							<scroll-view scroll-y="true" class="consigneeSite">
								<view class="location" v-for="(item,index) in siteList" :key="index" @click="selectSite(item.id,item.city,item.name)">
									<image src="../../static/images/tabbar/shop.png" style="width: 30rpx;height: 30rpx;margin-right: 20rpx;"></image>
									{{item.name}}
									<image src="../../static/images/gongge/true.png" :class="item.id != siteId?'show':''" style="width: 30rpx;height: 30rpx;margin-left: 200rpx;"></image>
								</view>
								
							</scroll-view>
							<van-button
								type="primary"
								size="normal"
								color="linear-gradient(to right, #FA1E8A, #FC1E58)"
								class="else"
								block
								@click='towards'
								>选择其他</van-button>
						</view>
						<view class="m" v-if="leftRight==false">
								<erhaPicker @conceal="conceal"></erhaPicker>
						</view>
					</view>
				</view>
				
	 </van-popup>
</template>

<script>
	import erhaPicker from "../../component/site/erha-picker/erha-picker.vue";
	
	export default {
		data(){
			return {
				siteShow:false,
				leftRight:true,
				siteId:-1,
				
				
				// 假数据
				siteList:[
						{id:1,name:"广东省深圳市龙华区安仿学院",city:"深圳市"},
						{id:2,name:"广东省深圳市龙华区安仿学院1",city:"深圳市"},
						{id:3,name:"广东省深圳市龙华区安仿学院2",city:"深圳市"},
						{id:4,name:"广东省深圳市龙华区安仿学院3",city:"深圳市"}
				]
			}
		},
		
		
		created() {
			if(this.siteList.length == 0){
				this.leftRight=false;
			} 
		},
		methods:{
			conceal(param){
				console.log("param",param);
				this.$store.commit('setDefaultSite',param)
				this.leftRight = true;
				this.siteShow = false;
				var currentCity = '';
				if(param.city == "市辖区"){
					currentCity = param.province;
				}else {
					currentCity = param.city;
				}
				this.$store.commit('setCurrentCity',currentCity	);
				this.siteId = -1;
			},
			closeSelected(){
				this.siteShow = false;
				this.leftRight=true;
				
				if(this.siteList.length == 0){
					this.leftRight=false;
				}
			},
			show(){
				this.siteShow = true;
			},
			towards(){
				this.leftRight = !this.leftRight
			},
			selectSite(id,city,name){
				
				this.siteShow = false;
				this.siteId = id;
				this.$store.commit('setCurrentCity',city);
				this.$store.commit('setDefaultSite',name)
			}
		},
		components:{
			erhaPicker
		}
	}
</script>

<style lang="scss" scoped>
	
	.sitebox{
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		.sizetop{
			margin-top: 45rpx;
			display: flex;
			// height: 10%;
			.return{
				position: absolute;
				margin-left:20rpx ;
				width: 40rpx;
				height: 40rpx;
			}
			
			.xz{
				margin: 0 auto;
			}
		}
		.content{
			position: absolute;
			bottom: 0;
			width: 200%;
			flex: 1;
			display: flex;
			height: 86%;
			transition: all 0.1s;
			.y{
				position: relative;
				overflow: hidden;
				width: 50%;
				flex: 1;
				.consigneeSite{
					height: 560rpx;
					padding: 20rpx;
					.location{
						padding:38rpx 0;
						border-bottom:3rpx solid #ccc ;
						font-size: 30rpx;
						.show{
							display: none;
						}
					}
					
				} 
				.else{
					width: 50%;
					position: absolute;
					bottom: 0;
				}
				
				
			}
			.m{
				width: 50%;
				
			}
			
		}
	
		.towardsLeft{
			left: 0%;
		}
		
		.towardsRight{
			left: -100%;
		}
		
	}
</style>
