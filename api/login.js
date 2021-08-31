import rq from '@/utils/request.js'
const jsonHeader = { 'Content-Type': 'application/json' }

/** 账户登录 **/
export function wxMiniProgramLogin(data){
	return rq.request({
		url:'/sso/wxMiniProgramLogin',
		data:data,
		method:'POST',
		header:jsonHeader
	})
}
/** 账户登录 **/
export function loginUser(data){
	return rq.request({
		url:'/sso/login',
		data:data,
		method:'POST'
	})
}
/** 手机验证码登录 **/
export function loginByPhone(data){
	return rq.request({
		url:'/sso/login_by_phone',
		data:data,
		method:'POST'
	})
}

// 注册 - 邮箱
export function registUserByEmail(data){
	return rq.request({
		url:'/sso/register_by_email',
		data:data,
		method:'POST',
		header:jsonHeader
	})
}
// 注册 - 手机
export function registUserByPhone(data){
	return rq.request({
		url:'/sso/register_by_phone',
		data:data,
		method:'POST',
		header:jsonHeader
	})
}
// 找回密码 - 手机
export function findPasswordByPhone(data){
	return rq.request({
		url:'/sso/findPasswordByPhone',
		data:data,
		method:'POST'
	})
}
// 找回密码 - 邮箱
export function findPasswordByEmail(data){
	return rq.request({
		url:'/sso/findPasswordByEmail',
		data:data,
		method:'POST'
	})
}

// 发送登录手机验证码
// 短信类型：1–>注册验证码，2–>登陆验证码，3–>找回密码验证码,4–>更换手机号(发送给新手机号)；,5–>第三方手机号注册(首次第三方登陆后填写注册信息时需要发送该验证码))
export function sendLoginPhoneCode(data){
	return rq.request({
		url:'/short_message/sendPhone',
		data:Object.assign(data,{type:2}),
		method:'GET'
	})
}
// 发送找回密码验证码
export function sendResetPwdPhoneCode(data){
	return rq.request({
		url:'/short_message/sendPhone',
		data:Object.assign(data,{type:3}),
		method:'GET'
	})
}
// 发送注册手机验证码
export function sendRegistPhoneCode(data){
	return rq.request({
		url:'/short_message/sendPhone',
		data:Object.assign(data,{type:1}),
		method:'GET'
	})
}
// 第三方手机号注册
export function sendRegistPhoneCode5(data){
	return rq.request({
		url:'/short_message/sendPhone',
		data:Object.assign(data,{type:5}),
		method:'GET'
	})
}
// 第三方手机号注册
export function sendUpdatePhoneCode(data){
	return rq.request({
		url:'/short_message/sendPhone',
		data:Object.assign(data,{type:4}),
		method:'GET'
	})
}

// 发送注册邮箱验证码
// 邮件类型。1–>注册验证码，2–>登陆验证码，3–>重置密码验证码,4–>更换邮箱(发送给新邮箱),5–>重置密码(重置链接)
export function sendRegistEmailCode(data){
	return rq.request({
		url:'/email/sendEmail',
		data:Object.assign(data,{type:1}),
		method:'GET'
	})
}
// 发送更换邮箱验证码
export function sendUpdateEmailCode(data){
	return rq.request({
		url:'/email/sendEmail',
		data:Object.assign(data,{type:4}),
		method:'GET'
	})
}
// 发送重置密码验证码
export function sendResetPwdEmailCode(data){
	return rq.request({
		url:'/email/sendEmail',
		data:Object.assign(data,{type:3}),
		method:'GET'
	})
}


// 获取所有国家码信息列表
export function getAllRegion(data){
	return rq.request({
		url:'/region/findAll',
		data:data,
		method:'GET'
	})
}



// 获取授权链接并跳转到第三方授权页面
export function getOauthData(data) {
  return rq.request({
    url: '/oauth/getOauthCallbackData',
    data:data,
    method: 'GET'
  })
}
// 使用第三方登录信息进行会员注册
export function oauthRegister(data) {
  return rq.request({
    url: '/oauth/register',
    data:data,
    method: 'POST',
	header:jsonHeader
  })
}