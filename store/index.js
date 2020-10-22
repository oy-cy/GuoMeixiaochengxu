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
		historyArray:[],
		// 商品详情显示的地址( 市 区 街道)
		defaultSite:'深圳市龙华区观澜街道'
	},
	// 存放获取数据的方法
	getters:{
		// 获取当前城市
		getCurrentCity(state){
			return state.currentCity;
		},
		// 商品详情显示的地址
		getDefaultSite(start){
			return start.defaultSite;
		},
		
		getCarList(state){
			return state.carList;
		},
		getCarListCount(state){
			return state.carList.length;
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
		
		setDefaultSite(state,site){
			console.log(site);
			console.log(typeof site == "string");
			var str = "";
			if(typeof site == "string"){
				str = site
			}else{
				for(let s in site){
					if(s !== "province"){
						str += site[s];
					}
				}
			}
			state.defaultSite = str;
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