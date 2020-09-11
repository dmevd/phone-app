<template>
	<view>
		<!--		<u-navbar :is-back="false" title="　" :border-bottom="false">-->
		<!--			<view class="u-flex u-row-right" style="width: 100%;">-->
		<!--				<view class="camera u-flex u-row-center">-->
		<!--					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>-->
		<!--				</view>-->
		<!--			</view>-->
		<!--		</u-navbar>-->
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<!--				<u-avatar :src="pic" size="140"></u-avatar>-->
				<u-avatar style="margin-top: 10px" src="../../static/account.jpg" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{model.nickName}}</view>
				<view class="u-font-14 u-tips-color">账号: {{model.userName}}</view>
			</view>
<!--			<view class="u-m-l-10 u-p-10">-->
<!--				<u-icon name="scan" color="#969799" size="28"></u-icon>-->
<!--			</view>-->
<!--			<view class="u-m-l-10 u-p-10">-->
<!--				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>-->
<!--			</view>-->
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="lock" title="更改密码"  @click="toUpdatePwd"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="退出登录" @click="showloginOut"></u-cell-item>
			</u-cell-group>
		</view>

		<u-action-sheet :list="loginOutModel.actionSheetList" v-model="loginOutModel.actionSheetShow" @click="loginOut"></u-action-sheet>

		<!-- 底部菜单 -->
		 <u-gap height="70"></u-gap>
				<u-tabbar :list="vuex_tabbar"></u-tabbar>
				<u-toast ref="uToast" ></u-toast>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					userName: '',
					nickName: ''
				},
				pic: 'https://uviewui.com/common/logo.png',
				show: true,
				loginOutModel:{
					actionSheetList:[
						{
							text: '退出'
						}
					],
					actionSheetShow: false

				}
			}
		},
		mounted() {

		},
		onShow() {
			let me = this;
			const userInfo = me.checkLogin();
			me.model.userName = userInfo.userName;
			me.model.nickName = userInfo.nickName;
		},
		methods: {
			showloginOut(){
				this.loginOutModel.actionSheetShow = true;
			},
			loginOut(){
				this.loginOutModel.actionSheetShow = false;
				uni.redirectTo({
					url: '/pages/index/index'
				})
			},
			toUpdatePwd(){
				this.$u.route({
					url:"pages/user/updatePwd"
				})
			}
		}
	}

</script>

<style lang="scss">
	page{
		background-color: #ededed;
	}

	.camera{
		width: 54px;
		height: 44px;

		&:active{
			background-color: #ededed;
		}
	}
	.user-box{
		background-color: #fff;
	}

	u-button{
		border: 0
	}

	button::after{ border: none;}

</style>
