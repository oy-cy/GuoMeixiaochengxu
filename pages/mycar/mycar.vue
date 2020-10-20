<template>
	<view class="mycar">
		<view class="end">
			<view class="sum">
				<van-checkbox
				  :value="all"
				  checked-color="#F20C59"
				  @change="onChange"
				>
				  全选
				</van-checkbox>
				<view class="total">
					<text>合计:</text>
					<text>￥{{money}}</text>
				</view>
			</view>
			<van-button type="primary" size="normal" color="linear-gradient(to right, #FA1E8A, #FC1E58)" class="butt">去结算</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				all:false,
				money:0
			};
		},
		methods:{
			onChange(obj){
				this.all = obj.detail
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mycar{
		.end{
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			height: 110rpx;
			border-top:1rpx solid #ccc ;
			.sum{
				flex: 1;
				display: flex;
				 justify-content:space-between;
				 padding: 20rpx;
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
