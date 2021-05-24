<template>
	<div class='nav bg-white' :style="{height: navH+'px'}">
		<div class='nav-title' v-if="showLogo">
			<image src="../../../static/pages/logo.png" mode="aspectFit"style='height: 100%;width: 50px;'></image>
		    <span>红角本</span>
		</div>
		<div  class='nav-title' v-else style="text-align: left;padding-left: 10px;" @click="back">
			<image src="../../../static/pages/箭头.png" style="transform: rotate(180deg);width: 30px;height: 30px;" mode="aspectFit"></image>
			<span>{{title}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:"hNavigationBar",
		props: {
			showLogo: {
				type: Boolean,
				default: false
			},
			title: String
		},
		data() {
			return {
				navH: 0
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		created() {
			const navHeight = this.$store.state.navHeight
			console.log(navHeight)
			if (navHeight) {
				this.navH = navHeight
			}
		}
	}
</script>

<style scoped>
.nav{
	  width: 100%;
	  overflow: hidden;
	  position: relative;
	  top: 0;
	  left: 0;
	  z-index: 10;
	}
	.bg-white{
	  background-color: #ffffff;
	}
	.nav-title{
	  text-align: left;
	  color: #000000;
	  width: 100%;
	  height: 45px;
	  line-height: 45px;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  z-index: 10;
	  font-family:PingFang-SC-Medium;
	  font-size:32rpx;
	  letter-spacing:2px;
	  display: flex;
	  align-items: center;
	}
</style>
