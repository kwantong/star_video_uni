<template>
	<view class="checkbox" :class="{checked:checked}" @click="eventClick">
		<image v-if="checked" class="checkbox-icon" src="/static/pages/recharge/selected.png"></image>
	</view>
</template>

<script>
	export default {
		name:"HkCheckBox",
		props:{
			checked:{
				type:Boolean,
				default:false
			},
			type:{
				type:Number,
				default:1
			}
		},
		data() {
			return {
			}
		},
		methods:{
			eventClick(){
				this.$emit('eventClick',this.type)
			}
		}
	}
</script>

<style scoped>

.checkbox{
	width: 37rpx;
	height: 37rpx;
	line-height: 37rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
	outline: 0;
	border: 1px solid #d1d1d1;
	background-color: #fff;
	border-radius: 3px;
	position: relative;
}

.checkbox.checked{
	background-color: #FF2E80;
	border: 1px solid #FF2E80;
}

.checkbox image{
	width: 25rpx;
	height: 17rpx;
}
</style>
