<template>
	<view class="wrap">

		<!-- 轮播图 -->
		<view class="u-demo-wrap">
			<view>
				<u-swiper  :height="250" :list="swiper.list" :title="swiper.title" :effect3d="effect3d = true"
						   :indicator-pos="swiper.indicatorPos" :mode="swiper.mode" :interval="3000" @click="click"></u-swiper>
			</view>
		</view>


		<!-- 菜单 -->
		<view class="list-wrap" >
			<u-cell-group title-bg-color="rgb(243, 244, 246)" :title="getGroupTitle(item)" v-for="(item, index) in menuList" :key="index">
				<u-cell-item :titleStyle="{fontWeight: 500}" @click="openPage(item1.path)" :title="getFieldTitle(item1)"
				 v-for="(item1, index1) in item.list" :key="index1">
					<image slot="icon" class="u-cell-icon" :src="getIcon(item1.icon)" mode="widthFix"></image>
				</u-cell-item>
			</u-cell-group>
			<u-gap :height="70" ></u-gap>
		</view>

		<!-- 底部菜单 -->
		 <u-tabbar :list="vuex_tabbar"></u-tabbar>
		 <u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				menuList: [],
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF',
				swiper:{
					list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}],
					mode: 'round',
					indicatorPos: 'bottomCenter'
				}
			}
		},
		onShow(){

		},
		//页面初始加载
		mounted() {

		},
		computed: {
			getIcon() {
				return path => {
					return 'https://cdn.uviewui.com/uview/example/' + path + '.png';
				}
			}
		},
		onShow(){
			let userInfo = this.checkLogin();
			this.getMenuList(userInfo);
		},
		methods: {
			openPage(path) {
				if(path === '' || path === null || path === undefined){
					return ;
				}
				this.$u.route({
					url: path
				})
			},
			getGroupTitle(item) {
				return item.groupName
			},
			getFieldTitle(item) {
				return item.title
			},
			click(index) {
			},
			change(index) {
				// this.$refs.uToast.show({
				// 	title: `滚动到了第${index + 1}张图片`,
				// 	type: 'success'
				// })
			},
			getMenuList(userInfo){
				let reloadMenu = uni.getStorageSync('HCreloadMenu');
				if(reloadMenu || this.menuList.length === 0){
					let me = this;
					let userId = userInfo.userId;
					let menuList = [];
					me.$api.userService('getUserMenuList', {
						userId: userId
					}).then(res => {
						let data = res.result;
						let len = data.length;
						// 获得数据
						for(let i = 0; i < len; i ++) {
							let menu = data[i];
							let children = menu.children;
							let tmp = {
								// icon:menu.icon,
								groupName: menu.name,
								// path: menu.appUrl,
								path: 'pages/user/updatePwd',
								list:[]
							};
							let len2 = children === null ? 0 : children.length;
							if(len2 === 0){
								tmp.list.push({
									path: menu.appUrl,
									// icon: menu.icon,
									title: menu.name
								});
							}else{
								for(let j = 0; j < len2; j ++){
									let child = children[j];
									tmp.list.push({
										path: child.appUrl,
										// icon: child.icon,
										title: child.name
									});
								}
							}
							menuList.push(tmp);

						}

						this.menuList = menuList;
					});

					uni.setStorageSync('HCreloadMenu', false);
				}

			}

		}
	}
</script>


<style lang="scss" scoped>

	.u-demo-wrap {
		background-color: rgb(250, 250, 250);
		padding: 40rpx 20rpx;
		border-radius: 6px;
	}

	.u-cell-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}
	.item {
		margin: 30rpx 0;
	}
	.list-wrap{
		height: 550px;
	}

</style>
