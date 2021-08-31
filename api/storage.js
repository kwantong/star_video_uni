import consts from '@/utils/consts.js'
import { domain } from '@/api/domain.js'
import rq from '@/utils/request.js'



/** 获取上传请求参数 **/
export function getUploadPolicy(data) {
  return rq.request({
    url: '/upload/uploadPolicy/memberIcon',
    method: 'get',
    params: data
  })
}

export function uploadImg(filePath, formData, fn) {
	let header = {}
	header[consts.ACCESSTOKEN] = uni.getStorageSync(consts.ACCESSTOKEN) || ''
	uni.uploadFile({
		url: formData.host,
		filePath: filePath,
		name: 'file',
		header: header,
		formData: formData,
		success: function(res) {
			var resdata = res.data
			if (typeof(resdata) == "string") {
				resdata = JSON.parse(resdata)
			}
			fn && fn(resdata)
		}
	})
}