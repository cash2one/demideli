// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'
import './css/main_public.css'
import './css/mint_ui_reset.css'

import './js/zepto.js'
import {apiAddress} from './js/apiAddress.js'
import {myFn} from './js/main.js'

window.apiAddress = apiAddress
window.myFn = myFn;

Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})