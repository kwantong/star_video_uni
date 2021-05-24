<template>
	<view style="height:100%">
		<h-navigation-bar :showLogo="false" :title="title"  />
		
		<view class="topWrap" v-if="!cateStyle">
			<view class="initCategoryStyle">
				<view :class='[ item.id === selectedId ? "selected": "" , "cateItem"]' v-for="item in cateList" :key="item.id" @click="changeSelectCate(item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="">
				<button type="default" @click="openCateStyle">展开更多</button>
			</view>
		</view>
		<view class="topWrap" v-else>
			<view class="initCategoryStyle expandCate">
				<view :class='[ item.id === selectedId ? "selected": "" , "cateItem"]' v-for="item in cateList" :key="item.id" @click="changeSelectCate(item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="">
				<button type="default" @click="closeCateStyle">收起</button>
			</view>
		</view>
		
		<view class="res_wrap">
			<view class="res_tips">
				<view>
					<text>{{resName}}</text>
				</view>
			</view>
			<scroll-view scroll-y="true" >
				<z-paging ref="paging" @query="queryList" :list.sync="dataList">
					<view class="res_list">
						<view class="index_list_main_item" v-for="item in dataList" :key="item.id">
							<image class="index_list_main_img" :src="item.imgUrl" mode="aspectFill"></image>
							<text class="index_list_main_text">{{ item.name }}</text>
							<text class="index_type">{{ item.type }}</text>
							<view class="index_list_main_text index_list_main_price">
								<image class='coin_img' src="../../static/pages/coin2.png" mode="aspectFit"></image>
								<text>{{ item.price }}</text>
							</view>
						</view>
					</view>
				</z-paging>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import hNavigationBar from '../components/hNavigationBar'
	export default {
		components: {
			hNavigationBar
		},
		data() {
			return {
				cateStyle: false,
				resName: "影视明星（300）",
				title: "全部分类",
				selectedId: 0,
				cateList: [
					{
						id: 0,
						name: "影视明星"
					},
					{
						id: 1,
						name: "影视明星1"
					},
					{
						id: 2,
						name: "影视明星1"
					},
					{
						id: 3,
						name: "影视明星1"
					},
					{
						id: 4,
						name: "影视明星1"
					},
					{
						id: 5,
						name: "影视明星1"
					},
					{
						id: 6,
						name: "影视明星1"
					},
					{
						id: 7,
						name: "影视明星1"
					},
					{
						id: 8,
						name: "影视明星1"
					},
					{
						id: 9,
						name: "影视明星1"
					},
					{
						id: 10,
						name: "影视明星1"
					}
				]
				,
				dataList: [],
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
		methods: {
			changeSelectCate (id) {
				this.selectedId = id
			},
			queryList (pageNo, pageSize) {
				console.log('分页请求')
				console.log('页码：'+pageNo)
				console.log('数量：'+pageSize)
				setTimeout(() => {
					this.dataList = this.recommendList
				}, 500)
			},
			openCateStyle () {
				this.cateStyle = true
			},
			closeCateStyle () {
				this.cateStyle = false
			}
		}
	}
</script>

<style>
.topWrap {
	width: 100%;
	position: relative;
	z-index: 99999;
	box-sizing: border-box;
	background-color: #fff;
}
.initCategoryStyle {
	width: 100%;
	height: 120px;
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	overflow: hidden;
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
	height: 40px;
	line-height: 30px;
	padding: 5px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space:nowrap
}
.cateItem.selected {
	background-color: #FFDBE9;
	border-radius: 2px;
	color: #FF468E;
}
.res_list {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}
.index_list_main_item {
	flex: 0 0 48%;
	margin: 10rpx 1%;
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
