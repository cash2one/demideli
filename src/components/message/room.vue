<template>
    <div class="room" id="room">
        <div class="chat-wrapper" id="chat-wrapper">
            <div v-for="(item,key) in list" :key="key" class="list-item" :class='{"left": item.msg_type == 2, "right": item.msg_type == 1, "pro-link": item.type == 3}'>
                <!-- 对方头像 -->
                <div class='headimg' v-if="item.show_type == 1 && item.msg_type == 2">
                    <img :src="item.headimgurl">
                </div>
                <!-- 普通消息模板 -->
                <div class='content-wrapper' v-if="item.show_type == 1">
                    <!-- <div class='name' v-html="item.nickname"></div> -->
                    <div class='content' v-html="item.message"></div>
                </div>
                <!-- 自己头像 -->
                <div class='headimg' v-if="item.show_type == 1 && item.msg_type == 1">
                    <img :src="item.headimgurl">
                </div>
                <!-- 图片消息模板
                <img :src="item.url" v-if="item.show_type == 3">
                <div class='headimg' v-if="item.type == 1 && item.show_type == 3 || item.type == 1 && item.show_type == 1">
                    <img :src="item.headimgurl">
                </div> -->
                <!-- 商品链接模板 -->
                <div class='product-wrapper pro-message' v-if="item.show_type == 2">
                    <div>
                        <div class='product-content' @click="godetails(item.message.pid)">
                            <img :src="item.message.photo_x">
                            <div class='text'>
                                <div v-html="item.message.name"></div>
                                <div>￥<span v-html="item.message.price"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 输入框 -->
        <div class='footer-wrapper'>
            <!-- <input placeholder='请输入文字' :value="sendMsg" @keyup.13="send"> -->
            <input type="text" id="chat-input" placeholder='请输入文字' @keyup.13="send()" @click="inputClick" @blur="inputBlur" @focus="inputFocus" v-model="sendMsg">
            <input type="text" id="ios-input">
            <button type='default' @click='send'>发送</button>
        </div>
    </div>
</template>

<script>
import bus from '../../js/bus.js'
export default {
    name: 'message',
    data () {
        return {
            list: [],
            sendMsg: '',
            is_IOS: '',
            other_uid: '',
            my_uid: ''
        }
    },
    mounted () {
        this.is_IOS = this.isIOS();
        this.other_uid = this.$route.params.id;
        this.my_uid = JSON.parse(localStorage.userInfo).id;
        document.title = unescape(this.$route.params.name);
        // 消息管理
        var timer = setInterval(res => {
            if (window.websocketOpen) {
                clearInterval(timer)
                // 获取已读记录
                window.websocket.send(JSON.stringify({
                    type: 'get_isread_single_message',
                    user_id: this.other_uid
                }));
                window.inroom = true;
            }
        }, 100)
        bus.$on('onmessage', (res) => {
            if (!window.inroom) return;
            var response = JSON.parse(res.data);
            switch (response.type) {
                case 'get_isread_single_message':
                    this.list = this.list.concat(response.data.reverse());
                    // 获取未读记录
                    window.websocket.send(JSON.stringify({
                        type: 'get_notread_single_message',
                        user_id: this.other_uid
                    }));
                    this.scroll_bottom()
                    break;
                case 'get_notread_single_message':
                    // console.log(response.data)
                    this.list = this.list.concat(response.data.reverse());
                    this.scroll_bottom()
                    break;
                case 'send_single_message':
                    if (parseInt(response.data.receive_uid) !== parseInt(this.my_uid)) {
                        this.list.push(response.data);
                        this.sendMsg = '';
                        this.scroll_bottom()
                    } else {
                        // 获取未读记录
                        window.websocket.send(JSON.stringify({
                            type: 'get_notread_single_message',
                            user_id: this.other_uid
                        }));
                    }
                    break;
                case 'send_product_info':
                    // 获取未读记录
                    window.websocket.send(JSON.stringify({
                        type: 'get_notread_single_message',
                        user_id: this.other_uid
                    }));
                    break;
            }
        })
    },
    methods: {
        send () {
            window.websocket.send(JSON.stringify({
                type: 'send_single_message',
                message: this.sendMsg,
                user_id: this.other_uid
            }));
        },
        godetails (id) {
            this.$router.push({name: 'service', params: {id}})
        },
        inputFocus () { // ios 底部input框被盖住的问题
            var str = navigator.userAgent.toLowerCase();
            var ver = str.match(/cpu iphone os (.*?) like mac os/);
            var version = parseInt(ver[1].replace(/_/g, '.'))
            if (this.is_IOS) {
                if (version > 10) {
                    var obj = document.querySelector('.send-wrapper')
                    setInterval(() => {
                        obj.style.position = 'absolute';
                        obj.style.bottom = '0';
                    }, 100)
                } else {
                    setTimeout(res => {
                        document.body.scrollTop = document.body.scrollHeight;
                        // document.querySelector('.send-wrapper').scrollIntoView(true);
                    }, 500);
                }
            }
        },
        inputBlur () {
            if (this.is_IOS) {
                document.getElementById('ios-input').focus();
                setTimeout(res => {
                    document.getElementById('ios-input').blur();
                }, 100)
            }
        },
        inputClick () {
            if (this.is_IOS) {
                document.getElementById('ios-input').focus();
                setTimeout(res => {
                    document.getElementById('chat-input').focus();
                }, 100)
            }
        },
        isIOS () {
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isIOS) {
                return true;
            } else {
                return false;
            }
        },
        scroll_bottom () {
            this.$nextTick(function () {
                var h = document.getElementById('chat-wrapper').scrollHeight;
                $('.chat-wrapper').scrollTop(h);
            });
        },
        beforeDestroy () {
            window.inroom = false;
            bus.$off('onmessage');
        }
    }
}
</script>

