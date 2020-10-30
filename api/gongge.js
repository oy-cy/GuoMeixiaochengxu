import request from "./request.js";


export function getLunbo(type){
	return request({
		url:"/getLunbo?type="+type
	})
}

export function getGaid(type){
	return request({
		url:"/getGrid?type="+type
	})
}
 
export function getSeckill(){
	return request({
		url:"/getSeckill"
	})
}

export function getRecommend(){
	return request({
		url:"/getRecommend"
	})
}

export function getSellingList(){
	return request({
		url:"/getSellingList"
	})
}