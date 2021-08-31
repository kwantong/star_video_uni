<template>
	<view class="container">
		<h-navigation-bar title="注册成功" background-color="#FFFFFF" :show-back="true"></h-navigation-bar>
		<view class="success-box">
			<image class="success-icon" src="/static/pages/login/regist-success.png"></image>
			<view class="title-box">
				<view class="success-title">恭喜你，注册成功</view>
				<view class="success-sub-title">快来体验我们吧！</view>
			</view>
		</view>
		<view class="success-btn" @click="goLogin">立即登录</view>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	export default {
		components:{
			HNavigationBar
		},
		data() {
			return {
				
			}
		},
		methods: {
			goLogin(){
				uni.reLaunch({
					url:'/pages/public/login'
				})
			}
		}
	}
</script>

<style scoped>



.success-box{
	position: relative;
	width: 456rpx;
	height: 634rpx;
	margin: 0 auto;
	padding-top: 15rpx;
}

.success-icon{
	width: 456rpx;
	height: 634rpx;
}

.title-box{
	position: absolute;
	bottom: 18rpx;
	left: 0;
	right: 0;
	margin: 0 auto;
}

.success-title{
	font-size: 40rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FF2E80;
	text-align: center;
}

.success-sub-title{
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #A9A9A9;
	text-align: center;
}

.success-btn{
	margin: 0 50rpx;
	margin-top: 63rpx;
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
</style>
