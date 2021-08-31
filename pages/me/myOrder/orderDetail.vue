<template>
	<view>
		<h-navigation-bar :showBack="true" title="订单详情" background-color="#FFFFFF"></h-navigation-bar>
		<view class="line"></view>
		<view class="order-form">
			<view class="form-item head-form">
				<view style="width: 144rpx;height: 193rpx;">
					<image class="allImg" :src="orderInfo.tenantThumbnailUrl" mode="aspectFill"></image>
				</view>
				<view class="head-form-text">
					<view style="font-size: 36rpx;font-weight: 500;margin-bottom: 30rpx;">{{orderInfo.renantRealName}}</view>
					<view style="font-size: 28rpx;">订单价格</view>
					<view class="list_main_price">
						<image style="width: 38rpx;height:38rpx;" src="../../../static/pages/me/coin.png" mode="aspectFit"></image>
						<text style="font-size: 36rpx;margin-left: 10rpx;">{{orderInfo.payAmount}}</text>
					</view>
				</view>
			</view>
			<view>
				<view class="form-item" style="margin-top: 10rpx;">此视频录制给</view>
				<view style="padding: 30rpx;background-color: #FFFFFF;">
					<view class="orderDetails">
						<view class="orderDetails-label">预定人：</view>
						<view class="orderDetails-text" v-if="orderInfo.videoGiftType === 0">{{orderInfo.videoGiftTo}}</view>
						<view class="orderDetails-text" v-if="orderInfo.videoGiftType === 1">{{orderInfo.videoGiftFrom}}</view>
					</view>
					<view class="orderDetails">
						<view class="orderDetails-label">此视频录制给：</view>
						<view class="orderDetails-text">{{orderInfo.videoGiftTo || '--'}}</view>
					</view>
					<view class="orderDetails">
						<view class="orderDetails-label">使用场景：</view>
						{{ queryPurpose }}
					</view>
					<view class="orderDetails">
						<view class="orderDetails-label">内容简介：</view>
						<view class="orderDetails-text">{{orderInfo.videoIntroduction}}</view>
					</view>
					<view class="orderDetails">
						<view class="orderDetails-label">电子邮箱：</view>
						<view class="orderDetails-text">{{orderInfo.billReceiverEmail}}</view>
					</view>
				</view>
				<view class="submit-order-box" :style="'height: '+(bootomSpace+100)+'rpx;'">
					<view class="submit-order" @click="cancelOrder" v-if="orderInfo.status===0 || orderInfo.status===1 ">取消订单</view>
					<view class="submit-order on" @click="goComment" v-if="orderInfo.status===3 ">去评价</view>
					<view class="submit-order on" @click="checkVideo" v-if="orderInfo.status===3 ">查看视频</view>
				</view>
			</view>
		
		</view>
		
		
		<view class="video-dialogue" v-if="videoDialogueVisible">
			<view class="dialogue-body">
				<view class="video-title">
					<text class="video-title-text">赠送给{{orderInfo.videoGiftTo}}</text>
					<image @click="colseVideo" class="video-close" src="../../../static/pages/me/upload.png"></image>
				</view>
				<view class="video-box">
					<video :src="orderInfo.videoUrl" controls :poster="orderInfo.videoThumbnailUrl"></video>
				</view>
				<view class="downlaod-file" @click="downloadFile">下载视频</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import { videoAllPurpose } from '@/api/home.js'
	import { orderDetail } from '@/api/order.js'
	export default {
		components:{
			HNavigationBar
		},
		onLoad(options){
			this.orderSn = options.orderSn || ''
			this.getvideoAllPurpose()
			this.queryOrderDetail()
		},
		data() {
			return {
				bootomSpace:this.$bottomSpace,
				videoAllPurposeList:[],
				index: 0,
				orderInfo:{},
				orderSn:'',
				videoDialogueVisible:false
			}
		},
		computed:{
			queryPurpose() {
			  if (!this.orderInfo.videoPurposeId) {
				return '--'
			  }
			  if (!this.videoAllPurposeList) {
				return '--'
			  }
			  const purposeObj = this.videoAllPurposeList.find(p => p.id = this.orderInfo.videoPurposeId) || {}
			  return purposeObj && purposeObj.purpose || '--'
			}
		},
		methods: {
			changeUser(type){
				this.createOrderFrom.videoGiftType = type
			},
			changeVideoOpen(type){
				this.createOrderFrom.isVideoPublic = type
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				// this.createOrderFrom.videoPurposeId = e.target.value*1+1
				this.createOrderFrom.videoPurposeId = this.videoAllPurposeList[this.index].id
				// this.createOrderFrom.purpose = this.videoAllPurposeList[index].purpose
				
			},
			// 使用场景
			getvideoAllPurpose(){
				videoAllPurpose().then(res=>{
					this.videoAllPurposeList =  res.data.data
				})
			},
			queryOrderDetail(){
				orderDetail( { orderSn:this.orderSn }).then(res=>{
					this.orderInfo = res.data.data || {}
				})
			},
			goComment(){
				uni.navigateTo({
					url:'../../index/starDetails?id='+this.orderInfo.tenantId
				})
			},
			checkVideo(){
				this.videoDialogueVisible = true
			},
			colseVideo(){
				this.videoDialogueVisible = false
			},
			cancelOrder(){
				const order  = this.orderInfo
				uni.showModal({
					title: '',
					content: '确定要取消订单？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					confirmColor: '#FF2E80',
					success: res => {
						if(res.confirm){
							cancelUserOrder({orderSn:order.orderSn,note:'用户取消'}).then(res=>{
								this.$api.msg('取消成功')
								this.queryData('refresh')
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			h5DownloadFile(url, fileName) {
			    var x = new XMLHttpRequest();
			    x.open("GET", url, true);
			    x.responseType = 'blob';
			    x.onload=function(e) {
			        var url = window.URL.createObjectURL(x.response)
			        var a = document.createElement('a');
			        a.href = url
			        a.download = fileName;
			        a.click()
			    }
			    x.send();
			},
			downloadFile(){
				//#ifdef H5
				if(/Safari/.test(navigator.userAgent)){
					this.h5DownloadFile(this.orderInfo.videoUrl,'赠送给' + this.orderInfo.videoGiftTo+'.mp4')
				}else{
					const a = document.createElement('a');
					document.body.appendChild(a)
					a.style.display = 'none'
					a.href = this.orderInfo.videoUrl;
					a.download = '视频.mp4';
					a.click();
					document.body.removeChild(a)
				}
				//#endif
				
				//#ifdef MP
				const that = this
				//不允许打开定位
				uni.authorize({
					scope:'scope.writePhotosAlbum',
					success:function(res1){
						uni.getSetting({
							success: (res) => {
								console.log(res)
								if (!res.authSetting['scope.writePhotosAlbum']) {
									that.$api.msg('请点击右上角，打开设置，开启权限')
								} else {
									uni.showLoading({
										title:'下载中'
									})
									that.saveFile()
								}
							}
						})
					},
					fail:function(err){
						console.log('err>>>>',err)
						that.$api.msg('请点击右上角，打开设置，开启权限')
					}
				})
				//#endif
			},
			saveFile(){
				const that = this
				let fileName = '赠送给' + that.orderInfo.videoGiftTo
				uni.downloadFile({
				  url: that.orderInfo.videoUrl,
				  filePath:wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
				  success: function (res) {
					console.log('下载文件成功->',res)
				    var filePath = res.filePath;
					uni.saveVideoToPhotosAlbum({
					  filePath: filePath,
					  success: function (res) {
						that.$api.msg('保存成功')
						uni.hideLoading()
					  },
					  fail:function(err){
						that.$api.msg('保存失败')
						uni.hideLoading()
					  }
					})
				  }
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
.form-item-textarea{
	background-color: #FFFFFF;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f2f2f2;
}
.head-form{
	height: 269rpx;
	background-color: #FFFFFF;
	box-shadow: 0px -1rpx 0px 0px #F0F0F0;
	justify-content: flex-start;
	line-height: 55rpx;
}
.head-form-text{
	margin-left: 30rpx;
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
.radio-item{
	font-weight: 400;
	font-size: 28rpx;
	color: #000000;
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
	display: flex;
	justify-content: space-around;
}
.submit-order{
	width: 50%;
	height: 100rpx;
	line-height: 100rpx;
	font-size: 32rpx;
	text-align: center;
	color: #333333;
	background-color: #FFFFFF;
	font-family: PingFangSC-Semibold;
	font-weight: 600;
}
.submit-order:first-child{
	border-right: 2rpx solid #FFFFFF;
}
.submit-order.on{
	color: #FFFFFF;
	background: #FF2E80;
}
.orderDetails{
	display: flex;
	margin-bottom: 20rpx;
}
.orderDetails-label{
	width: 196rpx;
	font-size: 28rpx;
	color: #909090;
}
.orderDetails-text{
	width: 485rpx;
	font-size: 28rpx;
	color: #0E0E0E;
	height: auto;
	word-wrap: break-word
}
.list_main_price {
	display: flex;
	align-items: center;
	color: #FF2E80;
}




.video-dialogue{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: calc(100vh);
	width: calc(100vw);
	background-color: rgba(0,0,0,.4);
	z-index: 10;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.dialogue-body{
	background-color: #FFFFFF;
	width: 70%;
	padding: 20rpx;
}
.video-title{
	padding-bottom: 20rpx;
	font-size: 36rpx;
	font-weight: 400;
	position: relative;
	
	text-overflow:ellipsis;
	white-space: nowrap;
	overflow: hidden;
	padding-right: 50rpx;
}
.video-close{
	position:absolute;
	top: 0;
	right: 0rpx;
	transform: rotate(45deg);
	width: 50rpx;
	height: 50rpx;
}
.video-box{
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	border-radius:10rpx;
	width: 100%;
	height: calc(70vw/9*16);
}

.video-box video{
	width: 100%;
	height: 100%;
}

.downlaod-file{
	background-color: #FF2E80;
	color: #FFFFFF;
	width: 200rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	border-radius:8rpx;
	margin-top: 30rpx;
	font-size: 28rpx;
	float: right;
}
</style>
