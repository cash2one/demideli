<template>
    <div class="index">
        <router-view></router-view>
        <router-view name="footerNav"></router-view>
    </div>
</template>
<script>
import bus from '../js/bus.js'
export default {
    name: 'index',
    data () {
        return {}
    },
    beforeRouteEnter (to, from, next) {
        if (!localStorage.userinfo) {
            myFn.wxlogin();
        }
        next();
    },
    mounted () {
        // console.log(bus)
        window.inroom = false;
        window.websocketOpen = false;
        window.websocket = '';
        this.creatSocket()
    },
    methods: {
        creatSocket () {
            var self = this;
            var wsServer = 'wss://service.qinhantangtop.com/wss';
            window.websocket = new WebSocket(wsServer);
            window.websocket.onopen = function (evt) {
                window.websocket.send(JSON.stringify({
                    type: 'auth',
                    user_type: 2,
                    user_id: JSON.parse(localStorage.userInfo).id
                }));
                bus.$emit('websocketOpen', 'yes')
                window.websocketOpen = true;
                console.log('打开' + evt);
            };
            window.websocket.onclose = function (evt) {
                window.websocket = '';
                self.creatSocket()
                console.log(evt);
            };
            window.websocket.onmessage = function (evt) {
                if (parseInt(JSON.parse(evt.data).code) === 10000) {
                    window.websocket.close()
                }
                // console.log('接收消息')
                bus.$emit('onmessage', evt)
            };
        }
    }
}
</script>
