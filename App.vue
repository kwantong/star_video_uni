<script>
	import { mapMutations, mapState } from 'vuex';
	import { systemSetting } from './api/system.js'
	import { pcHome } from './api/domain.js'
	import consts from './utils/consts.js'
	export default {
		data () {
			return {
				globalData: {
				    userInfo: null,
				    navHeight: 0,
					pcRouteMap:{
						'pages/index/starDetails':'#/tenantDetail?tenantId='
					}
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		// 初始化完成时触发（全局只触发一次）
		onLaunch: function(options) {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			// #ifdef H5
			const pcRouteMap ={
				'pages/index/starDetails':'#/tenantDetail?tenantId='
			}
			if(!this.isMobile()){
				if(options.path === 'pages/index/starDetails'){
					window.location = pcHome+pcRouteMap[options.path]+options.query.id
				}else{
					window.location = pcHome
				}
			}
			// #endif
			// 获取手机系统信息
			this.getBarHeight();
			this.querySystemSetting(options);
		},
		// 启动，或从后台进入前台显示
		onShow: function() {
			console.log('App Show')
		},
		// 从前台进入后台
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['getBarHeight']),
			querySystemSetting(options){
				if(this.hasLogin){
					return
				}
				systemSetting().then(res=>{
					if(res.data.data.portalLoginRequired){
						if(options.path === 'pages/index/starDetails'){
							uni.setStorageSync(consts.REDIRECTOPTIONS,JSON.stringify(options))
						}
						uni.navigateTo({
							url:'/pages/public/login'
						})
					}
				})
			},
			isMobile() {
			  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
			  return flag ? 1 : 0
			}
		}
	}
</script>

<style >
	/*每个页面公共css */
	@import url('./common/uni-nvue.css');
	/* * {
	  font-family: Helvetica, Tahoma, Arial, STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑", SimSun, "宋体", Heiti, "黑体", sans-serif;
	} */
	page{
		background-color: #F8F8F8;
	}
	
	.line{
		height: 2rpx;
		width: 100%;
		background-color: #D8D8D8;
	}
</style>
