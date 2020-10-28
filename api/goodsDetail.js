import request from './request.js';

// 获取商品详情的轮播图
export function getGoodsLunbotu(comId){
	return request({
		url:"/commodityLunbo?comId="+comId
	})
}
// 获取当前商品的详细信息
export function getCommodityDetails(comId){
	return request({
		url:"/getCommodityDetails?comId="+comId
	})
}
//获取当前商品的评论
export function getcomment(comId,type = ''){
	return request({
		url:"/getcomment?comId="+comId +"&type="+type
	})
}
// 修改购物车
export function updateShopCar(info) {
	return request({
		url:"/updateShopCar",
		methods:"post",
		data:info
	})
}
// 获取所以购物车
export function queryShopCar(userId){
	return request({
		url:"/queryShopCar?userId="+userId
	})
}

