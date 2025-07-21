import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';
import Vue from 'vue';
import VueMask from 'v-mask';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;

Vue.use(VueMask);
Vue.use(Vuelidate);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
