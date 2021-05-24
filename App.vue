<script>
	export default {
		data () {
			return {
				globalData: {
				    userInfo: null,
				    navHeight: 0
				}
			}
		},
		// 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			// 获取手机系统信息
			uni.getSystemInfo({
			  success: res => {
				console.log(res.statusBarHeight)
				this.$store.dispatch("setNavHeight", res.statusBarHeight + 46)
				//导航高度
				// this.globalData.navHeight = res.statusBarHeight + 46;
			  }, fail(err) {
				console.log(err);
			  }
			})
		},
		// 启动，或从后台进入前台显示
		onShow: function() {
			console.log('App Show')
		},
		// 从前台进入后台
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url('./common/uni-nvue.css');
</style>
