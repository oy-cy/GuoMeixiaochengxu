import request from "./request.js";

// 获取用户地址
export function getaddrs(id){
	return request({
		url:"/getaddrs?id="+id
	})
}

// 修改订单状态
export function updateOrderStatus(orderId,status){
	return request({
		url:"/updateOrderStatus?orderId="+orderId+"&status="+status
	})
}
// 删除订单
export function deleteOrder(orderId){
	return request({
		url:"/deleteOrder?orderId="+orderId
	})
}
// 查询单个订单
export function getOrder(orderId){
	return request({
		url:"/getOrder?orderId="+orderId
	})
}
// 查看用户的所有订单
export function getUserOrders(userId){
	return request({
		url:"/getUserOrders?userId="+userId
	})
}
// 查看用户的某个状态的所有订单
export function getOrderByStatus(userId,status){
	return request({
		url:"/getOrderByStatus?userId="+userId+"&status="+status
	})
}