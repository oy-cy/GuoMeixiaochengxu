<template>
	<view class="addr-container">
		<view class="list">
			<view class="item consignee">
				<view class="text">收货人：</view>
				<input type="text" v-model="consignee" maxlength="10" />
			</view>
			<view class="item phone">
				<view class="text">手机号码：</view>
				<input type="number" v-model="phone" maxlength="11" />
			</view>
			<view class="item addr">
				<view class="text">选择地址：</view>
				<view class="site" @click="popup=true">{{getAddr}}</view>
			</view>
			<view class="item detailedAddr">
				<view class="text">详细地址：</view>
				 <textarea v-model="detailedAddr" auto-height maxlength="40" />
			</view>
			<view class="item isDefault" :style="{opacity:(popup?'0':'')}">
				<view class="text">设置默认地址：</view>
				<van-switch :checked="checked" @change="setChecked" />
			</view>
		</view>
		<view class="overspread" @click="popup=false" v-if="popup" />
		<ehPicker v-if="popup" @conceal="conceal" :proName="proName" :cityName="cityName" :areaName="areaName" :strName="strName" />
		<view class="button" @click="save">保存</view>
	</view>
</template>

<script>
import ehPicker from '@/component/site/erha-picker/erha-picker.vue'; 
	export default {
		props:['isEdit','oldChecked','oldConsignee','oldPhone','oldAddr','oldDetailedAddr'],
		data() {
			return {
				// 地址是否默认
				checked:false,
				// 收货人
				consignee:'',
				// 手机号
				phone:'',
				// 地址
				addr:'',
				// 详细地址
				detailedAddr:'',
				// 是否显示联动地址
				popup:false,
				
				proName:'',
				cityName:'',
				areaName:'',
				strName:''
			}
		},
		created() {
			if(this.isEdit == true || this.isEdit == 'true'){
				this.checked = this.oldChecked==1?true:false;
				this.consignee = this.oldConsignee;
				this.phone = this.oldPhone;
				this.addr = this.oldAddr;
				this.detailedAddr = this.oldDetailedAddr;
				
				var tempAddr = this.oldAddr.split('-');
				this.proName = tempAddr[0];
				this.cityName = tempAddr[1];
				this.areaName = tempAddr[2];
				this.strName = tempAddr[3];
				console.log(this.isEdit,this.oldChecked,this.oldConsignee,this.oldPhone,this.oldAddr,this.oldDetailedAddr);
			}
		},
		components:{
			ehPicker
		},
		computed: {
			getAddr(){
				return [...new Set(this.addr.split('-'))].join('')
			}
		},
		methods: {
			// 修改	是否为默认地址
			setChecked(){
				this.checked = !this.checked;
			},
			// 联动返回的地址
			conceal(param){
				var arr = [];
				for(var i in param){
					arr.push(param[i])
				}
				var addr = arr.join('-');
				this.addr = addr;
				console.log(addr);
				this.popup = false;
			},
			// 保存
			save(){
				if(this.consignee.trim() == ''){
					this.toast('收货人不能为空');
					return;
				}
				if(this.phone.trim() == ''){
					this.toast('手机号不能为空');
					return;
				}
				if(this.addr.trim() == ''){
					this.toast('地址还没选择');
					return;
				}
				if(this.detailedAddr.trim() == ''){
					this.toast('详细地址不能为空');
					return;
				}
				if(!(/^[1]([3-9])[0-9]{9}$/.test(this.phone.trim()))){
					this.toast('手机号格式有误');
					return;
				}
				var consignee = this.consignee.trim();
				var phone = this.phone.trim();
				var addr = this.addr.trim();
				var detailedAddr = this.detailedAddr.trim();
				var isDefault = this.isDefault?1:0;
				// 调用api上传数据(编辑则调用编辑的接口，新增则调用新增的接口)
				if(this.isEdit == true || this.isEdit == 'true'){
					// todo
				}else {
					
				}
				uni.switchTab({
				    url: '/pages/home/home'
				});
			},
			toast(text){
				uni.showToast({
					title:text,
					icon:'none'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.addr-container {
	position: relative;
	height: 100vh;
	background-color: rgb(243,245,247);
	.list {
		.item {
			display: flex;
			padding: 20rpx 24rpx;
			background-color: #fff;
			border-bottom: 2rpx solid #eee;
		}
		.detailedAddr {
			height: 120rpx;
			.text {
				width: 180rpx;
			}
		}
		.isDefault {
			align-items: center;
			justify-content: space-between;
		}
		.addr {
			.site {
				flex: 1;
			}
		}
	}
	.overspread {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		background:#000;
		opacity:0.7;
		z-index: 100;
		.model {
			flex: 1;
		}
	}
	.button {
		position: absolute;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		font-size: 38rpx;
		color: #fff;
		background-color: #f20c59;
	}
}
</style>
