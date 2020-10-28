import request from "./request.js";

export function getCommentTypeAndCount(comId){
	return request({
		url:"/getcommentTypeAndCount?comId="+comId
	})
}