import request from "./request.js"
// 获取轮播图
export function getLunbotu(type){
	return request({
		url:"/commodityLunbo?type="+type
	})
}