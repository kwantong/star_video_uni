<template>
	<view class="header-wrap">
		<!-- <view class="header-left">
			<image class="header-left-img" src="https://leetcode.jp/red/hongjiaoben/assets/img/icon_black.jpg" mode="aspectFit"></image>
			<navigator class="header-left-href" url="../index/index">红角本</navigator>
		</view> -->
		<view class='header-search-0'>
			<!-- @input="onInput" -->
			<uni-search-bar cancelButton="none" class="header-search-input" :radius="100" placeholder="快速检索"  @confirm="search" v-model="searchValue"></uni-search-bar>
			<!-- <button v-if="showBtn" class="btn" type="default" @click="search" @tap="search">搜索</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'RHeader',
		data() {
			return {
				searchValue: ''//,
				// showBtn: false
			}
		},
		methods: {
			search() {
				console.log(this.searchValue)
				uni.navigateTo({url: "/pages/searchRes/searchRes?searchVal=脱口秀明星"}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
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
	/* .header-left {
		flex: 0 0 30%;
		display: flex;
		height: 100%;
		align-items: center;
	} 
	.header-user {
		flex: 0 0 20%;
		display: flex;
		height: 100%;
		align-items: center;
	} 
	.header-left-img {
		width: calc(100% - 50px);
		padding: 5px 0;
		height: calc(100% - 10px);
	}
	.header-left-href {
		font-size: 16px;
		line-height: 16px;
		width: 80px;
		padding-left: 10px;
		box-sizing: border-box;
	} */
	
	.header-search-0 {
		flex: 1 1 auto;
	}
	/* .header-search {
		flex: 0 0 calc(100% - 50px);
		border-radius: 100px 0px 0px 100px;
	}
	.header-search /deep/ .uni-searchbar__box {
		border-radius: 100px 0px 0px 100px;
	} */
	.header-search-input {
		color: #FFFFFF;
		background-color: rgb(40, 40, 40);
		/* padding-right: 80px;
		box-sizing: border-box; */
	}
	/* .btn {
		position: absolute;
		right: 8px;
		top: 8px;
		bottom: 8px;
		font-size: 14px;
		background-color: #FF2E80;
		color: #fff;
		z-inde: 99998;
	}
	.btn::after{
		border-radius: 0px 100px 100px 0px;
	} */
</style>
