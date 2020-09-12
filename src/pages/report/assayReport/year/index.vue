<template>
		<my-report :reportType="reportType" ref='report'></my-report>
</template>

<script>
	export default {
		data() {
			return {
				reportType:15
			}
		},
		onReachBottom(){
			this.$refs.report.loadMoreData();
		}
	};
</script>

<style lang="scss" >
</style>


