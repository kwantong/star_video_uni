import rq from '@/utils/request.js'

/** 获取微信JS-SDK配置参数(用于微信分享等） **/
export function getWechatShareConfigParam(data){
	return rq.request({
		url:'/share/getWechatConfigParam',
		method:'GET',
		data:data
	})
}