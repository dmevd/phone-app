<template>
	<view>
		<my-report-detail
				:options="report"
				:columns="columns" dataUrl="getAssayReport" :popItems="popItems" :getDataList="getDataList"
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

			let me = this;
			me.report = options;

			me.popItems = [{
				type:'text',
				name:'企业',
				value :me.report.unitName
			},{
				type:'text',
				name:'日期',
				value :me.report.date
			}];

		},
		methods:{
			getDataList(list){
				let listMap = {};
				for (let i = 0; i < list.length; i ++){
					let item = list[i];
					listMap[item.itemId] = item;
				}

				let dataList = [
					{ itemId: 'wsmrph', row_span: [12],  keyValue:'污水每日', name: 'pH', in:'', out:'', rate:'' },
					{ itemId: 'wsmrcodcr', keyValue:'',  name: 'CODCr(mg/ L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrbod5', keyValue:'', name: 'BOD5(mg/ L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrss', keyValue:'', name: 'SS(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrnh3-n', keyValue:'', name: 'NH3-N(mg/ L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrtp', keyValue:'', name: 'TP(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrtn', keyValue:'', name: 'TN(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrfdcjqs', keyValue:'', name: '粪大肠菌群数(个/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrmlss', col_span:[1,1,1,0,0], keyValue:'', name: 'MLSS(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrdo', col_span:[1,1,1,0,0], keyValue:'', name: 'DO(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrsv', col_span:[1,1,1,0,0], keyValue:'', name: 'SV(%)', in:'', out:'', rate:'' },
					{ itemId: 'wsmrsvi', col_span:[1,1,1,0,0], keyValue:'', name: 'SVI(mL/g)', in:'', out:'', rate:'' },

					{ itemId: 'wsmzlhw', row_span: [4], keyValue:'污水每周', name: '氯化物(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmztss', keyValue:'', name: 'TSS(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmztds', keyValue:'', name: 'TDS(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wsmzmlvss', col_span:[1,1,1,0,0], keyValue:'', name: 'MLVSS(mg/L)', in:'', out:'', rate:'' },

					{ itemId: 'text', row_span: [1], keyValue:'类别', name: '项目', in:'进泥', out:'出泥' },

					{ itemId: 'wnmrhsl', row_span: [1], keyValue:'污泥每日', name: '含水量(%)', in:'', out:'', rate:'' },

					{ itemId: 'wnmzph', row_span: [9], keyValue:'污泥每周', name: 'pH(/)', in:'', out:'', rate:'' },
					{ itemId: 'wnmzyjf', keyValue:'', name: '有机物(%)', in:'', out:'', rate:'' },
					{ itemId: 'wnmzsqytn', col_span:[1,1,1,0,0], keyValue:'', name: '上清液TN(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wnmzsqytp', col_span:[1,1,1,0,0], keyValue:'', name: '上清液TP(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wnmzsqyss', col_span:[1,1,1,0,0], keyValue:'', name: '上清液SS(mg/L)', in:'', out:'', rate:'' },
					{ itemId: 'wnmzhlwnsv', col_span:[1,1,1,0,0], keyValue:'', name: '回流污泥SV(%)', in:'', out:'', rate:'' },
					{ itemId: 'wnmzhlwnsvi', col_span:[1,1,1,0,0], keyValue:'', name: '回流污泥SVI(mL/g)', in:'', out:'', rate:'' },
					{ itemId: 'wnmzhlwnmlss', col_span:[1,1,1,0,0], keyValue:'', name: '回流污泥MLSS(mL/g)', in:'', out:'', rate:'' },
					{ itemId: 'wnmzhlwnmlvss', col_span:[1,1,1,0,0], keyValue:'', name: '回流污泥MLVSS(mL/g)', in:'', out:'', rate:'' },

					{ itemId: 'remark', row_span: [1], col_span:[1,1,0,0,0], keyValue:'备注', name: '', in:'1', out:'', rate:'' }

				];

				for (let j = 0; j < dataList.length; j++){
					let item2 = dataList[j];
					let value = listMap[item2.itemId];
					if (value === undefined){
						continue;
					}
					item2.in = value.in ? value.in : value.value ? value.value : '';
					item2.out = value.out;
					item2.rate = value.rate;

					if(item2.name === ''){
						item2.name = item2.in;
					}
				}

				return dataList;
			}
		}
	}
</script>

<style lang="scss" >

</style>
