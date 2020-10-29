<template>
	<view class="addr-container">
		<view class="list">
			<view class="item consignee">
				<view class="text">收货人：</view>
				<input type="text" v-model="receiver" maxlength="10" />
			</view>
			<view class="item phone">
				<view class="text">手机号码：</view>
				<input type="number" v-model="phone" maxlength="11" />
			</view>
			<view class="item addr">
				<view class="text">选择地址：</view>
				<view class="site" @click="popup=true">{{getAddrStr}}</view>
			</view>
			<view class="item detailedAddr">
				<view class="text">详细地址：</view>
				 <textarea v-model="detailedAddr" auto-height maxlength="40" />
			</view>
			<view class="item isDefault" :style="{opacity:(popup?'0':'')}">
				<view class="text">设置默认地址：</view>
				<van-switch :checked="checked" @change="setChecked" />
			</view>
			<!-- 智能识别 -->
			<view class="recognition">
				<textarea class="textarea" style="height: 200rpx;" maxlength="100" v-model="recognition"
				 placeholder="示例: 陈陈陈 广东省汕头市潮南区陇田镇长厝 15767061582"
				 />
			</view>
			<view class="discern">
				<button class="btn" type="default" @click="discern">识别</button>
			</view>
		</view>
		<view class="overspread" @click="popup=false" v-if="popup" />
		<ehPicker v-show="popup" ref="reff" @conceal="conceal" :proName="proName" :cityName="cityName" :areaName="areaName" :strName="strName" />
		<view class="button" @click="save">保存</view>
	</view>
</template>

<script>
import allPro from '@/component/site/erha-picker/city-data/province.js';
import allCity from '@/component/site/erha-picker/city-data/city.js';
import allArea from '@/component/site/erha-picker/city-data/area.js';
import allStreets from '@/component/site/erha-picker/city-data/streets.js';

import ehPicker from '@/component/site/erha-picker/erha-picker.vue'; 
import { insertAddr,updateAddr,getAddr } from '@/api/user.js';
	export default {
		props:['isEdit','addrId',"car"],
		data() {
			return {
				// 地址是否默认
				checked:false,
				// 收货人
				receiver:'',
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
				strName:'',
				
				userId:'',
				isReq:false,
				
				// 智能识别
				recognition:'',
			}
		},
		created() {
			this.userId = getApp().globalData.userInfo.userId;
		},
		components:{
			ehPicker
		},
		computed: {
			getAddrStr(){
				return [...new Set(this.addr.split('-'))].join('')
			},
			async getData(){
				if(this.isReq){
					return;
				}
				if(this.isEdit && this.addrId){
					var data = await getAddr(this.addrId);
					var addr = data.message[0];
					this.receiver = addr.receiver;
					this.phone = addr.phone;
					this.addr = addr.addr;
					this.detailedAddr = addr.addr_details;
					this.checked = addr.is_default==1?true:false;
					
					var tempAddr = this.addr.split('-');
					this.proName = tempAddr[0];
					this.cityName = tempAddr[1];
					this.areaName = tempAddr[2];
					this.strName = tempAddr[3];
					this.isReq = true;
				}
			},
			getCar(){
				return this.car;
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
				this.popup = false;
			},
			// 保存
			async save(){
				if(this.receiver.trim() == ''){
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
				var addr = {
					phone: this.phone.trim(),
					addr: this.addr.trim(),
					addrDetails: this.detailedAddr.trim(),
					receiver: this.receiver.trim(),
					userId: this.userId,
					isDefault: (this.checked?1:0)
				}
				// 调用api上传数据(编辑则调用编辑的接口，新增则调用新增的接口)
				if(this.isEdit == true || this.isEdit == 'true'){
					addr.id = this.addrId;
					var data = updateAddr(JSON.stringify(addr));
				}else {
					var data = await insertAddr(JSON.stringify(addr));
				}
				if(this.car == true || this.car == 'true'){
					uni.navigateBack({
						delta:2
					})
					return;
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
			},
			// 识别
			discern(){
				var recognition = this.recognition.trim();
				recognition = recognition.replace(/[\r\n]/g, " ");
				var arr = recognition.split(' ');
				for(var i in arr){
					if(arr[i] == '' || !arr[i]){
						arr.splice(i,1);
					}
				}
				
				arr.map(v=> {
					if(((v.indexOf('区') != -1) || v.indexOf('县')!=-1) && (v.length > 10)){
						this.addr = '';
						var index = v.lastIndexOf('市');
						var index2 = v.lastIndexOf('区');
						if(index2 == -1){
							index2 = v.lastIndexOf('县')
						}
						var index3 = v.lastIndexOf('镇');
						if(index3 == -1){
							index3 = v.lastIndexOf('街道');
						}
						
						var str1 = v.substring(index2+1,index+1); // 潮南区
						var str2 = v.substring(index3+1,index2+1); // 陇田镇
						
						var tempPro = '';
						var tempCity = '';
						var tempArea = '';
						var tempStr = '';
						var tempAddr = '';
						
						c:
						for(let i = 0; i < allPro.length; i++){
							for(let j = 0; j < allCity[i].length; j++){
								for(let k = 0; k < allArea[i][j].length; k++){
									if(index3 == -1){
										var area = allArea[i][j][k];
										if(area.label == str1) {
											tempPro = allPro[i].label;
											tempCity = allCity[i][j].label;
											tempArea = allArea[i][j][k].label;
											tempAddr = v.substring(index2+1);
											if(allStreets[i][j][k]){
											}
											break c;
										}
									}else {
										try{
											for(let l = 0; l < allStreets[i][j][k].length; l++){
												var str = allStreets[i][j][k][l];
												if(str == str2) {
													tempPro = allPro[i].label;
													tempCity = allCity[i][j].label;
													tempArea = allArea[i][j][k].label;
													tempStr = allStreets[i][j][k][l];
													tempAddr = v.substring(index3+1);
													break c;
												}
											}
										}catch(e){
										}
									}
								}
							}
						}
						console.log(tempPro,tempCity,tempArea,tempStr,tempAddr)
						if(tempPro != '' && tempCity != '' && tempArea != '' && tempStr != ''){
							this.proName = tempPro;
							this.cityName = tempCity;
							this.areaName = tempArea;
							this.strName = tempStr;
							this.$refs.reff.setAddr(this.proName,this.cityName,this.areaName,this.strName);
						}else if(tempPro != '' && tempCity != '' && tempArea != ''){
							this.proName = tempPro;
							this.cityName = tempCity;
							this.areaName = tempArea;
							this.$refs.reff.setAddr(this.proName,this.cityName,this.areaName);
						}
						if(!!tempAddr){
							this.detailedAddr = tempAddr;
						}
						
						return;
					}
					if((/[0-9]{11}/).test(v)){
						var reg = /\d{11}/;
						this.phone = reg.exec(v)[0];
						return;
					}
					var reg = /:|：/;
					if(reg.test(v)){
						var index = v.search(reg);
						this.receiver = v.substring(index+1);
					}else {
						this.receiver = v;
					}
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
	.recognition {
		margin: 20rpx 24rpx;
		border: 2rpx solid #aaa;
		.textarea {
			box-sizing: border-box;
			width: 100%;
		}
	}
	.discern {
		margin: 20rpx 24rpx;
		.btn {
			background-color: #07C160;
		}
	}
}
</style>
