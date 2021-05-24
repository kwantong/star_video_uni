import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		navHeight: 0
	},
    mutations: {
		SET_NAVHEIGHT: (state, navHeight) => {
			state.navHeight = navHeight
		}
	},
    actions: {
		setNavHeight: ({commit}, navHeight) => {
			commit("SET_NAVHEIGHT", navHeight)
		}
	}
})
export default store