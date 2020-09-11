<template>
    <view class="content wrap">
        <image class="logo" src="../../static/logo.png"></image>
        <view class="titletal">
            <text class="title">{{ model.title }}</text>
        </view>

		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '50rpx'}" left-icon="account" label-width="150"
				:label-position="labelPosition" label="账号" prop="userName">
				<u-input  placeholder="请输入姓名" v-model="model.userName" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '50rpx'}" left-icon="lock" label-width="150"
				:label-position="labelPosition" label="密码" prop="pwd">
				<u-input :pwd-icon="true"  type="password" v-model="model.pwd" placeholder="请输入密码"></u-input>
			</u-form-item>

			<!-- 此处switch的slot为right，如果不填写slot名，也即<u-switch v-model="model.remember"></u-switch>，将会左对齐 -->
			<u-form-item :label-position="labelPosition" label="记住密码" prop="remember" label-width="150">
				<u-switch v-model="model.remember" slot="right"></u-switch>
			</u-form-item>

		</u-form>
		<u-toast ref="uToast" />


        <!--按钮-->
        <view class="loginBtnView"><button class="loginBtn" @tap="submit">登录</button></view>
    </view>

</template>

<script>
export default {
    data() {
        return {
			model:{
				title: '手机app学习',
				userName: '',
				pwd: '',
				remember: false
			},
			labelPosition: 'left',
			errorType: ['message'],
			rules: {
				userName:[{
					required: true,
					message: '请输入账号',
					trigger: ['change','blur'],
				}],
				pwd: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['change','blur'],
					},
					// {
					// 	// 正则不能含有两边的引号
					// 	pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
					// 	message: '需同时含有字母和数字，长度在6-12之间',
					// 	trigger: ['change','blur'],
					// }
				],
			}
        };
    },
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		// this.model.title = this.$scope.globalData.title;
	},
    //页面初始加载
    mounted() {
        let me = this;

		//缓存的账号
		const rememberLogin = uni.getStorageSync('HCrememberLogin');
		if(rememberLogin){
			//缓存的账号
			const HCuserName = uni.getStorageSync('HCuserName');
			//缓存的密码
			const HCpwd = uni.getStorageSync('HCpwd');
			//有缓存就赋值给文本没有就清空
			if (HCuserName && HCpwd) {
				me.model.userName = HCuserName;
				me.model.pwd = HCpwd;
				me.model.remember = rememberLogin;
			} else {
				me.userName = '';
				me.model.pwd = '';
				uni.setStorageSync('HCuserName', '');
				uni.setStorageSync('HCpwd', '');
				uni.setStorageSync('HCrememberLogin', false)
			}
		}

    },
    methods: {

		submit() {
			let me = this;

			let userName = me.model.userName;
			let pwd = me.model.pwd;
			let rememberLogin = me.model.remember;

			console.log(rememberLogin);
			me.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					me.$api.userService('login', {
						name: userName,
						pwd : pwd
					}).then(res => {
						let data = res.result;
						uni.setStorageSync('HCuserId', data.id);
						uni.setStorageSync('HCuserName', data.name);
						uni.setStorageSync('HCnickName', data.nickName);
						uni.setStorageSync('HCrememberLogin', rememberLogin);
						uni.setStorageSync('HCpwd', pwd);
						uni.setStorageSync('HCreloadMenu', true);
					   // 获得数据
					   // me.showMyToast(me, '登录成功！', 'error', 'top');
					   // 带参数
						uni.switchTab({
							url: '/pages/main/index'
						});
					})
				} else{
					me.showMyToast(me, {
						title:'请确认账户名密码！',
						type:'error'
					});
				}
			});
		}
    }
};
</script>

<style lang="scss">
.mui-checkbox input[type='checkbox']:checked:before {
    color: #00bbb1;
}
.RememberPass {
    color: #adadad;

    margin-top: 5px;
}
.RememberCheck {
    margin-left: -50%;
    margin-top: 10px;
    color: #adadad;
}
.content {
    text-align: center;
    height: 400upx;
}
.backlogo {
    padding-bottom: 0px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
}
.logo {
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
}
.titletal {
    margin-top: 90upx;
    height: 75px;
}
.title {
    /* font-size: 36upx; */
    color: mediumaquamarine;
    font-size: 150%;
}

.text {
    border: 1, solid, black;
}

.login-from {
    /* margin-top: 30%; */

    flex: auto;
    height: 100%;
    width: 100%;
}

.inputView {
    background-color: #fff;
    line-height: 50px;
    border-width: 1px;
    border-bottom: 2dp;
}

/*输入框*/
.nameImage,
.keyImage {
    margin-left: 22px;
    width: 18px;
    height: 18px;
}

.loginLab {
    margin: 15px 15px 15px 10px;
    color: #545454;
    font-size: 18px;
}

.inputText {
    flex: block;
    float: right;
    text-align: left;
    margin-right: 22px;
    margin-top: 15px;
    color: #000000;
    font-size: 18px;
}

.line {
    width: 100%;
    height: 1px;
    background-color: #cccccc;
    margin-top: 1px;
}

/*按钮*/
.loginBtnView {
    width: 100%;
    height: auto;
    /* background-color:#FFFFFF; */
    margin-top: 20px;
    margin-bottom: 0px;
    padding-bottom: 0px;
}

.loginBtn {
    width: 80%;
    margin-top: 50px;
    background-color: mediumaquamarine;
    color: aliceblue;
}

.wrap {
	padding: 30rpx;
}

.agreement {
	display: flex;
	align-items: center;
	margin: 40rpx 0;

	.agreement-text {
		padding-left: 8rpx;
		color: $u-tips-color;
	}
}
</style>
