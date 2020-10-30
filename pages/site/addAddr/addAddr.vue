<template>
	<view class="add-addr-container">
		<save-addr :car="car"/>
	</view>
</template>
 
<script>
import saveAddr from '@/component/site/saveAddr.vue'; 
	export default {
		data() {
			return {
				car: false
			}
		},
		components:{ 	
			saveAddr
		},
		onLoad(option) {
			console.log(option,"asfdadsf");
			if(option && option.car) {
				this.car = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
