<template>
	<view class="container">
		<h-navigation-bar title="修改邮箱" background-color="#FFFFFF" :show-back="true"></h-navigation-bar>
		<view class="line"></view>
		<view class="update-form">
			<view class="form-item">
				<view class="item-label">邮箱</view>
				<view class="item-value">{{updateForm.oldEmail || '--'}}</view>
			</view>
			<view class="form-item">
				<view class="item-label">新邮箱</view>
				<view class="item-value">
					<input class="item-input" type="text" v-model="updateForm.email" maxlength="32" placeholder="请填写新邮箱"/>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label input-label">
					<input class="item-input" type="text" v-model="updateForm.verificationCode" maxlength="6" placeholder="请填写验证码"/>
				</view>
				<view class="item-value">
					<view class="query-verification" :class="{on:!smsUpdateEmailButton.disabled}" @click="getVerificationCode">{{smsUpdateEmailButton.title}}</view>
				</view>
			</view>
			<view class="confirm-update" :class="{on:canUpdate}" @click="onUpdateEmail">修改邮箱</view>
		</view>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	import validatorUtils from '@/utils/validatorUtils.js'
	import { sendUpdateEmailCode } from '@/api/login.js'
	import { updateEmail } from '@/api/userInfo.js'
	export default {
		components:{
			hNavigationBar
		},
		data() {
			return {
				updateForm:{
					email: '',
					oldEmail: '',
					verificationCode: ''
				},
				smsUpdateEmailButton: {
					title: '获取验证码',
					disabled: false,
					count: 60
				},
				timer:''
			}
		},
		computed:{
			canUpdate(){
				return this.updateForm.verificationCode && this.updateForm.verificationCode.length===6 && validatorUtils.email(this.updateForm.email)
			}
		},
		onLoad:function(options){
			this.updateForm.oldEmail = options.email || ''
		},
		onUnload:function(){
			this.timer && clearInterval(this.timer)
		},
		methods: {
			getVerificationCode(){
				if(this.smsUpdateEmailButton.disabled){
					return
				}
				if(!this.updateForm.email){
					this.$api.msg('请输入邮箱')
					return
				}
				if(!validatorUtils.email(this.updateForm.email)){
					this.$api.msg('请输入正确邮箱')
					return
				}
				sendUpdateEmailCode({email:this.updateForm.email}).then(res=>{
					this.countDownForPhone(this.smsUpdateEmailButton)
				})
			},
			//计数
			countDownForPhone(buttonObject) {
				var that = this;
				let countNum = buttonObject.count;
				buttonObject.disabled = true;
				buttonObject.title = countNum + 's后重新获取';
				this.timer = setInterval(
					function() {
						countNum--
						buttonObject.title = countNum + 's后重新获取';
						if (countNum === 0) {
							clearInterval(that.timer);
							buttonObject.disabled = false;
							buttonObject.title = '重新发送';
						}
					}.bind(this),
					1000
				);
			},
			onUpdateEmail(){
				if(!this.canUpdate){
					return
				}
				updateEmail(this.updateForm).then(res=>{
					this.$api.msg('修改成功')
					uni.navigateBack()
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

.item-label{
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.input-label .item-input{
	text-align: left;
}

.query-verification{
	color: #DCDFE6;
}

.query-verification.on{
	color: #FF2E80;
}

.item-label.required::after{
	content: '*';
	color: #FF2E80;
}

.item-value{
	height: 100rpx;
	display: flex;
	align-items:center;
	/* color: #333333; */
}

.item-input{
	text-align: right;
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.confirm-update{
	margin: 50rpx 30rpx;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	border-radius: 50rpx;
	background-color: #FF2E80;
	color:#FFFFFF;
	opacity: 0.52;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
}
.confirm-update.on{
	opacity: 1;
}
</style>
