<template>
	<view class="head-bar">
		<view class="navbar" :style="{ position: headerPosition, top: headerPosition === 'fixed'?headerTop:'0',fontSize:fontSize+'rpx' }" :class="{'navbar-fixed':headerPosition === 'fixed'}">
			<view class="nav-item" v-for="(item,index) in navbarList" :class="{ current: filterIndex === index }" @click="eventClick(index)">{{item.name}}</view>
		</view>
		<view class="navbar-line" v-if="headerPosition && headerPosition === 'fixed'"></view>
	</view>
</template>

<script>
	export default {
		name: 'HeadBar',
		props:{
			navbarList: {
				type:Array,
				default:function(){return []}
			},
			headerPosition:{
				type:String,
				default:'relative'
			},
			fontSize:{
				type:Number,
				default:34
			}
		},
		onLoad:function(){
		},
		mounted:function(){
		},
		data() {
			return {
				headerTop: '0px',
				statusBarHeight:0,
				filterIndex:0
			}
		},
		methods:{
			eventClick:function(index){
				this.filterIndex = index
				this.$emit('eventClick',index)
			}
		}
		
	}
</script>

<style lang="scss">
	.navbar-line{
		height: 88rpx;
	}
	.navbar {
		display: flex;
		width: 100%;
		height: 88rpx;
		background-color: #FFFFFF;
		color: #999999;
		box-shadow: 0rpx 16rpx 24rpx 0rpx rgba(0,0,0,0.04);
		font-size: 26px;
		justify-content: space-around;
		align-items: center;
		position: relative;
	}
	.navbar-fixed{
		border-top: 2rpx solid rgba(0,0,0,0.04);
		left: 0;
		top: 0;
		right: 0;
		z-index: 10;
	}
	.nav-item {
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		font-family: PingFangSC-Light, PingFang SC;
		font-size: 26rpx;
		font-weight: 300;
		color: #333333;
	}
	.nav-item.current {
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FF2E80;
	}
	.current::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0rpx;
		transform: translateX(-50%);
		width: 60rpx;
		height: 6px;
		height: 0;
		border-bottom: 6rpx solid #FF2E80;
		border-radius: 6rpx;
	}
</style>
