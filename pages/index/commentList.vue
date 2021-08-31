<template>
	<view style="min-height:100%">
		<h-navigation-bar :showBack="true" title="精彩评论" background-color="#FFFFFF"/>
		<view class="line"></view>
		<view style="background-color: #FFFFFF;">
			<view v-for="(item,index) in commentList" :key="index" class="comment-item">
				<!-- 标题栏 -->
				<view class="comment-title">
					<view style="display: flex;align-items: center">
						<view class="comment-headImg">
							<image class="allImg" :src="item.memberIcon" mode="aspectFill"></image>
						</view>
						<view style="margin-left:20rpx;">
							<view class="comment-name">{{item.memberNickName}}</view>
							<view class="comment-time">{{item.createTime && item.createTime.replace('T',' ').substring(0,19) || '--'}}</view>
						</view>
					</view>
					<view>
						<image v-for="(i,ind) of item.star" :key="index" class="starImg" src="../../static/pages/picture/starImg.png" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 内容txt --> 
				<view class="comment-text">
					{{item.content}}
				</view>
				<!-- 回复内容 去掉 -->
			<!-- 	<view class="replycontent">
					<text style="color: #3B92FF;">春天吃了自己：</text>
					出版社出版社出版和上次不是
				</view> -->
				<!-- <view style="height: 30rpx;">
					<view style="float: right;font-size: 24rpx;color: #FF2E80;font-weight: 400;" @click="reply">回复</view>
				</view> -->
				<view class="grey-line"></view>
			</view>
		</view>
			
		<view v-if="commentList.length == 0" style="text-align: center;line-height: 200rpx;">
			暂无评论
		</view>
			
		<!-- 说点什么 -->
		<view class="comment-bottom-box" :style="'height: '+(bootomSpace+100)+'rpx;'">
			<view class="comment-bottom">
				<view class="comment-headImg">
					<image class="allImg" src="" mode="aspectFill"></image>
				</view>
				<view class="comment-input" @tap="getcommentAdd">
					说些什么
				</view>
			</view>
		</view>
		
		<!-- 评论弹框 -->
		<commentModel @cancel='commentCancel' @confirm="commentConfirm" v-show="commentModelShow"></commentModel>
		
		<empty v-if="!commentList || commentList.length === 0"></empty>
		<uni-load-more v-if="commentList && commentList.length >= 0" :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import commentModel from '@/components/commentModel/commentModel.vue'
	import empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { commentList, toComment } from '@/api/home.js'
	export default {
		components: {
			HNavigationBar,commentModel,empty,UniLoadMore
		},
		onLoad(options){
			this.commentFrom.tenantId = options.id
			this.addCommentParam.tenantId = options.id
			if(this.commentFrom.tenantId){
				this.getcommentList('')
			}else{
				this.$api.msg('未获取到id信息')
			}
		},
		onPullDownRefresh:function(){
			this.getcommentList('refresh')
		},
		onReachBottom:function(){
			this.getcommentList('add')
		},
		data() {
			return {
				bootomSpace:this.$bottomSpace,
				commentFrom:{
					pageNum:1,
					pageSize:10,
					tenantId:''
				},
				commentList:[],
				addCommentParam:{
					content:"",
					star:'',
					tenantId:''
				},
				commentModelShow:false,
				total:0,
				loadingType:'nomore',
			}
		},
		
		methods: {
			getcommentList(type){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return
					}
					this.loadingType = 'loading'
					uni.showLoading({ title: '正在加载'})
				}else if(type === 'refresh'){
					this.commentFrom.pageNum = 1
					this.commentList = []
					uni.showLoading({
						title:'加载中'
					})
				}
				
				commentList(this.commentFrom).then(res=>{
					const list = res.data.data.list || []
					this.total = res.data.data.total
					if(type=== 'add'){
						this.commentList = this.commentList.concat(list)
					}else{
						this.commentList = list
					}
					this.loadingType = res.data.data.total > this.commentList.length ?'more':'nomore'
					if(type === 'refresh'){
						uni.stopPullDownRefresh()
					}
					this.commentFrom.pageNum = this.commentFrom.pageNum + 1
				})
			},
			// 提交评论
			getcommentAdd(){
				this.commentModelShow = true
			},
			// 取消评论
			commentCancel() {
				this.commentModelShow = false
			},
			// 确定评论
			commentConfirm(content,star){
				this.addCommentParam.content = content
				this.addCommentParam.star = star
				toComment(this.addCommentParam).then(res=>{
					this.$api.msg('评论成功')
					this.commentModelShow = false
					this.getcommentList()
				})
			},
		}
	}
</script>

<style scoped>
@import url('../../common/queryData.css');
.replycontent{
	width:auto;
	height: auto;
	background: #F6F6F6;
	padding: 15rpx 20rpx;
	margin:20rpx 0;
	font-size: 24rpx;
	color: #000000;
}
.comment-bottom-box{
	width: 100%;
	height: 100rpx;
	position: fixed;bottom: 0;
	background: #F7F7F7;
}
</style>
