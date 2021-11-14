import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import Flicking from '@egjs/vue-flicking';
import '@egjs/vue-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/flicking-plugins.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Flicking);
Vue.use(VueAxios, axios);
Vue.use(VueLodash, lodash);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
