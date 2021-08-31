// 'use strict';
/*!
 * utils v1.0.0
 * 工具类,提供各种工具方法，会陆续添加
 *
 */
const msg = (title, duration=2000, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const getBottomSpace = () =>{
	var info = uni.getSystemInfoSync()
	return info.statusBarHeight == 44 ? 68 : 0
}


const getRedirectUrl = (redirect)=>{
	console.log('重定向信息-->',redirect)
	if(redirect){
		const options = JSON.parse(redirect)
		let query = ''
		for (let key in options.query){
			query = query + key +'=' + options.query[key] + '&'
		}
		return '/'+options.path+(query?('?'+query):'')
	}
	return ''
}

/**
 * 分开导出，用哪个取哪个，引用时需要大括号 ，eg:import {md5,uuid} from 'common/utils',md5('333')
 */
export {
	msg, getBottomSpace, getRedirectUrl
};

/**
 * 打包导出，会全部引入 ，eg:import utils from 'common/utils'，utils.md5('3333')
 */
export default {
	msg, getBottomSpace, getRedirectUrl
};