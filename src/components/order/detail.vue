<template>
    <div class="detail">
        <!--pages/orderDetail/orderDetail.wxml-->
        <div class='company-info border-t' v-if="orderInfo.company_name">
            <div class='cell-title'>企业信息</div>
            <div class='name' v-html="orderInfo.company_name">班尼路</div>
            <div class='phone'>
                <span class='label'>姓名：</span><span style='margin-right: 30px' v-html="orderInfo.corporate_name">斯派洛</span>
                <span class='label'>电话：</span><span v-html="orderInfo.mobile">18088888888</span>
            </div>
            <div class='card'>
                <div>相关证件</div>
                <img v-for="(item, index) in orderInfo.corporate_identity_img" :key="index" :src="item">
                <img v-for="(item, index) in orderInfo.license_img" :key="index" :src="item">
            </div>
        </div>
        <div class='service-wrapper'>
            <div class='cell-title'>服务信息</div>
            <div class='cell-item border-b'>
                <div class='cell-label'>
                    <img src="../../assets/icon/icon_3.png"/>
                    <span>服务项目：</span>
                </div>
                <div class='cell-content'>
                    <div v-html="orderInfo.service_name">APP定制</div>
                </div>
            </div>
            <div class='cell-item'>
                <div class='cell-label'>
                    <img src="../../assets/icon/icon_2.png"/>
                    <span>服务内容：</span>
                </div>
                <div class='cell-content'>
                    <div v-html="orderInfo.servive_content">高级APP定制，帮您快速进入互联网时代</div>
                </div>
            </div>
        </div>
        <div class='order-info'>
            <div class='cell-title'>订单信息</div>
            <div class='cell-list'>
                <div class='cell-item'><span class='cell-label'>金额：</span><span v-html="orderInfo.price">￥0.00</span></div>
                <div class='cell-item'><span class='cell-label'>下单时间：</span><span v-html="orderInfo.addtime">2018-03-23</span></div>
                <div class='cell-item' v-if="orderInfo.start_time != 0"><span class='cell-label'>开始时间：</span><span v-html="orderInfo.start_time">2018-03-23</span></div>
                <div class='cell-item' v-if="orderInfo.end_time != 0"><span class='cell-label'>结束时间：</span><span v-html="orderInfo.end_time">2018-03-23</span></div>
                <div class='cell-item'><span class='cell-label'>订单编号：</span><span style='color:#B53F3F' v-html="orderInfo.order_sn">2018032052505456</span></div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'detail',
    data () {
        return {
            id: '',
            orderInfo: {}
        }
    },
    mounted () {
        this.id = this.$route.params.id;
        this.getDetails();
    },
    methods: {
        getDetails () {
            myFn.ajax('post', {oid: this.id}, apiAddress.order.detail, res => {
                this.orderInfo = res.data;
            })
        }
    }
}
</script>

<style scoped>
/* .detail {
    position: absolute;
    width: 100%;
    height: auto;
    min-height: 100%;
    background-color: #f2f2f2;
} */
/* pages/orderDetail/orderDetail.wxss */
.company-info {
    padding: 15px;
    margin-bottom: 7px;
    background-color: #fff;
}
.company-info .name {
    font-size: 19px;
    padding: 10px 0;
}
.company-info .phone {
    margin-bottom: 10px;
    font-size: 16px;
}
.company-info .phone .label {
    color: #788397;
}
.card {
    font-size: 0;
}
.card > div {
    font-size: 14px;
    color: #788397;
    margin-bottom: 10px;
}
.card img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}
.service-wrapper {
    margin-bottom: 7px;
    padding: 15px 15px 0;
    background-color: #fff;
}
.cell-title {
    font-size: 14px;
    color: #93A1BA;
}
.cell-label {
    padding-top: 20px;
    font-size: 14px;
    color: #93A1BA;
}
.cell-label img {
    width: 18px;
    height: 18px;
    margin-right: 12px;
    vertical-align: middle;
}
.cell-label span {
    color: #3f51b5;
    font-size: 16px;
    vertical-align: middle;
}
.cell-content {
    padding: 10px 0 21px 27px;
}
.cell-content div {
    font-size: 16px;
    color: #788397;
}
.order-info {
    padding: 15px;
    background-color: #fff;
}
.order-info .cell-item {
    margin: 10px 0;
    padding: 0;
}
.order-info .cell-item text {
    font-size: 14px;
}
.order-info .cell-label {
    color: #788397;
    font-size: 14px;
}
.label {
    font-size: 14px;
}
</style>