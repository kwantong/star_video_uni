<template>
	<view class="container">
		<h-navigation-bar class="head-bar" :showBack="false" title="全部分类" background-color="#FFFFFF"/>
		
		<view class="topWrap" v-if="!cateStyle">
			<view class="initCategoryStyle">
				<view class="cateItem" v-if="index < 10" :class="{selected: item.simpleId === queryData.tenantTypeId }" v-for="(item,index) in simpleAll" :key="index" @click="changeSelectCate(item.simpleId)">
					{{item.tenantTypeName}}
				</view>
			</view>
			<view class="line" v-if="simpleAll && simpleAll.length > 10"></view>
			<view style="background-color: #F8F7F6;" v-if="simpleAll && simpleAll.length > 10">
				<view class="see-more" type="default" @click="openCateStyle">查看更多</view>
			</view>
		</view>
		<view class="topWrap" style="position: relative;" v-else>
			<view class="initCategoryStyle expandCate" style="background:#FFFFFF ;">
				<view class="cateItem" :class="{selected:item.simpleId === queryData.tenantTypeId}" v-for="(item,index) in simpleAll" :key="index" @click="changeSelectCate(item.simpleId)">
					{{item.tenantTypeName}}
				</view>
			</view>
			<view class="line"></view>
			<view class="see-more" type="default" @click="closeCateStyle">收起</view>
		</view>
		<!-- 遮罩层 -->
		<view v-if="cateStyle" style="width: 100vw;height: 100vh;background: rgba(0,0,0,0.5);position: fixed;top: 0;left: 0;z-index: 1;"></view>
		
		<!-- 查询结果 -->
		<view>
			<view class="category-title">
				{{resName}}({{total}})
			</view>
			<view class="tenant-list">
				<tenant-info :tenantInfo="item" v-for="(item,index) in findPageList" :key="index"></tenant-info>
			</view>
			<empty v-if="!findPageList || findPageList.length === 0"></empty>
			<uni-load-more v-if="findPageList && findPageList.length >= 0" :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar'
	import TenantInfo from '@/components/TenantInfo/TenantInfo.vue'
	import empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { tenantTypeSimpleAll,tenantTypefindPage } from '@/api/home.js'
	export default {
		components: {
			hNavigationBar,empty,UniLoadMore,TenantInfo
		},
		data() {
			return {
				cateStyle: false,
				resName: "全部",
				selectedId: 0,
				
				simpleAll:[],
				queryData:{
					pageNum:1,
					pageSize:10,
					tenantTypeId:''
				},
				findPageList:[],
				total:0,
				loadingType:'nomore',
			}
		},
		computed:{
			getTypeName(){
				for (var i = 0; i < this.simpleAll.length; i++) {
					const temp = this.simpleAll[i]
					if(temp.id = this.queryData.tenantTypeId){
						return temp.tenantTypeName ||'全部'
					}
				}
				return '全部'
			}
		},
		onLoad:function(options){
			if(options.id != undefined){
				this.queryData.tenantTypeId = options.id * 1
			}else{
				this.queryData.tenantTypeId = ''
			}
			this.getSimpleAll()
			this.getfindPage('')
			// this.changeSelectCate()
		},
		onPullDownRefresh:function(){
			this.getfindPage('refresh')
		},
		onReachBottom:function(){
			this.getfindPage('add')
		},
		methods: {
			changeSelectCate (id) {
				console.log('changeSelectCate-->',id)
				this.queryData.tenantTypeId = id
				this.queryData.pageNum = 1
				this.getfindPage('')
			},
			openCateStyle () {
				this.cateStyle = true
			},
			closeCateStyle () {
				this.cateStyle = false
			},
			// 分类list
			getSimpleAll(){
				tenantTypeSimpleAll().then(res=>{
					this.simpleAll = res.data.data || []
					this.simpleAll.forEach(item=>{
						item['simpleId'] = item.id
					})
					
					const resObj = this.simpleAll.find(t => this.queryData.tenantTypeId == t.id) || {}
					this.resName = resObj && resObj.tenantTypeName || '全部'
				})
			},
			// 查询数据
			getfindPage(type){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}else if(type === 'refresh'){
					this.queryData.pageNum = 1
					this.findPageList = []
					uni.showLoading({
						title:'加载中'
					})
				}
				const resObj = this.simpleAll.find(t => this.queryData.tenantTypeId == t.simpleId) || {}
				this.resName = resObj && resObj.tenantTypeName || '全部'
				
				tenantTypefindPage(this.queryData).then(res=>{
					const list = res.data.data.list || []
					this.total = res.data.data.total
					if(type=== 'add'){
						this.findPageList = this.findPageList.concat(list)
					}else{
						this.findPageList = list
					}
					this.loadingType = res.data.data.total > this.findPageList.length ?'more':'nomore'
					if(type === 'refresh'){
						uni.stopPullDownRefresh()
					}
					this.queryData.pageNum = this.queryData.pageNum + 1
				})
			}
		}
	}
</script>

<style scoped>
@import url('../../common/queryData.css');
/*#ifdef H5 */
.container {
	padding-bottom: 120rpx;
}
/* #endif */
.category-title{
	font-size: 36rpx;
	font-family: PingFangTC-Regular, PingFangTC;
	font-weight: 400;
	color: #000000;
	padding: 30rpx 0 0 30rpx;
}
.head-bar >>>  .nav{
	position: relative;
	z-index: 9999;
}
/* 分类 */
.topWrap {
	width: 100%;
	position: relative;
	z-index: 99999;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 0 0 20rpx 20rpx;
	overflow: hidden;
}
.initCategoryStyle {
	width: 100%;
	height: 200rpx;
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	overflow: hidden;
}
.see-more{
	text-align: center;
	padding: 30rpx 0;
	font-size: 28rpx;
	color: #FF2E80;
	background-color: #FFFFFF;
}
.expandCate {
	height: auto;
	overflow: visible;
}
.cateItem {
	font-size: 14px;
	flex: 0 0 18%;
	margin: 5px 1%;
	box-sizing: border-box;
	text-align: center;
	border-radius: 2px;
	height: 34px;
	line-height: 30px;
	padding: 2px 5px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space:nowrap
}
.cateItem.selected {
	background-color: #FFDBE9;
	border-radius: 2px;
	color: #FF468E;
}
</style>
