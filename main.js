import Vue from 'vue'
import App from './App'
import store from './store'
import { msg, getBottomSpace } from './utils/utils.js'

Vue.prototype.$bottomSpace = getBottomSpace()
Vue.prototype.$store = store
Vue.prototype.$api = { msg }
Vue.config.productionTip = false



App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
