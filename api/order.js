import rq from '@/utils/request.js'
import consts from '@/utils/consts.js'

/** 订单分页列表 **/
export function getOrderList(data){
	return rq.request({
		url:'/order/findOrderPage',
		data:data,
		method:'GET'
	})
}
/** 订单取消 **/
export function cancelUserOrder(data){
	return rq.request({
		url:'/order/cancelUserOrder',
		data:data,
		method:'POST',
		header: consts.JSON_HEADER
	})
}

/** 订单详情 */
export function orderDetail(data) {
  return rq.request({
    url: '/order/orderDetail',
    data: data,
    method: 'GET'
  })
}