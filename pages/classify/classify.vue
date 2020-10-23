<template>
	<view class="classify">
		<scroll-view :scroll-y="true" class="left">
			<view class="title" v-for="(item,index) in titleData" :key="index" :class="item.id == titleSelectId?'titleSelect':''" @click="change(item.id)">
				{{item.name}}
				<view class="buttom"></view>
			</view>
		</scroll-view>
		
		<scroll-view scroll-y="true" class="right">
			<view v-if="goodlist.ad != undefined" class="imgbox">
				<image :src="goodlist.ad.imageUrl" style="width: 100%;height: 100%;"></image>
			</view>
			<view class="goodbox" v-for="(item,index) in goodlist.secondLevelCategories" :key="index">
				<view class="title">
					{{item.goodsTypeName}}
				</view>
				<van-grid column-num="3" >
					<van-grid-item 
					v-for="(items,indexs) in item.goodsTypeList" 
					:key="indexs" 
					 use-slot
					 :border="true"
					gutter="3" >
						<view class="good">
							<image :src="items.goodsTypeImgUrl" style="width: 150rpx; height: 140rpx;"></image>
							<view class="text">
								{{items.goodsTypeName}}
							</view>
						</view>
						
					</van-grid-item>
				</van-grid>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getClassifyTitleData,getClassifyGoodData} from "../../api/classify.js"
	export default {
		data() {
			return {
				titleSelectId:1,
				titleData:[],
				goodlist:{}
			};
		},
		
		methods:{
			change(selectid){
				console.log(selectid)
				this.titleSelectId = selectid;
				this.getClassifyGood();
			},
			async getClassifyTitle(){
				var {message} =  await getClassifyTitleData();
				console.log("adsfasdfsdafsdafsdfdsafsd",message)
				this.titleData = message;
				
				this.titleSelectId = message[0].id;
			},
			async getClassifyGood(){
				var {message} = await getClassifyGoodData(this.titleSelectId);
				
				var data = JSON.parse(message[0].name)
				// console.log("asdfasdfsdfsd",message[0].name)
				this.goodlist = data;
			}
		},
		created() {
			this.getClassifyTitle();
			this.getClassifyGood();
		}
	}
</script>

<style lang="scss" scoped>
	.classify{
		display: flex;
		.left{
			height: 100vh;
			width: 180rpx;
			background-color: #F0F0F0;
			.title{
				font-size: 28rpx;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100rpx;
				.buttom{
					position: absolute;
					bottom: 0rpx;
					width: 120rpx;
					height: 4rpx;
					background-color: #DDDDDD;
				}
			}
			.titleSelect{
				border-left: 6rpx solid #F20C59;
				color: #F20C59;
			}
		}
		.right{
			width: 78%;
			height: 100vh;
			padding: 10rpx;
			.imgbox{
				width: 100%;
				height: 180rpx;
			}
			.goodbox{
				.title{
					margin-top:15rpx;
					font-size: 24rpx;
					color: #ccc;
				}
				.good{
					background-color: #F8F8F8;
					.text{
						font-size: 20rpx;
						color: #ccc;
						text-align: center;
					}
				}
			}
		}
	}
	
</style>
