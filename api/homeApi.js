import request from './request.js';

// 轮播
export function getLunbo(){
	return request({
		url:'getLunbo?type=home'
	})
}
// 宫格
export function getGrid(){
	return request({
		url:`getGrid?type=home`
	})
}

// 秒杀
export function getSeckill(){
	return request({
		url:'getSeckill'
	})
}

// 猜你喜欢
export function getguessLike(){
	return request({
		url:'getguessLike'
	})
}