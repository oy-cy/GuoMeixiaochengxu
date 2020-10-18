<script>
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
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
		
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
