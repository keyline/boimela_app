import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { lazy, useCallback, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import Toast from 'react-native-simple-toast'
import Apis from '../../Service/apis'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../Container/Loader'
import { capitalizeFirstLetter, dateFormat } from '../../Utils/CommonFunction'
import NameValue from '../../Container/NameValue'
import { Colors } from '../../Utils/Colors'
import AddressView from '../../Container/AddressView'
import SingleBotton from '../../Container/SingleBotton'

const OrderDetails = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        data: null,
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
            const response = await Apis.orderDetails(route.params?.id)
            if (__DEV__) {
                console.log('OrderDetails', JSON.stringify(response))
            }
            if (response) {
                setState(prev => ({
                    ...prev,
                    data: response,
                    loading: false
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    data: null,
                    loading: false
                }))
                Toast.show('Something Went Wrong')
            }
        } catch (error) {
            if (__DEV__) {
                console.log('error', error)
            }
            setState(prev => ({
                ...prev,
                loading: false
            }))
            Toast.show('Something Went Wrong')
        }
    })

    const onLeftPress = useCallback(async () => {
        navigation.goBack();
    })

    const onCancel = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let params = {
                status: 'cancelled'
            }
            const res = await Apis.orderUpdate(state.data?.id, params)
            if (__DEV__) {
                console.log('OrderCancel', JSON.stringify(res))
            }
            if (res) {
                setState(prev => ({
                    ...prev,
                    data: {
                        ...state.data,
                        status: 'cancelled'
                    },
                    loading: false
                }))
                Toast.show('Order Cancelled Successfully', Toast.LONG);
            } else {
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                Toast.show('Something Went Wrong')
            }
        } catch (error) {
            if (__DEV__) {
                console.log('error', error)
            }
            setState(prev => ({
                ...prev,
                loading: false
            }))
            Toast.show('Something Went Wrong')
        }
    })

    const onItemPress = useCallback(async (id) => {
        navigation.navigate('ProductDetails', { id: id })
    })

    const ListHeading = ({ name, nameColor, qty, value, valueColor, onPress }) => {
        return (
            <View style={styles.listheading}>
                <Text onPress={() => onPress()} disabled={onPress ? false : true} style={{ fontWeight: 'bold', color: nameColor ? nameColor : Colors.black, textAlign: 'center', width: '50%' }}>{name}</Text>
                <Text style={{ fontWeight: 'bold', color: Colors.black, textAlign: 'center', width: '20%' }}>{qty}</Text>
                <Text style={{ fontWeight: 'bold', color: valueColor ? valueColor : Colors.black, textAlign: 'center', width: '30%' }}>{value}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.back} leftonPress={onLeftPress} />
            {(state.data) && (
                <View style={styles.bodyContent}>
                    <Text style={styles.headingtext}>Order #{state.data.id}</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.content}>
                            <Text style={styles.nametxt}>Order Info :</Text>
                            <Text>Order <Text style={styles.bold}> #{state.data?.id} </Text> was placed on <Text style={styles.bold}> {dateFormat(state.data?.date_created)} </Text> and is currently <Text style={styles.bold}> {capitalizeFirstLetter(state.data?.status)} </Text>.</Text>
                            <Text style={styles.nametxt}>Order Details :</Text>
                            <View style={styles.detailsContent}>
                                <ListHeading name={'Product'} qty={'Qty'} value={'Total'} />
                                <View style={styles.border} />
                                {(state.data.line_items && state.data.line_items.length > 0) && state.data.line_items.map((item, key) => (
                                    <ListHeading key={key} onPress={()=>onItemPress(item.product_id)} name={item.name} nameColor={Colors.light_blue} qty={item.quantity} value={state.data?.currency_symbol + " " + item.total} valueColor={Colors.bold_text} />
                                ))}
                                <View style={styles.border} />
                                <ListHeading name={'Subtotal :'} value={state.data?.currency_symbol + " " + (state.data?.total - state.data?.shipping_total)} valueColor={Colors.bold_text} />
                                <ListHeading name={'Shipping :'} value={state.data?.currency_symbol + " " + state.data?.shipping_total} valueColor={Colors.bold_text} />
                                <ListHeading name={'Total :'} value={state.data?.currency_symbol + " " + state.data?.total} valueColor={Colors.bold_text} />
                                <ListHeading name={'Payment method :'} value={state.data?.payment_method_title} />
                                <View style={styles.border} />
                            </View>
                            <Text style={styles.nametxt}>Shipping Address :</Text>
                            <View style={{ alignSelf: 'center' }}>
                                <AddressView address={state.data?.shipping} />
                            </View>
                            <Text style={styles.nametxt}>Billing Address :</Text>
                            <View style={{ alignSelf: 'center' }}>
                                <AddressView address={state.data?.billing} />
                            </View>
                            {(state.data.status == 'pending' || state.data.status == 'processing' || state.data.status == 'on-hold') && (
                                <View style={{ marginTop: '6%' }}>
                                    <SingleBotton
                                        name={'Cancel'}
                                        onPress={onCancel}
                                        width={'80%'}
                                    />
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default OrderDetails