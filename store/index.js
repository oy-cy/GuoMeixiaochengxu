import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //数据
	state: {
		// 当前城市(格式：北京，默认北京)
		currentCity:'北京',
		
		carList:[]
		
	},
	// 存放获取数据的方法
	getters:{
		// 获取当前城市
		getCurrentCity(state){
			return state.currentCity;
		},
		
		getCarList(state){
			return state.carList;
		}
	},
	// 存放修改数据的方法
	mutations: {
		// 修改当前城市
		setCurrentCity(state,city){
			state.currentCity = city;
		},
		
		setCarList(state,carList){
			state.carList = carList;
		},
		
		setaddcar(){
			if(getApp().globalData.isLogin){
				var boot = false
				start.carList.forEach(v=>{
					if(v.id == good.id){
						v.num++;
						boot=true;
					}
				})
				if(boot == true){
					start.carList.push(good)
				}
			}else{
				uni.navigateTo({
					url:"/pages/user/user.vue"
				})
			}
		}
	},
	//异步修改
    actions: {}
})

export default store