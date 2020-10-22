<template>
	<view class="mycar">
		
		
		
		<!-- 地址，编辑 -->
		<view class="top" >
			<view class="background">
				<view class="left" @click="siteCompile">
					<image src="../../static/images/tabbar/shop.png" style="width: 30rpx;height: 30rpx;margin-right: 20rpx;">{{getCurrentCity}}
				</view>
				<view class="right" @click="clickcompile" v-if="goodList.length != 0">
					{{compile==true?"编辑":"完成"}}
				</view>
			</view>
			
		</view>
		
		<!-- 内容 -->
		<view class="box">
			
			<view class="nogood" v-if="goodList.length == 0">
				<view class="noimg">
					<image src="../../static/images/gongge/emptycar.png" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="hint">
					购物车还是空的
				</view>
				<navigator class="buttom" url="/pages/home/home"  open-type="switchTab">
					首页
				</navigator>
			</view>
			
			<view class="goodList" v-if="goodList.length != 0">
				<view class="goodbox">
					<view class="good" v-for="(items,indexs) in goodList" :key="indexs" >
						<van-checkbox
						  :value="items.select"
						  checked-color="#F20C59"
						  @change="good(items.id)"
						  class="choose"
						></van-checkbox>
						<view class="good" @click="details(items.id)">
							<image :src="items.image" style="width: 200rpx;height: 200rpx;"></image>
							
							<view class="message">
								<view class="title">
									<text><text></text>{{items.title}}</text>
								</view>
								<view class="specificationsbox" v-if="items.specifications == undefined"  @click.stop="specifications(items.id,items.specifications)">
									<text class="specifications">{{items.specification}}132123123</text> 
								</view>
								<view class="price_num">
									<text class="price">￥{{items.price}}</text>
									<u-number-box 
									:min="1" :max="100"
									 size='18' 
									 input-width="40" 
									 v-model="items.num" 
									 :index="items.id"
									 @change="addSubtract"></u-number-box>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
			<view class="like" :style="{'margin-bottom':goodList.length != 0?'150rpx;':'0rpx'}">
				<view class="img">
					<image src="../../static/images/gongge/weni.jpg" style="width: 300rpx;height: 70rpx;"></image>
				</view>
					
				<van-grid column-num="2" gutter="4">
				  <van-grid-item use-slot v-for="(item,index) in allgoodList" :key="index" class="goodlist" @click="details(item.id)">
					<image
					  style="width: 100%; height: 400rpx;"
					  :src="item.sku_thumbImg_url"
					/>
					<view class="goodmessage">
						<view class="title">
							<text class="mie">
								{{item.extProperty}}
							</text>
							
							{{item.sku_name}}
						</view>
						<view class="price_car">
							<view class="price">
								
								<text class="min">￥</text>
								<text>{{item.sku_price}}</text>
								<text class="min">.00</text>
								
							</view>
							<view class="car" @click.stop="addcar(item.id)">
								<image src="../../static/images/gongge/nocar.png" style="width: 100%;height: 100%;"></image>
							</view>
						</view>
					</view>
					
				  </van-grid-item>
				</van-grid>
			</view>
			
		</view>


		<!-- 全选 -->
		<view class="end" v-if="goodList.length != 0">
			<view class="sum">
				<van-checkbox
				  :value="all"
				  checked-color="#F20C59"
				  @change="allgood"
				>
				  全选
				</van-checkbox>
				<view class="total" v-if="compile==true">
					<text class="text">合计:</text>
					<text class="price">￥{{money}}</text>
				</view> 
			</view> 
			<van-button 
				type="primary"
				size="normal"
				color="linear-gradient(to right, #FA1E8A, #FC1E58)"
				class="butt"
				:disabled="money<=0?true:false"
				 v-if="compile==true">去结算 </van-button>
			<van-button
				type="primary"
				size="normal"
				color="linear-gradient(to right, #FA1E8A, #FC1E58)"
				class="butt"
				:disabled="money<=0?true:false"
				v-if="compile==false"
				@click="deleteGood()"
				>删除</van-button>
		</view>
	
	
		<!-- 格式 -->
		<van-popup
		 :show="isSelect"
		  position="bottom"
		  custom-style="height: 72%"
		  closeable
		  @close="closeSelected"
		  @click-overlay="closeSelected">
			<view class="popup-select">
				<view class="info">
					<image :src="select.img"></image>
					<view class="infos">
						<view class="price">
							¥{{select.price || goods.price}}
						</view>
						<view>
							{{goods.count > 0 ? "有货":"无货"}}
						</view>
					</view>
				</view>
				<view class="select" v-for="(item,index) in detailData.select" :key='index'>
					<view class="select-item">
						{{item.name}}
					</view>
					<view class="item-content">
						<block v-for="(items,indexs) in item.list" :key="indexs">
							<view class="default" @click="goodsSelect(index,indexs)" :class="[sureSelect[index] == indexs ? 'choose':'']" >
								{{items.title}}
							</view>
						</block>
					</view>
				</view>
				<view class="number">
					
					数量 <van-stepper :value="select.number" min="1" max="10"  @change='numberChange'/>
				</view>
				<view class="goods-button">
					<van-button  size="large" color="linear-gradient(to right, #FFC71D, #FF8917)" @click="closeSelected">
					  取消
					</van-button>
					<van-button  size="large" color="linear-gradient(to right, #FA1E8B, #FC1E58)">
					  确定
					</van-button>
				</view>
			</view>
		  </van-popup>
		  
		  <site ref="show"></site>
		 
		 
		 <goTop></goTop>
	</view>

		
