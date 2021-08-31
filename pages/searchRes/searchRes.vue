<template>
	<view style="height:100%">
		<h-navigation-bar :showBack="true" title="搜索" background-color="#FFFFFF"/>
		<!-- 搜索框 -->
		<view style="background-color: #FFFFFF;">
			<view class="searchBox">
				<icon type="search" size="16" style="margin-left: 6.1%;" />
				<input type="text" v-model="searchFrom.keyword" placeholder="请输入搜索关键字" style="margin-left: 1.9%;font-size:14px;" />
				<view class="searchBtn" @click="getSearch">搜索</view>
			</view>
			<class-bar />
		</view>
		<view class="res_wrap" v-if="searchList.length!==0">
			<view class="res_tips">
				<view style="color:#808080" v-if="searchFrom.keyword">
					<text>为您找到“{{searchFrom.keyword}}”相关结果({{total}})</text>
				</view>
			</view>
			<view class="tenant-list">
				<tenant-info :tenantInfo="item" v-for="(item,index) in searchList" :key="index"></tenant-info>
			</view>
		</view>
		<view v-else style="text-align: center;line-height: 200rpx;">暂无结果</view>
		
		<empty v-if="!searchList || searchList.length === 0"></empty>
		<uni-load-more v-if="searchList && searchList.length >= searchFrom.pageSize" :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import classBar from '@/components/classBar'
	import RHeader from '@/components/rheader.vue'
	import hNavigationBar from '@/components/hNavigationBar'
	import empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import TenantInfo from '@/components/TenantInfo/TenantInfo.vue'
	import { tenantSearch } from '@/api/home.js'
	export default {
		data() {
			return {
				searchFrom:{
					keyword:'',
					pageNum:1,
					pageSize:10
				},
				searchList: [],
				total:0,
				loadingType:'nomore',
			}
		},
		components: {
			RHeader,classBar,hNavigationBar,empty,UniLoadMore,TenantInfo
		},
		onLoad: function ({searchVal}) {
			this.searchFrom.keyword = searchVal
			
			this.getSearch()
		},
		onPullDownRefresh:function(){
			this.getSearch('refresh')
		},
		onReachBottom:function(){
			this.getSearch('add')
		},
		methods: {
			getSearch(type){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}else if(type === 'refresh'){
					this.queryData.pageNum = 1
					this.searchList = []
					uni.showLoading({
						title:'加载中'
					})
				}else{
					this.searchFrom.pageNum = 1
				}
				
				tenantSearch(this.searchFrom).then(res=>{
					const list = res.data.data.list || []
					this.total = res.data.data.total
					if(type=== 'add'){
						this.searchList = this.searchList.concat(list)
					}else{
						this.searchList = list
					}
					this.loadingType = this.total > this.searchList.length ?'more':'nomore'
					if(type === 'refresh'){
						uni.stopPullDownRefresh()
					}
					this.searchFrom.pageNum = this.searchFrom.pageNum + 1
				})
				
			}
		}
	}
</script>

<style scoped>
@import url('../../common/queryData.css');

.res_wrap {
	min-height: calc(100% - 192px);
	background: #F7F7F7;
	padding: 20rpx;
	box-sizing: border-box;
}

</style>
