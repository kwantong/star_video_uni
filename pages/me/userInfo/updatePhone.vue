<template>
	<view class="container">
		<h-navigation-bar title="修改手机号" background-color="#FFFFFF" :show-back="true"></h-navigation-bar>
		<view class="line"></view>
		<view class="update-form">
			<view class="form-item">
				<view class="item-label">原手机号</view>
				<view class="item-value">{{updateForm.oldPhone || '--'}}</view>
			</view>
			<view class="form-item">
				<view class="item-label">区号</view>
				<view class="item-value">
					<picker class="region-code-picker" @change="bindPickerLoginChange" :value="regionCodeIndex" :range="regionCodeList" range-key="codeAndName">
						<view class="region-code">+{{regionCodeList[regionCodeIndex] && regionCodeList[regionCodeIndex].countryCode}} {{regionCodeList[regionCodeIndex] && regionCodeList[regionCodeIndex].countryName}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label">新手机号</view>
				<view class="item-value">
					<input class="item-input" type="text" v-model="updateForm.phone" maxlength="32" placeholder="请填写新手机号"/>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label input-label">
					<input class="item-input" type="text" v-model="updateForm.verificationCode" maxlength="6" placeholder="请填写验证码"/>
				</view>
				<view class="item-value">
					<view class="query-verification" :class="{on:!smsUpdatePhoneButton.disabled}" @click="getVerificationCode">{{smsUpdatePhoneButton.title}}</view>
				</view>
			</view>
			<view class="confirm-update" :class="{on:canUpdate}" @click="onUpdatePhone">修改手机号</view>
		</view>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	import validatorUtils from '@/utils/validatorUtils.js'
	import { sendUpdatePhoneCode, getAllRegion } from '@/api/login.js'
	import { updatePhone } from '@/api/userInfo.js'
	export default {
		components:{
			hNavigationBar
		},
		data() {
			return {
				updateForm:{
					oldPhone: '',
					oldRegionCode: '',
					phone: '',
					regionCode: '',
					verificationCode: ''
				},
				smsUpdatePhoneButton: {
					title: '获取验证码',
					disabled: false,
					count: 60
				},
				timer:'',
				regionCodeIndex:40,
				regionCodeList:[],
			}
		},
		computed:{
			canUpdate(){
				return this.updateForm.verificationCode && this.updateForm.verificationCode.length===6 && this.updateForm.phone
			}
		},
		onLoad:function(options){
			this.updateForm.oldPhone = options.phone || ''
			this.updateForm.oldRegionCode = options.phone || ''
			this.updateForm.regionCode = '86'
			this.queryAllRegion()
		},
		onUnload:function(){
			this.timer && clearInterval(this.timer)
		},
		methods: {
			getVerificationCode(){
				if(this.smsUpdatePhoneButton.disabled){
					return
				}
				if(!this.updateForm.regionCode){
					this.$api.msg('请选择区号')
					return
				}
				if(!this.updateForm.phone){
					this.$api.msg('请输入手机号')
					return
				}
				sendUpdatePhoneCode(this.updateForm).then(res=>{
					this.countDownForPhone(this.smsUpdatePhoneButton)
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
			onUpdatePhone(){
				if(!this.canUpdate){
					return
				}
				updatePhone(this.updateForm).then(res=>{
					this.$api.msg('修改成功')
					uni.navigateBack()
				})
			},
			bindPickerLoginChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.regionCodeIndex = e.target.value
				this.updateForm.regionCode = this.regionCodeList[this.regionCodeIndex].regionCode
			},
			queryAllRegion(){
				getAllRegion().then(res=>{
					this.regionCodeList = res.data.data || []
					this.regionCodeList.forEach(item=>{
						item['codeAndName'] = '+'+ item.countryCode +' '+ item.countryName
					})
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

.item-input,.region-code{
	text-align: right;
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	display: flex;
	align-items: center;
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

.region-code-picker{
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
	padding-right: 30rpx;
	margin-left: -20rpx;
}
</style>
