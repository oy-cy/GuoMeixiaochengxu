import request from "./request.js";


export function getCarList(userId){
	return request({
		url:"/queryShopCar?userId="+userId
	})
}