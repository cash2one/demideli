<template>
    <div class="achievement_total container-full">
        <div class="back-wrapper">
            <div class="back-info">
                <div>
                    <div class="title">本月业绩</div>
                    <div class="dot"><span></span><span class="active"></span></div>
                </div>
                <img src="../../assets/icon/icon_34.png"  @click="routeTo('achievementTotal')">
            </div>
            <div class="achievement_total-value" v-html="info.monthJx">5200</div>
        </div>
        <div class="list">
            <div class="list-item border-b" v-for="(item, key) in info.monthOrder" :key="key">
                <div>
                    <div class="time" v-html="item.complete_time"></div>
                    <div class="remark" v-html="item.order_sn">内容备注</div>
                </div>
                <div class="price"  v-html="item.amount">500</div>
            </div>
            <p class="noMore" v-if="!info.monthOrder.length">暂无数据...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'achievement_total',
    data () {
        return {
            info: {
                monthOrder: []
            }
        }
    },
    mounted () {
        myFn.ajax('post', {oid: this.id}, apiAddress.user.month, res => {
            this.info = res.data;
        })
    },
    methods: {
        routeTo (name) {
            this.$router.push({name})
        }
    }
}
</script>

<style scoped>
    .back-wrapper {
        width: 120%;
        height: 55%;
        box-sizing: border-box;
        padding: 30px calc(10% + 15px) 0;
        margin-left: -10%;
        background-color: #3F51B5;
        border-bottom-left-radius: 100px;
        border-bottom-right-radius: 100px;
    }
    .list {
        position: absolute;
        height: 60%;
        bottom: 0;
        background-color: #fff;
        width: calc(100% - 30px);
        left: 15px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-sizing: border-box;
        padding: 5px 15px 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .list .list-item:last-child:after {
        display: none;
    }
    .list-item {
        padding: 15px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .list-item .time {
        font-size: 14px;
        color: #93A1BA;
    }
    .list-item .remark {
        font-size: 16px;
        margin-top: 5px;
    }
    .list-item .price {
        font-size: 18px;
        color: #3F51B5;
    }
    .back-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .back-info .title {
        font-size: 26px;
        color: #fff;
    }
    .dot span {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-right: 10px;
    }
    .dot span.active {
        background-color: #fff;
    }
    .back-info > img {
        width: 30px;
    }
    .achievement_total-value {
        text-align: center;
        font-size: 40px;
        color: #fff;
        margin-top: 15%;
    }
</style>