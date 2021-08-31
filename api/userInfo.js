import rq from '@/utils/request.js'

/** 获取用户信息 **/
export function getUserInfo(){
	return rq.request({
		url:'/sso/info',
		method:'GET'
	})
}

/** 修改用户信息 **/
export function updateMemberInfo(data) {
  return rq.request({
    url: '/sso/updateMemberInfo',
    method: 'post',
    data: data
  })
}
/** 修改邮箱 **/
export function updateEmail(data) {
  return rq.request({
    url: '/sso/updateEmail',
    method: 'post',
    data: data
  })
}
/** 修改手机号 **/
export function updatePhone(data) {
  return rq.request({
    url: '/sso/updatePhone',
    method: 'POST',
    data: data
  })
}

/** 获取当前用户的邀请码 **/
export function getInvitationCode(data) {
  return rq.request({
    url: '/invitation/get_invitation_code',
    method: 'GET',
    data: data
  })
}