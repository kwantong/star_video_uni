<template>
	<view class="nav" :style="{height: navH+'px',backgroundColor:backgroundColor}">
		<view class="status-bar" :style="'height: '+ statusBarHeight+'px;'"></view>
		
		<view class="status-title">
			<image src="/static/pages/logo.png" class="log-icon" v-if="showLogo"></image>
			<view class="back-box" v-if="showBack">
				<image src="/static/pages/back.png" class="back-icon" @click="back" ></image>
			</view>
			<view class="nav-title" :style="{'text-align': titleAlign,'padding-left':(titleAlign==='left'?(showLogo?'110rpx':(showBack?'50rpx':'30rpx')):'0') }">{{title}}</view>
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="showSearch" class='header-search-0'>
				<uni-search-bar cancelButton="none" bgColor="#EEEEEE" class="header-search-input" :radius="100" placeholder="关键字"  @confirm="search" v-model="searchValue"></uni-search-bar>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view v-if="showSearch" class='header-search-1'>
				<uni-search-bar cancelButton="none" bgColor="#EEEEEE" class="header-search-input" :radius="100" placeholder="关键字"  @confirm="search" v-model="searchValue"></uni-search-bar>
			</view>
			<!-- #endif -->
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name:"HNavigationBar",
		props: {
			showLogo: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '红角本'
			},
			titleAlign:{
				type: String,
				default: 'center'
			},
			showBack: {
				type: Boolean,
				default: false
			},
			showSearch: {
				type: Boolean,
				default: false
			},
			backgroundColor:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				navH: 0,
				statusBarHeight:0,
				searchValue: ''
			};
		},
		methods: {
			back() {
				let page = getCurrentPages() || [];
				if(page.length<=1){
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
				uni.navigateBack({
					delta: 1
				})
			},
			search() {
				uni.navigateTo({
					url: "/pages/searchRes/searchRes?searchVal=" + this.searchValue
				})
			}
		},
		created() {
			this.navH = this.StatusBar + 46
			this.statusBarHeight = this.StatusBar
			// console.log(this.statusBarHeight )
		},
	}
</script>

<style scoped>
.nav{
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-bottom: 18rpx;
}

.status-title{
	display: flex;
	position: relative;
	align-items: center;
	flex: 1;
	flex-direction: row;
}

.back-box{
	width: 60rpx;
	height: 100%;
	position: absolute;
	left: 10rpx;
	bottom: 0;
	display: flex;
	align-items: center;
}

.back-icon{
	width: 60rpx;
	height: 60rpx;
}

.log-icon{
	width: 80rpx;
	height: 100rpx;
	position: absolute;
	left: 20rpx;
	bottom: -12rpx;
}

.nav-title{
  font-family: PingFangTC-Medium;
  font-size: 36rpx;
  color: #000000;
  letter-spacing: 0;
  text-align: justify;
  font-weight: 500;
  text-align: center;
  margin-top: -6rpx;
  width: 100%;
}
.header-search-0 {
	width: calc(100vw - 230rpx - 85px);
	position: absolute;
	left: 220rpx;
	bottom: 0rpx;
}
.header-search-1 {
	width: calc(100vw - 230rpx);
	position: absolute;
	left: 220rpx;
	bottom: 0rpx;
}
.header-search-input {
	color: #FFFFFF;
}
</style>
