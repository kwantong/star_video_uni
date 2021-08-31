<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="hrefUrl"></web-view>
	</view>
</template>

<script>
	import hNavigationBar from '@/components/hNavigationBar/index.vue'
	export default {
		components:{
			hNavigationBar
		},
		data() {
			return {
				webviewStyles:{
					progress: {
						color: '#FF2E80'
					}
				},
				hrefUrl:''
			}
		},
		onLoad:function(option){
			this.hrefUrl = option && option.hrefUrl
			if(option.title){
				uni.setNavigationBarTitle({
					title:option.title
				})
			}
			// this.hrefUrl = 'https://www.sogou.com/'
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
