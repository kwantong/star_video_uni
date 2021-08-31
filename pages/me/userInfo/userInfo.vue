<template>
	<view class="container">
		<h-navigation-bar :show-back="true" title="个人信息" background-color="#FFFFFF"></h-navigation-bar>
		<view class="line"></view>
		<view class="userinfo-form">
			<view class="form-item">
				<view class="item-label">头像</view>
				<view class="item-value" @click="handleUploadImage">
					<image class="user-head" v-if="userInfo.icon" :src="userInfo.icon"></image>
					<view class="head-default" v-else>
						<image class="head-default-icon" src="/static/pages/me/upload.png"></image>
					</view>
					<image class="next-icon" src="/static/pages/me/next-head.png"></image>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label">昵称</view>
				<view class="item-value">
					<input class="item-input" type="text" @confirm="confirmUpdate" confirm-type="保存" v-model="userInfo.nickname" maxlength="10" placeholder="请填写昵称"/>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label">邮箱</view>
				<view class="item-value" @click="goUpdateEmail">{{userInfo.email || '--'}}</view>
			</view>
			<view class="form-item">
				<view class="item-label">手机号</view>
				<view class="item-value" @click="goUpdatePhone">{{userInfo.phone || '--'}}</view>
			</view>
			<view class="form-item">
				<view class="item-label">性别</view>
				<view class="item-value">
					<view class="check-item">
						<hk-check-box ref="checkbox1" :type="1" :checked="userInfo.gender == '1'" @eventClick="changeSex"></hk-check-box>
						<text @click="changeSex('1')">男</text>
					</view>
					<hk-check-box ref="checkbox2" :type="2" :checked="userInfo.gender == '2'" @eventClick="changeSex"></hk-check-box>
					<text @click="changeSex('2')">女</text>
				</view>
			</view>
		</view>
		
		<view class="upload-dialogue" v-if="uploadDialogueVisible">
			<view class="upload-content">
				<view class="title-content">
					<text class="title">上传头像</text>
					<image @click="colseUpload" class="close" src="/static/pages/me/upload.png"></image>
				</view>
				<cropper @uploadLoadCallBack="uploadLoadCallBack" :vm="this"></cropper>
			</view>
		</view>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import Cropper from '@/components/Cropper/cropper.vue'
	import HkCheckBox from '@/components/HkCheckBox/HkCheckBox.vue'
	import { getUserInfo, updateMemberInfo } from '@/api/userInfo.js'
	import { uploadImg, getUploadPolicy } from '@/api/storage.js'
	let _that =  this
	export default {
		components:{
			HNavigationBar,HkCheckBox,Cropper
		},
		data() {
			return {
				userInfo:{
					nickname: '',
					gender: 1,
					email: '',
					phone: '',
					regionCode: '',
					iconObjectName: '',
					icon: '',
					invitationCode: ''
				},
				uploadOption:{},
				uploadDialogueVisible:false
			}
		},
		onLoad:function(){
			
		},
		onShow:function(){
			this.queryUserInfo()
			this.queryUploadOption()
		},
		computed: {
		},
		methods: {
			changeSex(gender){
				this.userInfo.gender = gender
				this.confirmUpdate()
			},
			confirmUpdate(){
				if (!this.userInfo.iconObjectName) {
					this.$api.msg('请上传头像')
					return
				}
				if (!this.userInfo.nickname) {
					this.$api.msg('请填写昵称')
					return
				}
				if (!this.userInfo?.gender) {
					this.$api.msg('请选择性别')
					return
				}
				updateMemberInfo(this.userInfo).then(res=>{
					this.$api.msg('修改成功')
				})
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
			queryUserInfo () {
				getUserInfo().then(res=>{
					const data = res.data.data || {}
					this.userInfo.regionCode = data.regionCode
					this.userInfo.phone = data.phone
					this.userInfo.gender = data.gender
					this.userInfo.email = data.email
					this.userInfo.iconObjectName = data.iconObjectName
					this.userInfo.icon = data.icon
					this.userInfo.nickname = data.nickname
				})
			},
			handleUploadImage: function() {
				this.uploadDialogueVisible = true
			},
			uploadLoadCallBack(resTempPath){
				const that = this
				console.log('resTempPath-->',resTempPath)
				console.log('that.uploadOption>',that.uploadOption)
				uploadImg(resTempPath,that.uploadOption,function(res2){
					console.log('res2-->',res2)
					that.userInfo.iconObjectName = res2.data.objectName
					that.userInfo.icon = res2.data.url
					that.confirmUpdate()
					that.uploadDialogueVisible = false
				})
			},
			colseUpload(){
				this.uploadDialogueVisible = false
			},
			goUpdateEmail(){
				uni.navigateTo({
					url:'./updateEmail?email='+this.userInfo.email
				})
			},
			goUpdatePhone(){
				uni.navigateTo({
					url:'./updatePhone?phone='+this.userInfo.phone+'&regionCode='+this.userInfo.regionCode
				})
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
	width: 70rpx;
	height: 70rpx;
	line-height: 70rpx;
	background-color: #E4E4E4;
	font-weight: 500;
	border-radius:50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.head-default-icon{
	height: 30rpx;
	width: 30rpx;
}

.next-icon{
	width: 17rpx;
	height: 17rpx;
	margin-left: 20rpx;
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
