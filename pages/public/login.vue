<template>
	<view class="container">
		<image class="login-bg" src="/static/pages/login/login-bg.png"></image>
		
		<view class="login-box">
			<view class="login-title">登录解锁精彩世界</view>
			<view class="login-tabs" v-if="!smsPhoneButton.show">
				<view class="login-tab-item" @click="changeTab(index)" :class="{on:tabIndex===index}" v-for="(t,index) in tabList" :key="index">{{t.name}}</view>
			</view>
			
			<!-- 登录 -->
			<block v-if="tabIndex===0">
				<!-- 账号登录 -->
				<view class="login-form" v-if="loginType === 2">
					<view class="input-item">
						<input class="input-value" maxlength="32" v-model="loginAccountForm.account" placeholder="请输入账号" placeholder-class="placeholder-input"/>
					</view>
					<view class="input-item last">
						<input class="input-value" password="true" maxlength="16" v-model="loginAccountForm.password" placeholder="请输入密码" placeholder-class="placeholder-input"/>
					</view>
					<view class="action-form on" @click="accountLogin">登录</view>
					<view class="sub-nav-box">
						<view class="sub-nav-item" @click="changeLoginType(1)">手机号登录</view>
						<view class="sub-nav-item" @click="forgetPassword">忘记密码</view>
					</view>
				</view>
				
				<!-- 验证码登录 -->
				<view class="login-form"  v-if="loginType === 1">
					<!-- 发送验证码 -->
					<block v-if="!smsPhoneButton.show">
						<view class="input-item">
							<picker class="region-code-picker" @change="bindPickerLoginChange" :value="regionCodeIndex" :range="regionCodeList" range-key="codeAndName">
								<view class="region-code">+{{regionCodeList[regionCodeIndex] && regionCodeList[regionCodeIndex].countryCode || ''}}</view>
							</picker>
							<input class="input-value" v-model="loginPhoneForm.phone" placeholder="请输入您的手机号" placeholder-class="placeholder-input"/>
						</view>
						<view class="action-form" :class="{on: loginPhoneForm.phone && loginPhoneForm.phone.length > 5 }" @click="getPhoneVerifyCode">获取验证码</view>
						<view class="sub-nav-box">
							<view class="sub-nav-item" @click="changeLoginType(2)">账号登录</view>
							<view class="sub-nav-item" @click="forgetPassword">忘记密码</view>
						</view>
					</block>
					<!-- 填写验证码-登录 -->
					<block v-else>
						<view class="send-tips">已发送验证码至{{loginPhoneForm.phone}}</view>
						<view class="input-item">
							<input class="input-value" maxlength="6" v-model="loginPhoneForm.verificationCode" placeholder="请输入验证码" placeholder-class="placeholder-input"/>
						</view>
						<view class="sub-nav-box send-tips-count">
							<view class="sub-nav-item" @click="getPhoneVerifyCode">{{smsPhoneButton.title}}</view>
						</view>
						<view class="action-form" @click="loginByPhoneVerifyCode" :class="{on:loginPhoneForm.verificationCode && loginPhoneForm.verificationCode.length === 6}">登录</view>
					</block>
				</view>
			</block>
			<!-- 注册 -->
			<block v-else>
				<block v-if="!smsRegistButton.show">
					<view class="login-form" v-if="registType === 1">
						<view class="input-item">
							<picker class="region-code-picker" @change="bindPickerRegistChange" :value="regionCodeRegistIndex" :range="regionCodeList" range-key="codeAndName">
								<view class="region-code">+{{regionCodeList[regionCodeRegistIndex] && regionCodeList[regionCodeRegistIndex].countryCode || ''}}</view>
							</picker>
							<input class="input-value" type="number" maxlength="32" v-model="registForm.phone" placeholder="请输入您的手机号" placeholder-class="placeholder-input"/>
						</view>
						<view class="action-form" :class="{on: registForm.phone && registForm.phone.length > 5 }" @click="getRegistVerifyCode">获取验证码</view>
						<view class="sub-nav-box">
							<view class="sub-nav-item" @click="changeRegistType(2)">邮箱注册</view>
						</view>
					</view>
					<view class="login-form" v-if="registType === 2">
						<view class="input-item">
							<input class="input-value" maxlength="32" v-model="registForm.email" placeholder="请输入邮箱" placeholder-class="placeholder-input"/>
						</view>
						<view class="action-form" :class="{on: registForm.email && registForm.email.length > 5 }" @click="getRegistVerifyCode">获取验证码</view>
						<view class="sub-nav-box">
							<view class="sub-nav-item" @click="changeRegistType(1)">手机号注册</view>
						</view>
					</view>
				</block>
				
				<block v-else>
					<view class="send-tips regist">已发送验证码至{{registType === 1 && registForm.phone || registForm.email}}</view>
					<view class="input-item">
						<input class="input-value" maxlength="6" v-model="registForm.captcha" placeholder="请输入验证码" placeholder-class="placeholder-input"/>
					</view>
					<view class="sub-nav-box send-tips-count regist">
						<view class="sub-nav-item" @click="getRegistVerifyCode">{{smsRegistButton.title}}</view>
					</view>
					<view class="action-form" @click="registSubmit" :class="{on:registForm.captcha && registForm.captcha.length === 6}">注册</view>
				</block>
				
			</block>
		</view>
		
		<view class="other-login">
			<view class="other-login-title">其他登录方式</view>
			<view class="other-login-list">
				<!-- #ifdef H5 -->
				<view class="login-item" @click="oauthLogin('qq')">
					<view class="login-item-border">
						<image class="login-icon-qq" src="../../static/pages/login/qq.png"></image>
					</view>
					<text>QQ</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="login-button"  @click="getUserProfile">
					<view class="login-item">
						<view class="login-item-border">
							<image class="login-icon-wx" src="../../static/pages/login/wechart.png"></image>
						</view>
						<text>微信</text>
					</view>
				</button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<!-- <view class="login-item" @click="oauthLogin('weibo')">
					<view class="login-item-border">
						<image class="login-icon-wb" src="../../static/pages/login/weibo.png"></image>
					</view>
					<text>微博</text>
				</view> -->
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<!-- <view class="login-item" @click="oauthLogin('alipay')">
					<view class="login-item-border">
						<image class="login-icon-alipay" src="../../static/pages/login/alipay.png"></image>
					</view>
					<text>支付宝</text>
				</view> -->
				<!-- #endif -->
			</view>
		</view>
		
		<view class="protocol-box" :style="'margin-bottom:'+bottomSpace+'rpx;'" v-if="!smsPhoneButton.show">
			<hk-check-box :checked="protocolValue" @eventClick="checkboxChange" style="transform:scale(0.8)"></hk-check-box>
			已阅读并同意
			<text @click="goPolicy">《隐私协议》</text>和
			<text @click="goTerms">《用户服务协议》</text>
		</view>
		
		<view class="dialog-getphone" v-if="dialogGetphoneVisible" @click.stop="dialogGetphoneVisible = false">
			<button class="getphone-button" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">手机号一键登录</button>
		</view>
		
	</view>
