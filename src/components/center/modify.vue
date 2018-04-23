<template>
    <div class="modify">
        <div class='suggest-wrapper'>
            <div class='title'>修改昵称</div>
            <div class="section">
                <input v-model="value" type="text" placeholder="请输入昵称">
            </div>
        </div>
        <div class='my-btn'>
            <button @click="modify">提交</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modify',
    data () {
        return {
            value: ''
        }
    },
    mounted () {
        this.value = unescape(this.$route.params.name);
    },
    methods: {
        modify () {
            myFn.ajax('post', {nickname: this.value}, apiAddress.user.modifyName, res => {
                this.$router.back();
            })
        }
    }
}
</script>

<style scoped>
.suggest-wrapper {
    padding: 10px;
    background-color: #fff;
}
.title {
    font-size: 16px;
    color: #788397;
}
.section {
    margin-top: 10px;
}
.section input {
    width: 100%;
    height: 35px;
    padding: 0 10px;
    box-sizing: border-box;
    background: none;
    box-shadow: none;
    border: 0;
    background-color: #eaecf2;
    font-size: 14px;
}
.my-btn {
    width: 100%;
    padding: 0 25%;
    box-sizing: border-box;
    background-color: #f2f2f2;
    margin-top: 31px;
}
.my-btn button {
    background: none;
    border: 0;
    width: 100%;
    height: 46px;
    display: inline-block;
    background-color: #3f51b5;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
}
</style>