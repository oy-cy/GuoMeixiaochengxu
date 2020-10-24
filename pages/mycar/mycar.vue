<template>
	<view class="mycar">
		
		
		
		<!-- 地址，编辑 -->
		<view class="top" >
			<view class="background">
				<view class="left" @click="siteCompile">
					<image src="../../static/images/tabbar/shop.png" style="width: 30rpx;height: 30rpx;margin-right: 20rpx;">{{getCurrentCity}}
				</view>
				<view class="right" @click="clickcompile" v-if="getCarListData.length != 0">
					{{compile==true?"编辑":"完成"}}
				</view>
			</view>
			
		</view>
		
		<!-- 内容 -->
		<view class="box">
			
			<view class="nogood" v-if="getCarListData.length == 0">
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
			
			<view class="goodList" v-if="getCarListData.length != 0">
				<view class="goodbox">
					<view class="good" v-for="(items,indexs) in getCarListData" :key="indexs" >
						<van-checkbox
						  :value="items.select"
						  checked-color="#F20C59"
						  @change="good(items.id)"
						  class="choose"
						></van-checkbox>
						<view class="good" @click="details(items.com_id)">
							<image :src="items.sku_thumbImg_url" style="width: 300rpx;height: 150rpx;"></image>
							
							<view class="message">
								<view class="title">
									<text><text></text>{{items.sku_name}}</text>
								</view>
								<view class="specificationsbox" v-if="items.shop_specification.length != 0"  @click.stop="specifications(items)">
									<text class="specifications" v-for="(item,index) in items.shop_specification" :key="index">{{item.title}}<text v-if="items.shop_specification.length-1!=index">,</text></text> 
								</view>
								<view class="price_num">
									<text class="price">￥{{items.price*items.com_count}}</text>
									<u-number-box 
									:min="1" :max="100"
									 size='18' 
									 input-width="40" 
									 v-model="items.com_count" 
									 :index="items.id"
									@change="addSubtract"></u-number-box>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
			<view class="like" :style="{'margin-bottom':getCarListData.length != 0?'150rpx;':'0rpx'}">
				<view class="img">
					<image src="../../static/images/gongge/weni.jpg" style="width: 300rpx;height: 70rpx;"></image>
				</view>
					
				<van-grid column-num="2" gutter="4">
				  <van-grid-item use-slot v-for="(item,index) in allgoodList" :key="index" class="goodlist" @click="details(item.id)">
					<image
					  style="width: 100%; height: 330rpx;"
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
							<view class="car" @click.stop="addcar(item)">
								<image src="../../static/images/gongge/nocar.png" style="width: 100%;height: 100%;"></image>
							</view>
						</view>
					</view>
					
				  </van-grid-item>
				</van-grid>
			</view>
			
		</view>


		<!-- 全选 -->
		<view class="end" v-if="getCarListData.length != 0">
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
					<image :src="specification.img"></image>
					<view class="infos">
						<view class="price">
							¥{{specification.price || goods.price}}
						</view>
					</view>
				</view>
				<view class="select" v-for="(item,index) in specification.spec" :key='index'>
					<view class="select-item">
						{{item.name}}
					</view>
					<view class="item-content">
						<block v-for="(items,indexs) in item.list" :key="indexs">
							<view class="default" @click="goodsSelect(indexs)" :class="[sureSelect == indexs ? 'choose':'']" >
								{{items.title}}
							</view>
						</block>
					</view>
				</view>
				<view class="goods-button">
					<van-button  size="large" color="linear-gradient(to right, #FFC71D, #FF8917)" @click="closeSelected">
					  取消
					</van-button>
					<van-button  size="large" color="linear-gradient(to right, #FA1E8B, #FC1E58)" @click="affirm">
					  确定
					</van-button>
				</view>
			</view>
		  </van-popup>
		  
		  <site ref="show"></site>
		 
		 
		 <goTop></goTop>
		 
		 <u-toast ref="uToast" />
	</view>

		
</template>

