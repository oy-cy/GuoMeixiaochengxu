import request from './request.js';

// 登录
export function login(openId){
	return request({
		url:"/addUser?openId="+openId
	})
}