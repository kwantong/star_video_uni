<template>
	<view class="container">
		<h-navigation-bar title="填写个人信息" :showBack="true" background-color="#FFFFFF"></h-navigation-bar>
		<view class="line"></view>
		
		<view class="regist-form">
			<view class="form-item head-form">
				<view class="item-label">头像</view>
				<view class="item-value" @click="handleUploadImage">
					<image class="user-head" v-if="userInfo.icon" :src="userInfo.icon"></image>
					<view class="head-default" v-else>
						<image class="head-default-icon" src="../../static/pages/me/upload.png"></image>
					</view>
					<image class="next-icon" src="../../static/pages/me/next-head.png"></image>
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label required">昵称</view>
				<view class="item-value">
					<input class="item-input" v-model="userInfo.username" maxlength="10" placeholder="请填写昵称"/>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label">邮箱</view>
				<view class="item-value">
					<input class="item-input" :disabled="registType===2" v-model="userInfo.email"  maxlength="20" placeholder="请填写邮箱"/>
				</view>
			</view>
			<!-- <view class="form-item">
				<view class="item-label required">手机号</view>
				<view class="item-value">
					<input class="item-input" v-model="userInfo.phone" maxlength="11" placeholder="请填写手机号"/>
				</view>
			</view> -->
			<view class="form-item">
				<view class="item-label required">性别</view>
				<view class="item-value">
					<view class="check-item">
						<hk-check-box ref="checkbox1" :type="1" :checked="userInfo.gender == '1'" @eventClick="changeSex"></hk-check-box>
						<text @click="changeSex('1')">男</text>
					</view>
					<hk-check-box ref="checkbox1" :type="2" :checked="userInfo.gender == '2'" @eventClick="changeSex"></hk-check-box>
					<text @click="changeSex('2')">女</text>
				</view>
			</view>
			<!-- 邮箱注册 -->
			<view class="form-item" v-if="registType === 2">
				<view class="item-label required">密码</view>
				<view class="item-value">
					<input class="item-input" password="true" v-model="userInfo.password" maxlength="16" placeholder="请填写密码"/>
				</view>
			</view>
			<!-- 邮箱注册 -->
			<view class="form-item" v-if="registType === 2">
				<view class="item-label required">确定密码</view>
				<view class="item-value">
					<input class="item-input" password="true" v-model="userInfo.confirmPassword" placeholder="再次填写密码"/>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label" :class="{ required : invitationCodeType }">邀请码</view>
				<view class="item-value">
					<input class="item-input" v-model="userInfo.invitationCode" placeholder="请输入邀请码"/>
				</view>
			</view>
			
			<view class="regist-btn" @click="saveRegistInfo">
				提交注册
			</view>
		</view>
		
		
		<view class="upload-dialogue" v-if="uploadDialogueVisible">
			<view class="upload-content">
				<view class="title-content">
					<text class="title">上传头像</text>
					<image @click="colseUpload" class="close" src="/static/pages/me/upload.png"></image>
				</view>
				<cropper @uploadLoadCallBack="uploadLoadCallBack"></cropper>
			</view>
		</view>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import Cropper from '@/components/Cropper/cropper.vue'
	import HkCheckBox from '@/components/HkCheckBox/HkCheckBox.vue'
	import { uploadImg, getUploadPolicy } from '@/api/storage.js'
	import { registUserByEmail, registUserByPhone, oauthRegister, getOauthData } from '@/api/login.js'
	import { systemSetting } from '../../api/system.js'
	import { mapMutations } from 'vuex'
	export default {
		components:{
			HNavigationBar,HkCheckBox,Cropper
		},
		data() {
			return {
				userInfo:{
					captcha:'',
					regionCode:'',
					email:'',
					gender:1,
					iconObjectName:'',
					icon:'',
					invitationCode:'',
					phone:'',
					username:'',
					password:'',
					confirmPassword:'',
					randomKey:''
				},
				invitationCodeType:false,
				registType:'',
				oauthCallbackKey:'',
				oauthCallbackUser:{},
				uploadOption:{
					host: '',
					key: '',
					policy: '',
					OSSAccessKeyId: '',
					callback: '',
					signature: '',
					success_action_status: 200
				},
				uploadDialogueVisible:false
			}
		},
		onLoad:function(options){
			const params = options.data && JSON.parse(options.data) || {}
			
			this.registType = params.registType && params.registType*1 || 1
			this.userInfo.captcha = params.captcha || ''
			this.userInfo.regionCode = params.regionCode || ''
			this.userInfo.email = params.email || ''
			this.userInfo.phone = params.phone || ''
			this.userInfo.randomKey = params.randomKey || ''
			this.userInfo.invitationCode = params.invitationCode || ''
			this.oauthCallbackKey = params.oauthCallbackKey || ''
			this.queryUploadOption()
		},
		onShow:function(){
			this.querySystemset()
			this.queryAuthData()
		},
		methods: {
			...mapMutations(['login']),
			changeSex(gender){
				this.userInfo.gender = gender
			},
			queryUploadOption(){
				getUploadPolicy().then(res=>{
					const uploadPolicy = res.data.data || {}
					this.uploadOption.host = uploadPolicy.host
					this.uploadOption.key = uploadPolicy.dir
					this.uploadOption.policy = uploadPolicy.policy
					this.uploadOption.OSSAccessKeyId = uploadPolicy.accessKeyId
					this.uploadOption.callback = uploadPolicy.callback
					this.uploadOption.signature = uploadPolicy.signature
				})
			},
			queryAuthData(){
				if(!this.oauthCallbackKey){
					return
				}
				getOauthData({oauthCallbackKey:this.oauthCallbackKey}).then(res=>{
					if (res.data.code === 200) {
						
					} else if (res.data.code === 1004004) {
					  this.oauthCallbackUser = res.data.data.authUser || {}
					  
					  this.userInfo.icon = this.oauthCallbackUser.iconUrl || ''
					  // this.userInfo.iconObjectName = this.oauthCallbackUser.iconUrl || ''
					  this.userInfo.gender = this.oauthCallbackUser.gender || 1
					  this.userInfo.username = this.oauthCallbackUser.username || ''
					}
				})
			},
			querySystemset(){
				systemSetting().then(res=>{
					this.invitationCodeType = res.data.data.portalInvitationCodeRequired
				})
			},
			saveRegistInfo(){
				// if(!this.userInfo.iconObjectName){
				// 	this.$api.msg('请上传头像')
				// 	return
				// }
				if(!this.userInfo.username){
					this.$api.msg('请填写昵称')
					return
				}
				// if(!this.userInfo.email){
				// 	this.$api.msg('请填写邮箱')
				// 	return
				// }
				if(this.registType === 1 && !this.userInfo.phone){
					this.$api.msg('请填写手机号')
					return
				}
				if(this.registType === 2){
					if(!this.userInfo.password){
						this.$api.msg('请填写密码')
						return
					}
					if(this.userInfo.password !== this.userInfo.confirmPassword){
						this.$api.msg('两次密码不一致')
						return
					}
				}
				if(this.invitationCodeType && !this.userInfo.invitationCode){
					this.$api.msg('请填写邀请码')
					return
				}
				
				//调用后台接口
				if(this.registType ===1){
					const  regFn = this.userInfo.randomKey ? oauthRegister : registUserByPhone
					regFn(this.userInfo).then(res=>{
						if(this.userInfo.randomKey){
							this.login(res.data.data)
							uni.switchTab({
								url:'/pages/index/index'
							})
						}else{
							uni.redirectTo({
								url:'/pages/public/regist-success'
							})
						}
					})
				}else{
					registUserByEmail(this.userInfo).then(res=>{
						uni.redirectTo({
							url:'/pages/public/regist-success'
						})
					})
				}
			},
			handleUploadImage: function() {
				this.uploadDialogueVisible = true
			},
			uploadLoadCallBack(resTempPath){
				const that = this
				uploadImg(resTempPath,that.uploadOption,function(res2){
					that.userInfo.iconObjectName = res2.data.objectName
					that.userInfo.icon = res2.data.url
					that.uploadDialogueVisible = false
				})
			},
			colseUpload(){
				this.uploadDialogueVisible = false
			}
		}
	}
