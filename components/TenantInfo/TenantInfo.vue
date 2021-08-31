<template>
	<view class="tenant-item" @click="goDetail(tenantInfo)">
		<view class="tenant-cover">
			<image class="cover-icon" :src="tenantInfo.thumbnailUrl"></image>
			<view class="hot-view" v-if="showHot">
				<image class="hot-icon" src="/static/pages/collect/hot.png"></image>
				<text class="hot-name">人气明星</text>
			</view>
		</view>
		<view class="tenant-info">
			<view class="goods-name">{{tenantInfo.realName}}</view>
			<view class="tenant-bottom">
				<view class="goods-type-view">
					<text class="goods-type" v-for="(i,ind) in tenantInfo.tenantTypeList" :key="ind">{{i.tenantTypeName}}</text>
				</view>
			</view>
			<view class="goods-coin-view">
				<image class="goods-coin-icon" src="/static/pages/me/coin.png"></image>
				<text class="goods-coin-value">{{tenantInfo.afterDiscountPrice || tenantInfo.videoPrice}} 角本币</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TenantInfo",
		props:{
			tenantInfo:{
				type:Object,
				default:{}
			},
			showHot:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			goDetail(item){
				uni.navigateTo({
				 url:'/pages/index/starDetails?id=' + item.id
				})
			}
		}
	}
</script>

<style>
.tenant-item{
	width: 48%;
	background-color: #FFFFFF;
	box-shadow: 0px 10rpx 20rpx 0px rgba(0, 0, 0, 0.05);
	border-radius: 8rpx;
	border: 1rpx solid #F0F0F0;
	margin-bottom: 30rpx;
}
.tenant-cover{
	width: 100%;
	/* height: 435rpx; */
	height: calc(43vw/2*3);
	background-color: #D8D8D8;
	position: relative;
}
.cover-icon{
	/* background-color: rgba(255,46,128,0.2); */
	background-color: #D8D8D8;
	width: 100%;
	/* height: 435rpx; */
	height: calc(43vw/2*3);
}
/* 人气明星标签 */
.hot-view{
	position: absolute;
	left: 12rpx;
	top: 13rpx;
	width: 149rpx;
	height: 41rpx;
	line-height: 41rpx;
	background-color: rgba(0, 0, 0, 0.32);
	box-shadow: 0px 10rpx 20rpx 0px rgba(0, 0, 0, 0.05);
	border-radius: 21rpx;
	border: 1rpx solid rgba(255, 255, 255, 0.54);
	display: flex;
	align-items:center;
	justify-content:center;
}
.hot-icon{
	width: 22rpx;
	height: 26rpx;
}
.hot-name{
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
}

/* 底部text */
.tenant-info{
	padding: 20rpx 20rpx;
}
.goods-name{
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #000000;
	margin-bottom: 16rpx;
}
.tenant-bottom{
	display: flex;
	justify-content:space-between;
}
.goods-type-view{
	/* width: 200rpx; */
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	
	font-size: 28rpx;
	font-family: PingFangTC-Regular, PingFangTC;
	font-weight: 400;
	color: #B2B2B2;
}
.goods-type{
	margin-right: 7rpx;
}
.goods-coin-view{
	display: flex;
	align-items:center;
	margin-top: 7px;
}
.goods-coin-icon{
	height: 28rpx;
	width: 28rpx;
	margin-right:7rpx;
}
.goods-coin-value{
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #555555;
	text-shadow: 0px 10rpx 20rpx rgba(0, 0, 0, 0.05);
}
</style>
