<template>
	<view class="user_center">
		<view class="user-info">
			<image class="user-info-bgm" :style="{height:topHeight+'px'}" src="/static/pages/me/user-center-bgm.png"></image>
			<h-navigation-bar title="我的" titleAlign="left"></h-navigation-bar>
			<view class="user-info-main">
				<view class="user-head" v-if="hasLogin" @click="goUserInfo">
					<image class="user-head-icon" :src="userInfo.icon || '/static/pages/me/logo.png'"></image>
				</view>
				<view class="user-head" v-else @click="goLogin">
					<image class="user-head-icon" src="/static/pages/me/logo.png"></image>
				</view>
				<view class="user-name" v-if="hasLogin" @click="goUserInfo">
					<text class="user-name-text">{{ userInfo.nickname || '--'}}</text>
					<image class="user-name-update" src="/static/pages/me/edit.png"></image>
				</view>
				<view class="user-name" v-else @click="goLogin">
					<text class="user-name-text">点击登录</text>
				</view>
			</view>
			
			<view class="user-coin-box">
				<view class="coin-box">
					<text class="coin-title">账户余额</text>
					<view class="coin-cash">
						<image class="coin-cash-coin" src="/static/pages/me/coin.png"></image>
						<text class="coin-cash-text">{{userInfo.memberCoin && userInfo.memberCoin.coinBalance || 0}}</text>
					</view>
				</view>
				<view class="coin-recharge" @click="goRecharge">充值</view>
			</view>
		</view>
		<view class="user-menu">
			<view class="user-menu-item" v-for="(m,index) in  userMenuList" :key="index" @click="goNav(m.path)">
				<image class="user-menu-icon" v-if="m.icon" :src="m.icon"></image>
				<view class="user-menu-item-name">
					<text v-if="!m.button">{{m.name}}</text>
					<text v-else>{{m.name}}{{invitationCode}}</text>
					<view class="user-menu-button" v-if="m.button" @click="copyCode">{{m.button}}</view>
					<image class="user-menu-go-icon" v-else src="/static/pages/me/next.png"></image>
				</view>
			</view>
		</view>
		
		<view class="logout-btn" v-if="hasLogin" @click="onLogout">退出登录</view>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	import { appid, secret } from '@/configs/wx.config.js'
	import { getOpenID } from '@/utils/getOpenID.js'
	import { mapState, mapMutations } from 'vuex';
	import { getUserInfo, getInvitationCode } from '@/api/userInfo.js'
	export default {
		components: {
			hNavigationBar
		},
		data() {
			return {
				topHeight:237,
				avatar: '',
				userName: '',
				showLoading: false,
				userInfo:{},
				invitationCode:'',
				userMenuList:[
					{
						icon:'/static/pages/me/order.png',
						path:'/pages/me/myOrder/myOrder',
						name:'我的订单'
					},
					{
						icon:'/static/pages/me/collect.png',
						path:'/pages/me/myCollect/myCollect',
						name:'我的收藏'
					},
					{
						icon:'/static/pages/me/recharge.png',
						path:'/pages/me/recharge/rechargeList',
						name:'充值记录'
					},
					{
						icon:'',
						path:'',
						name:'邀请码：',
						button:'复制'
					},
				]
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad:function(){
			const that = this
			// 兼容问题
			setTimeout(function(){
				const query = uni.createSelectorQuery().in(that);
				query.select('.user-info').boundingClientRect(data => {
				  console.log("节点离页面顶部的距离为" + data.height);
				  that.topHeight = data.height
				}).exec();
			},1)
		},
		onShow:function(){
			this.queryUserInfo()
			this.queryInvateCode()
		},
		methods: {
			...mapMutations(['logout']),
			goNav(path){
				if(!path){
					return
				}
				uni.navigateTo({
					url:path
				})
			},
			copyCode(){
				//#ifdef MP
				uni.setClipboardData({
				    data: this.invitationCode,
				    success: function () {
				        console.log('success');
				    }
				});
				//#endif
				
				//#ifdef H5
				const oInput = document.createElement('input')
				 oInput.value = this.invitationCode
				 document.body.appendChild(oInput)
				 oInput.select() // 选择对象
				 document.execCommand('Copy') // 执行浏览器复制命令
				 this.$api.msg('复制成功')
				 oInput.remove()
				//#endif
			},
			queryInvateCode(){
				if(!this.hasLogin){
					this.invitationCode = ''
					return
				}
				getInvitationCode().then(res=>{
					this.invitationCode = res.data.data.code || ''
				})	
			},
			goLogin(){
				uni.navigateTo({
					url:'/pages/public/login'
				})
			},
			goUserInfo(){
				uni.navigateTo({
					url:'/pages/me/userInfo/userInfo'
				})
			},
			goRecharge(){
				uni.navigateTo({
					url:'/pages/me/recharge/recharge'
				})
			},
			queryUserInfo () {
				if(!this.hasLogin){
					return
				}
				getUserInfo().then(res=>{
					this.userInfo = res.data.data || {}
				})
			},
			onLogout(){
				this.logout()
				this.userInfo = {}
				this.$api.msg('退出登录成功')
				uni.reLaunch({
					url:'../../public/login'
				})
			}
		}
	}
</script>

<style scoped>
page{
	background-color: #FFFFFF;
}
.user_center {
	height: 100%;
	width: 750rpx;
	background-color: #FFFFFF;
}
.user-info {
	width: 750rpx;
	/* height: 478rpx; */
	position: relative;
	padding-bottom: 30rpx;
}

.user-info-main {
	/* width: 100%; */
	height: 140rpx;
	padding: 20rpx 30rpx 39rpx 30rpx;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 99;
}
.user-info-bgm{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 750upx;
	height: 478rpx;
	z-index: 0;
}

.login_btn {
	
}

.user-head{
	background-color: #FFFFFF;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2rpx solid #DCDCDC;
	width: 116rpx;
	height: 116rpx;
}

.user-head-icon{
	width: 116rpx;
	height: 116rpx;
	border-radius: 50%;
}

.user-name{
	display: flex;
	flex-direction: row;
	align-items: center;
}

.user-name-text{
	margin-right: 10rpx;
	margin-left: 20rpx;
	font-family: PingFangSC-Medium;
	font-size: 36rpx;
	color: #000000;
	letter-spacing: 0;
	font-weight: 500;
}

.user-name-update{
	width: 40rpx;
	height: 40rpx;
}

.user-coin-box{
	margin: 0 30rpx;
	height: 110rpx;
	background-color: #FFFFFF;
	border: 2rpx solid #DCDCDC;
	border-radius: 12rpx;
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	z-index: 99;
	box-shadow: 0px 2rpx 20rpx 0px rgba(193, 193, 193, 0.5), 0px -6rpx 16rpx 0px rgba(188, 188, 188, 0.14);
}

.coin-box{
	display: flex;
	flex-direction: column;
}

.coin-title{
	font-family: PingFangSC-Regular;
	font-size: 28rpx;
	color: #777777;
	letter-spacing: 0;
	text-align: justify;
	font-weight: 400;
}
.coin-cash{
	display: flex;
	align-items: center;
}

.coin-cash-coin{
	width: 34rpx;
	height: 34rpx;
}

.coin-cash-text{
	margin-left: 10rpx;
	font-family: PingFangSC-Regular;
	font-size: 40rpx;
	color: #151515;
	letter-spacing: 0;
	text-align: justify;
	font-weight: 400;
}
.coin-recharge{
	width: 120rpx;
	height: 58rpx;
	line-height: 58rpx;
	background-color: #FF2E80;
	border-radius: 29rpx;
	
	font-family: PingFangSC-Regular;
	font-size: 28rpx;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: center;
	font-weight: 400;
}

.user_info_name {
    height: 128rpx;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
    justify-content: space-between;
	color: #aaa;
}
.avatar {
	width: 128rpx;
	height: 128rpx;
	margin: 20rpx;
	border-radius: 10px;
}
.username {
	font-size: 40rpx;
}
.user-menu {
	
}


.user-menu-item{
	display: flex;
	flex-direction: row;
	height: 109rpx;
	line-height: 109rpx;
	padding: 0rpx 26rpx;
	align-items: center;
}

.user-menu-icon{
	width: 32rpx;
	height: 32rpx;
	margin-right: 20rpx;
}

.user-menu-item-name{
	flex: 1;
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #13161D;
	border-bottom: 1rpx solid #E5E5E5;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.user-menu-button{
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FF2E80;
}

.user-menu-go-icon{
	width: 15rpx;
	height: 28rpx;
}

.logout-btn{
	background-color: #FF2E80;
	color: #FFFFFF;
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 600;
	margin: 200rpx 30rpx 0 30rpx;
	text-align: center;
	height: 88rpx;
	line-height: 88rpx;
	border-radius:50rpx;
}
</style>