</template>

<script>
	import site from "../../component/gongge/site.vue"
	import goTop from "../../component/goTop/goTop.vue"
	import {getCarList} from "@/api/car.js"
	
	import {getguessLike} from "@/api/common.js"
	export default {
		data() {
			return {
				all:false,
				money:0.00,
				compile:true,
				isSelect:false,
				
				siteShow:false,
				
				goodList:[],
				
				allgoodList:[]
			};
		},
		created() {
			// this.goodList = this.$store.getters.getCarList
			this.getCarListData(1)
			this.getguessLikeData();
		},
		methods:{
			
			async getCarListData(userId){
				var {message} = await getCarList(userId);
				console.log("12213112313",message);
				// this.$store.commit('setCarList',currentCity	);
			},
			
			async getguessLikeData(){
				var {message} = await getguessLike(1);
				console.log('gwc',message)
				this.allgoodList = message
			},
			
			addcar(id){
				console.log(id);
			},
			details(id){
				uni.navigateTo({
					url:"/pages/goodsDetail/goodsDetail?id="+id
				})
				console.log(id)
			},
			good(data){	
				this.goodList.forEach(function(item,tempindex,arr){
					if(item.id == data){
						item.select = !item.select
					}
				});
				this.examineall();
				this.calculateMoney();
			},
			allgood(){
				var _this = this;
				this.all = !this.all
				this.goodList.forEach(function(item,tempindex,arr){
					item.select = _this.all
				});
				this.calculateMoney();
			},
			examineall(){
				var temp = true;
				this.goodList.forEach(function(item,tempindex,arr){
					if(item.select == true){
						
					}else{
						temp = false;
						return;
					}
				});
				this.all = temp;
				
			},
		
			addSubtract(obj){
				this.goodList.forEach((items,indexs)=>{
					if(items.id == obj.index){
						items.num = obj.value;
					}
				})
				this.calculateMoney();
			},
			
			calculateMoney(){
				var _this = this;
				this.money = 0
				
				this.goodList.forEach((items,indexs)=>{
					if(items.select == true){
						_this.money += items.price*items.num;
					}
				})
			},
		
			clickcompile(){
				this.compile = !this.compile;
				if(this.compile == false){
					this.tempgooList = JSON.parse(JSON.stringify(this.goodList));
					this.goodList.forEach((item,index)=>{
						item.select  = false;
					})
					
				}
				this.examineall();
				this.calculateMoney();
			},
			
			deleteGood(){
				var carId = []
				this.goodList.map((item,index)=>{
					item.goodList.map((items,indexs)=>{
						if(items.select == true){
							carId.push(items.id)
						}
					})
				})
				carId = carId.join(",")
				console.log(carId)
			},
			
			
			closeSelected(){
				this.isSelect = false;
			},
			
			
			specifications(id,specifications){
				this.isSelect = true;
			},
			siteCompile(){
				this.$refs.show.show()
			},
			
			
			
		},
		computed: {
			getCurrentCity(){
				return this.$store.getters.getCurrentCity;
			}
		},
		components:{
			site,
			goTop
		}
	}
</script>

