import Vue from 'vue'
import Router from 'vue-router'

import state from '@/components/state'
import auth from '@/components/auth'
import index from '@/components/index'
import footerNav from '@/components/footerNav'
import home from '@/components/home/home'

import order from '@/components/order/order'
import detail from '@/components/order/detail'
import service from '@/components/service/service'
import message from '@/components/message/message'
import room from '@/components/message/room'
import center from '@/components/center/center'
import modify from '@/components/center/modify'
import achievementTotal from '@/components/center/achievement_total'
import achievementCurrent from '@/components/center/achievement_current'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/auth', name: 'auth', component: auth},
        {path: '/404', name: 'state', component: state},
        {path: '*', redirect: '/404', component: state},
        {
            path: '/',
            name: 'index',
            component: index,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    components: {default: home, footerNav}
                },
                {
                    path: '/order',
                    name: 'order',
                    components: {default: order, footerNav}
                },
                {
                    path: '/message',
                    name: 'message',
                    components: {default: message, footerNav}
                },
                {
                    path: '/center',
                    name: 'center',
                    components: {default: center, footerNav}
                },
                {
                    path: '/center/modify/:name',
                    name: 'modify',
                    components: {default: modify}
                },
                {
                    path: '/center/achievementTotal',
                    name: 'achievementTotal',
                    components: {default: achievementTotal}
                },
                {
                    path: '/center/achievementCurrent',
                    name: 'achievementCurrent',
                    components: {default: achievementCurrent}
                },
                {
                    path: '/order/detail/:id',
                    name: 'detail',
                    components: {default: detail}
                },
                {
                    path: '/message/room/:id/:name',
                    name: 'room',
                    components: {default: room}
                },
                {
                    path: '/service/:id',
                    name: 'service',
                    components: {default: service}
                }
            ]
        }
    ]
})
