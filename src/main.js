import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';
import Vue from 'vue';
import VueMask from 'v-mask';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(VueMask);
Vue.use(Vuelidate);
Vue.use(Vuex);

const useStore = new Vuex.Store({
  state: {
    user: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      occupation: '',
      website: '',
    },
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    getLoggedInUser(context, userId) {
      if (userId) {
        axios.get(`http://localhost:3000/users/${userId}`).then((response) => {
          if (response.data) {
            context.commit('updateUser', response.data);
          }
        });
      }
    },
  },
});

new Vue({
  store: useStore,
  render: (h) => h(App),
}).$mount('#app');
