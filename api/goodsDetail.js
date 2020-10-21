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
export function getcomment(comId){
	return request({
		url:"/getcomment?comId="+comId
	})
}
