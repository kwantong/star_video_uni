import rq from '@/utils/request'
import consts from '@/utils/consts.js'

/** 商务需求 **/
export function addContactUs(data) {
  return rq.request({
    url: '/contactUs/add',
    data,
    method: 'POST',
	header: consts.JSON_HEADER,
  })
}