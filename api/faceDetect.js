import rq from '@/utils/request'
import consts from '@/utils/consts.js'
import { domain } from '@/api/domain.js'

export function detectFace(filePath, fn) {
	let header = {}
	header[consts.ACCESSTOKEN] = uni.getStorageSync(consts.ACCESSTOKEN) || ''
	uni.uploadFile({
		url: domain + 'face/detect',
		filePath: filePath,
		name: 'pic',
		header: header,
		success: function(res) {
			var resdata = res.data
			//alert(resdata)
			if (typeof(resdata) == "string") {
				resdata = JSON.parse(resdata)
			}
			fn && fn(resdata)
		}
	})
}