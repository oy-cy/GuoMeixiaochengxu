<template>
	<view class="add-addr-container">
		<save-addr isEdit="true" :addrId="id"/>
	</view>
</template>

<script>
import saveAddr from '@/component/site/saveAddr.vue';
	export default {
		data() {
			return {
				id:''
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		components:{
			saveAddr
		}
	}
</script>

<style lang="scss" scoped>
</style>
