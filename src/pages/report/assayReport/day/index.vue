<template>
	<view>
		<my-report :reportType="reportType" ref='report'>
		</my-report>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reportType:11
			}
		},
		onReachBottom(){
			this.$refs.report.loadMoreData();
		}
	};
</script>

<style lang="scss" >
</style>


