<template>
    <div class="service container-full">
        <mt-swipe :show-indicators="false">
            <mt-swipe-item v-for="(item, index) in info.photo_string" :key="index">
                <img :src="item">
            </mt-swipe-item>
        </mt-swipe>
        <div class='list'>
            <div class='list-desc'>
                <div class='title' v-html="info.name"></div>
                <div class='desc theme' v-html="info.intro"></div>
            </div>
            <div class='list-price'>
                <!--<div>￥{{info.price_yh}}<text class='orange'>—</text>{{info.price}}</div>-->
                <div>￥<span v-html="info.price == 0 ? '价格面议' : info.price"></span></div>
                <div>成交 <span style="color: #f3a643" v-html="info.shiyong"></span> 单</div>
            </div>
        </div>
        <div class="tab">
            <div :class="{active: tabActiveValue == 1}" @click="tabActiveValue = 1">服务介绍</div>
            <div :class="{active: tabActiveValue == 2}" @click="tabActiveValue = 2">成功案例</div>
            <div :class="{active: tabActiveValue == 3}" @click="tabActiveValue = 3">评价</div>
        </div>
        <!-- 服务介绍 -->
        <div class="rich-text" v-if="tabActiveValue == 1" v-html="info.content"></div>
        <!-- 成功案例 -->
        <div class="rich-text" v-if="tabActiveValue == 2" v-html="info.success_case"></div>
        <!-- 评价 -->
        <div class="rich-text comment" v-if="tabActiveValue == 3">
            <div v-if="commentList.length==0" class='no-comment'>暂无评价</div>

            <div class='comment-item border-b' v-for="(item, key) in commentList"  :key="key">
                <div class='name' v-html="item.uname"></div>
                <div class='content' v-html="item.concent"></div>
                <div class='date' v-html="item.addtime"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'service',
    data () {
        return {
            id: '',
            info: {},
            tabActiveValue: 1,
            commentList: []
        }
    },
    mounted () {
        this.id = this.$route.params.id;
        this.getdetail();
        this.getComment();
        setTimeout(res => {
            $('.mint-swipe').height($('.mint-swipe-item > img').height() + 'px');
        }, 500)
    },
    methods: {
        getdetail () {
            myFn.ajax('post', {pid: this.id}, apiAddress.service.item, res => {
                this.info = res.data;
            })
        },
        getComment () {
            myFn.ajax('post', {pid: this.id}, apiAddress.service.comment, res => {
                this.commentList = res.data.data;
            })
        }
    }
}
</script>

<style scoped>
    .mint-swipe-item img {
        width: 100%;
    }
    /* .mint-swipe {
        height: 56.2666666vw;
    } */
    .list {
        padding: 15px;
        font-size: 0;
        margin-bottom: 7px;
        background-color: #fff;
    }
    .list-desc {
        font-size: 16px;
        box-sizing: border-box;
    }
    .list-desc div {
        display: block;
    }
    .list-desc div.title {
        font-size: 20px;
        margin-bottom: 10px;
    }
    .list-desc div.desc {
        font-size: 14px;
        margin-bottom: 10px;
    }
    .list-price {
        display: flex;
    }
    .list-price > div:first-child {
        flex: 2;
    }
    .list-price > div:last-child {
        flex: 1;
    }
    .list-price > div:first-child {
        font-size: 18px;
    }
    .list-price > div:last-child {
        text-align: right;
        font-size: 14px;
        color: #f3a643;
    }
    .list-price text {
        margin: 0 5px;
    }
    .rich-text {
        background: #fff;
        font-size: 0;
    }
    .rich-text.comment {
        padding: 15px;
        min-height: 300px;
    }
    .tab {
        background-color: #fff;
        display: flex;
        margin-bottom: 7px;
    }
    .tab > div {
        flex: 1;
        text-align: center;
        line-height: 50px;
    }
    .tab > div.active {
        color: #6674c4;
    }
    .comment-item {
        padding: 15px 0 15px 10px;
    }

    .comment-item .name {
        color: #4cbffa;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .comment-item .content {
        color: #3d3f4c;
        margin-bottom: 10px;
        font-size: 15px;
    }

    .comment-item .date {
        color: #a9afd4;
        font-size: 12px;
    }

    .no-comment {
        padding-top: 50px;
        text-align: center;
        color: #788397;
        font-size: 14px;
    }
</style>