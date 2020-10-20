import request from "./request.js"
// 获取轮播图
export function getLunbotu(type){
	return request({
		url:"/getLunbo?type="+type
	})
}

// 获取九宫格
export function getGrid(type){
	return request({
		url:"/getGrid?type="+type
	})
}

// 秒杀专场
export function getSeckill(){
	return request({
		url:"/getSeckill"
	})
}

// 猜你喜欢
export function getguessLike(){
	
}


