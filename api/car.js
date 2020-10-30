import request from "./request.js";


export function getCarList(userId){
	return request({
		url:"/queryShopCar?userId="+userId
	})
}

export function deleteShopCar(deleIds){
	return  request({
		url:"/deleteShopCar?deleIds="+deleIds
	})
}


export function updateShopCar(info){
	console.log(info)
	return  request({
		url:"/updateShopCar",
		methods:"post",
		data:info
	})
}

// 生成购物车
 export function addShopCar(car){
	 return request({
		 url:"/addShopCar",
		 methods:"post",
		 data:car
	 })
 } 