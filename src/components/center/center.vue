<template>
    <div class="center">
        <div class="top_box">
            <img class="center_head" :src="userinfo.imgurl">
            <div class="name1">
                <div v-html="userinfo.nickname">测试</div>
                <img src="../../assets/icon/icon_19.png" @click="routeTo()">
            </div>
            <div class="name2" v-html="userinfo.number">工号：007</div>
        </div>
        <div class="top_box_radius"></div>
        <div class="menu_list">
            <div @click="goPage('achievementTotal')">
                累计业绩:
                <div v-html="userinfo.totalJx">500</div>
                <div class='single'></div>
            </div>
            <div @click="goPage('achievementCurrent')">
                本月业绩:
                <div v-html="userinfo.monthJx">300</div>
                <div class='single'></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'center',
    data () {
        return {
            userinfo: {}
        }
    },
    mounted () {
        // this.userinfo = JSON.parse(localStorage.userInfo);
        myFn.ajax('post', {oid: this.id}, apiAddress.user.info, res => {
            this.userinfo = res.data;
        })
    },
    methods: {
        routeTo () {
            this.$router.push({name: 'modify', params: {name: escape(this.userinfo.nickname)}})
        },
        goPage (name) {
            this.$router.push({name})
        }
    }
}
</script>

<style scoped>
.center {
    width: 120%;
    margin-left: -10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    padding-bottom: 75px;
    box-sizing: border-box;
    border-radius: 0 0 25px 25px;
    text-align: center;
    background-color: #3f51b5;
    border-bottom-left-radius: 30% ;
    border-bottom-right-radius: 30%;
    position: relative;
}

.top_box {
    /* background: #ccc; */
    background: #3f51b5;
    /* height: 700rpx; */
}

.center_head {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin: 30px auto 20px;
}

.top_box_radius {
    width: 100%;
    height: 60px;
    border-radius: 0 0 60px 60px;
    background: #fff;
    position: absolute;
    z-index: -1;
}

.menu_list {
    position: absolute;
    bottom: -40px;
    text-align: left;
    width: calc(83.3333333% - 30px);
    height: 120px;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    background-image: url(http://service.qinhantangtop.com/Uploads/icon/icon_22.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0 60px;
    font-size: 0;
}
.menu_list::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 40%;
    background: #D4D4D4;
    top: 30%;
    left: 50%;
}
.menu_list > div {
    position: relative;
    display: inline-block;
    font-size: 14px;
    width: 50%;
    height: 100%;
    background: none;
    box-sizing: border-box;
    padding: 15px 20px;
    color: #93A1BA;
}
.menu_list > div div {
    text-align: center;
    white-space: nowrap;
    font-size: 32px;
    margin-top: 15px;
    background: none;
}
.single {
    position: absolute;
    width: 14px;
    height: 14px;
    background: none;
    top: 25px;
    right: 20px;
    margin-top: 0!important;
}
.single::after {
    content: '';
    position: absolute;
    top: 0;
    right: -5px;
    height: 0;
    width: 0;
    border: 5px solid;
    border-color: #3F51B5 transparent transparent;
    transform: rotateZ(-90deg);
    -ms-transform: rotateZ(-90deg); /* IE 9 */
    -moz-transform: rotateZ(-90deg); /* Firefox */
    -webkit-transform: rotateZ(-90deg); /* Safari 和 Chrome */
    -o-transform: rotateZ(-90deg); /* Opera */
}
.menu_list2 {
    position: absolute;
    text-align: left;
    width: calc(83.3333333% - 30px);
    bottom: -150px;
    margin: auto;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 17.5px 1px #ccc;

}
.menu_item1 {
    height: 100px;
    line-height: 50px;
    font-size: 16.5px;
    padding: 0 15px;
    color: #A3AFC4;
    width:43.5%;
    position: absolute;
}

.nav1,.nav2 {
    height: 50px;
    line-height: 50px;
    font-size: 16.5px;
    padding: 0 15px;
    color: #585b67;
}
.nav2 {
    border-top: 1px solid #d4d4d4;
}
.name1 {
    color: #fff;
    font-size: 20px;
    background: none;
}
.name1 > div {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
}
.name1 img {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-left: 10px;
    vertical-align: middle;
}

.name2 {
    color: #fff;
    font-size: 12px;
    margin-top: 16px;
    margin-bottom: 39px;
    background: none;
}
.menu_list2 img {
    width: 8px;
    height: 14px;
    float: right;
    margin-top: 20px;
}
</style>