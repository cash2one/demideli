var apiAddress = {
    wx: {
        getCode: '/customerapi/login/getcode',
        login: '/customerapi/login/wxlogin'
    },
    user: {
        auth: '/customerapi/login/customerNewAuth',
        info: '/customerapi/customer/index',
        month: '/customerapi/customer/monthJx',
        total: '/customerapi/customer/totalJx',
        modifyName: '/customerapi/customer/updateName'
    },
    order: {
        list: '/customerapi/customer/order',
        detail: '/customerapi/customer/orderInfo',
        modify: '/customerapi/customer/utPrice',
        comfirm: '/customerapi/customer/sureComfirm',
        cancel: '/customerapi/customer/cancelOrder'
    },
    service: {
        item: '/customerapi/product/productInfo',
        comment: '/customerapi/product/getProductDp'
    }
}
export {apiAddress}