import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA9oi366hqFnNvSLRYsGvDMV4rMUWIqRCA",
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
