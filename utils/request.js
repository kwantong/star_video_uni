/************************  2.0 strat ****************************/
import Request from '@/js_sdk/luch-request/luch-request/index.js' // 下载的插件
const http = new Request();

import utils from '@/utils/utils.js'
import consts from '@/utils/consts.js'
import { domain } from '@/api/domain.js'
import store from '@/store/index.js'

const whiteCodes = [1005001,1005002,1004004]


http.setConfig((config) => { /* config 为默认全局配置*/
	config.baseURL = domain /* 根域名 */
	config.custom = {
		loading: false, // 默认没有loading  
	}
	return config
})

http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */

	if(!config.header[consts.CONTENT_TYPE]){
		config.header[consts.CONTENT_TYPE] = consts.CONTENT_TYPE_FORM_VALUE
	}

	config.header[consts.ACCESSTOKEN] = uni.getStorageSync(consts.ACCESSTOKEN) || ''

	// 演示custom 用处  
	if (config.custom.loading) {
		uni.showLoading()
	}
	return config
}, (config) => {
	return Promise.reject(config)
})

http.interceptors.response.use((response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	if(response.data.appid){
		return response
	}
	if(response.data.code === 401){
		store.commit('logout')
		uni.redirectTo({
			url:'/pages/public/login'
		})
		return Promise.reject(response)
	}
	if (!whiteCodes.includes(response.data.code) && response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()  
		utils.msg(response.data.message)
		return Promise.reject(response)
	}
	return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作  
	console.log('error->>>>>',response)
	if(response.data.code === 401){
		store.commit('logout')
		uni.redirectTo({
			url:'/pages/public/login'
		})
		return Promise.reject(response)
	}
	if (response.statusCode !== 200) { // 服务端返回的状态码不等于200，则reject()
		utils.msg(response.data.message)
	}
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	return Promise.reject(response)
})

export default http