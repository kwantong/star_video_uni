<template>
	<view class="index_nav">
		<scroll-view scroll-x="true" scroll-left="120" class="index_nav_scroll">
			<view class="index_nav_item">
				<image class="index_nav_img" src="../../../static/pages/20200405011330103.png" mode="aspectFit"></image>
				<text>影视(500)</text>
			</view>
			<view class="index_nav_item">
				<image class="index_nav_img" src="../../../static/pages/_tiyuyundong.png" mode="aspectFit"></image>
				<text>体育(500)</text>
			</view>
			<view class="index_nav_item">
				<image class="index_nav_img" src="../../../static/pages/20200405011247174.png" mode="aspectFit"></image>
				<text>脱口秀(500)</text>
			</view>
			<view class="index_nav_item">
				<image class="index_nav_img" src="../../../static/pages/编组.png" mode="aspectFit"></image>
				<text>网红(500)</text>
			</view>
			<view class="index_nav_item">
				<image class="index_nav_img" src="../../../static/pages/20200405011247174.png" mode="aspectFit"></image>
				<text>脱口秀(500)</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
</script>

<style>
.index_nav_scroll {
		white-space: nowrap;
		width: 100%;
		height: 120rpx;
	}
	.index_nav_item {
		display: inline-block;
		width: auto;
		height: 68rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 30rpx;
		margin: 20rpx 10rpx;
		box-shadow: 0 2px 10px 0px rgba(177,177,177,0.5);
		border-radius: 40rpx;
		box-sizing: border-box;
		padding: 14rpx 30rpx;
	}
	.index_nav_img {
		transform: translateY(5rpx);
		width: 30rpx;
		height: 30rpx;
	}
</style>
