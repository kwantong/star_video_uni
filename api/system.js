import rq from '@/utils/request.js'

/** 系统配置信息 **/
export function systemSetting(data){
	return rq.request({
		url:'/systemSetting/',
		data:data,
		method:'GET'
	})
}