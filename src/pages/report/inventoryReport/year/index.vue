<template>
		<my-report :reportType="reportType" ref='report' :detailPath="detailPath"></my-report>
</template>

<script>
	export default {
		data() {
			return {
				reportType:25,
				detailPath:'/pages/report/inventoryReport/year/detail'
			}
		},
		onReachBottom(){
			this.$refs.report.loadMoreData();
		}
	};
</script>

<style lang="scss" >
</style>