<style lang="scss" scoped>
	.mycar{
		padding:20rpx;
		background-color: #F3F5F7;
		
		.top{
		
			width: 100vw;
			position:fixed;
			top: 0rpx;
			left: 0rpx;
			height: 70rpx;
			z-index: 100;
			.background{
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				height: 100%;
				font-size: 30rpx;
				.left{
					margin-left:20rpx;
					color: #919599;
				}
				.right{
					margin-right: 20rpx;
				}
			}
		}
		
		.box{
			margin-top: 70rpx;
			
			.nogood{
				display: flex;
				flex-direction: column;
				align-items: center;
				.noimg{
					width: 200rpx;
					height: 200rpx;
				}
				.hint{
					color: #919599;
					font-size: 30rpx;
				}
					.buttom{
						margin-top: 20rpx;
						font-size: 26rpx;
						padding: 6rpx 20rpx;
						border-radius: 30rpx;
						border: 1rpx solid #ccc;
					}
			}
			
			.goodList{
				margin: 20rpx 0;
					.goodbox{
						border-radius:20rpx;
						overflow: hidden;
						background-color: #fff;
						.good{
							display: flex;
							align-items: center;
							padding: 20rpx 4rpx;
							.choose{
								margin: 20rpx;
							}
							.message{
								height: 190rpx;
								padding: 5rpx 10rpx;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								
								.specificationsbox{
									// display: inline;
									.specifications{
										font-size: 20rpx;
										// height: 20rpx;
										background-color: #ccc;
									}
								}
								.price_num{
									display: flex;
									justify-content: space-between;
									.price{
										color: #F50056;
									}
								}
							}
						}
						
					}
				
			}
			
			.like{
				// margin-bottom:150rpx;
				
				.img{
					display: flex;
					justify-content: center;
					margin: 10rpx 0;
				}
				.goodlist{
					/deep/ .van-grid-item__content{
							border-radius:20rpx;
							overflow: hidden;
					}
					.goodmessage{
						padding: 10rpx;
						
						.title{
							.mie{
								    background-color: #F30E5D;
								    color: #fff;
								    font-size: 22rpx;
								    padding: 3rpx;
								    border-radius: 6rpx;
									    margin-right: 10rpx;
							}
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							font-size: 28rpx;
						}
						
						.price_car{
							margin-top: 15rpx;
							display: flex;
							justify-content: space-between;
							.price{
								font-size: 40rpx;
								color: #ff0056;
								.min{
									font-size: 26rpx;
								}
							}
							.car{
								width: 60rpx;
								height: 60rpx;
							}
						}
					}
				}
			}
			
		}
		
		
		.end{
			background-color: #fff;	
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0rpx;
			left: 0rpx;
			width: 100%;
			height: 110rpx;
			border-top:1rpx solid #ccc;
			z-index: 100;
			.sum{
				flex: 1;
				display: flex;
				 justify-content:space-between;
				 padding: 20rpx;
				 .total{
					 .text{
					 	font-size: 26rpx;			 
					 }
					 .price{
						 font-size: 38rpx;
						 color: #F50056;
					 }
				 }
				 
			}
			.butt{
				/deep/.van-button{
						width: 230rpx;
					    height: 110rpx;
				}
			}
			
		}
		
		.popup-select{
				.info{
					padding: 20rpx 30rpx;
					display: flex;
					align-items: center;
					border-bottom: 2rpx solid #ccc;
					image{
						border: 2rpx solid #DCDDDE;
						width:190rpx;
						height: 190rpx;
					}
					.infos{
						margin-left: 30rpx;
						color: #F20C59;
						font-size: 40rpx;
						.price{
							margin-bottom: 10rpx;
						}
					}
				}
				.select{
					.select-item{
						padding: 30rpx;
						font-size: 36rpx;
					}
					.item-content{
						display: flex;
						flex-wrap: wrap;
						.default{
							margin: 0  20rpx 30rpx;
							padding: 20rpx 40rpx;
							border: 2rpx solid #E0E0E0;
						}
						.choose{
							border: 2rpx solid #F20C59;
							color: #F20C59;
						}
					}
				}
				.number{
					display: flex;
					margin-bottom: 120rpx;
					.van-stepper{
						margin-left: 20rpx;
					}
				}
				.goods-button{
					position: fixed;
					bottom: 0;
					width: 100%;
					display: flex;
					van-button{
						flex: 1;
					}
				}
			}
		
	}

		/deep/ .level-container{
			height: 680rpx;
		}
		
		/deep/._h1{
			display: none;
		}
 </style>