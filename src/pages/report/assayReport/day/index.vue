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
		onLoad(){
			console.log("what the fuck!!")

		},
		onShow(){
			console.log("what the fuck!!")
		},
		onReachBottom(){
			this.$refs.report.loadMoreData();
		}
	};
</script>

<style lang="scss" >
</style>


