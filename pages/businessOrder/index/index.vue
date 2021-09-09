<template>
	<view>
		<h-navigation-bar :showBack="true" :title="title" background-color="#FFFFFF"></h-navigation-bar>
		<view class="line"></view>
		
		<view class="order-form">
			<view class="form-item">
				<view class="item-label required">贵公司名称</view>
				<view class="item-value">
					<input class="item-input" v-model="businessOrderForm.companyName"  maxlength="20" placeholder="请填写公司名称"/>
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label required">想要联系的明星(KOL)</view>
				<view class="item-value">
					<input class="item-input" v-model="businessOrderForm.tenantName"  maxlength="20" placeholder="请填写想要联系的明星或KOL"/>
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label required">视频主题</view>
				<view class="item-value">
					<input class="item-input" v-model="businessOrderForm.videoTitle"  maxlength="20" placeholder="请填写视频主题"/>
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label required">预算(单位:元)</view>
				<view class="item-value">
					<input class="item-input" v-model="businessOrderForm.budget"  maxlength="20" placeholder="请填写预算" type="number"/>
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label required">联系人</view>
				<view class="item-value">
					<input class="item-input" v-model="businessOrderForm.contactName"  maxlength="20" placeholder="请填写联系人"/>
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label required">联系电话</view>
				<view class="item-value">
					<input class="item-input" v-model="businessOrderForm.phone"  maxlength="20" placeholder="请填写联系电话" type="number"/>
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label required">联系邮箱</view>
				<view class="item-value">
					<input class="item-input" v-model="businessOrderForm.email"  maxlength="20" placeholder="请填写联系邮箱"/>
				</view>
			</view>
			
			<view :style="'height: '+(bootomSpace+100)+'rpx;'">
				<view class="submit-order" @click="confirm()" style="margin-top: 10rpx;">
					提交
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import { addBusinessOrder } from '@/api/businessOrder.js'
	export default {
		components:{
			HNavigationBar
		},
		data() {
			return {
				bootomSpace:this.$bottomSpace,
				title:'商务需求',
				businessOrderForm: {
					companyName: '',
					tenantName: '',
					videoTitle: '',
					budget: 0,
					contactName: '',
					phone: '',
					email: ''
				},
			}
		},
		methods: {
			confirm() {
				if(!this.businessOrderForm.companyName){
					this.$api.msg('请填写公司名称')
					return
				}
				if(!this.businessOrderForm.tenantName){
					this.$api.msg('请填写想要联系的明星')
					return
				}
				if(!this.businessOrderForm.videoTitle){
					this.$api.msg('请填写视频主题')
					return
				}
				if(!this.businessOrderForm.budget){
					this.$api.msg('请填写预算')
					return
				}
				if(!this.businessOrderForm.contactName){
					this.$api.msg('请填写联系人')
					return
				}
				if(!this.businessOrderForm.phone){
					this.$api.msg('请填写联系电话')
					return
				}
				var reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
				if(!this.businessOrderForm.email){
					this.$api.msg('请填写联系邮箱')
					return
				} else if(!reg.test(this.businessOrderForm.email)){
					this.$api.msg('邮箱格式不正确')
					return 
				}
				addBusinessOrder(this.businessOrderForm).then(res=>{
					this.$api.msg('发送成功')
					this.formReset()
				})
			},
			formReset() {
			  this.businessOrderForm = {
				companyName: '',
				tenantName: '',
				videoTitle: '',
				budget: 0,
				contactName: '',
				phone: '',
				email: ''
			  }
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
.submit-order-box{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #FFFFFF;
}
.submit-order{
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
