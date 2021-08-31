<template>
	<view class="model-box">
		<view class="model-conten">
			<view class="model-ipt-box">
				<input class="model-ipt" v-model="content" type="text" placeholder="说些什么" />
			</view>
			<view class="model-star-box">
				<view :class="{starActive:item}" @click="choise(index)" class="model-star-item iconfont" v-for="(item,index) in clicked_list">
					<view v-if="item" class="starIcon">
						&#xe601;
					</view>
					<view v-else class="starIcon">
						&#xe602;
					</view>
				</view>
			</view>
			<view class="btn-box">
				<view class="cancel" @tap="$emit('cancel')">
					取消
				</view>
				<view class="confirm" @tap="$emit('confirm',content,star)">
					确定
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:"",
				star:'',
				clicked_list: [false, false, false, false, false] //对应星星个数
			}
		},
		methods: {
			//starIcon
			starIcon(item) {
				if (item) {
					return '&#xe601;'
				} else {
					return '&#xe602;'
				}
			},
			//点击选择
			choise(num) {
				// num 为点击的星星在数组中的下标
				this.clicked_list = [false, false, false, false, false];
				num = num + 1;
				for (let i = 0; i < num; i++) {
					this.clicked_list[i] = true;
				}
				this.star = num
			}
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.eot');
		src: url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.eot?#iefix') format('embedded-opentype'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.woff2') format('woff2'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.woff') format('woff'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.svg#font_family') format('svg');
	}

	/* //与上方font-family 保持一致 */
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	.model-box {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 901;
	}

	.model-conten {
		width: 78%;
		height: auto;
		background-color: #FFFFFF;
		z-index: 1000;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 14rpx;
		overflow: hidden;
	}

	.model-ipt-box {
		width: 90%;
		padding: 10% 5%;
	}

	.model-ipt {
		background-color: #F7F8FA;
		border-radius: 30rpx;
		font-size: 30rpx;
		padding: 18rpx 0 18rpx 30rpx;
	}

	.model-star-box {
		width: 90%;
		padding: 0 5%;
		text-align: center;
	}
	.model-star-item {
		display: inline-block;
		width: 16%;
		color: #999;
	}
	.starIcon {
		font-size: 45rpx;
	}
	.starActive {
		color: #FF0721;
	}
	
	.btn-box{
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		margin-top: 10%;
		border-top: 2rpx solid #f0f0f0;
	}
	.cancel {
		width: 50%;
		height: 100%;
		font-size: 40rpx;
		color: #999;
		border-right: 2rpx solid #f0f0f0;
	}
	.confirm {
		width: 50%;
		height: 100%;
		font-size: 40rpx;
		color: #FF0076;
	}
</style>