</template>

<script>
	import { loginUser, 
	sendLoginPhoneCode, 
	sendRegistPhoneCode, 
	sendRegistPhoneCode5, 
	loginByPhone, 
	sendRegistEmailCode,
	 wxMiniProgramLogin, 
	 getAllRegion,
	 getOauthData,
	 oauthRegister } from '@/api/login.js'
	import validatorUtils from '@/utils/validatorUtils.js'
	import HkCheckBox from '@/components/HkCheckBox/HkCheckBox.vue'
	import { mapMutations } from 'vuex'
	import { domain } from '@/api/domain.js'
	import { getRedirectUrl } from '../../utils/utils.js'
	import consts from '../../utils/consts.js'
	export default {
		components:{
			HkCheckBox
		},
		data() {
			return {
				bottomSpace:this.$bottomSpace,
				tabList:[{name:'登录'},{name:'注册'}],
				tabIndex:0,
				protocolValue:false,
				//  1: 手机号登录；2:账号登录；
				loginType:1,
				//  1: 手机号注册；2:邮箱注册
				registType:1,
				loginPhoneForm:{
					phone:'',
					verificationCode:'',
					regionCode:'86',
					oauthCallbackKey:''
				},
				regionCodeIndex:40,
				regionCodeRegistIndex:40,
				regionCodeList:[],
				loginAccountForm:{
					account:'',
					password:''
				},
				registForm:{
					phone:'',
					email:'',
					captcha:'',
					regionCode:'86'
				},
				smsPhoneCount:0,
				smsPhoneButton: {
					show: false,
					title: '重新发送',
					disabled: false,
					count: 60
				},
				smsRegistButton: {
					show: false,
					title: '重新发送',
					disabled: false,
					count: 60
				},
				timer:'',
				dialogGetphoneVisible:false,
				miniLoginData:{
					code: '',
					errMsg: '',
					iv: '',
					encryptedData: '',
					phoneEncryptedData: '',
					phoneIv: '',
				},
				oauthCallbackKey: '',
				invitationCode: '',
				randomKey: '',
				redirectUrlOptions:'',
				wxCode:''
			}
		},
		onLoad:function(option){
			console.log('option--》',option)
			this.oauthCallbackKey = option && option.oauthCallbackKey || ''
			this.invitationCode = option && option.invitationCode || ''
			this.redirectUrlOptions = uni.getStorageSync(consts.REDIRECTOPTIONS)
			this.queryOauthData()
			this.queryAllRegion()
		},
		onShow:function(){
			//#ifdef MP
			const that = this
			wx.login({
				success(res) {
					if (res.code) {
						// 发起网络请求
						that.wxCode  = res.code
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			})
			//#endif
		},
		onUnload:function(){
			if(this.timer){
				clearInterval(this.timer);
			}
		},
		methods: {
			...mapMutations(['login','updateCacheUserInfo']),
			changeTab:function(index){
				this.tabIndex = index
			},
			checkboxChange:function(){
				this.protocolValue = !this.protocolValue
			},
			queryOauthData(){
				if(!this.oauthCallbackKey){
					return
				}
				getOauthData({oauthCallbackKey:this.oauthCallbackKey}).then(res=>{
					if (res.data.code === 200) {
					  this.loginCallBack(res)
					} else if (res.data.code === 1004004) {
					  this.randomKey = res.data.randomKey || ''
					  this.tabIndex = 1
					  // 需要第三方注册
					  this.$api.msg('请绑定账号')
					}
				})
			},
			loginCallBack(res) {
			  this.login(res.data.data)
			  this.loginSuccssCallBack()
			  // uni.switchTab({
			  // 	url:'/pages/index/index'
			  // })
			},
			changeLoginType(type){
				this.loginType = type
				if(type !== 2){
					// 清空账号登录
					this.loginAccountForm.account = ''
					this.loginAccountForm.password = ''
				}
				if(type !== 1){
					// 清空验证码登录
					this.smsPhoneButton.show = false
					this.smsPhoneButton.title = '重新发送'
				}
			},
			changeRegistType(type){
				this.registType = type
			},
			bindPickerLoginChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.regionCodeIndex = e.target.value
				this.loginPhoneForm.regionCode = this.regionCodeList[this.regionCodeIndex].countryCode
			},
			bindPickerRegistChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.regionCodeRegistIndex = e.target.value
				this.registForm.regionCode = this.regionCodeList[this.regionCodeRegistIndex].countryCode
			},
			queryAllRegion(){
				getAllRegion().then(res=>{
					this.regionCodeList = res.data.data || []
					this.regionCodeList.forEach(item=>{
						item['codeAndName'] = '+'+ item.countryCode +' '+ item.countryName
					})
				})
			},
			loginSuccssCallBack(){
				this.updateCacheUserInfo()
				const redirect = getRedirectUrl(this.redirectUrlOptions)
				if(redirect){
					uni.reLaunch({
						url:redirect
					})
				}else{
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
			},
			accountLogin(){
				if(!this.loginAccountForm.account){
					this.$api.msg('请输入账号')
					return;
				}
				if(!this.loginAccountForm.password){
					this.$api.msg('请输入密码')
					return;
				}
				if(!this.protocolValue){
					this.$api.msg('请勾选阅读协议')
					return;
				}
				loginUser({password:this.loginAccountForm.password,username:this.loginAccountForm.account,oauthCallbackKey:this.oauthCallbackKey}).then(res=>{
					this.login(res.data.data)
					this.loginSuccssCallBack()
					// uni.switchTab({
					// 	url:'/pages/index/index'
					// })
				}).catch((err)=>{
					console.log('err->',err)
				})
			},
			//发送验证码 - 登录
			getPhoneVerifyCode() {
				if (!this.smsPhoneButton.disabled) {
					if (!this.loginPhoneForm.phone) {
						this.$api.msg('请输入正确手机号')
						return;
					}
					//TODO  调用后台发送短信接口
					sendLoginPhoneCode(this.loginPhoneForm).then(res =>{
						this.$api.msg('短信已经发送至您的手机')
						this.countDownForPhone(this.smsPhoneButton);
					}).catch(()=>{
						
					})
				}
			},
			// 短信验证码登录
			loginByPhoneVerifyCode(){
				if (!this.loginPhoneForm.phone) {
					this.$api.msg('请输入正确手机号')
					return;
				}
				if (!this.loginPhoneForm.verificationCode) {
					this.$api.msg('请输入验证码')
					return;
				}
				this.loginAccountForm.oauthCallbackKey = this.oauthCallbackKey
				loginByPhone(this.loginPhoneForm).then(res=>{
					this.login(res.data.data)
					// uni.navigateBack()
					this.loginSuccssCallBack()
					// uni.switchTab({
					// 	url:'/pages/index/index'
					// })
				})
			},
			// 注册
			registSubmit(){
				if(!this.registForm.captcha || this.registForm.captcha.length !== 6){
					return
				}
				if (this.registType ===1 && !this.registForm.phone) {
					this.$api.msg('请输入正确手机号')
					return;
				} else if(this.registType ===2 && (!this.registForm.email || !validatorUtils.email(this.registForm.email))){
					this.$api.msg('请输入正确邮箱')
					return;
				}
				uni.navigateTo({
					url:'./regist-info?data='+JSON.stringify(Object.assign(this.registForm,{registType:this.registType,randomKey:this.randomKey,oauthCallbackKey:this.oauthCallbackKey,invitationCode:this.invitationCode}))
				})
			},
			//发送验证码 - 注册
			getRegistVerifyCode() {
				if (!this.smsRegistButton.disabled) {
					if (this.registType ===1 && !this.registForm.phone) {
						this.$api.msg('请输入正确手机号')
						return;
					} else if(this.registType ===2 && (!this.registForm.email || !validatorUtils.email(this.registForm.email))){
						this.$api.msg('请输入正确邮箱')
						return;
					}
					
					if(this.registType === 1){
						const fn =  this.randomKey?sendRegistPhoneCode5:sendRegistPhoneCode
						fn(this.registForm).then(res=>{
							this.countDownForPhone(this.smsRegistButton)
						})
					}
					
					if(this.registType === 2){
						sendRegistEmailCode(this.registForm).then(res=>{
							this.countDownForPhone(this.smsRegistButton)
						})
					}
				}
			},
			//计数
			countDownForPhone(buttonObject) {
				var that = this;
				that.smsPhoneCount = buttonObject.count;
				buttonObject.show = true;
				buttonObject.disabled = true;
				buttonObject.title = that.smsPhoneCount + 's后重新获取';
				this.timer = setInterval(
					function() {
						that.smsPhoneCount--
						buttonObject.title = that.smsPhoneCount + 's后重新获取';
						if (that.smsPhoneCount === 0) {
							clearInterval(that.timer);
							buttonObject.disabled = false;
							buttonObject.title = '重新发送';
						}
					}.bind(this),
					1000
				);
			},
			goPolicy(){
				uni.navigateTo({
					url:'./webview?hrefUrl=https://hongjiaoben.com/policy/policy.html&title=隐私协议'
				})
			},
			goTerms(){
				uni.navigateTo({
					url:'./webview?hrefUrl=https://hongjiaoben.com/policy/terms.html&title=用户服务协议'
				})
			},
			forgetPassword(){
				uni.navigateTo({
					url:'./forgetPassword'
				})
			},
			getUserProfile(){
				const that = this
				 wx.getUserProfile({
				  desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				  success: (res) => {
					that.miniLoginData.iv = res.iv
					that.miniLoginData.encryptedData = res.encryptedData
					that.dialogGetphoneVisible = true
				  }
				})
			},
			getUserInfo(e){
				const that = this
				this.miniLoginData.iv = e.detail.iv
				this.miniLoginData.encryptedData = e.detail.encryptedData
				this.dialogGetphoneVisible = true
			},
			decryptPhoneNumber(e){
				const that = this
				// 发起网络请求
				that.miniLoginData.code  = that.wxCode
				that.miniLoginData.phoneIv  = e.detail.iv
				that.miniLoginData.phoneEncryptedData  = e.detail.encryptedData
				wxMiniProgramLogin(that.miniLoginData).then(res => {
					console.log('res=>',res)
					if(!res.data.data.token){
						that.$api.msg('请绑定账号')
					}else{
						that.login(res.data.data)
						that.loginSuccssCallBack()
					}
				})
			},
			// 第三方登录
			oauthLogin(source) {
				if(source!=='alipay'){
					window.location = domain + 'oauth/render/' + source+'?isMobile=true'
				}else{
					uni.request({
						url: domain + 'oauth/render/' + source,
						data:{'isMobile':true},
						success:function(res){
							console.log('支付宝第三方登录->',res)
							if(res.data){
								window.location = res.data
							}
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
page{
	background-color: unset;
	width: 100%;
}
.container{
	position: relative;
	height: calc(100vh);
}

.login-bg{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: calc(100vh);
	width: 750upx;
	z-index: -1;
}

.login-box{
	padding: 214rpx 50rpx 0 50rpx;
}

.login-title{
	font-size: 56rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 78rpx;
	margin-bottom: 34rpx;
}

.login-tabs{
	display: flex;
	height: 50px;
	line-height: 50px;
}

.login-tab-item{
	width: 50%;
	font-size: 36rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #D8D8D8;
	text-align: center;
	position: relative;
}

.login-tab-item.on{
	font-weight: 600;
	color: #FFFFFF;
}

.login-tab-item.on::after{
	position: absolute;
	content: '';
	bottom: 10rpx;
	left: 0;
	right: 0;
	width: 72rpx;
	height: 6rpx;
	border-radius:3rpx;
	background-color: #FFFFFF;
	margin: 0 auto;
}


.login-form{
	padding: 60rpx 0;
}

.input-item{
	height: 100rpx;
	line-height: 100rpx;
	background-color: rgba(255,255,255,0.31);
	border-radius: 50rpx;
	display: flex;
	align-items: center;
	padding: 0 57rpx;
	margin-bottom: 32rpx;
}

.input-item.last{
	margin-bottom: 42rpx;
}

.input-value{
	height: 45rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 45rpx;
	width: 100%;
}

.placeholder-input{
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #D8D8D8;
}

.action-form{
	height: 100rpx;
	line-height: 100rpx;
	background-color: #FF2E80;
	border-radius: 50rpx;
	opacity: 0.52;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	text-align: center;
	
	margin-bottom: 28rpx;
}

.action-form.on{
	opacity: 1;
}

.region-code-picker{
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	padding-right: 30rpx;
	margin-left: -20rpx;
}

.sub-nav-box{
	display: flex;
	justify-content: space-between;
	padding: 0 16rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
}

.send-tips{
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	margin-bottom: 45rpx;
	padding-left: 10rpx;
}
.send-tips.regist{
	padding-top: 36rpx;
}

.send-tips-count{
	padding-top: 34rpx;
	margin-bottom: 49rpx;
}
.send-tips-count.regist{
	padding-top: 24rpx;
	margin-bottom: 61rpx;
}

.protocol-box{
	position: absolute;
	bottom:32rpx;
	left: 0;
	right: 0;
	margin: 0 auto;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}


/** 其他登录 start **/
.other-login{
	/* padding-top: 20rpx; */
}
.other-login-title{
	text-align: center;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	margin-bottom: 51rpx;
}
.other-login-list{
	display: flex;
	justify-content: space-around;
}
.login-item{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
}
.login-item-border{
	width: 72rpx;
	height: 72rpx;
	border-radius:36rpx;
	background-color: rgba(0, 0, 0, 0.1);
	border: 1px solid #FFFFFF;
	display: flex;
	align-items:center;
	justify-content:center;
	margin-bottom: 20rpx;
}
.login-icon-qq{
	width: 36rpx;
	height: 40rpx;
}
.login-icon-wx{
	width: 48rpx;
	height: 40rpx;
}
.login-icon-wb{
	width: 48rpx;
	height: 41rpx;
}
.login-icon-alipay{
	width: 60rpx;
	height: 60rpx;
}
.login-icon{
	width: 72rpx;
	height: 72rpx;
}

.login-button{
	border: unset;
	background-color: unset;
	box-shadow: unset;
	/* position: relative; */
	
	border: none;
	border-radius: 0;
	padding: 0;
	margin: 0;
}

.login-button::after{
	  border: none;
	  border-radius: 0;
}


.dialog-getphone{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.8);
	z-index: 99;
	margin: 0 auto;
	display: flex;
	align-items: center;
}
.getphone-button{
	z-index: 100;
	margin: 0 30rpx;
	width: 100%;
	background-color: #FF2E80;
	color: #FFFFFF;
}
</style>
