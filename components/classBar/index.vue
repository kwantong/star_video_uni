<template>
	<view class="index_nav">
		<scroll-view scroll-x="true" scroll-left="120" class="index_nav_scroll">
			<view class="index_nav_item" v-for="(item,index) in allTenantType" :key="index" @click="goClassPage(item)">
				<text>{{item.tenantTypeName}} ({{item.tenantCount}})</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { tenantTypefullAll } from '@/api/home.js'
	export default {
		data() {
			return {
				allTenantType:[],
			}
		},
		mounted(){
			this.getHomeList()
		},
		methods: {
			getHomeList(){
				tenantTypefullAll().then(res=>{
					this.allTenantType = res.data.data || []
				})
			},
			goClassPage(item){
				uni.reLaunch({
				 url:'/pages/category/index?id=' + item.id
				})
			}
		},
	}
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
