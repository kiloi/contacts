import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store/store'
import { FontAwesomeIcon } from './helpers/fontawesome'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css"

createApp(App)
.use(router)
.use(store)
.component('fa-icon', FontAwesomeIcon)
.component("v-select", vSelect)
.mount('#app')
