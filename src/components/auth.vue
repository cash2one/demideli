<template>
    <div class="auth container-full">
        <div class='wellcome'>
            <span>认证</span>
        </div>
        <div class='form'>
            <div class='form-wrapper border-b'>
                <div class='form-label'>账号</div>
                <input class='form-control' placeholder='请输入账号' type="text" v-model="username">
            </div>
            <div class='form-wrapper'>
                <div class='form-label'>密码</div>
                <input class='form-control' placeholder="请输入密码" type="password" v-model="password">
            </div>
        </div>
        <div class='my-btn'>
            <button @click='submit'>认证</button>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'auth',
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submit () {
            var username = this.username;
            var password = this.password;
            if (!username || !password) {
                MessageBox.alert('账号或密码不能为空！')
                return false;
            }
            myFn.ajax('post', {username, password}, apiAddress.user.auth, res => {
                localStorage.userIssnfo = JSON.stringify(res.data.customerInfo);
                this.$router.push({name: 'home'});
            })
        }
    }
}
</script>

<style scoped>
.auth {
    background-color: #fff;
}
.wellcome {
    padding: 35px 30px 70px;
    font-size: 30px;
    color: #3f51b5;
}
.form {
    padding: 10px 30px;
}
.form-wrapper {
    padding: 15px 0;
    position: relative;
    font-size: 0;
}
.form-label, .form-control {
    display: inline-block;
    vertical-align: middle;
    border: 0;
    font-size: 16px;
}
.form-label {
    width: 80px;
    font-size: 19px;
}
.form-control {
    width: calc(100% - 80px);
}
.form-after {
    position: absolute;
    right: 0;
    top: 12px;
}
.form-after button {
    font-size: 14px;
    color: #3f51b5;
    background: none;
}
.form-after button {
    height: 30px;
    line-height: 30px;
}
.form-after button::after {
    display: none;
}
.my-btn {
    width: 100%;
    padding: 0 25%;
    box-sizing: border-box;
    margin-top: 30%;
}
.my-btn button {
    display: inline-block;
    border: 0;
    box-shadow: none;
    height: 40px;
    font-size: 17px;
    outline: none;
    width: 100%;
    background-color: #3f51b5;
    color: #fff;
    border-radius: 10px;
}
</style>
