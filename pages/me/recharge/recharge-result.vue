<template>
	<view class="container">
		<h-navigation-bar :show-back="false" background-color="#FFFFFF" :title="resultTitle[result]"></h-navigation-bar>
		<view class="line"></view>
		<view class="result-box" v-if="result===1">
			<view class="result-success" >
				<image class="success-icon" src="/static/pages/recharge/recharge-success.png"></image>
				<text class="result-tips">充值成功</text>
			</view>
			<view class="result-btns">
				<view class="result-btn" @click="goQueryRechargeRecord">查看充值记录</view>
				<view class="result-btn" @click="goHome">返回首页</view>
			</view>
		</view>
		<view class="result-box" v-if="result===2">
			<view class="result-fail">
				<view class="result-fail-icon">!</view>
				<view class="result-tips">充值失败</view>
			</view>
			<view class="result-btns">
				<view class="result-btn" @click="goQueryRechargeRecord">查看充值记录</view>
				<view class="result-btn" @click="goHome">返回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hNavigationBar from '../../../components/hNavigationBar/index.vue'
	export default {
		components:{
			hNavigationBar
		},
		data() {
			return {
				result:0,
				resultTitle:['充值结果','充值成功','充值失败']
			}
		},
		onLoad:function(options){
			this.result = options.result && options.result*1 || 0
		},
		methods: {
			goQueryRechargeRecord(){
				uni.redirectTo({
					url:'/pages/me/recharge/rechargeList'
				})
			},
			goHome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			goonRecharge(){
				uni.redirectTo({
					url:'/pages/me/recharge/recharge'
				})
			},
		}
	}
</script>

<style scoped>
page{
	background-color: #FFFFFF;
}

.result-box{
	display: flex;
	margin: 0 auto;
	flex-direction: column;
	padding: 200rpx 30rpx;
	text-align: center;
}
.result-success{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80rpx;
	
}
.success-icon{
	width: 127rpx;
	height: 127rpx;
	margin-bottom: 20rpx;
}

.result-tips{
	font-size: 36rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #000000;
}

.result-fail{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80rpx;
}
.result-fail-icon{
	background-color: #ff4d4d;
	width: 127rpx;
	height: 127rpx;
	line-height: 127rpx;
	border-radius: 80rpx;
	text-align: center;
	color: #FFFFFF;
	font-size: 70rpx;
	margin-bottom: 20rpx;
}

.result-btns{
	display: flex;
	justify-content: space-around;
}

.result-btn{
	width: 200rpx;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #FFFFFF;
	border-radius: 4rpx;
	border: 1rpx solid #FF2E80;
	
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FF2E80;
}
</style>
