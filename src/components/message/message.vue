<template>
    <div class="message container">
        <div class='list-wrapper'>
            <div class='list-item' v-for="(item, key) in list"
            :key="key"
            :class="[item.not_read_num != 0 ? 'badge': '']"
            @click="enterRoom(item.other_uid, item.nickname)">
                <div class='item-img'>
                    <img :src='item.headimgurl'>
                </div>
                <div class='item-info'>
                    <div class='title'>{{item.nickname}}</div>
                    <div class='msg'>{{item.message}}</div>
                </div>
                <div class='item-after'>{{item.max_send_time}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '../../js/bus.js'
export default {
    name: 'message',
    data () {
        return {
            list: []
        }
    },
    mounted () {
        document.title = '企业服务';
        bus.$on('getlist', res => {
            // console.log(res)
            this.list = res;
        });
    },
    methods: {
        enterRoom (id, name) {
            this.$router.push({name: 'room', params: {id, name: escape(name)}});
        }
    },
    beforeDestroy () {
        bus.$off('getlist');
    }
}
</script>

<style scoped>

.badge {
    position: relative;
}
.badge:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
    top: 10px;
    left: calc(13% + 5px);
}

.list-wrapper {
    font-size: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
}
.list-item {
    width: 100%;
    padding: 10px 0;
    padding-left: 10px;
    font-size: 16px;
    box-sizing: border-box;
    position: relative;
    font-size: 0;
}
.list-item::after {
    content: '';
    position: absolute;
    left: calc(13% + 20px);
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #E6E6E6;
}
.list-item > div {
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
}
.item-img {
    width: 13%;
    height: 13vw;
}
.item-img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.item-info {
    width: 87%;
    padding-left: 10px;
    box-sizing: border-box;
}
.item-info .title {
    font-size: 15px;
    margin: 5px 0;
    min-height: 20px;
    color: #333333;
}
.item-info .msg {
    font-size: 13px;
    color: #666666;
}
.item-after {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 12px;
    color: #9C9C9C;
}
</style>