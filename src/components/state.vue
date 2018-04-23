<template>
    <div class="state container-full">
        <div class="not-find">找不到页面！<span v-html="seconds"></span>秒钟之后自动跳转...</div>
        <img src="../assets/404.png">
    </div>
</template>
<script>
export default {
    name: 'state',
    data () {
        return {
            seconds: 3
        }
    },
    mounted () {
        this.backPage();
    },
    methods: {
        backPage () {
            setTimeout(res => {
                this.$router.back();
            }, 3000)
            var timer = setInterval(res => {
                this.seconds--;
                if (this.seconds <= 0) {
                    clearInterval(timer);
                }
            }, 1000)
        }
    }
}
</script>

<style scoped>
    img {
        width: 100%;
    }
    .not-find {
        text-align: center;
        padding: 15px 0;
        font-size: 15px;
        color: #999;
    }
</style>
