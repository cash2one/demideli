<template>
    <div class="home container">
        <mt-search v-model="order_sn" cancel-text="取消" placeholder="输入订单编号" @keyup.native="getlist()"></mt-search>
        <ul class="list" v-if="list.length">
            <li v-for="(item, index) in list" :key="index" @click="routeTo(item.id)">
                <div class="order-number border-b" v-html="item.order_sn"></div>
                <div class="order-info">
                    <div class="name-phone border-b">
                        <div>
                            <span class="label">姓名：</span>
                            <span class="value" v-html="item.receiver">小V</span>
                        </div>
                        <div>
                            <span class="label">电话：</span>
                            <span class="value" v-html="item.tel">18062967091</span>
                        </div>
                    </div>
                    <div class="operat">
                        <span class="change-price" @click.stop="changePrice(item)">改价</span>
                        <span class="cooperate" @click.stop="confirm(item, index)">确认合作</span>
                    </div>
                </div>
                <div class="price-date">
                    <div class="price">服务价：￥<span v-html="item.amount">0.00</span></div>
                    <div class="date">下单时间：<span v-html="item.addtime">2018-03-20</span></div>
                </div>
            </li>
        </ul>
        <p class="noMore" v-if="!list.length">暂无数据...</p>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'home',
    data () {
        return {
            order_sn: '',
            list: []
        }
    },
    mounted () {
        this.getlist();
    },
    methods: {
        getlist () {
            myFn.ajax('post', {order_sn: this.order_sn, orderSta: 5}, apiAddress.order.list, res => {
                this.list = res.data;
            })
        },
        routeTo (id) {
            this.$router.push({name: 'detail', params: {id}});
        },
        // 修改价格
        changePrice (item) {
            MessageBox.prompt('请输入金额').then(({ value, action }) => {
                if (value !== null) {
                    myFn.ajax('post', {oid: item.id, newPrice: value}, apiAddress.order.modify, res => {
                        item.amount = value;
                    })
                }
            }).catch(action => {
                console.log(action)
            });
        },
        // 确认合作
        confirm (item, index) {
            MessageBox.confirm('确定执行此操作?').then(action => {
                myFn.ajax('post', {oid: item.id}, apiAddress.order.comfirm, res => {
                    this.list.splice(index, 1);
                })
            }).catch(action => {
                console.log(action)
            });
        }
    },
    watch: {
        'order_sn': function () {
            if (this.order_sn === '') {
                this.getlist();
            }
        }
    }
}
</script>

<style>
    .home .mint-searchbar {
        padding: 10px 15px;
        background-color: #fff;
        border-bottom: 1px solid #e5e8ee;
    }
    .home .mint-searchbar-inner {
        height: 20px;
        background-color: #EDF0F5;
        border-radius: 5px;
    }
    .home .mint-searchbar-core {
        background-color: #EDF0F5;
    }
    .home .mint-searchbar-cancel {
        color: #788397;
    }
</style>

<style scoped>
    .list {
        position: absolute;
        height: calc(100% - 59px);
        top: 49px;
        width: 100%;
        background-color: #f2f2f2;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 10px;
    }
    .list > li {
        margin-top: 10px;
        border-top:1px solid #3F51B5;
        font-size: 16px;
        color:#3C4149;
        background-color: #fff;
    }
    .order-number {
        line-height: 40px;
        padding: 0 15px;
    }
    .order-info {
        padding: 0 15px;
    }
    .name-phone {
        display: flex;
        justify-content: space-between;
        line-height: 48px;
    }
    .label {
        font-size: 14px;
        color:#7B8699;
    }
    .value {
        font-size: 16px;
        color: #3F414E;
    }
    .operat {
        line-height: 60px;
        text-align: right;
    }
    .operat span {
        display: inline-block;
        margin: 0 7px;
    }
    .change-price {
        color: #C56B6B;
    }
    .price-date {
        line-height: 40px;
        background-color: #3F51B5;
        display: flex;
        padding: 0 15px;
        justify-content: space-between;
        color: #fff;
        position: relative;
    }
    .price-date .price, .price-date .price span {
        color: #fff;
        font-size: 14px;
    }
    .price-date .date, .price-date .date span {
        color: #BEC4ED;
        font-size: 12px;
    }
    .price-date:before {
        content: '';
        position: absolute;
        top: -11px;
        left: 15px;
        height: 0;
        width: 0;
        border: 6px solid;
        border-color: #3F51B5 transparent transparent;
        transform: rotateZ(180deg);
        -ms-transform: rotateZ(180deg); /* IE 9 */
        -moz-transform: rotateZ(180deg); /* Firefox */
        -webkit-transform: rotateZ(180deg); /* Safari 和 Chrome */
        -o-transform: rotateZ(180deg); /* Opera */
    }
</style>