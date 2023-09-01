import { BASE_URL } from "./Constant"
import { Network } from "./Network"
import { network_Login } from "./network_Login"
import { network_cms } from "./network_cms"
import { network_new } from "./network_new"

export default class Apis {

    static Login = (username, password) => {
        return network_Login('post', `jwt-auth/v1/token?username=${username}&password=${password}`)
    }

    static CartList = () => {
        return network_new('GET', `wc/store/cart`)
    }

    static AddtoCart = (params) => {
        return network_new('POST', `wc/store/cart/add-item`, params)
    }

    static RemovetoCart = (params) => {
        return network_new('POST', `wc/store/cart/remove-item`, params)
    }

    static ApplyCoupon = (params) => {
        return network_new('POST', `wc/store/cart/apply-coupon`, params)
    }

    static RemoveCoupon = (params) => {
        return network_new('POST', `wc/store/cart/remove-coupon`, params)
    }

    static CheckOut_Get = () => {
        return network_new('GET', `wc/store/checkout`)
    }

    static CheckOut_Post = (params) => {
        return network_new('POST', `wc/store/checkout`, params)
    }

    static PaymentMethod = (params) => {
        return Network('GET', `payment_gateways?enabled=true`)
    }

    // static ProductList = (params) => {
    //     return network_new('GET', `wc/store/products`, params)
    // }

    static userList = () => {
        return Network('GET', 'wc/v3/customers')
    }

    // static userDetails = (id) => {
    //     return Network('GET', 'wc/v3/customers/' + id)
    // }

    static categoryList = (params) => {
        return Network('GET', 'products/categories', params)
    }

    static productList = (params) => {
        return Network('GET', 'products', params)
    }

    static productDetails = (id) => {
        return Network('GET', 'products/' + id)
    }

    static reviewList = (id) => {
        return Network('GET', `products/reviews/${id}`)
    }

    static userDetails = (userid) => {
        return Network('GET', `customers/${userid}`)
    }

    static userDetailsUpdate = (userid, params) => {
        return Network('PUT', `customers/${userid}`, params)
    }

    static orderList = (params) => {
        return Network('GET', `orders`, params)
    }

    static orderDetails = (orderid, params) => {
        return Network('GET', `orders/${orderid}`, params)
    }

    static orderUpdate = (orderid, params) => {
        return Network('PUT', `orders/${orderid}`, params)
    }

    static countryList = (params) => {
        return Network('GET', `data/countries`, params)
    }

    static CouponList = (params) => {
        return network_new('GET', `wc/store/cart/coupons`, params)
    }

    static cmsPage = (params) => {
        return network_cms('GET', `wp/v2/pages`, params)
    }

    static paymentMethodList = (params) => {
        return Network('GET', `payment_gateways`, params)
    }
}