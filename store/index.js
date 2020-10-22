import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// 1 获取数据 2.设置到state
// var historyArray = uni.loca

const store = new Vuex.Store({
    //数据
	state: {
		// 当前城市(格式：北京，默认北京)
		currentCity:'北京',
		carList:[],
		historyArray:[]
	},
	// 存放获取数据的方法
	getters:{
		// 获取当前城市
		getCurrentCity(state){
			return state.currentCity;
		},
		
		getCarList(state){
			return state.carList;
		},
		// 获取历史记录
		getHistoryArray(state){
			return state.historyArray;
			// uni.getStorage({
			// 	key:'keys',
			// 	success(e){
			// 		e.state.historyArray;
			// 	}
			// })
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
		},

		setHistoryArray(state,historyArray){
			state.historyArray = historyArray;
			
			// uni.setStorage({
			// 	key:'keys',
			// 	data:this.historyArray,
			// 	success:function(){
			// 		console.log("成功");
			// 	}
				
			// })
			// state.historyArray = keys;

		}
	},
	//异步修改
    actions: {}
})

export default store