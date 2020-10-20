<template>
	<view class="add-addr-container">
		<save-addr/>
	</view>
</template>

<script>
import saveAddr from '@/component/site/saveAddr.vue'; 
	export default {
		data() {
			return {
			}
		},
		components:{ 	
			saveAddr
		}
	}
</script>

<style lang="scss" scoped>
</style>
