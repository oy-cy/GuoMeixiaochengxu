import request from "./request.js";

// 获取用户地址
export function getaddrs(id){
	return request({
		url:"/getaddrs?id="+id
	})
}
