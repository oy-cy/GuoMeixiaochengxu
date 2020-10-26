import request from "./request.js";

// 获取用户地址
export function getaddrs(id){
	return request({
		url:"/getaddrs?id="+id
	})
}

// 生成订单
export function addOrder(order){
	return request({
		url:"/addOrder",
		methods:"post",
		data:order
	})
}
