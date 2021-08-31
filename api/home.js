import rq from '@/utils/request.js'
import consts from '@/utils/consts.js'
// 首页列表
export function getHomeList(data){
	return rq.request({
		url:'/home/content',
		data:data,
		method:'GET'
	})
}
// 获取租户打折活动分页列表
export function findDisCountList(data){
	return rq.request({
		url:'/tenant/findDisCountList',
		data:data,
		method:'GET'
	})
}
// 获取租户人气分页列表
export function findHotTenantList(data){
	return rq.request({
		url:'/tenant/findHotTenantList',
		data:data,
		method:'GET'
	})
}
// 获取首页租户最新签约列表
export function findNewList(data){
	return rq.request({
		url:'/tenant/findNewList',
		data:data,
		method:'GET'
	})
}
// 获取租户推荐分页列表
export function findRecommendList(data){
	return rq.request({
		url:'/tenant/findRecommendList',
		data:data,
		method:'GET'
	})
}
// 详情
export function tenantDetails(data){
	return rq.request({
		url:'/tenant/'+data.id,
		data:data,
		method:'GET'
	})
}
// 搜索
export function tenantSearch(data){
	return rq.request({
		url:'/tenant/search',
		data:data,
		method:'GET'
	})
}

/* 分类 start */
// 获取所有租户类型以及租户个数列表
export function tenantTypefullAll(data){
	return rq.request({
		url:'/tenant/type/fullAll',
		data:data,
		method:'GET'
	})
}
// 获取所有租户类型列表
export function tenantTypeSimpleAll(data){
	return rq.request({
		url:'/tenant/type/simpleAll',
		data:data,
		method:'GET'
	})
}
// 组合条件查询明星分页数据
export function tenantTypefindPage(data){
	return rq.request({
		url:'/tenant/findPage',
		data:data,
		method:'GET'
	})
}
/* 分类 end */

/* 评论 start */
// 根据明星ID获取可见评论分页列表
export function commentList(data){
	return rq.request({
		url:'/comment',
		data:data,
		method:'GET'
	})
}
// 发表评论（即打分评价）
export function toComment(data){
	return rq.request({
		url:'/comment',
		data:data,
		method:'POST',
		header: consts.JSON_HEADER
	})
}
/* 评论 end */

/* 订单填写 start */
// 创建订单 同时包含 支付处理操作
export function createOrder(data){
	return rq.request({
		url:'/order/createOrder',
		data:data,
		method:'POST',
		header: consts.JSON_HEADER
	})
}
// 获取视频的所有使用场景
export function videoAllPurpose(data){
	return rq.request({
		url:'/video/allPurpose',
		data:data,
		method:'GET'
	})
}
/* 订单填写 end */

/* 收藏 start */
// 添加收藏
export function collectionAdd(data){
	return rq.request({
		url:'/collection/add',
		data:data,
		method:'POST'
	})
}
// 取消收藏
export function collectionDelete(data){
	return rq.request({
		url:'/collection/delete',
		data:data,
		method:'DELETE'
	})
}
/* 收藏 end */

/* 视频 start */
// 根据明星ID获取可见视频分页列表
export function videoList(data){
	return rq.request({
		url:'/video',
		data:data,
		method:'GET'
	})
}
// 获取视频的所有使用场景
export function allPurposeVideo(data){
	return rq.request({
		url:'/video/allPurpose',
		data:data,
		method:'GET'
	})
}
/* 视频 end */