<style scoped>
.room {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.chat-wrapper {
    height: calc(100% - 49px);
    box-sizing: border-box;
    padding-bottom: 30px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
.list-item {
    padding: 10px;
    font-size: 0;
}
.list-item > img {
    display: inline-block;
    width: 120px;
    height: 90px;
    margin-right: 10px;
    margin-left: 10px;
    vertical-align: text-top;
}
.list-item.right {
    text-align: right;
    vertical-align: text-top;
}
.list-item .headimg {
    display: inline-block;
    width: 36px;
    height: 36px;
    vertical-align: text-top;
}
.list-item .headimg img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
}
.content-wrapper {
    font-size: 16px;
    display: inline-block;
    max-width: calc(100% - 95px);
    margin-left: 15px;
    vertical-align: text-top;
}
.right .content-wrapper  {
    margin-left: 0;
    margin-right: 15px;
}
.right .content-wrapper .name {
    text-align: right;
}
.content-wrapper .name {
    margin-bottom: 3px;
    font-size: 14px;
    height: 17.5px;
}
.content-wrapper .content {
    background-color: #fff;
    box-sizing: border-box;
    padding: 7px 10px;
    line-height: 1.5;
    font-size: 14px;
    border-radius: 5px;
    position: relative;
    border: 1px solid #e6e6e6;
    word-wrap: break-word;
}
.right .content-wrapper .content {
    text-align: left;
}
.left .content-wrapper .content:after,
.left .content-wrapper .content:before {
    content: '';
    position: absolute;
    top: 10px;
    height: 0;
    width: 0;
    border: 6px solid;
    border-color: #e6e6e6 transparent transparent;
    transform: rotateZ(90deg);
    -ms-transform: rotateZ(90deg); /* IE 9 */
    -moz-transform: rotateZ(90deg); /* Firefox */
    -webkit-transform: rotateZ(90deg); /* Safari 和 Chrome */
    -o-transform: rotateZ(90deg); /* Opera */
}

.left .content-wrapper .content:after {
    left: -11px;
    border: 6px solid;
    border-color: #fff transparent transparent;
}
.left .content-wrapper .content:before {
    left: -11.5px;
    border: 6px solid;
    border-color: #e6e6e6 transparent transparent;
}
.right .content-wrapper .content:after,
.right .content-wrapper .content:before {
    content: '';
    position: absolute;
    top: 10px;
    height: 0;
    width: 0;
    border: 6px solid;
    border-color: #e6e6e6 transparent transparent;
    transform: rotateZ(-90deg);
    -ms-transform: rotateZ(-90deg); /* IE 9 */
    -moz-transform: rotateZ(-90deg); /* Firefox */
    -webkit-transform: rotateZ(-90deg); /* Safari 和 Chrome */
    -o-transform: rotateZ(-90deg); /* Opera */
}
.right .content-wrapper .content {
    background: #e1e6ff;
    border-color: #6f81e4;
    color: #111;
}
.right .content-wrapper .content:after {
    right: -11px;
    border: 6px solid;
    border-color: #e1e6ff transparent transparent;
}
.right .content-wrapper .content::before {
    border-color: #6f81e4 transparent transparent;
    right: -11.5px;
}

.footer-wrapper {
    height: 49px;
    padding: 5px 10px;
    border-top: 1px solid #e3e1da;
    box-sizing: border-box;
    font-size: 0;
    background-color: #fff;
}
.footer-wrapper img {
    position: absolute;
    width: 30px;
    height: 25px;
    top: 11px;
    right: 105px;
    z-index: 2;
}
.footer-wrapper button {
    background-color: #3F51B5;
    color: #fff;
    border: 0;
    border-radius: 3px;
}
.footer-wrapper button::after {
    display: none;
}
.footer-wrapper input {
    display: inline-block;
    font-size: 16px;
    min-width: calc(100% - 85px);
    vertical-align: middle;
    margin-right: 5px;
    box-sizing: border-box;
    height: 38px;
    padding-left: 5px;
    border: 0;
    background: none;
    box-shadow: none;
    border: 1px solid #d4d4d4;
    background-color: #f7f7f7;
    border-radius: 5px;
    outline: none;
    appearance: none;
}

.footer-wrapper button {
    display: inline-block;
    width: 80px;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    vertical-align: middle;
}
.product-wrapper {
    position: fixed;
    width: 100%;
    bottom: 49px;
    padding: 15px;
    box-sizing: border-box;
}
.product-wrapper.pro-message {
    position: static;
}
.product-wrapper.pro-message > div {
    border-color: #d4d4d4;
}
.product-wrapper div {
    background-color: #fff;
}
.product-wrapper > div {
    /*border: 1px solid red;*/
    border-radius: 5px;
    overflow: hidden;
}
.product-content {
    padding: 10px 15px;
}
.product-content > img,
.product-content > div {
    display: inline-block;
    vertical-align: text-top;
}
.product-content > img {
    width: 70px;
    height: 70px;
}
.product-content > div {
    width: calc(100% - 80px);
    margin-left: 10px;
}
.text > div {
    text-align: left;
}
.text > div:first-child {
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    min-height: 42px;
    font-size: 14px;
}
.text > div:last-child {
    font-size: 14px;
    color: #999;
    margin-top: 10px;
}
.link {
    padding: 10px 0;
    padding-left: 10px;
    color: #585B67;
    font-size: 14px;
    position: relative;
}
.link text {
    position: absolute;
    right: 15px;
    top: 10px;
}
.footer-wrapper input#ios-input {
    position: absolute;
    width: 100px;
    left: -120px;
    top: 0;
    min-width: auto;
}
</style>