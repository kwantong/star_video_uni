<template>
	<view class="container">
		<h-navigation-bar :show-back="true" title="收藏" background-color="#FFFFFF"></h-navigation-bar>
		<view class="line"></view>

		<view class="collect-list">
			<tenant-info :tenantInfo="item" v-for="(item,index) in collectList" :key="index"></tenant-info>
		</view>
		
		<empty v-if="!collectList || collectList.length === 0"></empty>
		<uni-load-more v-if="collectList && collectList.length >= queryData.pageSize" :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	import TenantInfo from '@/components/TenantInfo/TenantInfo.vue'
	import empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { getColletList } from '@/api/collect.js'
	export default {
		components:{
			hNavigationBar,empty,UniLoadMore,TenantInfo
		},
		data() {
			return {
				loadingType:'nomore',
				queryData:{
					pageNum:1,
					pageSize:10
				},
				collectList:[]
			}
		},
		onLoad:function(){
			this.queryCollectList('')
		},
		onPullDownRefresh:function(){
			this.queryCollectList('refresh')
		},
		onReachBottom:function(){
			this.queryCollectList('add')
		},
		methods: {
			queryCollectList(type){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}else if(type === 'refresh'){
					this.queryData.pageNum = 1
					this.collectList = []
					uni.showLoading({
						title:'加载中'
					})
				}
				getColletList(this.queryData).then(res=>{
					const list = res.data.data.list || []
					list.map(item => {
					  item['id'] = item.tenantId
					  item['username'] = item.tenantRealName
					  item['realName'] = item.tenantRealName
					  item['thumbnailUrl'] = item.tenantThumbnailUrl
					})
					if(type=== 'add'){
						this.collectList = this.collectList.concat(list)
					}else{
						this.collectList = list
					}
					this.loadingType = res.data.data.total > this.collectList.length ?'more':'nomore'
					if(type === 'refresh'){
						uni.stopPullDownRefresh()
					}
					this.queryData.pageNum = this.queryData.pageNum + 1
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style scoped>
	.collect-list{
		display: flex;
		flex-wrap: wrap;
		justify-content:space-between;
		margin: 40rpx 30rpx;
	}
	/* #ifdef MP */
	.collect-list tenant-info{
		display: contents;
	}
	/* #endif */
</style>