</script>

<style scoped>

.form-item{
	height: 100rpx;
	line-height: 100rpx;
	background-color: #FFFFFF;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f2f2f2;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.head-form{
	height: 154rpx;
	background-color: #FFFFFF;
	box-shadow: 0px -1rpx 0px 0px #F0F0F0;
	margin-bottom: 12rpx;
}

.item-label{
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}

.item-label.required::after{
	content: '*';
	color: #FF2E80;
}

.item-value{
	height: 100rpx;
	display: flex;
	align-items:center;
}
.item-value >>> .uni-checkbox-input-checked{
	background-color: #FF2E80;
	border-color: #FF2E80;
}
.check-item{
	margin-right: 20rpx;
	display: flex;
	align-items: center;
}

.item-input{
	text-align: right;
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}


.head-default, .user-head{
	width: 107rpx;
	height: 107rpx;
	line-height: 107rpx;
	background-color: #E4E4E4;
	font-weight: 500;
	border-radius:50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.head-default-icon{
	height: 60rpx;
	width: 60rpx;
}

.next-icon{
	width: 38rpx;
	height: 38rpx;
	color:#FF2E80 ;
}

.regist-btn{
	margin: 43rpx 50rpx;
	height: 100rpx;
	line-height: 100rpx;
	background-color: #FF2E80;
	border-radius: 50rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	text-align: center;
}





.upload-dialogue{
	position: absolute;
	top: 0rpx;
	right: 0;
	left: 0;
	height: calc(100vh);
	background-color: rgba(0,0,0,0.5);
	padding-top: 100rpx;
	display: flex;
	align-items: center;
}

.upload-content{
	width: 100%;
	margin: 30rpx auto;
	background-color: #FFFFFF;
	border-radius: 10rpx;
}

.title-content{
	text-align: center;
	padding: 20rpx;
	position: relative;
}
.close{
	position:absolute;
	top: 10rpx;
	right: 20rpx;
	transform: rotate(45deg);
	width: 50rpx;
	height: 50rpx;
}

</style>
