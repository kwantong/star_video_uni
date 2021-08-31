import rq from '@/utils/request.js'

export function getColletList(data){
	return rq.request({
		url:'/collection/findPage',
		data:data,
		method:'GET'
	})
}