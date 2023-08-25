import { View, Text, SafeAreaView } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import Header from '../../Container/Header'
import { styles } from './styles'
import AuthContext from '../../Service/Context'
import Apis from '../../Service/apis'
import { useFocusEffect } from '@react-navigation/native'
import SingleBotton from '../../Container/SingleBotton'

const Address = ({ navigation }) => {

    const context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: null,
        page: 1,
        first_nam: '',
        last_name: '',
        company: '',
        address_1: '',
        address_2: '',
        city: '',
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            const response = await Apis.CheckOut_Get();
            if (__DEV__) {
                console.log('CheckOutGet', JSON.stringify(response))
            }
            setState(prev => ({
                ...prev,
                data: response?.data,
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
        }
    })

    const getAddresFormat = useCallback(() => {
        let add = state.data?.shipping_address
        return (add?.address_1 + ', ' + add?.address_2 + ', ' + add?.city + ' ' + add?.postcode + ', ' + add?.state)
    })

    const onSubmit = useCallback(async () => {
        try {
            setState(prevState => ({
                ...prevState,
                loadingNew: true,
            }))
            let shipadd = state.data?.shipping_address
            let billadd = state.data?.billing_address
            let params = {
                billing_address: {
                    first_name: billadd?.first_name,
                    last_name: billadd?.last_name,
                    company: billadd?.company,
                    address_1: billadd?.address_1,
                    address_2: billadd?.address_2,
                    city: billadd?.city,
                    state: billadd?.state,
                    postcode: billadd?.postcode,
                    country: billadd?.country,
                    email: billadd?.email,
                    phone: billadd?.phone
                },
                shipping_address: {
                    first_name: shipadd?.first_name,
                    last_name: shipadd?.last_name,
                    company: shipadd?.company,
                    address_1: shipadd?.address_1,
                    address_2: shipadd?.address_2,
                    city: shipadd?.city,
                    state: shipadd?.state,
                    postcode: shipadd?.postcode,
                    country: shipadd?.country,
                    phone: shipadd?.phone
                },
                customer_note: "Test notes on order.",
                create_account: false,
                payment_method: "payumbolt",
                payment_data: [],
            }
            console.log('CheckountParams', JSON.stringify(params))
            const response = await Apis.CheckOut_Post(params)
            if (__DEV__) {
                console.log('CheckOutPost', JSON.stringify(response.data))
            }
            if (response?.data?.payment_result?.redirect_url) {
                navigation.replace('Payment', { url: response?.data?.payment_result?.redirect_url })
            }
            setState(prevState => ({
                ...prevState,
                loadingNew: false,
            }))
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                loadingNew: false,
            }))
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.content}>
                <Text style={styles.boldtext}>Shipping Address :</Text>
                <Text style={styles.normaltext}>{getAddresFormat()}</Text>
                <View>
                    <Text style={styles.boldtext}>Payment Mode :</Text>
                    <Text style={styles.normaltext}>PayUmoney</Text>
                </View>
                <View style={{ marginTop: '12%' }}>
                    <SingleBotton
                        name={'Pay Now'}
                        onPress={onSubmit}
                        loading={state.loadingNew}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Address