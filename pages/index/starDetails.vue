<template>
	<scroll-view class="container" :style="'height: '+scrollHeight+'px;'" scroll-y="true" @scroll="watchShopContent">
		<h-navigation-bar :class="{'navigation-bar':scrollTop < 1,'navigation-bar-fixed':scrollTop >= 1}" :backgroundColor="scrollTop >= 30?'#FFFFFF':''" :showBack="true" title="明星详情"/>
		<!-- 图片 -->
		<view class="detail-introduce">
			<video @error="onVideoLoadError" v-if="detailsData.verificationVideoUrl && !videoLoadError" :src="detailsData.verificationVideoUrl" controls :poster="detailsData.videoThumbnailUrl"></video>
			<image v-else :src="detailsData.thumbnailUrl" mode="aspectFill"></image>
		</view>
		<!-- StarName -->
		<view style="background-color: #FFFFFF;">
			<view class="StarNameBox">
				<view class="StarName">{{detailsData.realName}}</view>
				<view style="margin:0 1.7%;">
					<image v-for="(item,index) of tenantScore" :key="index" class="starImg" src="../../static/pages/picture/starImg.png" mode="aspectFill"></image>
				</view>
				<view class="collect on" @click="collection" v-if="collectionShow === false">收藏</view>
				<view class="collect" @click="getcollectionDelete" v-if="collectionShow === true">取消收藏</view>
				
				<!-- #ifdef MP -->
				<view class="share-icon-box" @click="toggleShareFlag">
					<image class="share-img-icon" src="../../static/pages/detail/share.png"></image>
					<text>分享</text>
				</view>
				<!-- #endif -->
			</view>
			<view class="Starlabel">
				<image style="width: 21rpx;height: 21rpx;" src="../../static/pages/picture/biaoqian.png" mode="aspectFill"></image>
				<view v-for="(item,index) in detailsData.tenantTypeList" :key="index" style="margin-left: 1.3%;font-size: 24rpx;color: #999999;">
					{{item.tenantTypeName}}
				</view>
			</view>
			<view class="Starlabel">
				<navigator hover-class="none" url="/pages/csChat/index/index">
					<text style="color:#FF3636;font-size: 28rpx;">在线客服</text>
				</navigator>
			</view>
			<view class="StarDynamic">
				<view style="left: 4%;top: 20rpx;position: absolute;">
					<image style="width: 21rpx;height: 19rpx;" src="../../static/pages/picture/quotationMarksbottom.png" mode="aspectFill"></image>
				</view>
				<view class="StarDynamicText">
					{{detailsData.introduction || ' '}}
				</view>
				<view style="right: 4%;bottom: 20rpx;position: absolute;">
					<image style="width: 21rpx;height: 19rpx;" src="../../static/pages/picture/quotationMarksTop.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="grey-line"></view>
			<!-- 简介 暂无字段-->
			<!-- <view style="margin-left: 3.7%;">
				<view class="briefIntroduction">明星简介</view>
				<view class="briefIntroductionText">
					{{detailsData.introduction}}
				</view>
			</view> -->
		</view>
		<!-- 明星视频 -->
		<view style="background-color: #FFFFFF;margin: 20rpx 0;">
			<view class="main_header">
				<text class="main_header_text">明星视频</text>
				<navigator hover-class="none" :url="'/pages/index/videoAll?id='+detailsId" v-if="videoData.length != 0">
					<text style="color:#FF3636;font-size: 28rpx;">查看全部</text>
					<image class="more_img" src="../../static/pages/picture/download.png" mode="aspectFit"></image>
				</navigator>
			</view> 
			<view v-if="videoData.length != 0">
				<scroll-view show-scrollbar="true" scroll-x="true" scroll-left="120" class="starVideo_scroll">
					<view class="starVideo_item" v-for="(item,index) in videoData" :key="index">
						<view class="starVideo-video">
							<video @loadedmetadata="function(e){videLoaded(e,index)}" :src="item.videoUrl" controls :poster="item.videoThumbnailUrl"></video>
						</view>
						<view class="starVideo_itemBottom">
							<view class="starVideo_itemText">{{'赠送给: '+(item.videoGiftTo||'--')}}</view>
							<view class="starVideo_itemTime">
								<image class="time-pink" src="../../static/pages/picture/timePink.png" mode="aspectFill"></image>
								<text :ref="'time-pink-'+index" class="time-pink-text">
									<!-- {{ item.duration | dateFormat}} -->
									{{ videoDuration[index] | dateFormat}}
								</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-else style="text-align: center;line-height: 200rpx;color: #B2B2B2;">暂无视频 </view>
		</view>
		
		<!-- 精彩评论 -->
		<view style="background-color: #FFFFFF;">
			<view class="main_header">
				<text class="main_header_text">精彩评论（{{commentTotal}}）</text>
				<navigator hover-class="none" :url="'/pages/index/commentList?id='+detailsId"  v-if="commentTotal != 0">
					<text style="color:#FF3636;font-size: 28rpx;">查看全部</text>
					<image class="more_img" src="../../static/pages/picture/download.png" mode="aspectFit"></image>
				</navigator>
			</view> 
			<view v-if="commentTotal != 0" >
				<view class="comment-item" style="margin-left: 3.7%;margin-top: 20rpx;" v-for="(item,index) in commentList" :key="index">
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
							<image v-for="(i,ind) of item.star" :key="ind" class="starImg" src="../../static/pages/picture/starImg.png" mode="aspectFill"></image>
						</view>
					</view>
					<!-- 内容txt --> 
					<view class="comment-text">
						{{item.content}}
					</view>
					<view class="grey-line"></view>
				</view>
			</view>
			<view v-else style="text-align: center;line-height: 200rpx;color: #B2B2B2;">暂无评论</view>
			
			<view class="comment-bottom">
				<view class="comment-headImg">
					<image class="allImg" :src="avatar||'/static/pages/me/logo.png'" mode="aspectFill"></image>
				</view>
				<view class="comment-input" @tap="getcommentAdd">
					说些什么
				</view>
			</view>
			<!-- 评论弹框 -->
			<commentModel @cancel='commentCancel' @confirm="commentConfirm" v-show="commentModelShow"></commentModel>
		</view>
		
		<!-- 推荐艺人 -->
		<view class="recommend-box" :style="'padding-bottom:'+(bootomSpace + 112)+'rpx;'">
			<view style="font-size: 36rpx;font-weight: 400;margin-left: 3.6%;margin-top: 60rpx;">推荐艺人</view>
			<view class="tenant-list">
				<tenant-info :tenantInfo="item" v-for="(item,index) in recommendTenantList" :key="index"></tenant-info>
			</view>
		</view>
		<!-- 底部 -->
		<view class="close-tips" v-if="detailsData.isClose===1 && detailsData.closeReason" :style="'bottom: '+(bootomSpace+112)+'rpx;'">{{detailsData.closeReason}}</view>
		<view class="bottom-box" :style="'height: '+(bootomSpace+112)+'rpx;'">
			<view class="bottom-left">
				<image class="bottom-left-icon" src="/static/pages/picture/timeGrey.png"></image>
				<view  class="bottom-left-value">视频录制所需时间：{{detailsData.videoCreateNeedDay}}天</view>
			</view>
			<view class="bottom-right" :class="{disabled:detailsData.isClose===1}" @click="getBuy()">
				购买 {{detailsData.afterDiscountPrice}}角本币
			</view>
		</view>
		
		
		<canvas canvas-id="myCanvas" :style="'position:absolute;border: 1px solid red; width:375px;height:800px;top:-9999px;left:-9999px;'"></canvas>
		<!-- 分享 -->
		<view class="fiexd-bg" v-if="shareFlag" @click="toggleShareFlag"></view>
		<view class="share-box" v-if="shareFlag" :style="'margin-bottom: '+bootomSpace+'rpx;'">
			<view class="share-title">分享给好友</view>
			<view class="share">
				<!-- #ifdef MP -->
					<button class="share-item" open-type="share">
						<image class="share-item-icon" src="../../static/pages/detail/wechat.png"></image>
						<view>微信好友</view>
					</button>
					<button class="share-item" @click="createImage">
						<image class="share-item-icon" src="../../static/pages/detail/image.png"></image>
						<view>保存图片分享</view>
					</button>
				<!-- #endif -->
			</view>
			<view class="line"></view>
			<view class="cancel" @click="toggleShareFlag">取消</view>
		</view>
	</scroll-view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import TenantInfo from '@/components/TenantInfo/TenantInfo.vue'
	import commentModel from '@/components/commentModel/commentModel.vue'
	import dateFormat from '@/common/dateFormat.js'
	import { tenantDetails,findRecommendList,collectionAdd,collectionDelete,videoList,commentList, toComment } from '@/api/home.js'
	import { getWechatShareConfigParam } from '../../api/detail.js'
	import { mapState } from 'vuex'
	import { domain } from '@/api/domain.js'
	export default {
		components: {
			HNavigationBar,TenantInfo,commentModel
		},
		onLoad(options){
			
			
			//#ifdef MP-WEIXIN
			if (options.scene) {
				this.detailsId = options.scene+''
			}else{
				this.detailsId = options.id
			}
			//#endif
			
			//#ifdef H5
			this.detailsId = options.id
			//#endif
			
			this.videoFrom.tenantId = options.id
			if(this.detailsId){
				this.getTenantDetails()
			}else{
				this.$api.msg('未获取到id信息')
			}
			
			//#ifdef H5
			//#获取分享信息
			this.initShareConfig()
			//#endif
			
			// 推荐艺人
			this.getfindRecommendList()
			// 明星视频
			this.getvideoList()
			// 评论列表
			this.getcommentList()
			let {screenHeight,windowHeight,model,statusBarHeight} = uni.getSystemInfoSync()
			this.scrollHeight =  windowHeight
		},
		filters: {
			dateFormat: dateFormat.timeTurn,
		},
		computed:{
			tenantScore(){
				return this.detailsData.tmsTenantScore ? (this.detailsData.tmsTenantScore.aveScore ? this.detailsData.tmsTenantScore.aveScore : 5) : 5
			},
			...mapState(['balance','avatar'])
		},
		onShareAppMessage:function(){
			return {
			  title: '好开心！我竟然收到了偶像'+this.detailsData.realName+'的祝福视频！快来红角本订购属于你的个性视频吧！',
			  path: '/pages/index/starDetails?id='+this.detailsData.id
			}
		},
		data() {
			return {
				bootomSpace:this.$bottomSpace,
				detailsId:'',
				detailsData:[],
				recommendFrom:{
					pageNum:1,
					pageSize:2
				},
				recommendTenantList:[],
				collectionShow:true,
				// 视频
				videoFrom:{
					pageNum:1,
					pageSize:3,
					tenantId:''
				},
				videoData:[],
				videoDuration:[],
				// 评论 
				commentFrom:{
					pageNum:1,
					pageSize:3,
					tenantId:''
				},
				commentList:[],
				commentTotal:0,
				addCommentParam:{
					content:"",
					star:'',
					tenantId:''
				},
				commentModelShow:false,
				videoLoadError:false,
				shareFlag:false,
				scrollTop:0,
				scrollHeight:0
			}
		},
		methods: {
			watchShopContent(e){
				let {scrollTop} = e.detail
				this.scrollTop = scrollTop
			},
			getBuy(){
				if(this.detailsData.isClose===1){
					return
				}
				
				if(this.balance*1 < this.detailsData.afterDiscountPrice){
					uni.showModal({
						title: '提醒',
						content: '角本币余额不足，请先充值',
						showCancel: true,
						cancelText: '取消',
						confirmText: '去充值',
						confirmColor: '#FF2E80',
						success: (res) => {
							if(res.cancel){
								
							}
							if(res.confirm){
								uni.navigateTo({
									url:'../me/recharge/recharge'
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
					return
				}
				uni.navigateTo({
					url: '/pages/index/orderfilling?data='+ encodeURIComponent(JSON.stringify(this.detailsData))
				})
			},
			createMate(){
				let head = document.getElementsByTagName('head');        // 创建head标签
				let metaImg = document.createElement('meta');           // 创建meta标签
				let metaName = document.createElement('meta');           // 创建meta标签
				let metaDescription = document.createElement('meta');           // 创建meta标签
				
				
				metaName.name = 'name'
				metaName.content = '红角本';
				metaName.setAttribute('itemprop','name')
				
				metaDescription.name = 'description'
				metaDescription.content = '好开心！我竟然收到了偶像'+this.detailsData.realName+'的祝福视频！快来红角本订购属于你的个性视频吧！'
				metaDescription.setAttribute('itemprop','description')
				
				metaImg.name = 'image'
				metaImg.content = this.detailsData.thumbnailUrl+''
				metaImg.setAttribute('itemprop','image')
				
				head[0].appendChild(metaName)
				head[0].appendChild(metaDescription)
				head[0].appendChild(metaImg)
			},
			// 明星视频
			getvideoList(){
				videoList(this.videoFrom).then(res=>{
					this.videoData = res.data.data.list || []
				})
			},
			videLoaded(e,index){
				console.log('视频加载index-->',index)
				console.log('视频加载e-->',e)
				const that = this
				that.videoDuration[index] = e.detail.duration || 0
				if(index === this.videoData.length - 1){
					this.$forceUpdate()
				}
			},
			// 评论列表
			getcommentList(){
				this.commentFrom.tenantId = this.detailsId
				commentList(this.commentFrom).then(res=>{
					this.commentList = res.data.data.list || []
					this.commentTotal = res.data.data.total
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
				this.addCommentParam.tenantId = this.detailsId
				this.addCommentParam.content = content
				this.addCommentParam.star = star
				toComment(this.addCommentParam).then(res=>{
					this.$api.msg('评论成功')
					this.commentModelShow = false
					this.getcommentList()
				})
			},
			// 推荐艺人
			getfindRecommendList(){
				findRecommendList(this.recommendFrom).then(res=>{
					this.recommendTenantList = res.data.data.list || []
				})
			},
			// 获取详情
			getTenantDetails(){
				tenantDetails({id:this.detailsId}).then(res=>{
					this.detailsData = res.data.data || []
					this.collectionShow = res.data.data.collected
					console.log(this.collectionShow)
					
					//#ifdef H5
					this.createMate()
					//#endif
				})
			},
			// 收藏
			collection(){
				collectionAdd({tenantId:this.detailsId}).then(res=>{
					this.$api.msg('收藏成功')
					this.collectionShow = true
				})
			},
			// 取消收藏
			getcollectionDelete(){
				collectionDelete({tenantId:this.detailsId}).then(res=>{
					this.$api.msg('取消收藏成功')
					this.collectionShow = false
				})
			},
			onVideoLoadError(){
				this.videoLoadError = true
			},
			toggleShareFlag: function() {
				this.shareFlag = !this.shareFlag
			},
			createImage:function(){
				const that = this
				//不允许打开定位
				uni.authorize({
					scope:'scope.writePhotosAlbum',
					success:function(res1){
						console.log('--res1>>>>',res1)
						uni.getSetting({
							success: (res) => {
								console.log(res)
								if (!res.authSetting['scope.writePhotosAlbum']) {
									that.$api.msg('请点击右上角，打开设置，开启权限')
								} else {
									that.createImageDomain()
								}
							}
						})
					},
					fail:function(err){
						console.log('err>>>>',err)
						that.$api.msg('请点击右上角，打开设置，开启权限')
					}
				})
			},
			createImageDomain:function(){
				const that = this
				uni.showLoading({
					title: '图片生成中...',
				});
				
				let  biaoqian = '/static/pages/picture/biaoqian.png'
				let  shareTextBg = '/static/pages/detail/share-text-bg.png'
				// let  wxmpcodeUrl = '/static/pages/detail/wxmpcode.png'
				let  wxmpcodeUrl = domain+'/share/generateWxMiniShareCode?path=pages/index/starDetails&scene='+that.detailsId
				uni.getImageInfo({
					src: wxmpcodeUrl,
					success:function(mpRes){
						const wxmpcodePath =  mpRes.path
						// const wxmpcodePath = wxmpcodeUrl
						uni.getImageInfo({
							src:that.detailsData.thumbnailUrl,
							success:function(mxRes){
								console.log('获取明星图片-->',mxRes)
								const ctx = uni.createCanvasContext('myCanvas')
								let  imageW = 375,imageH = 563
								let  canvasW = 375,canvasH = 800
								// 设置白色背景
								ctx.rect(0, 0, canvasW, canvasH)
								ctx.setFillStyle('#FFFFFF')
								ctx.fill()
								
								// 设置明星图片
								ctx.drawImage(mxRes.path,0,0,imageW,imageH)
								
								// 明星名字
								ctx.setTextAlign('left')
								ctx.setFillStyle('#000000')
								ctx.setFontSize(26)
								ctx.fillText(that.detailsData.realName, 20, 610,150)
								// 明星名字 - 加粗
								ctx.setTextAlign('left')
								ctx.setFillStyle('#000000')
								ctx.setFontSize(26)
								ctx.fillText(that.detailsData.realName, 19, 610,150 )
								if(that.detailsData.tenantTypeList && that.detailsData.tenantTypeList.length > 0 ){
									// 标签 - ICON
									ctx.drawImage(biaoqian,180,596,13,14)
									
									// 标签
									ctx.setTextAlign('left')
									ctx.setFillStyle('#999999')
									ctx.setFontSize(14)
									let  typeNames = that.detailsData.tenantTypeList.map(item=>item.tenantTypeName).join('、')
									ctx.fillText(typeNames, 195, 608, 150 )
								}
								// 绘制背景图
								ctx.drawImage(shareTextBg,0,640,260,167)
								
								// 好开心
								ctx.setTextAlign('left')
								ctx.setFillStyle('#686868')
								ctx.setFontSize(18)
								ctx.fillText('好开心！', 20, 690)
								// 我竟然收到了偶像的祝福视频
								ctx.setTextAlign('left')
								ctx.setFillStyle('#686868')
								ctx.setFontSize(15)
								ctx.fillText('我竟然收到了偶像的祝福视频！', 20, 720)
								// 快来红角本预订你的个性化视频吧！
								ctx.setTextAlign('left')
								ctx.setFillStyle('#686868')
								ctx.setFontSize(15)
								ctx.fillText('快来红角本预订你的个性化视频吧！', 20, 750)
								
								// 小程序码
								ctx.drawImage(wxmpcodePath,270,660,96,96)
								
								// 小程序码 - tips！
								ctx.setTextAlign('center')
								ctx.setFillStyle('#878383')
								ctx.setFontSize(12)
								ctx.fillText('长按查看', 318, 780)
								
								
								ctx.draw(true,()=>{
									setTimeout(function(){
										uni.canvasToTempFilePath({
											x: 0,
											y: 0,
											width: canvasW,
											height: canvasH,
											canvasId: 'myCanvas',
											success: function (resCv) {
												uni.hideLoading()
												// _this.uploadLoadCallBack && _this.uploadLoadCallBack(res.tempFilePath,_this.vm)
												// 成功获得地址的地方
												// uni.previewImage({
												// 	current: '', // 当前显示图片的http链接
												// 	urls: [resCv.tempFilePath] // 需要预览的图片http链接列表
												// })
												wx.saveImageToPhotosAlbum({
													filePath: resCv.tempFilePath,
													success: (res) => {
														that.$api.msg('保存成功')
														that.shareFlag = false
													}
												})
											}
										});
									},200)
								})
							}
						})
					}
				})
			}
			,
			initShareConfig:function(){
				const that = this
				var link = window.location.href;
				getWechatShareConfigParam({url:link}).then(res=>{
					const  data = res.data.data || {}
					jWeixin.config({
						debug: false,////生产环境需要关闭debug模式
						appId: data.appid,//appId通过微信服务号后台查看
						timestamp: data.timestamp,//生成签名的时间戳
						nonceStr: data.nonceStr,//生成签名的随机字符串
						signature: data.signature,//签名
						jsApiList: [//需要调用的JS接口列表
							'checkJsApi',//判断当前客户端版本是否支持指定JS接口
							'onMenuShareTimeline',//分享给好友
							'onMenuShareAppMessage'//分享到朋友圈
						]
					});
					that.wxShareReady()
				})
			},
			wxShareReady:function(){
				const that = this
				jWeixin.ready(function () {
					var link = window.location.href;
					var protocol = window.location.protocol;
					var host = window.location.host;
					//分享朋友圈
					jWeixin.onMenuShareTimeline({
						title: '好开心！我竟然收到了偶像' + that.detailsData.realName + '的祝福视频！快来红角本订购属于你的个性视频吧！',
						link: link,
						imgUrl: that.detailsData.thumbnailUrl,// 自定义图标
						trigger: function (res) {
							// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
							//alert('click shared');
						},
						success: function (res) {
							//alert('shared success');
							//some thing you should do
						},
						cancel: function (res) {
							//alert('shared cancle');
						},
						fail: function (res) {
							//alert(JSON.stringify(res));
						}
					});
					//分享给好友
					jWeixin.onMenuShareAppMessage({
						title: '红角本', // 分享标题
						desc: '好开心！我竟然收到了偶像' + that.detailsData.realName + '的祝福视频！快来红角本订购属于你的个性视频吧！', // 分享描述
						link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: that.detailsData.thumbnailUrl, // 自定义图标
						type: 'link', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					jWeixin.error(function (res) {
						console.log(res.errMsg);
					});
				});
			}
		}
	}
</script>

<style scoped>
@import url('../../common/queryData.css');
.container{
	/* padding-bottom: 100rpx; */
}
.navigation-bar{
	position: absolute;
	top: 0;
	left:0;
	right: 0;
	z-index: 10;
}
.navigation-bar-fixed{
	position: fixed;
	top: 0;
	left:0;
	right: 0;
	z-index: 10;
}
.detail-introduce{
	width: 750upx;
	height: calc(100vw/9*16);
}
.detail-introduce image,.detail-introduce video{
	width: 100%;
	height: 100%;
}

.StarNameBox{
	padding-top: 1%;
	margin-left: 3.7%;
	display: flex;
	align-items: center;
	position: relative;
}
.StarName{
	font-size: 42rpx;letter-spacing: 2rpx;
}
.collect{
	color: #FFFFFF;
	font-size: 30rpx;
	font-weight: 600;
	background-color: #fd84b2;
	padding: 0 20rpx;
	height: 50rpx;
	line-height: 50rpx;
	border-radius:25rpx;
}
.collect.on{
	background-color: #FF2E80;
}
.Starlabel{
	display: flex;align-items: center;margin-top: 0.5%;margin-left: 3.7%;
}
.StarDynamic{
	width: 696rpx;height: auto;background: #F8F8F8;padding: 65rpx 0 25px 0; margin: 36rpx auto 0;position: relative;overflow: hidden;
}
.StarDynamicText{
	width: 640rpx;height: auto;margin: 0 auto;line-height:1.5;font-size: 16px;color: #5B5B71;
}
.briefIntroduction{
	color: #2F2F2F;font-size: 32rpx;letter-spacing: 2px;line-height: 100rpx;
}
.briefIntroductionText{
	width: 691rpx;height: auto;color: #818181;font-size: 28rpx;padding-bottom: 20rpx;
}
.more_img {
	width: 20rpx;height: 20rpx;margin-left: 10rpx;
}
.main_header {
	margin:0 3.7%;display: flex;justify-content: space-between;align-items: center;padding-top: 30rpx;
}
.main_header_text{
	font-size: 36rpx;color: #2F2F2F;
}
.starVideo_scroll {
	white-space: nowrap;width: 100%;height: auto;
}
.starVideo_item {
	width: 46%;
	/* height: 300rpx; */
	border: 1px solid #F0F0F0;
	border-radius: 8rpx;
	overflow: hidden;
	margin: 20rpx 10rpx;
	display: inline-block;
}
.starVideo-video{
	width: 100%;
	height: calc(46vw/9*16);
}

.starVideo-video video{
	width: 100%;
	height: 100%;
}

.starVideo_itemBottom{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20rpx 15rpx;
}
.starVideo_itemText{
	width: 250rpx;font-size: 22rpx;color: #000000;font-weight: 400;
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

.recommend-box{
	width: 100%;
	background: #F1F1F1;
	height: auto;
	overflow: hidden;
	/* padding-bottom: 30rpx; */
}
.close-tips{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 10rpx 20rpx;
	color: #FF8142;
	background-color: #FFF5F0;
	font-size: 24rpx;
	z-index: 99;
}

.bottom-box{
	width: 100%;
	height: 112rpx;
	display: flex;
	background-color: #FFFFFF;
	position: fixed;
	bottom:0;
	left: 0;
	right: 0;
	z-index: 99;
}

.bottom-left{
	width: 375rpx;
	height: 112rpx;
	background: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center
}
.bottom-left-icon{
	width: 28rpx;
	height: 28rpx;
}
.bottom-left-value{
	font-size: 28rpx;
	color: #5B5B71;
	font-weight: 400;
	margin-left: 1.2%;
}
.bottom-right{
	width: 375rpx;
	height: 112rpx;
	background-color: #FF2E80;
	font-size: 32rpx;
	color: #FFFFFF;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
}
.bottom-right.disabled{
	background-color: #DEDEDE;
}





	/** share  start **/
	
	.share-icon-box {
		position: absolute;
		right: 30rpx;
		top: 80rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-weight: 400;
	}
	
	.share-img-icon {
		width: 38rpx;
		height: 38rpx;
		margin-right: 10rpx;
	}
	
	
	.fiexd-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
	}
	.share-box {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		position: fixed;
		left: 20rpx;
		right: 20rpx;
		bottom: 49rpx;
		z-index: 999;
	}
	
	.share-title {
		padding-top: 50rpx;
		padding-bottom: 10rpx;
		text-align: center;
	
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #666666;
	}
	
	.share {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 50rpx 0;
		margin: 0 120rpx;
	}
	
	.share-item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
	
		border: none;
		border-radius: 0;
		background: #FFFFFF;
		padding: 0;
		margin: 0;
		/* position: unset; */
	}
	
	.share-item::after{
		  border: none;
		  border-radius: 0;
	}
	
	.share-item-icon {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 20rpx;
	}
	.share-item-text{
		padding-top: 20rpx;
	}
	
	
	.cancel {
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		padding: 24rpx;
	}
	/** share  end **/
</style>
