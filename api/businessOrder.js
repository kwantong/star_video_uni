import rq from '@/utils/request'
import consts from '@/utils/consts.js'

/** 商务需求 **/
export function addBusinessOrder(data) {
  return rq.request({
    url: '/businessOrder/',
    data,
    method: 'POST',
	header: consts.JSON_HEADER
  })
}