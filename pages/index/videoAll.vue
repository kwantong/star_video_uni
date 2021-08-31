<template>
	<view style="min-height:100%;">
		<h-navigation-bar :showBack="true" title="明星视频"  background-color="#FFFFFF"/>
		<view class="starVideo">
			<view class="starVideo_item" v-for="(item,index) in videoData" :key="index">
				<view class="starVideo-video">
					<video :src="item.videoUrl" @loadedmetadata="function(e){videLoaded(e,index)}" controls :poster="item.videoThumbnailUrl"></video>
				</view>
				<view class="starVideo_itemBottom">
					<view class="starVideo_itemText">{{'赠送给: '+(item.videoGiftTo || '--')}}</view>
					<view class="starVideo_itemTime">
						<image class="time-pink" src="../../static/pages/picture/timePink.png" mode="aspectFill"></image>
						<text class="time-pink-text">
							<!-- {{item.duration | dateFormat}} -->
							{{videoDuration[index] | dateFormat}}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import { videoList } from '@/api/home.js'
	import dateFormat from '@/common/dateFormat.js'
	export default {
		components: {
			HNavigationBar
		},
		onLoad(options){
			this.videoFrom.tenantId = options.id
			if(this.videoFrom.tenantId){
				this.getvideoList()
			}else{
				this.$api.msg('未获取到id信息')
			}
		},
		filters: {
			dateFormat: dateFormat.timeTurn,
		},
		data() {
			return {
				videoFrom:{
					pageNum:1,
					pageSize:10,
					tenantId:''
				},
				videoData:[],
				videoDuration:[]
			}
		},
		methods: {
			getvideoList(){
				videoList(this.videoFrom).then(res=>{
					this.videoData = res.data.data.list || []
				})
			},
			videLoaded(e,index){
				const that = this
				that.videoDuration[index] = e.detail.duration || 0
				if(index === this.videoData.length - 1){
					this.$forceUpdate()
				}
			},
		}
	}
</script>

<style scoped>
.starVideo{
	display: flex;
	flex-wrap: wrap;
	/* justify-content:space-around; */
}
.starVideo_item {
	width: 46%;
	/* height: 300rpx; */
	border: 1px solid #F0F0F0;
	border-radius: 8rpx;
	overflow: hidden;
	margin: 10rpx 0;
	display: inline-block;
}
.starVideo_item:not(:nth-child(2n)){
	margin-left: calc(2%);
	margin-right: calc(3%);
}

.starVideo_item:not(:nth-child(n)){
	margin-right: calc(2%);
}

.starVideo-video{
	width: 100%;
	height: calc(46vw/9*16);
}
.starVideo-video video{
	height: 100%;
	width: 100%;
}
.starVideo_itemBottom{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20rpx 15rpx;
}
.starVideo_itemText{
	width: 210rpx;font-size: 22rpx;color: #000000;font-weight: 400;
	overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
}
.starVideo_itemTime{
	background: #FFEDF4;border-radius: 6rpx;padding:4px;
	display: flex;align-items: center;justify-content: center;
}
.time-pink{
	width: 16rpx;
	height: 16rpx;
	margin-right: 5rpx;
}
.time-pink-text{
	font-size: 16rpx;
	color: #FF2E80;
	font-weight: 600;
}
</style>
