<template>
	<view class="container">
		<h-navigation-bar :show-back="true" title=""></h-navigation-bar>
		<image class="login-bg" src="/static/pages/login/login-bg.png"></image>
		<view class="login-box">
			<view class="login-title">找回密码</view>
			<view class="login-tabs">
				<view class="login-tab-item" @click="changeTab(index)" :class="{on:tabIndex===index}" v-for="(t,index) in tabList" :key="index">{{t.name}}</view>
			</view>
			
			<view class="login-form" v-if="tabIndex===0">
				<view class="input-item">
					<picker class="region-code-picker" @change="bindPickerLoginChange" :value="regionCodeIndex" :range="regionCodeList" range-key="countryName">
						<view class="region-code">+{{regionCodeList[regionCodeIndex] && regionCodeList[regionCodeIndex].countryCode}}</view>
					</picker>
					<input class="input-value" v-model="forgetForm.telephone" placeholder="请输入您的手机号" placeholder-class="placeholder-input"/>
				</view>
				<view class="input-item">
					<input class="input-value" maxlength="6" v-model="forgetForm.authCode" placeholder="请输入验证码" placeholder-class="placeholder-input"/>
					<view class="auth-code-button" :class="{on:!smsPhoneButton.disabled}" @click="getPhoneVerifyCode">{{smsPhoneButton.title}}</view>
				</view>
				<view class="input-item">
					<input class="input-value" password="true" maxlength="16" v-model="forgetForm.password" placeholder="请输入新密码" placeholder-class="placeholder-input"/>
				</view>
				<view class="input-item last">
					<input class="input-value" password="true" maxlength="16" v-model="forgetForm.againPassword" placeholder="请确定新密码" placeholder-class="placeholder-input"/>
				</view>
				<view class="action-form" :class="{on:validByPhone}" @click="resetPassword">找回密码</view>
			</view>
			<view class="login-form" v-if="tabIndex===1">
				<view class="input-item">
					<input class="input-value" v-model="forgetForm.email" placeholder="请输入您的邮箱" placeholder-class="placeholder-input"/>
				</view>
				<view class="input-item">
					<input class="input-value" maxlength="6" v-model="forgetForm.authCode" placeholder="请输入验证码" placeholder-class="placeholder-input"/>
					<view class="auth-code-button" :class="{on:!smsEmailButton.disabled}" @click="getEmailVerifyCode">{{smsEmailButton.title}}</view>
				</view>
				<view class="input-item">
					<input class="input-value" password="true" maxlength="16" v-model="forgetForm.password" placeholder="请输入新密码" placeholder-class="placeholder-input"/>
				</view>
				<view class="input-item last">
					<input class="input-value" password="true" maxlength="16" v-model="forgetForm.againPassword" placeholder="请确定新密码" placeholder-class="placeholder-input"/>
				</view>
				<view class="action-form" :class="{on:validByEmail}" @click="resetPassword">找回密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getAllRegion, sendResetPwdEmailCode, sendResetPwdPhoneCode, findPasswordByPhone,findPasswordByEmail } from '@/api/login.js'
	import validatorUtils from '@/utils/validatorUtils.js'
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	export default {
		components:{
			hNavigationBar
		},
		data() {
			return {
				tabIndex:0,
				tabList:[{name:'手机号找回'},{name:'邮箱找回'}],
				regionCodeIndex:40,
				regionCodeList:[],
				forgetForm:{
					authCode:'',
					password:'',
					againPassword:'',
					regionCode:'',
					telephone:'',
					email:''
				},
				smsPhoneButton: {
					show: false,
					title: '获取验证码',
					disabled: false,
					count: 60
				},
				smsEmailButton: {
					show: false,
					title: '获取验证码',
					disabled: false,
					count: 60
				},
				timer:''
			}
		},
		computed:{
			validByEmail:function(){
				return this.forgetForm.email && this.forgetForm.authCode && this.forgetForm.password && this.forgetForm.againPassword
			},
			validByPhone:function(){
				return this.forgetForm.telephone && this.forgetForm.authCode && this.forgetForm.password && this.forgetForm.againPassword
			}
		},
		onLoad:function(){
			this.queryAllRegion()	
		},
		onUnload:function(){
			this.timer && clearInterval(this.timer)
		},
		methods: {
			changeTab:function(index){
				this.tabIndex = index
				this.resetButtonObject(index===0?this.smsPhoneButton:this.smsEmailButton)
			},
			bindPickerLoginChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.regionCodeIndex = e.target.value
				this.forgetForm.regionCode = this.regionCodeList[this.regionCodeIndex].regionCode
			},
			queryAllRegion(){
				getAllRegion().then(res=>{
					this.regionCodeList = res.data.data || []
				})
			},
			// 发送验证码 - 忘记密码
			getPhoneVerifyCode() {
				if (!this.smsPhoneButton.disabled) {
					if (!this.forgetForm.telephone) {
						this.$api.msg('请输入正确手机号')
						return;
					}
					
					sendResetPwdPhoneCode({phone:this.forgetForm.telephone}).then(res=>{
						this.countDownForPhone(this.smsPhoneButton)
					})
				}
			},
			// 发送验证码 - 忘记密码
			getEmailVerifyCode() {
				if (!this.smsEmailButton.disabled) {
					if (!this.forgetForm.email) {
						this.$api.msg('请输入邮箱')
						return;
					}
					if (!validatorUtils.email(this.forgetForm.email)) {
						this.$api.msg('请输入正确的邮箱')
						return;
					}
					
					sendResetPwdEmailCode(this.forgetForm).then(res=>{
						this.countDownForPhone(this.smsEmailButton)
					})
				}
			},
			resetButtonObject(buttonObject){
				buttonObject.disabled = false
				buttonObject.title = '获取验证码'
				this.timer && clearInterval(this.timer)
			},
			//计数
			countDownForPhone(buttonObject) {
				var that = this;
				let smsCount = buttonObject.count;
				buttonObject.show = true;
				buttonObject.disabled = true;
				buttonObject.title = smsCount + 's后重新获取';
				this.timer = setInterval(
					function() {
						smsCount--
						buttonObject.title = smsCount + 's后重新获取';
						if (smsCount === 0) {
							clearInterval(that.timer);
							buttonObject.disabled = false;
							buttonObject.title = '重新发送';
						}
					}.bind(this),
					1000
				);
			},
			resetPassword(){
				if(this.tabIndex ===0){
					if(!this.forgetForm.telephone){
						this.$api.msg('请输入手机号')
						return
					}
				}else{
					if(!this.forgetForm.email){
						this.$api.msg('请输入邮箱')
						return
					}
					if (!validatorUtils.email(this.forgetForm.email)) {
						this.$api.msg('请输入正确的邮箱')
						return;
					}
				}
				if(!this.forgetForm.authCode){
					this.$api.msg('请输入验证码')
					return
				}
				if(this.forgetForm.authCode.length != 6 ){
					this.$api.msg('请输入正确的验证码')
					return
				}
				if(!this.forgetForm.password){
					this.$api.msg('请输入密码')
					return
				}
				if(!this.forgetForm.againPassword){
					this.$api.msg('请输入确认密码')
					return
				}
				if(this.forgetForm.againPassword != this.forgetForm.password){
					this.$api.msg('两次密码不一致')
					return
				}
				if(this.tabIndex ===0){
					findPasswordByPhone(this.forgetForm).then(res=>{
						this.$api.msg('密码修改成功')
						setTimeout(function(){
							uni.navigateBack()
						},200)
					})
				}else{
					findPasswordByEmail(this.forgetForm).then(res=>{
						this.$api.msg('密码修改成功')
						setTimeout(function(){
							uni.navigateBack()
						},200)
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
	padding: 60rpx 50rpx 0 50rpx;
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
	/* width: 100%; */
	flex: 1;
}

.auth-code-button{
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
}

.auth-code-button.on{
	color: #FF2E80;
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

</style>
