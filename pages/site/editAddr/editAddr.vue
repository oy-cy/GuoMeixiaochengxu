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
<<<<<<< HEAD
=======
		onLoad() {
			// todo 获取编辑的地址(外部参数：地址id)
		},
>>>>>>> 3f92226f0f0103c181045eaa820ab7c56e9774ca
		components:{ 	
			saveAddr
		}
	}
</script>

<style lang="scss" scoped>
</style>