<script>
	import site from "../../component/gongge/site.vue"
	import goTop from "../../component/goTop/goTop.vue"
	import {deleteShopCar,updateShopCar} from "@/api/car.js"
	
	import {getSellingList} from "@/api/common.js"
	export default {
		data() {
			return {
				all:false,
				money:0.00,
				compile:true,
				isSelect:false,
				
				siteShow:false,
				
				goodList:[],
				
				allgoodList:[],
				
				specification:null,
				sureSelect:0
			};
		},
		created() {
			this.getguessLikeData();
		},
		methods:{
			
			
			async getguessLikeData(){
				var {message} = await getSellingList(1);
				console.log('gwc',message)
				this.allgoodList = message
			},
			
			addcar(data){
				this.$store.commit('setaddcar',data);
			},
			details(id){
				uni.navigateTo({
					url:"/pages/goodsDetail/goodsDetail?goodsId="+id
				})
			},
			good(data){	
				this.getCarListData.forEach(function(item,tempindex,arr){
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
				this.getCarListData.forEach(function(item,tempindex,arr){
					item.select = _this.all
				});
				this.calculateMoney();
			},
			examineall(){
				var temp = true;
				this.getCarListData.forEach(function(item,tempindex,arr){
					if(item.select == true){
						
					}else{
						temp = false;
						return;
					}
				});
				this.all = temp;
				
			},
		
			async addSubtract(obj){
				var index = 0;
				this.getCarListData.forEach((items,indexs)=>{
					if(items.id == obj.index){
						index = indexs;
						items.com_count = obj.value;
					}
				})
				var info = {id:obj.index,
							com_id:this.getCarListData[index].com_id,
							com_count:obj.value,
							specification:this.getCarListData[index].specification,
							price:this.getCarListData[index].price}
				await updateShopCar(info);
				this.calculateMoney();
			},
			
			calculateMoney(){
				var _this = this;
				this.money = 0;
				
				this.getCarListData.forEach((items,indexs)=>{
					if(items.select == true){
						_this.money += parseInt(items.price)*parseInt(items.com_count);
					}
				})
			},
		
			clickcompile(){
				this.compile = !this.compile;
				if(this.compile == false){
					this.tempgooList = JSON.parse(JSON.stringify(this.getCarListData));
					this.getCarListData.forEach((item,index)=>{
						item.select  = false;
					})
					
				}
				this.examineall();
				this.calculateMoney();
			},
			
			async deleteGood(){
				var carId = [];
				var tempList = []
				this.getCarListData.map((items,indexs)=>{
					if(items.select == true){
						carId.push(items.id);
					}else{
						tempList.push(items)
					}
				})
				carId = carId.join(",");
				await deleteShopCar(carId);
				this.$store.commit('setCarList',tempList);
				
			},
			
			
			closeSelected(){
				this.isSelect = false;
			},
			
			
			specifications(data){
				this.isSelect = true;
				this.specification = {
					id:data.id,
					img:data.sku_thumbImg_url,
					spec:JSON.parse(data.specification),
					com:data.com_id,
					count:data.com_count
				}
				
				this.specification.spec.forEach(v=>{
					v.list.forEach(j=>{
						if(j.name){
							
						}
						j.select = true
					})
				})
			},
			siteCompile(){
				this.$refs.show.show()
			},
			
			goodsSelect(index){
				this.sureSelect = index
			},
			
			affirm(){
				this.isSelect = false;
				var data = this.specification;
				// .spec[0].list[this.sureSelect].title
				var info = {id:data.id,
							com_id:data.com,
							com_count:obj.value,
							specification:this.getCarListData[index].specification,
							price:this.getCarListData[index].price}
				console.log("adsfasdfsdafsdafsdafsdaf",data)
			}
			
		},
		computed: {
			getCurrentCity(){
				return this.$store.getters.getCurrentCity;
			},
			getCarListData(){
				console.log("12312312312312312",this.$store.getters.getCarList)
				return this.$store.getters.getCarList
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
								.title{
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
									font-size: 28rpx;
								}
								.specificationsbox{
									width: 250rpx;
									font-size: 20rpx;
									color: #5A6066;
									background-color: #F3F5F7;
									padding: 4rpx;
									
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 1;
									overflow: hidden;
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
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							font-size: 28rpx;
							.mie{
								    background-color: #F30E5D;
								    color: #fff;
								    font-size: 22rpx;
								    padding: 3rpx;
								    border-radius: 6rpx;
									    margin-right: 10rpx;
							}
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