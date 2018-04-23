var myFn = {
    ajax: function (type, data, url, sucFn) {
        sucFn = sucFn || function () {};
        $.ajax({
            url: url,
            type: type,
            data: data,
            cache: true,
            timeout: 30000,
            dataType: 'json',
            success: function (res, textStatus, XMLHttpRequest) {
                // window.myFn.option_loading();
                window.myFn.statusCode(res, sucFn);
            },
            error: function () {
                console.log('网络错误');
            }
        });
    },
    // 服务器返回状态
    statusCode: function (res, sucFn) {
        switch (parseInt(res.code)) {
            case 200:
                sucFn(res);
                break;
            case 99994:
                window.vm.$router.push({name: 'statePage', params: {type: 3}});
                break;
            case 99995:
                // 高级授权
                this.getWxCode('99995');
                break;
            case 99996:
                // 普通授权
                this.getWxCode('99996')
                break;
            case 99986:
                // 未注册
                location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/mobile/#/auth'
                break;
            case 99999:
                localStorage.removeItem('userInfo');
                window.myFn.wxlogin()
                break;
            case 10000:
                alert(res.msg)
                break;
            default:
                alert(res.msg);
                break;
        }
    },
    uploadFile: function (form, url, sucFn) {
        $.ajax({
            url: '/public' + url,
            type: 'post',
            data: form,
            processData: false,
            contentType: false,
            success: function (res) {
                window.myFn.statusCode(res, sucFn);
            }
        });
    },
    // 获取wxCode
    getWxCode: function (type) {
        location.href = location.protocol + '//' + location.hostname + ':' + location.port + window.apiAddress.wx.getCode + '?redirect_uri=' + escape(location.protocol + '//' + location.hostname + ':' + location.port + '/mobile/') + '&state=' + type + '&other=' + escape(location.hash);
    },
    wxlogin: function () {
        if (!localStorage.userInfo) {
            var data = {
                code: '',
                state: ''
            }
            if (myFn.GetQueryString('code')) {
                data.code = myFn.GetQueryString('code');
                data.state = myFn.GetQueryString('state');
            } else {
                data.code = 0;
            }
            myFn.ajax('get', data, apiAddress.wx.login, function (res) {
                localStorage.userInfo = JSON.stringify(res.data.customerInfo);
                location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/mobile/#/home';
            });
        }
    },
    // 获取get参数
    GetQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return '';
    }
}
export {myFn}