<template>
	<view class="mycar">
		<view class="top">
			<view class="background">
				<view class="left">
					深圳市
				</view>
				<view class="right" @click="clickcompile">
					{{compile==true?"编辑":"完成"}}
				</view>
			</view>
			
		</view>
		<view class="box">
			<view class="goodList">
				<view class="goodbox">
					<view class="good" v-for="(items,indexs) in goodList" :key="indexs">
						<van-checkbox
						  :value="items.select"
						  checked-color="#F20C59"
						  @change="good(items.id)"
						  class="choose"
						></van-checkbox>
						<image :src="items.image" style="width: 200rpx;height: 200rpx;"></image>
						
						<view class="message">
							<view class="title">
								<text><text></text>{{items.title}}</text>
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
			
			<view class="like">
				<view class="img">
					<image src="../../static/images/gongge/weni.jpg" style="width: 300rpx;height: 70rpx;"></image>
				</view>
					
				<van-grid column-num="2" gutter="4">
				  <van-grid-item use-slot v-for="(item,index) in allgoodList" :key="index" class="goodlist" @click="details(item.id)">
					<image
					  style="width: 100%; height: 400rpx;"
					  :src="item.image"
					/>
					<view class="goodmessage">
						<view class="door">
							{{item.door}}
						</view>
						<view class="title">
							{{item.title}}
						</view>
						<view class="price_car">
							<view class="price">
								
								<text class="min">￥</text>
								<text>{{item.price}}</text>
								<text class="min">.00</text>
								
							</view>
							<view class="car" @click.stop="addcar(item.id)">
								
							</view>
						</view>
					</view>
					
				  </van-grid-item>
				</van-grid>
			</view>
			
		</view>

		<view class="end">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				all:false,
				money:0.00,
				compile:true,
				
				goodList:[
						{id:1,
						title:"FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						num:4,
						select:false,
						price:3000},
						{id:2,
						title:"2FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						num:6,
						select:false,
						price:3000},
						{id:3,
						title:"3FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						num:7,
						select:false,
						price:3000},
						{id:4,
						title:"FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						num:'1',
						select:false,
						price:3000},
						{id:5,
						title:"2FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						num:'1',
						select:false,
						price:3000},
						{id:6,
						title:"3FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						num:'1',
						select:false,
						price:3000},
				],
				
				allgoodList:[
					{id:1,
						title:"FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						door:"国美体验店",
						price:"3000"},
					{id:2,
						title:"FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						door:"国美体验店",
						price:"3000"},
					{id:3,
						title:"FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						door:"国美体验店",
						price:"3000"},
					{id:4,
						title:"FHD全高清屏，人工智能语音",
						image:"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd59729b9a02407979848839c0e5343.jpg?thumb=1&w=344&h=280",
						door:"国美体验店",
						price:"3000"},
					
				]
			};
		},
		methods:{
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
					
				}else{
					
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
			}
			
		
			
			
		},
		created() {
			
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
				margin-bottom:150rpx;
				
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
						.door{
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							color: #7A7F85;
							font-size: 28rpx;
							padding-bottom: 10rpx 0;
							border-bottom: 1px dotted #7A7F85; 
						}
						.title{
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							font-size: 28rpx;
							margin: 10rpx;
						}
						
						.price_car{
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
								width: 30rpx;
								height: 30rpx;
								background-color: red;
								    margin: 20rpx 20rpx 0rpx 0rpx;
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
	}
</style>