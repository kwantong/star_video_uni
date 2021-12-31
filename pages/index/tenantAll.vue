<template>
	<view>
		<h-navigation-bar :showBack="true" :title="typeName" background-color="#FFFFFF"/>
		<view class="line"></view>
		<view>
			<view class="tenant-list">
				<tenant-info :tenantInfo="item" :showHot="typeId == '1'" v-for="(item,index) in List" :key="index"></tenant-info>
			</view>
		</view>
		
		<empty v-if="!List || List.length === 0"></empty>
		<uni-load-more v-if="List && List.length >= 0" :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar'
	import TenantInfo from '@/components/TenantInfo/TenantInfo.vue'
	import empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { findDisCountList,findHotTenantList,findNewList,findRecommendList } from '@/api/home.js'
	export default {
		data() {
			return {
				typeId:'',
				typeName:'',
				queryData:{
					pageNum:1,
					pageSize:10
				},
				List: [],
				loadingType:'nomore',
			}
		},
		components: {
			hNavigationBar,empty,UniLoadMore,TenantInfo
		},
		onLoad: function ({type}) {
			this.typeId = type
			if(this.typeId == '1'){
				this.typeName = '人气明星'
				this.getfindHotTenantList('')
			}else if(this.typeId == '2'){
				this.typeName = '推荐艺人'
				this.getfindRecommendList('')
			}else if(this.typeId == '3'){
				this.typeName = '打折活动'
				this.getfindDisCountList('')
			}else if(this.typeId == '4'){
				this.typeName = '最新签约'
				this.getfindNewList('')
			}
		},
		onPullDownRefresh:function(){
			this.getfindHotTenantList('refresh')
			this.getfindRecommendList('refresh')
			this.getfindDisCountList('refresh')
			this.getfindNewList('refresh')
		},
		onReachBottom:function(){
			this.getfindHotTenantList('add')
			this.getfindRecommendList('add')
			this.getfindDisCountList('add')
			this.getfindNewList('add')
		},
		methods: {
			getfindHotTenantList(type){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}else if(type === 'refresh'){
					this.queryData.pageNum = 1
					this.List = []
					uni.showLoading({
						title:'加载中'
					})
				}
				findHotTenantList(this.queryData).then(res=>{
					const list = res.data.data.list || []
					if(type=== 'add'){
						this.List = this.List.concat(list)
					}else{
						this.List = list
					}
					this.loadingType = res.data.data.total > this.List.length ?'more':'nomore'
					if(type === 'refresh'){
						uni.stopPullDownRefresh()
					}
					this.queryData.pageNum = this.queryData.pageNum + 1
					uni.hideLoading()
				})
			},
			getfindRecommendList(type){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}else if(type === 'refresh'){
					this.queryData.pageNum = 1
					this.List = []
					uni.showLoading({
						title:'加载中'
					})
				}
				findRecommendList(this.queryData).then(res=>{
					const list = res.data.data.list || []
					if(type=== 'add'){
						this.List = this.List.concat(list)
					}else{
						this.List = list
					}
					this.loadingType = res.data.data.total > this.List.length ?'more':'nomore'
					if(type === 'refresh'){
						uni.stopPullDownRefresh()
					}
					this.queryData.pageNum = this.queryData.pageNum + 1
					uni.hideLoading()
				})
			},
			getfindDisCountList(type){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}else if(type === 'refresh'){
					this.queryData.pageNum = 1
					this.List = []
					uni.showLoading({
						title:'加载中'
					})
				}
				findDisCountList(this.queryData).then(res=>{
					const list = res.data.data.list || []
					if(type=== 'add'){
						this.List = this.List.concat(list)
					}else{
						this.List = list
					}
					this.loadingType = res.data.data.total > this.List.length ?'more':'nomore'
					if(type === 'refresh'){
						uni.stopPullDownRefresh()
					}
					this.queryData.pageNum = this.queryData.pageNum + 1
					uni.hideLoading()
				})
			},
			getfindNewList(type){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}else if(type === 'refresh'){
					this.queryData.pageNum = 1
					this.List = []
					uni.showLoading({
						title:'加载中'
					})
				}
				findNewList(this.queryData).then(res=>{
					const list = res.data.data.list || []
					if(type=== 'add'){
						this.List = this.List.concat(list)
					}else{
						this.List = list
					}
					this.loadingType = res.data.data.total > this.List.length ?'more':'nomore'
					if(type === 'refresh'){
						uni.stopPullDownRefresh()
					}
					this.queryData.pageNum = this.queryData.pageNum + 1
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style scoped>
@import url('../../common/queryData.css');

</style>
