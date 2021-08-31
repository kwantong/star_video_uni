import rq  from '@/utils/request.js'
import consts from '@/utils/consts.js'

export function getRechargeList(data){
	return rq.request({
		url:'/rechargeOrder/findPage',
		data:data,
		method:'GET'
	})
}

/** 充值 */
export function newRecharge(data) {
  return rq.request({
    url: '/rechargeOrder/createOrder',
    data: data,
    method: 'POST',
	header:consts.JSON_HEADER
  })
}
/** 充值 - 小程序 */
export function newRechargeForWx(data) {
  return rq.request({
    url: '/rechargeOrder/wxMiniProgramPlaceOrder',
    data: data,
    method: 'POST',
	header:consts.JSON_HEADER
  })
}
/**获取小程序openid */
export function wxJscode2session(data) {
  return rq.request({
    url: '/sso/wxJscode2session',
    data: data,
    method: 'POST'
  })
}


/** 获取充值项 */
export function findALLRechargeSelectionList(data) {
  return rq.request({
    url: '/rechargeSelection/findALLRechargeSelectionList',
    params: data,
    method: 'GET'
  })
}