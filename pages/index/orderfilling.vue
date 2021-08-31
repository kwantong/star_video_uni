<template>
	<view>
		<h-navigation-bar :showBack="true" :title="title" background-color="#FFFFFF"></h-navigation-bar>
		<view class="line"></view>
		
		<view class="order-form">
			<view class="form-item head-form">
				<view style="width: 144rpx;height: 193rpx;">
					<image class="allImg" :src="orderTenant.thumbnailUrl" mode="aspectFill"></image>
				</view>
				<view class="head-form-text">
					<view style="font-size: 36rpx;font-weight: 500;margin-bottom: 30rpx;">{{orderTenant.realName}}</view>
					<view style="font-size: 28rpx;">订单价格</view>
					<view class="list_main_price">
						<image style="width: 38rpx;height:38rpx;" src="../../static/pages/me/coin.png" mode="aspectFit"></image>
						<text style="font-size: 36rpx;margin-left: 10rpx;">{{orderTenant.afterDiscountPrice}}</text>
					</view>
				</view>
			</view>
			
			<view v-if="orderShow">
				<view style="margin:30rpx 30rpx 25rpx">此视频录制给</view>
			
				<view class="form-item">
					<view class="item-label required">用户名</view>
					<view class="item-value">
						<label class="radio-item" @click="changeUser(0)" style="margin-right: 30rpx;">
							<radio value="0" checked="true" color="#FF2E80" :checked="createOrderFrom.videoGiftType === 0" style="transform:scale(0.7)"/>
							自己
						</label>
						<label class="radio-item" @click="changeUser(1)">
							<radio value="1" checked="true" color="#FF2E80" :checked="createOrderFrom.videoGiftType === 1" style="transform:scale(0.7)"/>
							其它
						</label>
					</view>
				</view>
				<view class="form-item" v-if="createOrderFrom.videoGiftType === 0">
					<view class="item-label">姓名</view>
					<view class="item-value">
						<input class="item-input" v-model="createOrderFrom.videoGiftTo"  maxlength="20" placeholder="请输入你的姓名"/>
					</view>
				</view>
				<view class="form-item" v-if="createOrderFrom.videoGiftType === 1">
					<view class="item-label">赠送姓名</view>
					<view class="item-value">
						<input class="item-input" v-model="createOrderFrom.videoGiftFrom"  maxlength="20" placeholder="赠送方姓名"/>
					</view>
				</view>
				<view class="form-item" v-if="createOrderFrom.videoGiftType === 1">
					<view class="item-label">接送姓名</view>
					<view class="item-value">
						<input class="item-input" v-model="createOrderFrom.videoGiftTo"  maxlength="20" placeholder="接收方姓名"/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="item-label required">视频是否公开</view>					
					<view class="item-value">
						<label class="radio-item" @click="changeVideoOpen(true)" style="margin-right: 30rpx;">
							<radio value="0" checked="true" color="#FF2E80" :checked="createOrderFrom.isVideoPublic === true" style="transform:scale(0.7)"/>
							是
						</label>
						<label class="radio-item" @click="changeVideoOpen(false)">
							<radio value="1" checked="true" color="#FF2E80" :checked="createOrderFrom.isVideoPublic === false" style="transform:scale(0.7)"/>
							否
						</label>
					</view>
				</view>
				<view class="form-item">
					<view class="item-label required">使用场景</view>
					<view class="item-value">
						<view class="item-input">
							<picker @change="bindPickerChange" :value="index" :range="videoAllPurposeList" range-key="purpose">
								<view class="uni-input">{{videoAllPurposeList[index] && videoAllPurposeList[index].purpose}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="form-item-textarea">
					<view class="item-label required" style="line-height: 100rpx;">内容简介</view>
					<view>
						<textarea class="item-textarea" v-model="createOrderFrom.videoIntroduction" maxlength="-1" placeholder="视频录制内容简介"></textarea>
					</view>
				</view>	
				<view class="form-item">
					<view class="item-label required">电子邮箱</view>
					<view class="item-value">
						<input class="item-input" v-model="createOrderFrom.billReceiverEmail" placeholder="请输入电子邮箱"/>
					</view>
				</view>
				<!-- <view class="form-item-textarea">
					<view class="item-label" style="line-height: 100rpx;">视频备注</view>
					<view>
						<textarea class="item-textarea" v-model="createOrderFrom.note" maxlength="-1" placeholder="请输入视频备注信息"></textarea>
					</view>
				</view> -->
				<view :style="'height: '+(bootomSpace+100)+'rpx;'">
					<view class="submit-order" @click="confirmOrder" style="margin-top: 10rpx;">
						提交订单
					</view>
				</view>
			</view>
			<view  v-if="!orderShow">
				<view class="form-item" style="margin-top: 10rpx;">此视频录制给</view>
				<view style="padding: 30rpx;background-color: #FFFFFF;">
					<view class="orderDetails">
						<view class="orderDetails-label">预定人：</view>
						<view class="orderDetails-text" v-if="createOrderFrom.videoGiftType === 0">{{createOrderFrom.videoGiftTo}}</view>
						<view class="orderDetails-text" v-if="createOrderFrom.videoGiftType === 1">{{createOrderFrom.videoGiftFrom}}</view>
					</view>
					<view class="orderDetails">
						<view class="orderDetails-label">此视频录制给：</view>
						<view class="orderDetails-text">{{createOrderFrom.videoGiftTo || '--'}}</view>
					</view>
					<view class="orderDetails">
						<view class="orderDetails-label">使用场景：</view>
						{{videoAllPurposeList[index].purpose}}
					</view>
					<view class="orderDetails">
						<view class="orderDetails-label">内容简介：</view>
						<view class="orderDetails-text">{{createOrderFrom.videoIntroduction}}</view>
					</view>
					<view class="orderDetails">
						<view class="orderDetails-label">电子邮箱：</view>
						<view class="orderDetails-text">{{createOrderFrom.billReceiverEmail}}</view>
					</view>
					<!-- <view class="orderDetails">
						<view class="orderDetails-label">视频备注：</view>
						<view class="orderDetails-text">{{createOrderFrom.note || '--'}}</view>
					</view> -->
				</view>
				<view class="submit-order-box" :style="'height: '+(bootomSpace+100)+'rpx;'">
					<view class="submit-order" @click="submitOrder">
						立即下单 {{orderTenant.afterDiscountPrice}}角本币
					</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
	import { videoAllPurpose, createOrder } from '@/api/home.js'
	export default {
		components:{
			HNavigationBar
		},
		onLoad(options){
			this.orderTenant = JSON.parse(decodeURIComponent(options.data))
			this.getvideoAllPurpose()
		},
		data() {
			return {
				bootomSpace:this.$bottomSpace,
				orderTenant:[],
				title:'订单填写',
				orderShow:true,
				videoAllPurposeData:[],
				videoAllPurposeList:[],
				createOrderFrom:{
					afterDiscountPrice:'',//折后价
					billReceiverEmail:'',//接收方邮箱
					note:'',//视频备注
					sourceType: 1,//订单来源：0->PC订单；1->app订。默认0
					tenantId:'',//租户(明星)ID
					videoGiftType:0,//赠送类型。0 ->给自己，1 -> 给别人
					videoGiftFrom:'',//赠送视频者。赠送类型为1时，本字段不能为空
					videoGiftTo:'',//接受视频者
					videoIntroduction:'',//视频介绍
					videoPurposeId: 1,//视频使用场景Id
					isVideoPublic:true //视频是否公开
				},
				index: 0,
			}
		},
		methods: {
			changeUser(type){
				this.createOrderFrom.videoGiftType = type
			},
			changeVideoOpen(type){
				this.createOrderFrom.isVideoPublic = type
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				// this.createOrderFrom.videoPurposeId = e.target.value*1+1
				this.createOrderFrom.videoPurposeId = this.videoAllPurposeList[this.index].id
				// this.createOrderFrom.purpose = this.videoAllPurposeList[index].purpose
				
			},
			// 使用场景
			getvideoAllPurpose(){
				videoAllPurpose().then(res=>{
					this.videoAllPurposeList =  res.data.data
				})
			},
			// 确认订单
			confirmOrder(){
				if(this.createOrderFrom.videoGiftType === 1){
					if(!this.createOrderFrom.videoGiftFrom){
						this.$api.msg('请填写赠送姓名')
						return
					}
				}
				if(!this.createOrderFrom.videoGiftTo){
					this.$api.msg('请填写接送姓名')
					return
				}
				if(!this.createOrderFrom.videoIntroduction){
					this.$api.msg('请填写内容简介')
					return
				}
				var reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
				if(!this.createOrderFrom.billReceiverEmail){
					this.$api.msg('请填写邮箱')
					return
				}else if(!reg.test(this.createOrderFrom.billReceiverEmail)){
					this.$api.msg('邮箱格式不正确')
					return 
				}
				
				this.createOrderFrom.tenantId = this.orderTenant.id
				this.createOrderFrom.afterDiscountPrice = this.orderTenant.afterDiscountPrice
				
				this.title = '订单确认'
				this.orderShow = false
				console.log(this.createOrderFrom)
			},
			// 立即下单
			submitOrder(){
				createOrder(this.createOrderFrom).then(res=>{
					this.$api.msg('下单成功')
					uni.redirectTo({
						url:'../me/myOrder/order-result?starDetailId='+this.createOrderFrom.tenantId
					})
				})
			}
		}
	}
</script>

<style scoped>
.form-item{
	height: 100rpx;
	line-height: 100rpx;
	background-color: #FFFFFF;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f2f2f2;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.form-item-textarea{
	background-color: #FFFFFF;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f2f2f2;
}
.head-form{
	height: 269rpx;
	background-color: #FFFFFF;
	box-shadow: 0px -1rpx 0px 0px #F0F0F0;
	justify-content: flex-start;
	line-height: 55rpx;
}
.head-form-text{
	margin-left: 30rpx;
}
.item-label{
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}

.item-label.required::after{
	content: '*';
	color: #FF2E80;
}

.item-value{
	height: 100rpx;
	display: flex;
	align-items:center;
}
.radio-item{
	font-weight: 400;
	font-size: 28rpx;
	color: #000000;
}
.item-input{
	text-align: right;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #808080;
}
.item-textarea{
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #808080;
	text-align: left;
	width: 100%;
	height: 200rpx;
	margin-bottom: 10rpx;
}
.submit-order-box{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #FFFFFF;
}
.submit-order{
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	font-size: 32rpx;
	text-align: center;
	color: #FFFFFF;
	background: #FF2E80;
	font-family: PingFangSC-Semibold;
	font-weight: 600;
}
.orderDetails{
	display: flex;
	margin-bottom: 20rpx;
}
.orderDetails-label{
	width: 196rpx;
	font-size: 28rpx;
	color: #909090;
}
.orderDetails-text{
	width: 485rpx;
	font-size: 28rpx;
	color: #0E0E0E;
	height: auto;
	word-wrap: break-word
}
.list_main_price {
	display: flex;
	align-items: center;
	color: #FF2E80;
}
</style>
