<template>
	<view >
		<u-navbar title-color="#000000" back-icon-color="#000000"
				  :is-fixed="true" :is-back="true"
				  :back-text-style="{color: '#000000'}" :title="model.reportName"
				  :back-icon-name="backIconName = 'nav-back'"
		>
			<view class="navbar-right" slot="right" >
				<view class="dot-box right-item">
					<u-icon name="list" size="38" color="#000000" @click="popupConfig.show = true"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="content" @touchstart="touchstartFun" @touchmove="touchmoveFun"
			  @touchend="touchendFun">

			<view class="table-wrap">
				<u-search v-model="showText.dateText" placeholder="请选择报表日期" @click="openCalendar" :disabled="true"
						  @search="submit" :shape="shape = 'square'" @custom="submit"
						  :show-action="showAction = true" :action-style="{width:150}" margin="0 30rpx 0 0"
						  :input-align="inputAlign = 'left'" ></u-search>
			</view>
			<!--表格-->
			<view class="table-wrap">
				<no-bad-table
						:columns="tableConfig.columns"
						:list="tableConfig.tableData"
						:loading="tableConfig.loading"
						@reportAction="reportActionFn"
						selection="single"  @on-selection-change="onSelectionChange"
				>
				</no-bad-table>
				<br/>
				<u-loadmore :status="tableConfig.loadStatus" bgColor="transparent" @loadmore="loadMoreData"></u-loadmore>
				<br/>
			</view>

			<!--查询条件-->
			<u-popup border-radius="10" v-model="popupConfig.show"
					 @close="popupConfig.show = false" @open="popupConfig.show = true" :mode="popupConfig.mode"
					  :mask="popupConfig.mask"
			>
				<view class="content wrap" >
					<br/><br/>
					<u-form :model="model" :rules="rules"  :errorType="errorType">
						<u-form-item label-width="150"
									 label-position="left" label="企业名称" prop="pwd">
							<u-input :border="border= false"
									 v-model="params.unitName" placeholder="请输入企业名称"
									 ></u-input>
						</u-form-item>

						<u-form-item label-width="150"
									 label-position="left" label="报表日期" prop="userName" >
							<u-input placeholder="请选择报表日期" v-model="showText.dateText" @click="openCalendar" type="text"
									 :disabled="true"></u-input>
						</u-form-item>
						<u-form-item label-width="150"
									 label-position="left" label="复核结果" prop="nickName" >
							<u-input :border="border= false" type="select" :select-open="reviewSelector.show"
									 v-model="showText.reviewResultText" placeholder="请选择复核结果"
									 @click="reviewSelector.show = true"></u-input>
						</u-form-item>
						<u-form-item label-width="150"
									 label-position="left" label="审核结果" prop="pwd">
							<u-input :border="border= false" type="select" :select-open="auditSelector.show"
									 v-model="showText.auditResultText" placeholder="请选择审核结果"
									 @click="auditSelector.show = true"></u-input>
						</u-form-item>
					</u-form>

					<!--查询按钮-->
					<u-button @click="reset" >重置</u-button>
					<br/>
					<u-button @click="submit" >查询</u-button>

				</view>

			</u-popup>

			<!--报表查询 日期-->
			<u-calendar v-model="calendarConfig.show" :mode="calendarConfig.mode" @change="confirmDate"
						:start-text="calendarConfig.startText" :end-text="calendarConfig.endText" :range-color="calendarConfig.rangeColor"
						:range-bg-color="calendarConfig.rangeBgColor" :active-bg-color="calendarConfig.activeBgColor" :btn-type="calendarConfig.btnType"
			>
			</u-calendar>
			<u-action-sheet :list="reviewSelector.list" v-model="reviewSelector.show" @click="confirmReview"></u-action-sheet>
			<u-action-sheet :list="auditSelector.list" v-model="auditSelector.show" @click="confirmAudit"></u-action-sheet>


			<!--报表操作-->
			<!--操作列表-->
			<u-action-sheet :list="tableConfig.rowDataAction.list" v-model="tableConfig.rowDataAction.show" @click="selectRowDataAction"></u-action-sheet>
			<!--复核-->
			<u-popup border-radius="10" v-model="tableConfig.rowDataAction.review.show"
					 @close="tableConfig.rowDataAction.show = false" @open="tableConfig.rowDataAction.review.show = true" mode="top"
					 :mask="true"
			>
				<view class="content wrap" >
					<br/><br/>
					<u-form ref="uReviewActionForm" :errorType="errorType">
						<u-form-item label-width="150"
									 label-position="left" label="复核结果" >
							<u-input :border="border= false" type="select" :select-open="tableConfig.rowDataAction.review.selector.show"
									 v-model="tableConfig.rowDataAction.review.resultText" placeholder="请复核" :require="true"
									 @click="tableConfig.rowDataAction.review.selector.show =true"></u-input>
						</u-form-item>

						<u-form-item label-width="150"
									 label-position="left" label="备注">
							<u-input :border="border= true" type="textarea" :height="200"
									 :auto-height="false"
									 v-model="tableConfig.rowDataAction.review.remark" placeholder="请输入备注"
							></u-input>
						</u-form-item>
					</u-form>

					<!--查询按钮-->
					<br/>
					<u-button @click="reviewFn" >提交</u-button>

				</view>

			</u-popup>
			<!--审核-->
			<u-popup border-radius="10" v-model="tableConfig.rowDataAction.audit.show"
					 mode="top" @close="tableConfig.rowDataAction.audit.show = false" @open="tableConfig.rowDataAction.audit.show = true"
					 :mask="true"
			>
				<view class="content wrap" >
					<br/><br/>
					<u-form ref="uAuditActionForm" :errorType="errorType">
						<u-form-item label-width="150"
									 label-position="left" label="审核结果" prop="noEmpty">
							<u-input :border="border= false" type="select" :select-open="tableConfig.rowDataAction.audit.selector.show"
									 v-model="tableConfig.rowDataAction.audit.resultText" placeholder="请审核"
									 @click="tableConfig.rowDataAction.audit.selector.show = true"></u-input>
						</u-form-item>

						<u-form-item label-width="150"
									 label-position="left" label="备注">
							<u-input :border="true" type="textarea" :height="200"
									 :auto-height="false"
									 v-model="tableConfig.rowDataAction.audit.remark" placeholder="请输入备注"
							></u-input>
						</u-form-item>
					</u-form>

					<!--查询按钮-->
					<br/>
					<u-button @click="auditFn" >提交</u-button>

				</view>

			</u-popup>

			<u-action-sheet :list="tableConfig.rowDataAction.review.selector.list" v-model="tableConfig.rowDataAction.review.selector.show" @click="showReview"></u-action-sheet>
			<u-action-sheet :list="tableConfig.rowDataAction.audit.selector.list"  v-model="tableConfig.rowDataAction.audit.selector.show"  @click="showAudit"></u-action-sheet>

		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>

	export default {
		// 注意这里的name命名，就是你以后封装好后使用的组件名
		name: 'my-report',//真机中， main.js 这个参数获取不到，不知道为啥
		props:{
			reportType:{
				type: Number,
				default: 11
			},
			detailPath:{
				type: String,
				default: ''
			}
		},
		data(){
			return {
				params:{
					type:-1,
					unitName:'',
					reportDateStart:'',
					reportDateEnd:'',
					reviewResult: '',
					auditResult:'',
					pageSize:20,
					pageNum: 1
				},
				showText:{
					dateText:'',
					reviewResultText: '',
					auditResultText:''
				},
				rules:{
					noEmpty:[{
						required: true,
						message: '不可为空',
						trigger: 'click' ,
					}]
				}
				,
				errorType:['message'],
				model: {
					reportType: -1,
					reportName: ''
				},
				tableConfig:{
					columns:[{
						title: "操作",
						key: "$operate",
						$operateList: [{
							label: "操作",
							event: "reportAction"
						}]
					},
						{	title: '报表日期',key: 'date'},{title: '企业',key: 'unitName'},
						{title: '提交人',	key: 'subByName'},{	title: '复核结果',key: 'reviewResultName'},{title: '复核备注',key: 'reviewRemark'},
						{title: '复核人',key: 'reviewByName'},{	title: '审核结果',key: 'auditResultName'},{title: '审核备注',key: 'auditRemark'},
						{title: '复核人',key: 'auditByName'}

					],
					tableData:[

					],
					loadStatus:'nomore',//loading / nomore  / loadmore,
					tableHeight: 1000,
					loading:false,
					rowDataAction:{
						show:false,
						reportId: -1,
						row:{},
						list:[{text: '查看详细',value: 'detail'},{text: '复核',value: 'review'},
							{text: '审核',value: 'audit'},{text: '删除',value: 'delete'}],

						review:{
							show: false,
							remark: '',
							result:'',
							resultText:'',
							selector:{
								show: false,
								mode: 'single-column', // single-column, mutil-column, mutil-column-auto
								list:[
									{text: '复核通过',value: 1},
									{text: '复核不通过',value: 0	}]
							}
						},
						audit:{
							show: false,
							remark: '',
							result:'',
							resultText:'',
							selector:{
								show: false,
								mode: 'single-column', // single-column, mutil-column, mutil-column-auto
								list:[
									{text: '审核通过',value: 1},
									{text: '审核不通过',value: 0	}]
							}
						}
					}
				},
				touchConfig: {
					scalImgShow: -1,
					touchX: 0,
					touchY: 0,
					touchZ: 0
				},
				popupConfig:{
					show: false,
					mode: 'top',
					mask: true, // 是否显示遮罩
				},
				calendarConfig:{
					show: false,
					mode: 'range',
					result: "请选择日期",
					startText: '开始',
					endText: '结束',
					rangeColor: '#2979ff',
					rangeBgColor: 'rgba(41,121,255,0.13)',
					activeBgColor: '#2979ff',
					btnType: 'primary',
				},
				reviewSelector:{
					show: false,
					mode: 'single-column', // single-column, mutil-column, mutil-column-auto,
					list:[
						{text: '复核通过',value: 1},
						{text: '复核不通过',value: 0},
						{text: '待复核',value: 2},
						{text: '清空',value: null}]
				},
				auditSelector:{
					show: false,
					mode: 'single-column', // single-column, mutil-column, mutil-column-auto
					list:[
						{text: '审核通过',value: 1},
						{text: '审核不通过',value: 0	},
						{text: '待审核',	value: 2},
						{text: '清空',value: null}]
				}
			}
		},
		//页面初始加载
		created(){
			let me = this;
			me.model.reportType = me.reportType;
			me.params.type = me.reportType;
			me.model.reportName = me.getReportName(me.model.reportType);
			console.log('全局分页' +  me.$sysConfig.pageSize);
			me.params.pageSize = me.$sysConfig.pageSize;

			uni.getSystemInfo({
				success: function (res) {
					me.tableConfig.tableHeight = res.windowHeight - (res.windowHeight * 0.17);
				}
			});


		},

		methods:{
			openCalendar:function () {
				this.calendarConfig.show = true;
			},
			confirmDate(e) {
				this.params.reportDateStart = e.startDate;
				this.params.reportDateEnd = e.endDate;
				this.showText.dateText = e.startDate + " - " + e.endDate;
			},
			confirmReview(index){
				let value = this.reviewSelector.list[index].value;
				this.params.reviewResult =value;
				if(value == null || value === ''){
					this.showText.reviewResultText = '';
				}else{
					this.showText.reviewResultText = this.reviewSelector.list[index].text;
				}
			},
			confirmAudit(index){
				let value = this.auditSelector.list[index].value;
				this.params.auditResult =value;
				if(value == null || value === ''){
					this.showText.auditResultText = '';
				}else{
					this.showText.auditResultText = this.auditSelector.list[index].text;
				}
			},
			touchendFun (e) {
				// if (this.touchConfig.touchZ !== 1) {
				// 	this.touchConfig.touchX = 0;
				// 	this.touchConfig.touchY = 0;
				// } else if (this.touchZ === 1) {
				// 	this.touchConfig.touchX = 0;
				// 	this.touchConfig.touchY = 0;
				// 	this.touchConfig.touchZ = 0;
				// 	// this.delectList = true
				// 	/* 到这里已确定触发了长按事件，接下来执行长按后要做的其他事情 */
				// }
			},
			touchmoveFun (e) {
				// let moveEndY = e.changedTouches[0].pageY;
				// let Y = this.touchConfig.touchY - moveEndY;
				// if(Y < - 40 ){ //下滑
				// 	this.popupConfig.show = true;
				// 	return true;
				// }
				//
				// return false;
			},
			touchstartFun (e) {
				// if (e.touches.length > 1) {
				// 	return false
				// }
				// this.touchConfig.touchZ = 0
				// let that = this
				// this.timeOutEvent = setTimeout(() => {
				// 	that.touchConfig.touchZ = 1
				// }, 2000)
				// this.touchConfig.touchX = e.touches[0].clientX
				// this.touchConfig.touchY = e.touches[0].clientY
			},
			submit(){
				this.loadTableData(1);
				this.popupConfig.show = false;
			},
			loadMoreData(){
				if(this.tableConfig.loadStatus === 'nomore'){
					return ;
				}
				this.loadTableData(this.params.pageNum + 1);
			},
			loadTableData(pageNum){
				let me = this;
				me.params.pageNum = pageNum;
				me.tableConfig.loading = true;

				//手机短震动
				uni.vibrateShort({});

				me.$api.reportService('getReportList',
						me.params
				).then(res => {
					let data = res.result;
					let list = data.list;
					let total = data.total;
					let len = list.length;
					console.log("获取接口数据长度: " + len);
					if(pageNum === 1){
						me.tableConfig.tableData = list;
					}else{
						me.tableConfig.tableData = me.tableConfig.tableData.concat(list);
					}

					if(me.tableConfig.tableData.length === total ){
						me.tableConfig.loadStatus = 'nomore';
					}else if(me.tableConfig.tableData.length < total){
						me.tableConfig.loadStatus = 'loadmore';
					}

					me.showMyToast(me);
					me.tableConfig.loading = false;
				});
			},
			reset(){
				this.params.auditResult= '';
				this.params.reviewResult = '';
				this.params.reportDateStart = '';
				this.params.reportDateEnd = '';
				this.showText.auditResultText = '';
				this.showText.reviewResultText = '';
				this.showText.dateText = '';
			},
			reportActionFn(obj){
				let row = obj.row;
				this.tableConfig.rowDataAction.reportId = row.id;
				this.tableConfig.rowDataAction.show = true;
				this.tableConfig.rowDataAction.row = row;
				if(row.reviewResult == 2 ){//待复核
					this.tableConfig.rowDataAction.list = [{text: '查看详细',value: 'detail'},
						{text: '复核',value: 'review'},{text: '删除',value: 'delete'}];
				}else if(row.auditResult == 2){//待审核
					this.tableConfig.rowDataAction.list = [{text: '查看详细',value: 'detail'},
						{text: '审核',value: 'audit'},{text: '删除',value: 'delete'}];
                }else{
					this.tableConfig.rowDataAction.list = [{text: '查看详细',value: 'detail'}
					,{text: '删除',value: 'delete'}];
				}

			},
			selectRowDataAction(index){
				let me = this;
				let value = me.tableConfig.rowDataAction.list[index].value;
				if(value === 'detail'){
					let path = me.detailPath;
					if(path === '' || path === null || path === undefined){
						return ;
					}
					me.$u.route({
						url: path
					})
				}else if(value === 'review'){
					me.tableConfig.rowDataAction.review.show = true;
				}else if(value === 'audit'){
					me.tableConfig.rowDataAction.audit.show = true;
				}else if(value === 'delete') {
					uni.showActionSheet({
						itemList: ['取消删除', '确认删除'],
						success: function (res) {
							// tabIndex 从0 开始
							if(res.tapIndex === 1){

								me.$api.reportService('deleteReport',
										{
											id: me.tableConfig.rowDataAction.reportId,
											type: me.reportType
										}
								).then(res => {
									me.showMyToast(me, {title: '删除成功！'});
									me.submit();
								})

							}
						}
					});
				}
			},
			onSelectionChange(obj){
				console.log("对比前后，选中的变化");
				console.log(obj);
				let rowObj = {};
				rowObj.index = obj.new.index;
				rowObj.row = obj.new.item;

				this.reportActionFn(rowObj)
			},
			showAudit(index){
				this.tableConfig.rowDataAction.audit.result = this.tableConfig.rowDataAction.audit.selector.list[index].value;
				this.tableConfig.rowDataAction.audit.resultText = this.tableConfig.rowDataAction.audit.selector.list[index].text;
			},
			auditFn(){
			    let me = this;
				let result = me.tableConfig.rowDataAction.audit.result;
				if(result == null || result ===''){
					me.showMyToast(me, {title: '请选择审核结果！', type:'warning'});
					return ;
				}
                me.$api.reportService('auditReport',
                    {
                        id: me.tableConfig.rowDataAction.reportId,
                        type: me.reportType,
						auditRemark: me.tableConfig.rowDataAction.audit.remark,
						auditResult: me.tableConfig.rowDataAction.audit.result
                    }
                ).then(res => {
                	me.tableConfig.rowDataAction.audit.show = false;
                    me.showMyToast(me, {title: '审核成功！',type:'success'});
                    me.submit();
                })
			},
			showReview(index){
				this.tableConfig.rowDataAction.review.result = this.tableConfig.rowDataAction.review.selector.list[index].value;
				this.tableConfig.rowDataAction.review.resultText = this.tableConfig.rowDataAction.review.selector.list[index].text;
			},
			reviewFn(){
				let me = this;
				let result = me.tableConfig.rowDataAction.review.result;
				if(result == null || result ===''){
					me.showMyToast(me, {title: '请选择审核结果！', type:'warning'});
					return ;
				}
				me.$api.reportService('reviewReport',
						{
							id: me.tableConfig.rowDataAction.reportId,
							type: me.reportType,
							reviewRemark: me.tableConfig.rowDataAction.review.remark,
							reviewResult: me.tableConfig.rowDataAction.review.result
						}
				).then(res => {
					me.tableConfig.rowDataAction.review.show = false;
					me.showMyToast(me, {title: '复核成功！',type:'success'});
					me.submit();
				})
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
		background: white;
	}
	.table-wrap{
		padding: 20rpx 0rpx 0rpx 30rpx;
		background-color: transparent;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}

	.message-box {

	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240,240, 240, 0.35);
		color: #fff;
		font-size: 22rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
	}

	.map-wrap-text {
		padding: 0 6rpx;
	}
</style>
