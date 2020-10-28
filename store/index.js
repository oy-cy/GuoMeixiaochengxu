import Vue from 'vue'
import Vuex from 'vuex'

import {addShopCar,updateShopCar,getCarList} from "@/api/car.js"

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
		// 删除购物车
		deleteCar(state,carIdArr){
			carIdArr.map((v,index) =>{
				let temp =  state.carList.findIndex( (value) => value.id == v);
				if(temp != -1){
					console.log("temp",temp);
					state.carList.splice(temp,1);
					console.log("temps",state.carList);
				}
			})
			console.log(state.carList);
		},
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
		
		async setaddcar(state,data){
			if(getApp().globalData.isLogin){
				var index = -1;
				state.carList.forEach((v,indexs)=>{
					if(v.com_id == data.id){
						v.com_count++
						index = indexs;
						return;
					}
				})
				
				if(index == -1){
					var user = getApp().globalData.userInfo.userId
					var car = {
						userId:user,
						comId:data.id,
						comCount:1,
						specification:[],
						price:data.sku_price
					}
					await addShopCar(car);
					var {message} = await getCarList(user);
					message.forEach(v=>{
						v.shop_specification = JSON.parse( v.shop_specification);
					})
					state.carList = message
				}else{
					var info = {id:state.carList[index].id,
								com_id:state.carList[index].com_id,
								com_count:state.carList[index].com_count,
								specification:state.carList[index].specification,
								price:state.carList[index].price}
					
					await updateShopCar(info);
				}
				
				
				// var boot = false
				// start.carList.forEach(v=>{
				// 	if(v.id == good.id){
				// 		v.num++;
				// 		boot=true;
				// 	}
				// })
				// if(boot == true){
				// 	start.carList.push(good)
				// }
			}else{
				uni.showToast({
					title:"请先登录",
					icon:"none"
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

		},
		
	},
	//异步修改
    actions: {}
})

export default store