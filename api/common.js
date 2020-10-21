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
export function getguessLike(catId){
	return request({
		url:"/getguessLike?catId="+catId
	})
}

// 获取所有的导购
export function getShoppingGuide(){
	return request({
		url:"/getShoppingGuide"
	})
}

// 获取门店分类名字
export function getCategory(){
	return request({
		url:`/getCategory?page=shop`
	})
}

// 获取门店分类商品数据
export function getGoodsList(id,page){
	console.log(id);
	return request({
		url:`/getGoodsList?catId=${id}&page=${page}`
	})
}


