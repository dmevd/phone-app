<template>
	<view>
		<my-report :reportType="reportType" ref='report' :detailPath="detailPath">
		</my-report>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reportType:11,
				detailPath: '/pages/report/assayReport/day/detail'
			}
		},
		onReachBottom(){
			this.$refs.report.loadMoreData();
		}
	};
</script>

<style lang="scss" >
</style>


