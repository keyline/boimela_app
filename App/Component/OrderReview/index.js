import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { useFocusEffect } from '@react-navigation/native'
import Apis from '../../Service/apis'
import Toast from 'react-native-simple-toast'
import Loader from '../../Container/Loader'
import { Colors } from '../../Utils/Colors'
import SmallBotton from '../../Container/SmallBotton'
import { RadioGroup } from 'react-native-radio-buttons-group'
import InputField from '../../Container/InputField'
import SingleBotton from '../../Container/SingleBotton'

const OrderReview = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        data: null,
        couponsCode: '',
        paymentList: [],
        paymentMethod: '',
        orderNote: ''
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetPaymentList();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetPaymentList = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let params = {
                enabled: true
            }
            const res = await Apis.paymentMethodList(params)
            // if (__DEV__) {
            //     console.log('PaymentList', JSON.stringify(res))
            // }
            if (res && res.length > 0) {
                let enabledList = res.filter(obj => obj.enabled == true)
                let updateList = enabledList.map((obj) => {
                    let { id, title } = obj;
                    return { id: id, label: title, value: id }
                })
                setState(prev => ({
                    ...prev,
                    paymentList: updateList
                }))
                // console.log('updatepaymentList', JSON.stringify(updateList))
            }
            onGetCart();
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                loading: false,
            }))
            Toast.show('Something Went Wrong')
        }
    })

    const onGetCart = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            const response = await Apis.CartList();
            // if (__DEV__) {
            //     console.log('OrderreviewList', JSON.stringify(response.data))
            // }
            setState(prev => ({
                ...prev,
                data: response?.data,
                couponsCode: response.data?.coupons.length > 0 ? response.data?.coupons[0]?.code : '',
                loading: false
            }))
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                loading: false,
            }))
            Toast.show('Something Went Wrong')
        }
    })

    const onLeftPress = useCallback(async () => {
        navigation.goBack();
    })

    const onEditAddress = useCallback(async () => {
        navigation.navigate('AddressNew', { data: 'OrderReview' })
    })

    const getAddresFormat = useCallback((add) => {
        // let add = state.data?.shipping_address
        return (add?.address_1 + ', ' + add?.address_2 + ', ' + add?.city + ' ' + add?.postcode + ', ' + add?.state)
    })

    const onSetCoupon = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            couponsCode: val
        }))
    })

    const applyCoupon = useCallback(async () => {
        if (state.couponsCode.trim() == '') {
            Toast.show('Enter Coupon Code', Toast.LONG);
            return
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let params = {
                    code: state.couponsCode
                }
                const ress = await Apis.ApplyCoupon(params)
                if (__DEV__) {
                    console.log('ApplyCoupon', JSON.stringify(ress))
                }
                Toast.show('Coupon Applied Successfully', Toast.LONG);
                onGetCart();
            } catch (error) {
                if (__DEV__) {
                    console.log('errors', JSON.stringify(error))
                }
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                }))
                // Toast.show('Something Went Wrong')
                Toast.show('Invalid Coupon', Toast.show);
            }
        }
    })

    const removeCoupon = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let params = {
                code: state.couponsCode
            }
            const ress = await Apis.RemoveCoupon(params)
            if (__DEV__) {
                console.log('ApplyCoupon', JSON.stringify(ress))
            }
            Toast.show('Coupon Removed Successfully', Toast.LONG);
            onGetCart();
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                loading: false,
            }))
            Toast.show('Something Went Wrong')
        }
    })

    function onSelectPayment(callback) {
        setState(prev => ({
            ...prev,
            paymentMethod: callback
        }))
    }

    const onchangeOrderNote = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            orderNote: val
        }))
    })

    const onSubmit = useCallback(async () => {
        if (state.paymentMethod == '') {
            Toast.show('Select Payment Method', Toast.LONG);
        } else {
            try {
                setState(prevState => ({
                    ...prevState,
                    loading: true,
                }))
                let params = {
                    billing_address: state.data.billing_address,
                    shipping_address: state.data.shipping_address,
                    customer_note: state.orderNote,
                    create_account: false,
                    payment_method: state.paymentMethod,
                    payment_data: []
                }
                // console.log('CheckountParams', JSON.stringify(params))
                // return
                const response = await Apis.CheckOut_Post(params);
                if (__DEV__) {
                    console.log('CheckOutPost', JSON.stringify(response.data))
                }
                if (response?.data?.payment_result?.redirect_url) {
                    navigation.replace('Payment', { url: response?.data?.payment_result?.redirect_url })
                }
                setState(prevState => ({
                    ...prevState,
                    loading: false
                }))
            } catch (error) {
                if (__DEV__) {
                    console.log('errors', JSON.stringify(error))
                }
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                }))
                Toast.show('Something Went Wrong', Toast.LONG)
            }
        }
    })

    const ListHeading = ({ name, nameColor, qty, value, valueColor }) => {
        return (
            <View style={styles.listheading}>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', color: nameColor ? nameColor : Colors.black, textAlign: 'center', width: '50%' }}>{name}</Text>
                <Text style={{ fontWeight: 'bold', color: Colors.black, textAlign: 'center', width: '20%' }}>{qty}</Text>
                <Text style={{ fontWeight: 'bold', color: valueColor ? valueColor : Colors.black, textAlign: 'center', width: '30%' }}>{value}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.back} leftonPress={onLeftPress} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {state.data && (
                    <View style={styles.bodyContent}>
                        <Text style={styles.headingtext}>Order Review</Text>
                        <View style={styles.content}>
                            {(state.data?.shipping_address.address_1 || state.data?.billing_address.address_1) ?
                                <>
                                    <View style={[styles.flex, { marginBottom: '1%' }]}>
                                        <Text style={styles.boldtxt}>Shipping Address :</Text>
                                        <Text onPress={onEditAddress} style={styles.edittxt}>Edit</Text>
                                    </View>
                                    <Text>{getAddresFormat(state.data?.shipping_address)}</Text>
                                    <Text style={[styles.boldtxt, { marginTop: '2%', marginBottom: '1%' }]}>Billing Address :</Text>
                                    <Text>{getAddresFormat(state.data?.billing_address)}</Text>
                                </>
                                :
                                <View style={{ alignItems: 'center' }}>
                                    {/* <Text style={[styles.boldtxt, { marginTop: '2%', marginBottom: '1%' }]}>No Address Found</Text> */}
                                    <SmallBotton
                                        name={'Add Address'}
                                        width={'60%'}
                                        onPress={onEditAddress}
                                    />
                                </View>
                            }
                            <View style={[styles.border, { marginVertical: '3%' }]} />
                            {(state.data?.items && state.data?.items.length > 0) && (
                                <>
                                    <Text style={[styles.boldtxt, { marginBottom: '1%' }]}>Item(s) :</Text>
                                    <View style={styles.itemContent}>
                                        <ListHeading name={'Product'} qty={'Qty'} value={'Total'} />
                                        <View style={[styles.border, { width: '90%', alignSelf: 'center' }]} />
                                        {state.data?.items.map((item, key) => (
                                            <ListHeading key={key} name={item.name} nameColor={Colors.light_blue} qty={item.quantity} value={item.prices?.currency_symbol + " " + item.totals?.line_subtotal} valueColor={Colors.bold_text} />
                                        ))}
                                        <View style={[styles.border, { width: '90%', alignSelf: 'center' }]} />
                                        <ListHeading name={'Subtotal :'} value={state.data?.totals?.currency_symbol + " " + (state.data?.totals?.total_items)} valueColor={Colors.bold_text} />
                                        <ListHeading name={'Shipping :'} value={state.data?.totals?.currency_symbol + " " + state.data?.totals?.total_shipping} valueColor={Colors.bold_text} />
                                        <ListHeading name={'Discount :'} value={state.data?.totals?.currency_symbol + " " + state.data?.totals?.total_discount} valueColor={Colors.bold_text} />
                                        <ListHeading name={'Total :'} value={state.data?.totals?.currency_symbol + " " + state.data?.totals?.total_price} valueColor={Colors.bold_text} />
                                    </View>
                                </>
                            )}
                            <View style={[styles.border, { marginVertical: '3%' }]} />
                            <Text style={[styles.boldtxt, { marginBottom: '0%' }]}>Coupon :</Text>
                            <View style={styles.couponContainer}>
                                <TextInput
                                    onChangeText={e => onSetCoupon(e)}
                                    placeholder='Enter Coupon Code'
                                    value={state.couponsCode}
                                    editable={state.data?.coupons.length > 0 ? false : true}
                                    style={{ color: Colors.black }}
                                />
                                {(state.data?.coupons.length > 0) ?
                                    <SmallBotton name={'Remove'} onPress={removeCoupon} />
                                    :
                                    <SmallBotton name={'Apply'} onPress={applyCoupon} />
                                }
                            </View>
                            <Text style={[styles.boldtxt, { marginVertical: '4%', marginBottom: '1%' }]}>Payment :</Text>
                            <RadioGroup
                                radioButtons={state.paymentList}
                                onPress={onSelectPayment}
                                selectedId={state.paymentMethod}
                                containerStyle={{
                                    alignItems: 'flex-start',
                                }}
                            />
                            <View style={[styles.border, { marginVertical: '4%' }]} />
                            <InputField
                                name={'Order Notes (Optional)'}
                                value={state.orderNote}
                                placeholder={'Note about your order, e.g special note on delivery'}
                                onChangeText={onchangeOrderNote}
                                multiline={true}
                            />
                            <View style={{ marginVertical: '4%' }}>
                                <SingleBotton
                                    name={'Place Order'}
                                    width={'80%'}
                                    onPress={onSubmit}
                                    disabled={(state.data?.shipping_address.address_1 || state.data?.billing_address.address_1) ? false : true}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default OrderReview