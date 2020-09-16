<template>
	<view>
		<my-report-detail
				:options="report" :dataUrl="url = 'getInventoryReportMonth'"
				:columns="columns" :dataList="dataList" :popItems="popItems" :spanMethod="spanMethod"
		></my-report-detail>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				report:{},
				columns:[ {title: "类别", key: "keyValue"},
					{title: "项目", key: "name", $width:'160px'},
					{title: "进水", key: "in"}, {title: "出水", key: "out"},
					{title: "去除率", key: "rate"}],
				dataList:[],
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

			this.dataList = [
				{ rowspan: 12, keyValue:'污水每日', name: 'pH', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'CODCr(mg/ L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'BOD5(mg/ L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'SS(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'NH3-N(mg/ L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'TP(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'TN(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '粪大肠菌群数(个/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'MLSS(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'DO(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'SV(%)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'SVI(mL/g)', in:'1', out:'2', rate:'25' },

				{ rowspan: 4, keyValue:'污水每周', name: '氯化物(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'TSS(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'TDS(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: 'MLVSS(mg/L)', in:'1', out:'2', rate:'25' },

				{ rowspan: 1, keyValue:'类别', name: '项目', in:'进泥', out:'出泥' },

				{ rowspan: 1, keyValue:'污泥每日', name: '含水量(%)', in:'1', out:'2', rate:'25' },

				{ rowspan: 9, keyValue:'污泥每周', name: 'pH(/)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '有机物(%)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '上清液TN(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '上清液TP(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '上清液SS(mg/L)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '回流污泥SV(%)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '回流污泥SVI(mL/g)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '回流污泥MLSS(mL/g)', in:'1', out:'2', rate:'25' },
				{ rowspan: 0, keyValue:'', name: '回流污泥MLVSS(mL/g)', in:'1', out:'2', rate:'25' },

				{ rowspan: 1, keyValue:'备注', name: '', in:'1', out:'2', rate:'25' },
			];

		},
		methods:{
			spanMethod(	row, column, rowIndex, columnIndex) {
				if (columnIndex == 0) {
					if(row.nameCols){

					}

					if (row.rowspan) {
						return {
							rowspan: row.rowspan,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 1
						};
					}
				}
				else{
					return {
						rowspan: 1,
						colspan: 1
					};
				}

				if (column.keyValue === '备注') {
					return {
						rowspan: 1,
						colspan: 2
					};
				} else if (row.nameCols == 2 && column.key == 'age') {
					return {
						rowspan: 1,
						colspan: 0
					};
				} else {
					return {
						rowspan: 1,
						colspan: 1
					};
				}

			}
		}
	}
</script>

<style lang="scss" >

</style>
