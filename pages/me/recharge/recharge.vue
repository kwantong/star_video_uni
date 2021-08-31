<template>
	<view class="container">
		<h-navigation-bar :show-back="true" background-color="#FFFFFF" title="充值"></h-navigation-bar>
		<view class="line"></view>
		<view class="recharge-title-box">
			<view class="recharge-mian-title">选择充值金额</view>
			<view class="recharge-sub-title">提示：1RMB等于{{rateCoin}}角本币</view>
		</view>
		<view class="recharge-list">
			<view class="recharge-item" :class="{on: rechargeIndex === index}" v-for="(r,index) in rechargeList" @click="changeRecharge(index)">
				<view class="recharge-coin">{{r.coinCount}}角本币</view>
				<view class="recharge-value">({{r.coinCount/rateCoin}}元)</view>
				<view v-if="rechargeIndex === index" class="recharge-checked">
					<image src="/static/pages/recharge/selected.png"></image>
				</view>
			</view>
		</view>
		
		<view class="recharge-input" :class="{on:rechargeIndex===-1}" >
			<input class="recharge-input-value" v-model="rechargeInputMoney" @input="changeRechargeInput" placeholder="请输入充值金额" />
			<text class="recharge-unit">元</text>
		</view>
		
		<view class="recharge-type">
			<view class="recharge-type-title">请选择支付方式</view>
			<view class="recharge-type-item" @click="chnageRechageType(1)">
				<view class="recharge-type-item-info">
					<image class="recharge-icon" src="/static/pages/recharge/wechat-recharge.png"></image>
					<text class="recharge-type-name">微信支付</text>
				</view>
				<radio :checked="rechargeType===1" color="#FF2E80"></radio>
			</view>
			<!-- #ifdef H5 -->
			<view class="recharge-type-item" @click="chnageRechageType(2)">
				<view class="recharge-type-item-info">
					<image class="recharge-icon" src="/static/pages/recharge/alipay-recharge.png"></image>
					<text class="recharge-type-name">支付宝支付</text>
				</view>
				<radio :checked="rechargeType===2" color="#FF2E80"></radio>
			</view>
			<!-- #endif -->
		</view>
		<view v-show="false" v-html="alipayForm"></view>
		<view class="recharge-btn" :style="'margin-bottom:'+bottomSpace+'rpx;'" @click="payAction">充值</view>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	import { findALLRechargeSelectionList, newRechargeForWx, newRecharge, wxJscode2session } from '@/api/recharge.js'
	import { domain } from  '@/api/domain.js'
	import { mapState, mapMutations } from 'vuex'
	export default {
		components:{
			hNavigationBar
		},
		data() {
			return {
				bottomSpace:this.$bottomSpace,
				rateCoin:10,
				rechargeList:[],
				rechargeIndex:0,
				rechargeMoney:'',
				rechargeInputMoney:'',
				rechargeType:1,
				alipayForm:''
			}
		},
		onLoad:function(){
			if(!this.hasLogin){
				uni.navigateTo({
					url:'../../public/login'
				})
			}
		},
		onShow:function(){
			this.queryRechargeSelection()
		},
		onUnload:function(){
			uni.closeSocket();
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['updateCacheUserInfo']),
			changeRecharge(index){
				this.rechargeIndex = index
				this.rechargeMoney = this.rechargeList[index].coinCount/this.rateCoin
				this.rechargeInputMoney = ''
			},
			changeRechargeInput(){
				this.rechargeIndex = -1
			},
			chnageRechageType(type){
				this.rechargeType = type
			},
			queryRechargeSelection() {
			  findALLRechargeSelectionList().then(res => {
				this.rechargeList = res.data.data || []
			  })
			},
			payAction(){
				uni.closeSocket()
				const amount = this.rechargeInputMoney || this.rechargeList[this.rechargeIndex].coinCount/this.rateCoin
				const param = {
					coinCount: amount * this.rateCoin,
					description: '充值',
					payAmount: amount,
					payMethod: this.rechargeType,
					totalAmount: amount,
					openId: '',
				}
				const that = this
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: function(res) {
						console.log(res.code);
						wxJscode2session({code:res.code}).then(wxCodeRes=>{
							console.log('wxCodeRes->',wxCodeRes)
							param.openId = wxCodeRes.data.data.openid || ''
							newRechargeForWx(param).then(res=>{
								const payData = res.data.data || {}
								console.log('payData--->',payData)
								uni.requestPayment({
								    provider: 'wxpay',
								    timeStamp: payData.timeStamp+'',
								    nonceStr: payData.nonceStr,
								    package: payData.package,
								    signType: payData.signType,
								    paySign: payData.paySign,
								    success: function (res) {
										that.updateCacheUserInfo()
								        console.log('success:' + JSON.stringify(res));
										uni.navigateTo({
											url:'/pages/me/recharge/recharge-result?result=1'
										})
								    },
								    fail: function (err) {
								        console.log('fail:' + JSON.stringify(err));
										uni.navigateTo({
											url:'/pages/me/recharge/recharge-result?result=2'
										})
								    }
								});
							})
						})
					}
				});
				// #endif
				
				// #ifdef H5
				uni.showLoading({
					title:'支付中'
				})
				newRecharge(param).then(res=>{
					const payData = res.data.data || {}
					
					uni.connectSocket({
					  url: (domain.indexOf('https') >=0 ? 'wss://' : 'ws://') + domain.replace(/^(http|https):\/\/+/, '') + 'websocket'
					});
					
					uni.onSocketOpen(function (res) {
					  console.log('WebSocket连接已打开！');
					  const paramMsg = {
						  subscribe:(that.rechargeType===1?'WXPAY@':'ALIPAY@')+payData.orderSn,
						  tradeType:that.rechargeType===1?'MWEB':'WAPPAY'
					  }
					  console.log('请求参数：',JSON.stringify(paramMsg))
					  uni.sendSocketMessage({
					    data: JSON.stringify(paramMsg)
					  });
					});
					
					uni.onSocketMessage(function (res) {
						console.log('收到服务器内容：' + res.data);
						const resWs = JSON.parse(res.data)
						if (resWs.code === 1005001) {
							that.showProp()
							if (that.rechargeType===1) { // 微信支付
								console.log('开启微信支付-->',resWs.data)
								location.href = resWs.data
							} else { // 跳转支付宝支付
								that.alipayForm = resWs.data.replace('punchout_form"', 'punchout_form" ref="punchout_form" ')
								setTimeout(function() {
								  // 等待100MS 解决safari浏览器安全拦截问题
								  // newWin.document.body.innerHTML = that.alipayForm
								  that.$nextTick(() => {
									window.document.querySelector('form[name="punchout_form"]').submit()
								  })
								}, 100)
							}
						// 获取支付参数成功
						} else if (resWs.code === 1005002) {
							// 更新缓存
							that.updateCacheUserInfo()
							// 支付成功
							uni.navigateTo({
								url:'/pages/me/recharge/recharge-result?result=1'
							})
						} else {
							console.log('未处理的消息通知:-->', resWs)
						}
					});
				})
				// #endif
			},
			showProp:function(){
				uni.showModal({
					title: '提醒',
					content: '支付成功？',
					showCancel: true,
					cancelText: '重新支付',
					cancelColor: '#999999',
					confirmText: '支付完成',
					confirmColor:'#FF2E80',
					success: res => {
						if(res.confirm){
							uni.navigateTo({
								url:'/pages/me/recharge/recharge-result?result=1'
							})
						}
						if(res.cancel){
							uni.closeSocket()
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			paymentCallBack:function(payData){
				// #ifdef MP-WEIXIN
				uni.requestPayment({
				    provider: 'wxpay',
				    timeStamp: String(Date.now()),
				    nonceStr: 'A1B2C3D4E5',
				    package: 'prepay_id=wx20180101abcdefg',
				    signType: 'MD5',
				    paySign: '',
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
				// #endif
			}
		}
	}
</script>

<style scoped>
	
	
	.recharge-title-box{
		margin: 25rpx 30rpx;
	}
	
	.recharge-mian-title{
		font-size: 36rpx;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #000000;
		margin-bottom: 11rpx;
	}
	.recharge-sub-title{
		height: 71rpx;
		line-height: 71rpx;
		background-color: #FFF5F0;
		
		font-size: 24rpx;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #FF8142;
	}
	
	.recharge-list{
		display: flex;
		flex-wrap: wrap;
		/* margin: 20rpx 30rpx; */
		padding: 20rpx 30rpx;
		/* justify-content: center; */
		/* justify-content: space-between; */
	}

	.recharge-item{
		width: 29%;
		/* flex: 0 0 29%; */
		height: 160rpx;
		background-color: #FFFFFF;
		border-radius: 2rpx;
		border: 2rpx solid #F0F0F0;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	
	.recharge-item:not(:nth-child(3n)) {
	    margin-right: calc(10% / 2);
	}
	
	.recharge-item.on{
		border: 2rpx solid #FF2E80;
	}
	
	.recharge-checked{
		position: absolute;
		top: 0;
		left: 0;
		background-color: #FF2E80;
		width: 37rpx;
		height: 37rpx;
		line-height: 37rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.recharge-checked image{
		width: 25rpx;
		height: 17rpx;
	}
	/* 
	.recharge-checked >>> .uni-checkbox-input-checked{
		background-color: #FF2E80;
		border-color: #FF2E80;
		border-radius: unset;
		width: 37rpx;
		height: 37rpx;
	} */
	
	.recharge-input{
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		box-shadow: 0px -1rpx 0px 0px #F0F0F0;
		padding: 0 30rpx;
		display: flex;
		flex-direction:row;
		justify-content:space-between;
	}
	
	.recharge-input.on{
		border: 2rpx solid #FF2E80;
	}
	
	.recharge-input-value{
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		height: 100rpx;
		line-height: 100rpx;
	}
	
	
	.recharge-unit{
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	
	.recharge-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FF2E80;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
	}
	
	.recharge-type{
		margin-bottom: 200rpx;
	}
	
	.recharge-type-title{
		margin: 30rpx 30rpx 24rpx 30rpx;
		font-size: 36rpx;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #000000;
	}
	
	.recharge-type-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		height: 100rpx;
		box-shadow: 0px -1rpx 0px 0px #F0F0F0;
	}
	
	.recharge-type-item-info{
		display: flex;
		align-items:center;
	}
	.recharge-icon{
		width: 38rpx;
		height: 38rpx;
	}
	
	.recharge-type-name{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		padding-left: 10rpx;
	}
</style>
