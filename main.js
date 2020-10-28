import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from './store';
import moment from 'moment';


Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$moment = moment;

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
