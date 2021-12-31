<template>
	<view class="container">
		<h-navigation-bar :show-back="true" title="订单中心" background-color="#FFFFFF"></h-navigation-bar>
		<head-bar :navbarList="navList" @eventClick="orderListChange"></head-bar>
		<view class="order-list" v-if="orderList && orderList.length > 0 ">
			<view class="list-item" v-for="(o,index) in orderList">
				<view class="order-item-top" @click="orderDetail(o)">
					<view class="order-code-info">订单编号：{{o.orderSn}}</view>
					<view class="order-status">{{orderStatus[o.status] || '--'}}</view>
				</view>
				<view class="order-item-info bottom-border" @click="orderDetail(o)">
					<image class="order-cover" :src="o.videoThumbnailUrl"></image>
					<view class="order-info-box">
						<view class="goods-name">赠送给{{o.videoGiftTo}}的视频</view>
						<view class="goods-price">
							<view class="goods-price-label">价格：</view>
							<view class="goods-price-value">
								<image class="coin-icon" src="/static/pages/me/coin.png"></image>
								<text class="coin-value">{{o.totalAmount}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="order-operation">
					<view class="order-operation-btn" @click="cancelOrder(o)" v-if="o.status===0 || o.status===1 ">取消订单</view>
					<view class="order-operation-btn on" @click="goComment(o)" v-if="o.status===3 ">去评价</view>
					<view class="order-operation-btn on" @click="checkVideo(o)" v-if="o.status===3 ">查看视频</view>
				</view>
			</view>
		</view>
		<empty v-if="!orderList || orderList.length ===0"></empty>
		<uni-load-more v-if="orderList && orderList.length > 0" :status="loadingType"></uni-load-more>
		
		<view class="video-dialogue" v-if="videoDialogueVisible">
			<view class="dialogue-body">
				<view class="video-title">
					<text class="video-title-text">赠送给{{videoInfo.videoGiftTo}}</text>
					<image @click="colseVideo" class="video-close" src="../../../static/pages/me/upload.png"></image>
				</view>
				<view class="video-box">
					<video :src="videoInfo.videoUrl" controls :poster="videoInfo.videoThumbnailUrl"></video>
				</view>
				<view class="downlaod-file" @click="downloadFile">下载视频</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	import HeadBar from '@/components/head-bar/head-bar.vue'
	import empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { getOrderList, cancelUserOrder } from '@/api/order.js'
	export default {
		components:{
			HeadBar,hNavigationBar,empty,UniLoadMore
		},
		data() {
			return {
				navList: [
					{ state: 1, name: '全部', },
					{ state: 2, name: '待接单', },
					{ state: 3, name: '进行中', },
					{ state: 4, name: '待评价', },
					{ state: 5, name: '已完成', },
					{ state: 6, name: '已取消', }
				],
				loadingType:'nomore',
				queryData:{
					pageNum:1,
					pageSize:10,
					type:1,
				},
				orderStatus:{
					0:'待接单',
					1:'进行中',
					3:'已完成',
					6:'用户取消',
					7:'已拒单'
				},
				orderList:[],
				videoInfo:{},
				videoDialogueVisible:false
			}
		},
		onPullDownRefresh:function(){
			this.queryPageList('refresh')
		},
		onReachBottom:function(){
			this.queryPageList('add')
		},
		onLoad:function(){
			this.queryPageList('')
		},
		methods: {
			orderListChange(index){
				this.queryData.type = this.navList[index].state
				this.queryPageList('refresh')
			},
			queryPageList(type){
				if(type === 'refresh'){
					this.queryData.pageNum = 1
					this.orderList = []
					uni.showLoading({title:'加载中'})
				}else if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}
				
				getOrderList(this.queryData).then(res=>{
					const list = res.data.data.list
					if(type==='add'){
						this.orderList = this.orderList.concat(list)
					}else{
						this.orderList = list
					}
					this.queryData.pageNum = this.queryData.pageNum + 1
					if(type==='refresh'){
						uni.stopPullDownRefresh()
					}
					this.loadingType = res.data.data.total > this.orderList.length?'more':'nomre'
					uni.hideLoading()
				})
			},
			cancelOrder(order){
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
			goComment(o){
				uni.navigateTo({
					url:'../../index/starDetails?id='+o.tenantId
				})
			},
			orderDetail(o){
				uni.navigateTo({
					url:'./orderDetail?orderSn='+o.orderSn
				})
			},
			checkVideo(o){
				this.videoInfo = o
				this.videoDialogueVisible = true
			},
			colseVideo(){
				this.videoDialogueVisible = false
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
					this.h5DownloadFile(this.videoInfo.videoUrl,'赠送给' + this.videoInfo.videoGiftTo+'.mp4')
				}else{
					const a = document.createElement('a');
					document.body.appendChild(a)
					a.style.display = 'none'
					a.href = this.videoInfo.videoUrl;
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
				let fileName = '赠送给' + that.videoInfo.videoGiftTo
				uni.downloadFile({
				  url: that.videoInfo.videoUrl,
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


.order-list{
	margin: 30rpx 20rpx;
}

.list-item{
	background-color: #FFFFFF;
	box-shadow: 0px 12rpx 24rpx 0px rgba(53, 59, 64, 0.05);
	border-radius: 8rpx;
	padding: 17rpx 30rpx;
	margin-bottom: 26rpx;
}
.order-item-top{
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.order-code-info{
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #0F0F0F;
}
.order-status{
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FF2E80;
}

.order-item-info{
	display: flex;
	padding: 20rpx 0;
}

.order-item-info.bottom-border{
	border-bottom:1rpx solid #F2F2F2;
}

.order-cover{
	width: 199rpx;
	height: 354rpx;
	background-color: #F8F8F8;
	border-radius:4rpx;
}

.order-info-box{
	flex: 1;
	display: flex;
	justify-content: space-between;
}
.order-info-box{
	display: flex;
	flex-direction: column;
	padding-left: 20rpx;
}
.goods-name{
	font-size: 36rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #000000;
}
.goods-price{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
}

.goods-price-label{
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #7C7C7C;
}
.goods-price-value{
	display: flex;
	align-items: center;
}
.coin-icon{
	width: 42rpx;
	height: 42rpx;
}
.coin-value{
	font-size: 36rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FF2E80;
}

.order-operation{
	display: flex;
	justify-content: flex-end;
	padding-top: 20rpx;
}

.order-operation-btn{
	padding:  0 20rpx;
	height: 65rpx;
	line-height: 65rpx;
	background-color: #FFFFFF;
	border: 1rpx solid #F0F0F0;
	
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #151515;
	margin-left: 20rpx;
	margin-bottom: 10rpx;
}

.order-operation-btn.on{
	border:1rpx solid #FF2E80;
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
