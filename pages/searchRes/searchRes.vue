<template>
	<view style="height:100%">
		<h-navigation-bar :showLogo="false" :title="title"  />
		<r-header />
		<class-bar />
		<view class="res_wrap">
			<view class="res_tips">
				<view style="color:#808080">
					<text>为您找到“{{searchVal}}”相关结果</text>
				</view>
				<view>
					<text>{{resName}}</text>
				</view>
			</view>
			<scroll-view scroll-y="true" >
				<z-paging ref="paging"  @query="queryList" :list.sync="dataList">
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
	import classBar from '../components/classBar'
	import RHeader from '../components/rheader.vue'
	import hNavigationBar from '../components/hNavigationBar'
	export default {
		data() {
			return {
				title: "搜索结果",
				searchVal: "影视",
				resName: "影视明星（300）",
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
		components: {
			RHeader,
			classBar,
			hNavigationBar
		},
		onLoad: function ({searchVal}) {
			console.log(searchVal)
			this.searchVal = searchVal
		},
		methods: {
			queryList (pageNo, pageSize) {
				console.log('分页请求')
				console.log('页码：'+pageNo)
				console.log('数量：'+pageSize)
				setTimeout(() => {
					this.dataList = this.recommendList
				}, 500)
			}
		}
	}
</script>

<style scoped>
.res_wrap {
	min-height: calc(100% - 192px);
	background: #efefef;
	padding: 20rpx;
	box-sizing: border-box;
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
