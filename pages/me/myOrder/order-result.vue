<template>
	<view class="container">
		<h-navigation-bar :show-back="false" background-color="#FFFFFF" title="下单成功"></h-navigation-bar>
		<view class="line"></view>
		<view class="result-box">
			<view class="result-success" >
				<image class="success-icon" src="/static/pages/recharge/recharge-success.png"></image>
				<text class="result-tips">下单成功</text>
			</view>
			<view class="result-btns">
				<view class="result-btn" @click="goQueryOrderRecord">查看订单记录</view>
				<view class="result-btn" @click="goDetail">查看明星详情</view>
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
				starDetailId:''
			}
		},
		onLoad:function(options){
			this.starDetailId = options.starDetailId || ''
		},
		methods: {
			goDetail(){
				uni.redirectTo({
					url:'../../index/starDetails?id='+this.starDetailId
				})
			},
			goQueryOrderRecord(){
				uni.redirectTo({
					url:'./myOrder'
				})
			}
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
