<template>
	<view class="content wrap">

		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item label-width="150"
				:label-position="labelPosition" label="账号" prop="userName" >
				<u-input placeholder="请输入账号" v-model="model.userName" type="text" :disabled="true"></u-input>
			</u-form-item>
            <u-form-item label-width="150"
                         :label-position="labelPosition" label="用户名" prop="nickName" >
                <u-input placeholder="请输入用户名" v-model="model.nickName" type="text" ></u-input>
            </u-form-item>
			<u-form-item label-width="150"
				:label-position="labelPosition" label="密码" prop="pwd">
				<u-input :pwd-icon="true" :required="true"  type="password" v-model="model.pwd" placeholder="请输入密码"></u-input>
			</u-form-item>

		</u-form>

<!--        修改密码确认弹窗-->
        <u-modal ref="uModal" v-model="confirmModel.show" :show-cancel-button="true"
                 :show-title="false"
                 @confirm="submit" :content="confirmModel.content"
        >
        </u-modal>
		<!--按钮-->
		<view class="loginBtnView"><button class="loginBtn" @tap="confirm">提交</button></view>

        <u-toast ref="uToast" />
	</view>

</template>

<script>
  export default {
    data() {
        return {
            model: {
              userId:'',
              userName: '',
              nickName:'',
              pwd: ''
            },
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
                  {
                  	// 正则不能含有两边的引号
                  	pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
                  	message: '需同时含有字母和数字，长度在6-12之间',
                  	trigger: ['change','blur'],
                  }
                ],
            },
            labelPosition: 'left',
            actionSheetShow: false,
            confirmModel:{
              show:false,
              content: ''
            }
        }
    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    onShow(){
        let me = this;
        let userInfo = me.checkLogin();
        me.model.userName = userInfo.userName;
        me.model.userId = userInfo.userId;
        me.model.nickName = userInfo.nickName;
    },
    methods: {

        confirm(){
            let me = this;
            me.$refs.uForm.validate(valid => {
              if(valid){
                me.confirmModel.content = "本次修改密码为： "+ me.model.pwd;
                me.confirmModel.show = true;
              }
            });
        },
        submit(){
            let me = this;
            let userId = me.model.userId;
            let userName = me.model.userName;
            let nickName = me.model.nickName;
            let pwd = me.model.pwd;

            me.$refs.uForm.validate(valid => {
            if (valid) {
                console.log('验证通过');
                me.$api.userService('updateUser', {
                    userId: userId,
                    name: userName,
                    nickName: nickName,
                    pwd : pwd
                }).then(res => {
                    // 获得数据
                    uni.redirectTo({
                      url: '/pages/index/index'
                    })
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
  }

</script>


<style lang="scss">
    .wrap {
        padding: 30rpx;
    }
    .content {
        text-align: center;
        height: 400upx;
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

</style>
