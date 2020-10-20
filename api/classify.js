import request from "./request.js";


export function getClassifyTitleData(classify){
	return request({
		url:"getCategory?page=classify"
	})
}

export function getClassifyGoodData(classifyId){
	return request({
		url:"getCategoryDetails?id="+classifyId
	})
}