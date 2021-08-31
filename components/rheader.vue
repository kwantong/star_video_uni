<template>
	<view class="header-wrap">
		<view class='header-search-0'>
			<uni-search-bar cancelButton="none" bgColor="#EEEEEE" class="header-search-input" :radius="100" placeholder="请输入搜索关键字"  @confirm="search" v-model="searchValue"></uni-search-bar>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'RHeader',
		data() {
			return {
				searchValue: ''
			}
		},
		methods: {
			search() {
				uni.navigateTo({
					url: "/pages/searchRes/searchRes?searchVal=" + this.searchValue
				})
			}
		}
	}
</script>

<style>
	.header-wrap {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		background-color: #ffffff;
		position: relative;
		z-index: 9999;
	}
	.header-search-0 {
		flex: 1 1 auto;
		margin: 0 20rpx;
	}
	.header-search-input {
		color: #FFFFFF;
	}
</style>
