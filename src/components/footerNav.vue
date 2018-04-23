<template>
    <div class="footerNav">
        <mt-tabbar v-model="selected" fixed class="footerNav" @input='go_page'>
            <mt-tab-item id="1" class="message" :class="[selected == 1?'is-selected':'']">
                <img slot="icon" src="../assets/icon/baojia.png" v-if="selected != 1">
                <img slot="icon" src="../assets/icon/baojia_check.png" v-if="selected == 1">
                <span>服务报价</span>
            </mt-tab-item>
            <mt-tab-item id="2" :class="{'is-selected': selected == 2}">
                <img slot="icon" src="../assets/icon/genjin.png" v-if="selected != 2">
                <img slot="icon" src="../assets/icon/genjin_check.png" v-if="selected == 2">
                <span>服务跟进</span>
            </mt-tab-item>
            <mt-tab-item id="3" :class="{'is-selected': selected == 3, 'hasMsg': red_dot}">
                <img slot="icon" src="../assets/icon/message.png" v-if="selected != 3">
                <img slot="icon" src="../assets/icon/message_check.png" v-if="selected == 3">
                <span>消息管理</span>
            </mt-tab-item>
            <mt-tab-item id="4" :class="[selected == 4?'is-selected':'']">
                <img slot="icon" src="../assets/icon/center.png" v-if="selected != 4">
                <img slot="icon" src="../assets/icon/center_check.png" v-if="selected == 4">
                <span>个人中心</span>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import bus from '../js/bus.js'
export default {
    name: 'footerNav',
    data () {
        return {
            selected: 1,
            red_dot: false,
            chatList: []
        }
    },
    mounted () {
        window.inroom = false;
        this.routerChange();
        bus.$on('websocketOpen', res => {
            // 获取用户聊天列表
            window.websocket.send(JSON.stringify({
                type: 'get_single_user_list'
            }));
        })
        if (window.websocketOpen) {
            // 获取用户聊天列表
            window.websocket.send(JSON.stringify({
                type: 'get_single_user_list'
            }));
        }
        // 消息管理
        bus.$on('onmessage', (res) => {
            var result = JSON.parse(res.data)
            var notReadNum = 0;
            this.chatList = result.data;
            switch (result.type) {
                // 获取用户聊天列表
                case 'get_single_user_list':
                    for (var i = 0; i < result.data.length; i++) {
                        if (parseInt(result.data[i].not_read_num)) {
                            notReadNum += parseInt(result.data[i].not_read_num);
                        }
                    }
                    if (notReadNum > 0) {
                        this.red_dot = true;
                    }
                    setTimeout(response => {
                        bus.$emit('getlist', this.chatList);
                    }, 100)
                    break;
                // 接收发送消息(普通消息)回调
                case 'send_single_message':
                    console.log('接收到了')
                    window.websocket.send(JSON.stringify({
                        type: 'get_single_user_list'
                    }));
                    break;
                // 接收发送消息(服务产品)回调
                case 'send_product_info':
                    window.websocket.send(JSON.stringify({
                        type: 'get_single_user_list'
                    }));
                    break;
            }
        })
    },
    methods: {
        go_page: function (id) {
            var index = parseInt(id);
            var goName = '';
            switch (index) {
                case 1: goName = 'home'; break;
                case 2: goName = 'order'; break;
                case 3: goName = 'message'; break;
                case 4: goName = 'center'; break;
            }
            this.$router.push({name: goName});
        },
        routerChange () {
            switch (this.$route.path) {
                case '/home':
                    this.selected = 1;
                    break;
                case '/order':
                    this.selected = 2;
                    break;
                case '/message':
                    this.selected = 3;
                    break;
                case '/center':
                    this.selected = 4;
                    break;
            }
            if (this.selected === 3) {
                setTimeout(response => {
                    bus.$emit('getlist', this.chatList);
                }, 100)
            }
        }
    },
    watch: {
        '$route': function () {
            this.routerChange();
        }
    },
    destroyed () {
        bus.$off('getData');
        bus.$off('onmessage');
        bus.$off('websocketOpen');
    }
}
</script>

<style>
    .footerNav .mint-tab-item-icon {
        width: 18px;
        height: 18px;
        margin: 0 auto 8px;
    }
    .footerNav .mint-tab-item {
        color: #93A1BA;
        padding: 11px 0 2px;
    }
    .footerNav .mint-tab-item span {
        color: #93A1BA;
        width: 100%;
        display: inline-block;
        transform: scale(0.85)!important;
        transform-origin: 50% 50% 0;
        /*-ms-transform: scale(0.85)!important;         IE 9
        -ms-transform-origin: 50% 50% 0;       IE 9
        -webkit-transform: scale(0.85)!important; Safari 和 Chrome
        -webkit-transform-origin: 50% 50% 0;   Safari 和 Chrome
        -moz-transform: scale(0.85)!important;        Firefox
        -moz-transform-origin: 50% 50% 0;      Firefox
        -o-transform: scale(0.85)!important;      Opera
        -o-transform-origin: 50% 50% 0;        Opera */
    }
    .footerNav .mint-tabbar > .mint-tab-item.is-selected span {
        color: #3F51B5;
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3) {
        /* @supports (bottom: constant(safe-area-inset-bottom)) {
        }*/
        .footerNav .mint-tab-item {
            padding-bottom: 30px;
        }
    }
</style>

<style scoped>
    .nav-icon {
        display: block;
        font-size: 24px;
        margin-bottom: 3px;
    }
    .mint-tabbar {
        background: #f7f7f7;
        border-top: 1px solid #d4d4d4;
    }
    .hasMsg {
        position: relative;
    }
    .hasMsg:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: red;
        top: 3px;
        left: 55%;
    }
</style>