import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //数据
	state: {
		// 当前城市(格式：深圳)
		currentCity:''
	},
	// 存放获取数据的方法
	getters:{
		// 获取当前城市
		getCurrentCity(state){
			return this.currentCity;
		}
	},
	// 存放修改数据的方法
	mutations: {
		// 修改当前城市
		setUserInfo(state,city){
			state.currentCity = city;
		}
	},
	//异步修改
    actions: {}
})

export default store