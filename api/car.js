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
	return  request({
		url:"/updateShopCar?info="+info
	})
}

export function addShopCar(car){
	return  request({
		url:"/addShopCar",
		method:"post",
		data:car
	})
}