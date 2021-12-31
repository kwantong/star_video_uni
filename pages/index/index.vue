<template>
	<view class="index_main">
		<h-navigation-bar  :showLogo="true" :showSearch="true" titleAlign="left" background-color="#FFFFFF"></h-navigation-bar>
		<r-header></r-header>
		<view>
			<view class="uni-margin-wrap" v-if="list.advertiseList && list.advertiseList.length > 0 ">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" indicator-active-color="#FF3636" indicator-color="#FFFFFF" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in list.advertiseList" :key="index" @click="goBannerInfo(item)">
						<image class="swiper-item" :src="item.pic"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- <class-bar /> -->
			<view class="index_list_main" v-if="list.recommendTenantList && list.recommendTenantList.length > 0 ">
				<home-line-title title="推荐艺人" linkUrl="./tenantAll?type=2"></home-line-title>
				<view class="list_main_content">
					<view class="list_main_item" v-for="(item,index) in list.recommendTenantList" v-if="index < 3" :key="index" @click="getstarDetails(item)">
						<image class="list_main_img" :src="item.thumbnailUrl" mode="aspectFill"></image>
						<view class="list_main_text">
							<view class="list_main_name">{{ item.realName }}</view>
							<view class="goodsTypeHidden">
								<text class="list_main_type" v-for="(i,ind) in item.tenantTypeList" :key="ind">{{i.tenantTypeName}}</text>
							</view>
							<view class="list_main_price">
								<image class='list_main_coinImg' src="/static/pages/me/coin.png" mode="aspectFit"></image>
								<text>{{ item.afterDiscountPrice }} 角本币</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="index_list_main" v-if="list.hotTenantList && list.hotTenantList.length > 0 ">
				<home-line-title title="人气明星" linkUrl="./tenantAll?type=1"></home-line-title>
				<view class="list_main_content">
					<view class="list_main_item popularStars" v-for="(item,index) in list.hotTenantList" v-if="index < 3" :key="index" @click="getstarDetails(item)">
						<image class="list_main_img" :src="item.thumbnailUrl" mode="aspectFill"></image>
						<image class="popularStarsTagimg" src="../../static/pages/picture/popularStar.png" mode="aspectFill"></image>
						<view class="list_main_text">
							<view class="list_main_name">{{ item.realName }}</view>
							<view class="goodsTypeHidden">
								<text class="list_main_type" v-for="(i,ind) in item.tenantTypeList" :key="ind">{{i.tenantTypeName}}</text>
							</view>
							<view class="list_main_price">
								<image class='list_main_coinImg' src="/static/pages/me/coin.png" mode="aspectFit"></image>
								<text>{{ item.afterDiscountPrice }} 角本币</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 打榜-->
			<!-- <view style="width: 100%;height: 350rpx;">
				<image style="width: 100%;height: 100%;" src="../../static/pages/picture/advertisement.png" mode="aspectFit"></image>
			</view> -->
			
			<view class="index_list_main" v-if="list.discountTenantList && list.discountTenantList.length > 0 ">
				<home-line-title title="打折活动" linkUrl="./tenantAll?type=3"></home-line-title>
				<view class="list_main_content">
					<view class="list_main_item" v-for="(item,index) in list.discountTenantList" v-if="index < 3" :key="index" @click="getstarDetails(item)">
						<image class="list_main_img" :src="item.thumbnailUrl" mode="aspectFill"></image>
						<view class="list_main_text">
							<view class="list_main_name">{{ item.realName }}</view>
							<view class="goodsTypeHidden">
								<text class="list_main_type" v-for="(i,ind) in item.tenantTypeList" :key="ind">{{i.tenantTypeName}}</text>
							</view>
							<view class="list_main_price">
								<image class='list_main_coinImg' src="../../static/pages/me/coin.png" mode="aspectFit"></image>
								<text>{{ item.afterDiscountPrice }} 角本币</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="index_list_main"  v-if="list.newTenantList && list.newTenantList.length > 0 ">
				<home-line-title title="最新签约" linkUrl="./tenantAll?type=4"></home-line-title>
				<view class="list_main_content">
					<view class="list_main_item" v-for="(item,index) in list.newTenantList" v-if="index < 3" :key="index" @click="getstarDetails(item)">
						<image class="list_main_img" :src="item.thumbnailUrl" mode="aspectFill"></image>
						<view class="list_main_text">
							<view class="list_main_name">{{ item.realName }}</view>
							<view class="goodsTypeHidden">
								<text class="list_main_type" v-for="(i,ind) in item.tenantTypeList" :key="ind">{{i.tenantTypeName}}</text>
							</view>
							<view class="list_main_price">
								<image class='list_main_coinImg' src="/static/pages/me/coin.png" mode="aspectFit"></image>
								<text>{{ item.afterDiscountPrice }} 角本币</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<block v-if="list.customTagList && list.customTagList.length > 0 " >
				<view class="index_list_main" v-if="cl.tenantList && cl.tenantList.length > 0 " v-for="(cl,indexl) in  list.customTagList" :key="indexl">
					<home-line-title :title="cl.tenantTypeName" openType="reLaunch" :linkUrl="'../category/index?id='+cl.tenantTypeId"></home-line-title>
					<view class="list_main_content">
						<view class="list_main_item" v-for="(item,index) in cl.tenantList" v-if="index < 3" :key="index" @click="getstarDetails(item)">
							<image class="list_main_img" :src="item.thumbnailUrl" mode="aspectFill"></image>
							<view class="list_main_text">
								<view class="list_main_name">{{ item.realName }}</view>
								<view class="goodsTypeHidden">
									<text class="list_main_type" v-for="(i,ind) in item.tenantTypeList" :key="ind">{{i.tenantTypeName}}</text>
								</view>
								<view class="list_main_price">
									<image class='list_main_coinImg' src="/static/pages/me/coin.png" mode="aspectFit"></image>
									<text>{{ item.afterDiscountPrice }} 角本币</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import HomeLineTitle from '@/components/HomeLineTitle/HomeLineTitle.vue'
	import classBar from '@/components/classBar'
	import RHeader from '@/components/rheader.vue'
	import { getHomeList } from '@/api/home.js'
	export default {
		components: {
			RHeader,
			HNavigationBar,
			HomeLineTitle,
			classBar
		},
		data() {
			return {
				list:[],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
			}
		},
		onLoad(){
			// this.getHomeList()
		},
		onShow:function(){
			this.getHomeList()
		},
		onShareAppMessage:function(){
			return {
				title:'快来红角本，让喜欢的明星为你制作属于你的视频祝福吧',
				path:'/pages/index/index',
				imageUrl:'/static/pages/indexshare.png'
			}
		},
		methods: {
			getHomeList(){
				getHomeList().then(res=>{
					console.log(res)
					this.list = res.data.data || []
				})
			},
			getstarDetails(item){
				uni.navigateTo({
				 url:'/pages/index/starDetails?id=' + item.id
				})
			},
			goBannerInfo(item){
				if(!item.url){
					return
				}
				uni.navigateTo({
					url:item.url
				})
			}
		}
	}
