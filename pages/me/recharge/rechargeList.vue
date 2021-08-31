<template>
	<view class="container">
		<h-navigation-bar :show-back="true" background-color="#FFFFFF" title="充值记录"></h-navigation-bar>
		<view class="line"></view>
		<view class="record-list">
			<view class="record-item" v-for="(r,index) in rechargeRecordList" :key="index">
				<view class="record-info-box">
					<view class="record-info-box">
						<image class="record-icon" src="/static/pages/recharge/record.png"></image>
						<text>充值</text>
					</view>
					<view class="record-info-value">
						+{{r.coinCount}} Coin
					</view>
				</view>
				<view class="record-sub-info">
					<text class="record-time">{{r.createTime && r.createTime.replace('T',' ').substring(0,19) || '--'}}</text>
					<text class="record-type">{{rechargeTypeList[r.payMethod]}}</text>
				</view>
			</view>
		</view>
		<uni-load-more v-if="rechargeRecordList && rechargeRecordList.length >= queryData.pageSize" :status="loadingType"></uni-load-more>
		<empty v-if="!rechargeRecordList || rechargeRecordList.length === 0"></empty>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	import empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { getRechargeList } from '@/api/recharge.js'
	export default {
		components:{
			hNavigationBar,empty,UniLoadMore
		},
		data() {
			return {
				loadingType:'nomore',
				rechargeTypeList:['--','微信支付','支付宝支付'],
				queryData:{
					pageNum:1,
					pageSize:10
				},
				rechargeRecordList:[]
			}
		},
		onPullDownRefresh:function(){
			this.queryPageList('refresh')
		},
		onLoad:function(){
			this.queryPageList('')
		},
		onReachBottom:function(){
			this.queryPageList('add')
		},
		methods: {
			queryPageList(type){
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
					uni.showLoading({ title: '正在加载'})
				} else if (type === 'refresh') {
					this.rechargeRecordList = [];
					this.queryData.pageNum = 1
				}
								
				getRechargeList(this.queryData).then(res=>{
					const list = res.data.data.list || []
					if(type === 'add'){
						this.rechargeRecordList = this.rechargeRecordList.concat(list)
					}else{
						this.rechargeRecordList = list
					}
					this.loadingType = res.data.data.total > this.rechargeRecordList.length  ? 'more' : 'nomore'
					uni.hideLoading();
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					};
					this.queryData.pageNum = this.queryData.pageNum + 1
				})
			}
		}
	}
</script>

<style scoped>
.record-list{
	margin: 24rpx 20rpx;
}

.record-item{
	padding: 30rpx;
	background-color: #FFFFFF;
	box-shadow: 0px 12rpx 24rpx 0px rgba(53, 59, 64, 0.05);
	border-radius: 8rpx;
	margin-bottom: 20rpx;
}

.record-info-box{
	display: flex;
	justify-content:space-between;
	align-items:center;
	margin-bottom: 17rpx;
}


.record-info-box{
	font-size: 36rpx;
	font-family: PingFangTC-Regular, PingFangTC;
	font-weight: 400;
	color: #000000;
	display: flex;
	align-items:center;
}

.record-icon{
	width: 42rpx;
	height: 36rpx;
	margin-right: 20rpx;
}

.record-info-value{
	font-size: 40rpx;
	font-family: PingFangTC-Regular, PingFangTC;
	font-weight: 400;
	color: #FF2E80;
}

.record-sub-info{
	font-size: 24rpx;
	font-family: PingFangTC-Regular, PingFangTC;
	font-weight: 400;
	color: #999999;
	display: flex;
	justify-content:space-between;
}
</style>
