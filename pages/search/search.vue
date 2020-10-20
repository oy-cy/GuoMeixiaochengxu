<template>
	<view>
		<van-search v-model="value" 
		placeholder="iPhone 12新品发布" 
		shape="circle"
		show-action bind:search="onSearch" 
		bind:cancel="onCancel" 
		use-left-icon-slot="false"
		right-icon="../../static/images/home/search.png"
		clearable="true" 
		@click="onChange" 
		/>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			};
		},
		methods:{
			onChange(e) {
				this.value = ""
			  },
			  onSearch() {
			    Toast('搜索' + this.data.value);
			  },
			  onClick() {
			    Toast('搜索' + this.data.value);
			  },
			  cancel(){
				  
			  }
		}
		// onChange(){
		// 	console.log(111)
		// 	console.log(this.value)
		// 	this.value = '';
		// 	console.log(this.value)
		// }
	}
</script>

<style lang="scss">

</style>
