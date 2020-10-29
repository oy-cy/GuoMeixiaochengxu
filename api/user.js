import request from './request.js';

// 登录
export function login(code){
	return request({
		url:"/addUser?code="+code
	})
}

// 获取用户的所有地址
export function getAddrs(userId){
	return request({
		url:"/getaddrs?id="+userId
	})
}

// 新增地址
export function insertAddr(addr){
	return request({
		url:"/insertAddr?addr="+addr
	})
} 

// 删除地址
export function deleteAddr(addrId){
	return request({
		url:"/deleteAddr?id="+addrId
	})
}

// 修改地址
export function updateAddr(addr){
	return request({
		url:"/updateAddr?addr="+addr
	})
}

// 根据地址id获取对应地址
export function getAddr(addrId){
	return request({
		url:"/getAddr?id="+addrId
	})
}

// 修改用户默认地址
export function setDefaultAddr(userId,addrId){
	return request({
		url:`/setDefaultAddr?id=${addrId}&userId=${userId}`
	})
}

// 修改用户选中地址
export function setSelectAddr(userId,addrId){
	return request({
		url:`/setSelectAddr?id=${addrId}&userId=${userId}`
	})
}