<script>
import amap from '@/static/js/amap-wx.js';
import {getCarList} from "@/api/car.js"
export default {
	globalData: {  
		// 用户是否授权(用户是否登录)
		isLogin:false,
		// 用户信息
		userInfo:{}
	},
	
	onLaunch: function() {
		console.log('App Launch');
		// 通过本地存储获取用户是否登录
		var isLogin = uni.getStorageSync('isLogin');
		this.$scope.globalData.isLogin = isLogin;
		if(isLogin){
			this.$scope.globalData.userInfo = uni.getStorageSync('userInfo');
			this.getCarListData(this.$scope.globalData.userInfo.userId)
			// console.log(123)
		}
		// 定位城市
		this.amapPlugin = new amap.AMapWX({
			//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
			key: '99031ada35818bf92d6e349e218b83a5'
		});
		// 定位地址
		this.amapPlugin.getRegeo({
			success: (data) => {
				this.$store.commit('setCurrentCity',data[0].regeocodeData.addressComponent.city.replace(/市/g,''))
				console.log(this.$store.getters.getCurrentCity)
			},
			fail:(data)=>{
				console.log("当前城市请求失败");
			}
		}); 
		
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
		
	},
	methods:{
		async getCarListData(userId){
			var {message} = await getCarList(userId);
			
			message.forEach(v=>{
				v.shop_specification = JSON.parse( v.shop_specification);
			})
			// 购物车初始化数据
			this.$store.commit('setCarList',message);
		},
	}
};
</script>
<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
