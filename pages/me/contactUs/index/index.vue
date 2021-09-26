<template>
	<view>
		<h-navigation-bar :showBack="true" title="联系我们" background-color="#FFFFFF"></h-navigation-bar>
		<view class="line"></view>
		<view class="order-form">
			<view class="form-item">
				<view class="item-label required">标题</view>
				<view class="item-value">
					<input class="item-input" v-model="contractUsForm.title"  maxlength="200" placeholder="请填写标题"/>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label required">联系邮箱</view>
				<view class="item-value">
					<input class="item-input" v-model="contractUsForm.email"  maxlength="200" placeholder="请填写联系邮箱"/>
				</view>
			</view>
			<view class="form-item-textarea">
				<view class="item-label required" style="line-height: 100rpx;">详细内容</view>
				<view>
					<textarea class="item-textarea" v-model="contractUsForm.content" maxlength="200" placeholder="请填写详细内容"></textarea>
				</view>
			</view>
			<view :style="'height: '+(bootomSpace+100)+'rpx;'">
				<view class="submit-contactUs" @click="onFormSubmit()" style="margin-top: 10rpx;">
					提交
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import { addContactUs } from '@/api/contactUs.js'
	export default {
		components:{
			HNavigationBar
		},
		data() {
			return {
			  bootomSpace:this.$bottomSpace,
			  contractUsForm: {
				title: '',
				email: '',
				content: ''
			  },
			  rules: {
				title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
				email: [{ required: true, message: '请输入联系邮箱', trigger: 'blur' }, { type: 'email', message: '邮箱地址格式不正确', trigger: 'blur' }],
				content: [{ required: true, message: '请输入详细内容', trigger: 'blur' }]
			  }
			}
		},
		methods: {
			onFormSubmit() {
				if(!this.contractUsForm.title){
					this.$api.msg('请输入标题')
					return
				}
				var reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
				if(!this.contractUsForm.email){
					this.$api.msg('请填写联系邮箱')
					return
				} else if(!reg.test(this.contractUsForm.email)){
					this.$api.msg('邮箱格式不正确')
					return 
				}
				if(!this.contractUsForm.content){
					this.$api.msg('请输入详细内容')
					return
				}
				addContactUs(this.contractUsForm).then(res => {
					this.$api.msg("发送成功！")
					this.formReset()
				})
			},
			onFormReset(formName) {
			  this.$refs[formName].resetFields()
			},
			formReset() {
			  this.contractUsForm = {
				title: '',
				email: '',
				content: ''
			  }
			  this.$refs['emailForm'].clearValidate()
			}
		}
	}
</script>

<style>
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
.form-item-textarea{
	background-color: #FFFFFF;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f2f2f2;
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
.item-input{
	text-align: right;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #808080;
}
.form-item-textarea{
	background-color: #FFFFFF;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f2f2f2;
}
.item-textarea{
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #808080;
	text-align: left;
	width: 100%;
	height: 200rpx;
	margin-bottom: 10rpx;
}
.submit-contactUs{
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	font-size: 32rpx;
	text-align: center;
	color: #FFFFFF;
	background: #FF2E80;
	font-family: PingFangSC-Semibold;
	font-weight: 600;
}
</style>
