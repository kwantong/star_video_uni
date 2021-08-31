<template>
	<view class="nav" :style="{height: navH+'px',backgroundColor:backgroundColor}">
		<view class="status-bar" :style="'height: '+ statusBarHeight+'px;'"></view>
		
		<view class="status-title">
			<image src="/static/pages/logo.png" class="log-icon" v-if="showLogo"></image>
			<view class="back-box" v-if="showBack">
				<image src="/static/pages/back.png" class="back-icon" @click="back" ></image>
			</view>
			<view class="nav-title" :style="{'text-align': titleAlign,'padding-left':(titleAlign==='left'?(showLogo?'110rpx':(showBack?'50rpx':'30rpx')):'0') }">{{title}}</view>
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
			backgroundColor:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				navH: 0,
				statusBarHeight:0
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
			}
		},
		created() {
			this.navH = this.StatusBar + 46
			this.statusBarHeight = this.StatusBar
			// console.log(this.statusBarHeight )
		}
	}
</script>

<style scoped>
.nav{
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  
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
	width: 84rpx;
	height: 110rpx;
	position: absolute;
	left: 20rpx;
	bottom: -20rpx;
}

.nav-title{
  font-family: PingFangTC-Medium;
  font-size: 36rpx;
  color: #000000;
  letter-spacing: 0;
  text-align: justify;
  font-weight: 500;
  text-align: center;
  width: 100%;
}
</style>
