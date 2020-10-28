<template>
	<view class="add-addr-container">
		<save-addr isEdit="true" :addrId="id" :car="car"/>
	</view>
</template>

<script>
import saveAddr from '@/component/site/saveAddr.vue';
	export default {
		data() {
			return {
				id:'',
				car:false
			}
		},
		onLoad(option) {
			this.id = option.id;
			if(option.car == true || option.car == 'true'){
				this.car = option.car;
			}
		},
		components:{
			saveAddr
		}
	}
</script>

<style lang="scss" scoped>
</style>
