<template>
		<MyReport :reportType="reportType" ref='report'></MyReport>
</template>

<script>
	export default {
		data() {
			return {
				reportType:14
			}
		},
		onReachBottom(){
			this.$refs.report.loadMoreData();
		}
	};
</script>

<style lang="scss" >
</style>


