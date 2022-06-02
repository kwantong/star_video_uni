export function getOpenID(appid, secret, callback) {
	uni.login({
		success: function(res) {
			alert(res.code)
			if (res.code) {
				var openid = '';
				var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
				uni.request({
					url: url,
					data: {},
					method: 'GET',
					success: function(res) {
						var obj = {};
						obj.openid = res.data.openid;
						obj.expires_in = Date.now() + res.data.expires_in;
						if (Object.prototype.toString.call(callback) === "[object Function]") {
							callback(obj)
						} else {
							console.log('callback传入类型应为Function!')
						}
					}
				});
			} else {
				console.log('获取用户登录态失败！' + res.errMsg);
			}
		}
	});
}