<template>
	<view class="add-addr-container">
		<save-addr isEdit="true" :oldChecked="checked" :oldConsignee="consignee" :oldPhone="phone" :oldAddr="addr" :oldDetailedAddr="detailedAddr"/>
	</view>
</template>

<script>
import saveAddr from '@/component/site/saveAddr.vue'; 
	export default {
		data() {
			return {
				checked:'',
				consignee:'',
				phone:'',
				addr:'',
				detailedAddr:''
			}
		},
		components:{ 	
			saveAddr
		}
	}
</script>

<style lang="scss" scoped>
</style>
