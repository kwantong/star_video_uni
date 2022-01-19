<template>
	<view>
		<view class="upload-dialogue">
			<view class="upload-content">
				<view class="title-content">
					<text class="title">上传照片</text>
				</view>
				<cropper @uploadLoadCallBack="uploadLoadCallBack" :vm="this"></cropper>
			</view>
		</view>
		<view>
			<div><label>颜值：{{detectResult.beauty}}</label></div>
			<div><label>性别：{{detectResult.gender}}</label></div>
			<div><label>年龄：{{detectResult.age}}</label></div>
			<div><label>脸型：{{detectResult.face_shape}}</label></div>
			<div><label>表情：{{detectResult.expression}}</label></div>
			<div><label>心情：{{detectResult.emotion}}</label></div>
			<div><label>脸：{{detectResult.face_type}}</label></div>
		</view>
	</view>
</template>

<script>
	import Cropper from '@/components/Cropper/cropper.vue'
	import { detectFace } from '@/api/faceDetect.js'
	export default {
		components:{
			Cropper
		},
		data() {
			return {
				detectResult: {
					beauty: '',
					age: '',
					expression: '',
					face_shape: '',
					gender: '',
					emotion: '',
					face_type: '',
				},
				video: {},
				canvas: {},
				captures: []
			}
		},
		methods: {
			uploadLoadCallBack(resTempPath){
				const that = this
				console.log('resTempPath-->',resTempPath)
				console.log('that.uploadOption>',that.uploadOption)
				detectFace(resTempPath,function(res2){
					console.log('res2-->',res2)
					that.detectResult = res2.data
				})
			},
		}
	}
</script>

<style>

</style>
