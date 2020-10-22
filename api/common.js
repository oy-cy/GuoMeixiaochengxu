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
export function getCategory(type){
	return request({
		url:`/getCategory?page=${type}`
	})
}

// 获取门店分类商品数据
// export function getGoodsList(id,page){
// 	console.log(id);
// 	return request({
// 		url:`/getGoodsList?catId=${id}&page=${page}`
// 	})
// }


// 模糊查询
export function fuzzyQuery(name){
	return request({
		url:"/fuzzyQuery?name="+name
	})
}

//获取换新推荐
 export function getRecommend(catId){
	 return request({
		 url:"/getRecommend?catId="+catId
	 })
 }
 // 热卖榜单
 export function getSellingList(catId){
	 return request({
		 url:"/getSellingList?catId="+catId
	 })
 }
 
 // 获取列表页和获取门店分类商品数据//大家都在买
 export function getGoodsList(catId,page){
 	 return request({
 		 url:"/getGoodsList?catId="+catId+"&page="+page
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
 
