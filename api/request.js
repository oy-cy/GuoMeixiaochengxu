import {url} from "./config.js"

console.log(url);

function requset(options){
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url:url+options.url,
			method:options.methods || "get",
			data:options.data,
			success(res) {
				console.log("res",res);
				resolve(res.data);
			},
			fail(err) {
				reject(err)
			},
			complete() {
				
			}
			
		})
	})
}

export default requset;