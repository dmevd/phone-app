<template>
		<my-report :reportType="reportType" ref='report' :detailPath="detailPath"></my-report>
</template>

<script>
	export default {
		data() {
			return {
				reportType:23,
				detailPath:'/pages/report/inventoryReport/month/detail'
			}
		},
		onReachBottom(){
			this.$refs.report.loadMoreData();
		}
	};
</script>

<style lang="scss" >
</style>