</script>

<style scoped>
	@import url('../../common/queryData.css');
	page{
		background-color: #FFFFFF;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
		background: transparent;
	}
	/*#ifdef H5 */
	.index_main {
		padding-bottom: 120rpx;
		background-color: #FFFFFF;
	}
	/* #endif */
	/*#ifdef MP */
	.index_main {
		/* margin-bottom: 120rpx; */
		background-color: #FFFFFF;
	}
	/* #endif */
	
	.uni-margin-wrap {
		margin: 0 auto;
		width:730rpx;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		width: 100%;
		line-height: 300rpx;
		text-align: center;
		border-radius: 10px;
	}
	.index_list_wrap {
		width: 100%;
		min-height: calc(100% - 60px);
		background-color: #FFFFFF;
	}
	.index_list_main {
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.popularStars{
		position: relative;
	}
	.popularStarsTagimg{
		width: 49rpx;
		height: 62rpx;
		position: absolute;
		left: 10rpx;top: 30rpx;
	}
	.popularStarsBottomText{
		width: 100%;
		height: auto;
		position: absolute;
		left: 10rpx;bottom: 40rpx;
		color: #FFFFFF;
	}
	.popularStarsPrice{
		margin-right: 20rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content:space-between;
	}
	
	/* 类型多出...隐藏 */
	.goodsTypeHidden{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
</style>
