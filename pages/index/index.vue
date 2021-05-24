<template>
	<view class="index_main">
		<hNavigationBar :showLogo="true" />
		<r-header></r-header>
		<scroll-view class="index_list_wrap" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" scroll-with-animation="true">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in background" :key="index">
						<view class="swiper-item" :style="{background: item.bgColor}">{{ item.name }}</view>
					</swiper-item>
				</swiper>
			</view>
			<class-bar />
			<view class="index_list_main">
				<view class="index_list_main_header">
					<view class="index_list_title">
						<image class="title_img" src="../../static/pages/椭圆形.png" mode="aspectFit"></image>
						<text>人气明星</text>
					</view>
					<navigator class="more_text" url="../category/category">
						<text>更多</text>
						<image class="more_img" src="../../static/pages/download01.png" mode="aspectFit"></image>
					</navigator>
				</view>
				<view class="index_list_main_content">
					<view class="index_list_main_item" v-for="item in recommendList" :key="item.id">
						<image class="index_list_main_img" :src="item.imgUrl" mode="aspectFill"></image>
						<text class="index_list_main_text">{{ item.name }}</text>
						<text class="index_type">{{ item.type }}</text>
						<view class="index_list_main_text index_list_main_price">
							<image class='coin_img' src="../../static/pages/coin2.png" mode="aspectFit"></image>
							<text>{{ item.price }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="index_list_main">
				<view class="index_list_main_header">
					<view class="index_list_title">
						<image class="title_img" src="../../static/pages/椭圆形.png" mode="aspectFit"></image>
						<text>推荐艺人</text>
					</view>
					<navigator class="more_text" url="../category/category">
						<text>更多</text>
						<image class="more_img" src="../../static/pages/download01.png" mode="aspectFit"></image>
					</navigator>
				</view>
				<view class="index_list_main_content">
					<view class="index_list_main_item" v-for="item in recommendList" :key="item.id">
						<image class="index_list_main_img" :src="item.imgUrl" mode="aspectFill"></image>
						<text class="index_list_main_text">{{ item.name }}</text>
						<text class="index_type">{{ item.type }}</text>
						<view class="index_list_main_text index_list_main_price">
							<image class='coin_img' src="../../static/pages/coin2.png" mode="aspectFit"></image>
							<text>{{ item.price }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view style="width: 100%;height: 350rpx;">
				<image style="width: 100%;height: 100%;" src="../../static/pages/投票榜.png" mode="aspectFit"></image>
			</view>
			
			<view class="index_list_main">
				<view class="index_list_main_header">
					<view class="index_list_title">
						<image class="title_img" src="../../static/pages/椭圆形.png" mode="aspectFit"></image>
						<text>打折活动</text>
					</view>
					<navigator class="more_text" url="../category/category">
						<text>更多</text>
						<image class="more_img" src="../../static/pages/download01.png" mode="aspectFit"></image>
					</navigator>
				</view>
				<view class="index_list_main_content">
					<view class="index_list_main_item" v-for="item in recommendList" :key="item.id">
						<image class="index_list_main_img" :src="item.imgUrl" mode="aspectFill"></image>
						<text class="index_list_main_text">{{ item.name }}</text>
						<text class="index_type">{{ item.type }}</text>
						<view class="index_list_main_text index_list_main_price">
							<image class='coin_img' src="../../static/pages/coin2.png" mode="aspectFit"></image>
							<text>{{ item.price }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="index_list_main">
				<view class="index_list_main_header">
					<view class="index_list_title">
						<image class="title_img" src="../../static/pages/椭圆形.png" mode="aspectFit"></image>
						<text>最新签约</text>
					</view>
					<navigator class="more_text" url="../category/category">
						<text>更多</text>
						<image class="more_img" src="../../static/pages/download01.png" mode="aspectFit"></image>
					</navigator>
				</view>
				<view class="index_list_main_content">
					<view class="index_list_main_item" v-for="item in recommendList" :key="item.id">
						<image class="index_list_main_img" :src="item.imgUrl" mode="aspectFill"></image>
						<text class="index_list_main_text">{{ item.name }}</text>
						<text class="index_type">{{ item.type }}</text>
						<view class="index_list_main_text index_list_main_price">
							<image class='coin_img' src="../../static/pages/coin2.png" mode="aspectFit"></image>
							<text>{{ item.price }}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import HNavigationBar from '../components/hNavigationBar'
	import classBar from '../components/classBar'
	import RHeader from '../components/rheader.vue'
	export default {
		components: {
			RHeader,
			HNavigationBar,
			classBar
		},
		data() {
			return {
				background: [
					{
						name: 'A',
						bgColor: '#1AAD19'
					},
					{
						name: 'B',
						bgColor: '#2782D7'
					},
					{
						name: 'C',
						bgColor: 'orange'
					}
				],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				recommendList: [
					{
						'id': 1,
						'name': '明星名字',
						'price': '310000',
						'type': '影视明星',
						'imgUrl': '../../static/pages/mingxing.png'
					},
					{
						'id': 2,
						'name': '明星名字',
						'price': '1000000',
						'type': '体育明星',
						'imgUrl': '../../static/pages/mingxing.png'
					},
					{
						'id': 3,
						'name': '明星名字',
						'price': '30000',
						'type': '脱口秀明星',
						'imgUrl': '../../static/pages/mingxing.png'
					}
				]
			}
		},
		// mounted() {
		// 	this.showLogo = true
		// },
		methods: {
			upper() {
				console.log('upper')
			},
			lower() {
				console.log('lower')
			},
			scroll() {
				console.log('scroll')
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.detail.value
			},
			durationChange(e) {
				this.duration = e.detail.value
			}
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
		background: transparent;
	}
	.index_main {
		height: 100%;
	}
	.uni-margin-wrap {
		margin: 0 auto;
		width:730rpx;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		border-radius: 10px;
	}
	.index_list_wrap {
		width: 100%;
		min-height: calc(100% - 60px);
	}
	.index_list_main {
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.index_list_main_header {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 40rpx;
		display: flex;
		justify-content: space-between;
	}
	.index_list_main_content {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.index_list_main_item {
		flex: 0 0 30%;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		padding: 30rpx 0;
		box-sizing: border-box;
		font-size: 32rpx;
		overflow: hidden;
	}
	.index_list_main_img {
		width: 100%;
		height: 300rpx;
	}
	.index_list_main_text {
		margin: 10rpx 0;
		width: 100%;
		height: 42rpx;
		white-space:nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.index_list_main_price {
		font-size: 24rpx;
		color:#666666;
		display: flex;
		align-items: center;
	}
	.more_text {
		font-size: 30rpx;
		color:#808080;
	}
	.index_list_title {
		display: flex;
		align-items: center;
	}
	.title_img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
	.more_img {
		width: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
	.coin_img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
	
	.index_type {
		text-align: left;
		font-size: 24rpx;
		color: #808080;
	}
</style>
