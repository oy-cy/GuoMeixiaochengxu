<template>
	<view class="receiving-container">
		<!-- 地址 -->
		<view class="site">
			<view class="current-city">
				<view class="info">
					<text>当前城市</text>
					<text>{{currentCity}}</text>
				</view>
				<view class="current-site">
					<text>当前定位</text>
					<text>{{currentSite}}</text>
				</view>
			</view>
		</view>
		<!-- 我的收货地址 -->
		<view class="receiving-site">
			<view class="my-receiving-site">
				<text>我的收货地址</text>
				<view class="manage">
					<text>管理地址</text>
				</view>
			</view>
			<!-- 收货地址列表 -->
			<view class="list">
				
			</view>
		</view>
		<!-- 附近地址 -->
		<view class="nearby">
			<view class="">附近地址</view>
			<!-- 附近地址列表 -->
			<view class="">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前城市
				currentCity:'',
				// 当前地址
				currentSite:''
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
