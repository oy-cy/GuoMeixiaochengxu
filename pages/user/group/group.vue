<template>
	<view class="group-container"> 
		<u-tabs :list="list" active-color="rgb(255,87,87)" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="list">
			<view class="all" v-if="current == 0">
				<view class="explain">你暂无拼团</view>
			</view>
			<view class="underway" v-if="current == 1">
				<view class="explain">你暂无进行中的拼团</view>
			</view>
			<view class="finished" v-if="current == 2">
				<view class="explain">你暂无已结束的拼团</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '全部'
				}, {
					name: '进行中'
				}, {
					name: '已结束'
				}],
				current: 0
			}
		},
		methods: {
			change(option) {
				this.current = option.index;
			}
		}
	}
</script>

<style lang="scss" scoped>
.group-container {
	height: 100vh;
	background-color: rgb(243,245,247);
	.list {
		width: 100%;
		height: 400rpx;
		display: flex;
		position: relative;
		justify-content: center;
		background: url(../../../static/images/user/none.png) no-repeat center center;
		background-size: 25%;
		view {
			width: 100%;
			display: flex;
			justify-content: center;
			position: absolute;
			bottom: 0;
			.explain {
				color: #777;
			}
		}
	}
}
</style>
