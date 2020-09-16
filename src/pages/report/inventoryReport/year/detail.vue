<template>
	<view>
		<my-report-detail
				:options="report" :dataUrl="url = 'getInventoryReportYear'"
				:columns="columns" :popItems="popItems"
		></my-report-detail>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				report:{},
				columns:[ {title: "编号", key: "keyValue"}, {title: "药品、玻璃器皿名称", key: "name"},
					{title: "规格", key: "specifications"}, {title: "上年库存数量", key: "lastInventory"},
					{title: "本年入库数量", key: "inventoryIn"}, {title: "本年领用数量", key: "inventoryOut"},
					{title: "本年库存数量", key: "inventory"}],
				popItems:[]
			}
		},
		onLoad(options){
			// {
			// 	"id": "250",
			// 		"name": "库存月度报表",
			// 		"type": "23",
			// 		"typeName": "库存月报表",
			// 		"date": "2020-09-09",
			// 		"unitId": "1",
			// 		"unitName": "总公司",
			// 		"subBy": "1",
			// 		"subByName": "nickName",
			// 		"subTime": "2020-09-09 13:51:53",
			// 		"reviewBy": "1",
			// 		"reviewByName": "nickName",
			// 		"reviewTime": "2020-09-09 13:52:00",
			// 		"reviewResult": "1",
			// 		"reviewResultName": "通过",
			// 		"auditBy": "1",
			// 		"auditByName": "nickName",
			// 		"auditTime": "2020-09-09 13:52:05",
			// 		"auditResult": "1",
			// 		"auditResultName": "通过"
			// }
			this.report = options;

			this.popItems = [{
				type:'text',
				name:'企业',
				value :this.report.unitName
			},{
				type:'text',
				name:'日期',
				value :this.report.date
			}];
		},
	}
</script>

<style lang="scss" >

</style>
