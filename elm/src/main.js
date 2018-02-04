// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import VueWechatTitle from 'vue-wechat-title';
import axios from 'axios';
//svgz插件
import Vuex  from 'vuex';
//import Icon from 'vue-svg-icon/Icon.vue';
//Vue.component('icon', Icon);


Vue.prototype.$http=axios;
Vue.use(Vuex);
Vue.use(VueWechatTitle);
Vue.config.productionTip = false

let store = new Vuex.Store({
	state:[],
	mutations:{
		in(state,price){
			state.result+=price
		},
		de(state,price){
			state.result-=price
		}
	}
})

//eslint-disable no-new 
/*Vue.directive('title',{ 
	inserted:function(el,bind){ 
		document.title=el.dataset.title;
	} 
})*/

var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components:{ App }
})

