<template>
	<view class="comment-container">
		<view class="heard-tag">
			<view class="tag">
				<view class="tag-item" :class="[isSelect == -1 ? 'select':'' ]" @click="onSelect('全部',-1)">
					全部
				</view>
				<view class="tag-item" @click="onSelect(item.type,index)" :class="[isSelect == index ? 'select':'' ]" v-for="(item,index) in tagList" :key="index">
					{{item.type}}({{item.count}})
				</view>
			</view> 
			<view class="good">
				好评度
				<view class="goods-comment">{{goodComment}}%</view>
			</view>
		</view>
		<!-- 评论 -->
		<view class="comment-item" v-for="(item,index) in list" :key="index" v-if="list.length != 0">
			 <view class="comment-hread">
				<view class="hread-info">
					<image :src="item.photo"></image>
					{{item.nickname}}
					<van-rate 
					:value="item.Star_rating"
					  :disabled="true" 
					  size='26rpx'
					  gutter='2rpx'
					  disabled-color="#FFD635" />
				</view>
				<view class="comment-time">
					{{$moment(item.update_time).format('YYYY-MM-DD hh:mm')}}
				</view>
			 </view>
			<view class="comment-content">
				{{item.remark}}
			</view>
		</view>
		<view class="comment-title" v-if="list.length == 0">
			暂无评论
		</view>
		
		<!-- 回到顶部 -->
		<view class="wrap">
				<u-back-top :scroll-top="scrollTop" ><u-icon name="arrow-upward"></u-icon></u-back-top>
		</view>
	</view>
</template>

<script>
	import {getcomment} from "@/api/goodsDetail.js";
	import {getCommentTypeAndCount} from "@/api/comment.js"

	export default {
		data() {
			return {
				commentList:[],
				tagList:[
					{
						type:"好评",
						count:0
					},{
						type:"中评",
						count:0
					},{
						type:"差评",
						count:0
					}],
				goodComment:0.,
				isSelect:-1,
				goodsId:0,
				scrollTop:0,
				list:[]
			}
		},
		methods: {
			// 初始化
			init(id){
				this.getcomment(id);
				
			},
			// 获取评论得类型和数量，好评度
			async getCommenCTypeAndCount(){
				// 总数
				this.commentList.map(v =>{
					for(let i = 0;i < this.tagList.length;i++){
						if(this.tagList[i].type == v.types){
							this.tagList[i].count += 1
							return;
						}
					}
				})
				// 好评度
				this.goodComment = Math.floor((this.tagList[0].count/this.commentList.length) * 100)
				this.onSelect()
			},
			// 获取评论
			async getcomment(id){
				// this.commentList.length = 0
				let {message} = await getcomment(id);
				message.map(v => {
					v.nickname = v.nickname.substr(0,1) + "***" + v.nickname.substr(-1);
					switch(v.Star_rating){
						case 1 :
						case 2 :
							v.types = '差评'
							break;
						case 3 :
							v.types = '中评'
							break;
						default : v.types = '好评' 
					}
				})
				this.commentList = message;
				this.getCommenCTypeAndCount()
			},
			// 切换评论的类型
			onSelect(type='全部',index = -1){
				this.isSelect = index;
				if(type == '全部'){
					this.list = this.commentList;
				}else{
					this.list = this.commentList.filter( v=> v.types == type)
				}
			},
			// 回到顶部
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			
		},
		onLoad(options) {
			this.goodsId = options.goodsId
			this.init(this.goodsId);
		}
	}
</script>
<style lang="scss" scoped>
	.comment-container{
		background-color: #F3F5F7;
		.heard-tag{
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			padding: 30rpx;
			padding-bottom: 60rpx;
			.tag{
				display: flex;
				.tag-item{
					margin-right: 20rpx;
					padding: 12rpx 20rpx;
					font-size: 28rpx;
					border-radius: 30rpx;
					color: #333;
					background-color: #FFE4ED;
				}
			
				.select{
					color: #fff;
					background-color: #F20C59;
				}
			}
			
			.good{
				padding: 12rpx 0;
				font-size: 26rpx;
				color: #3F536E;
				position: relative;
				.goods-comment{
					position: absolute;
					right: 0;
					font-size: 40rpx;
					color: #F20C59;
				}
			}
		}
	
		.comment-item{
			padding: 30rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			.comment-hread{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.hread-info{
					display: flex;
					align-items: center;
					image{
						height: 56rpx;
						width: 56rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					/deep/ .van-rate{
						margin-left:16rpx ;
					}
				}
				.comment-time{
					font-size: 22rpx;
					color: #919599;
				}
			}
			.comment-content{
				margin-top: 30rpx;
				color: #333;
				font-size: 30rpx;
			}
		}
		.comment-title{
			padding-left: 30rpx;
			padding-bottom: 30rpx;
			color: #333;
			background-color: #fff;
			font-size: 30rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
	}
</style>
