<template>
	<view class="index-list-main-header">
		<view class="index-list-title">
			<image class="title-img" src="../../static/pages/picture/ellipse.png" mode="aspectFit"></image>
			<text>{{title}}</text>
		</view>
		<navigator class="more-text" hover-class="none" :open-type="openType" :url="linkUrl">
			<text>更多</text>
			<image class="more-img" src="../../static/pages/picture/download.png" mode="aspectFit"></image>
		</navigator>
	</view>
</template>

<script>
	export default {
		name:"HomeLineTitle",
		props:{
			title:{
				type:String,
				default:'人气明星'
			},
			linkUrl:{
				type:String,
				default:'/'
			},
			openType:{
				type:String,
				default:'navigate'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>

	.index-list-main-header {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 40rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.index-list-title {
		display: flex;
		align-items: center;
	}
	
	.index-list-main-header {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 40rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.more-text {
		font-size: 30rpx;
		color:#808080;
	}
	.title-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
	.more-img {
		width: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
</style>
