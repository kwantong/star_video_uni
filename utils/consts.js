// 'use strict'
/*!
 * consts.js v1.0.0
 * 常量列表js，主要是用来存一些常量，避免大家都各自在各个地方定义常量，便于统一管理<br>
 * 缓存的前缀和key需要注意，不能重复，所以，缓存的前缀，大家尽量按照模块名称来取，保证前缀不重复，例如登录的相关信息，前缀都用login
 * key也都在这里统一定义，这样就可以很明确的知道那些名字已经被占用了，已经存在了。
 * Author:
 * Date:
 * 使用方法：
 *        import consts from 'common/consts.js'
 *        consts.INSTANCE_ID
 */
/** **************缓存相关start*************************/

// access_token缓存
const ACCESSTOKEN = 'Authorization'
//是否登录
const HASLOGIN = 'has_login';
const BALANCE = 'user_balance'
const AVATAR = 'user_avatar'

const CONTENT_TYPE = 'Content-Type'
const CONTENT_TYPE_VALUE = 'application/json;charset=UTF-8'
const CONTENT_TYPE_FORM_VALUE = 'application/x-www-form-urlencoded;charset=utf-8'
const JSON_HEADER = { 'Content-Type': 'application/json' }
const REDIRECTOPTIONS = 'redirectOptions'

/** **************缓存相关end*************************/
export default {
	ACCESSTOKEN,
	HASLOGIN,
	BALANCE,
	AVATAR,
	CONTENT_TYPE,
	CONTENT_TYPE_VALUE,
	CONTENT_TYPE_FORM_VALUE,
	JSON_HEADER,
	REDIRECTOPTIONS
}
export {
	ACCESSTOKEN,
	HASLOGIN,
	BALANCE,
	AVATAR,
	CONTENT_TYPE,
	CONTENT_TYPE_VALUE,
	CONTENT_TYPE_FORM_VALUE,
	JSON_HEADER,
	REDIRECTOPTIONS
}
