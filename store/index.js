import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import consts from '@/utils/consts';
import { getUserInfo } from '@/api/userInfo.js'
const store = new Vuex.Store({
    state: {
		hasLogin: uni.getStorageSync(consts.HASLOGIN) || false,
		balance: uni.getStorageSync(consts.BALANCE) || 0,
		avatar: uni.getStorageSync(consts.AVATAR) || '',
		navHeight: 0
	},
    mutations: {
		SET_NAVHEIGHT: (state, navHeight) => {
			state.navHeight = navHeight
		},
		//登录
		login(state, tokenData) {
			uni.clearStorage();
			uni.setStorage({
				key: consts.ACCESSTOKEN,
				data: tokenData.tokenHead +''+ tokenData.token,
				success: function(res) {}
			});
			// let user = Base64.decode(token.split('.')[1]);
			// let provider = JSON.parse(user); //将获取的字符串转换成JSON对象
			let provider = {userName:'测试',phone:'18801171563'}
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({
				key: consts.USERINFO,
				data: provider,
				success: function(res) {}
			});
			uni.setStorage({
				key: consts.HASLOGIN,
				data: 'true',
				success: function(res) {}
			});
		},
		//退出
		logout(state) {
			console.log('晴空本地缓存')
			state.hasLogin = false;
			state.balance = 0;
			state.avatar = '';
			state.userInfo = {};
			uni.clearStorage();
		},
		updateCacheUserInfo(state){
			getUserInfo().then(res=>{
				  const { icon, memberCoin } = res.data.data
				  state.avatar = icon;
				  state.balance = memberCoin && memberCoin.coinBalance || 0
				  
				  uni.setStorage({
				  	key: consts.BALANCE,
				  	data: state.balance,
				  	success: function(res) {}
				  });
				  uni.setStorage({
				  	key: consts.AVATAR,
				  	data: state.avatar,
				  	success: function(res) {}
				  });
			})
		},
		//平台
		getBarHeight() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		}
	},
    actions: {
		setNavHeight: ({commit}, navHeight) => {
			commit("SET_NAVHEIGHT", navHeight)
		}
	}
})
export default store