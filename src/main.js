import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';
import Vue from 'vue';
import VueMask from 'v-mask';

Vue.config.productionTip = false;

Vue.use(VueMask);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
