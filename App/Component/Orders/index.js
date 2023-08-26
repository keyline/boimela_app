import { View, Text, SafeAreaView, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { getAccessToken, getUserId } from '../../Service/AsyncStorage'
import Apis from '../../Service/apis'
import Toast from 'react-native-simple-toast'
import OrderList from './OrderList'
import Loader from '../../Container/Loader'
import LoaderFull from '../../Container/LoaderFull'
import { useFocusEffect } from '@react-navigation/native'

const Orders = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        data: [],
        page: 1,
        refreshing: false
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onLoad();
            return () => unsubscribe
        }, [navigation])
    )

    useEffect(() => {
        onLoad()
    }, [state.page])

    const onLoad = useCallback(async () => {
        let accesstoken = await getAccessToken();
        if (accesstoken) {
            onGetData();
        } else {
            navigation.navigate('Login')
        }
    })

    const onGetData = useCallback(async (page = state.page, loading, refreshing) => {
        try {
            setState(prev => ({
                ...prev,
                loading: loading ? loading : true,
                refreshing: refreshing ? refreshing : false
            }))
            let userid = await getUserId();
            let params = {
                customer: userid,
                per_page: 15,
                page: page
            }
            const response = await Apis.orderList(params);
            // if (__DEV__) {
            //     console.log('OrderList', JSON.stringify(response))
            // }
            if (response) {
                if (page == 1) {
                    setState(prev => ({
                        ...prev,
                        data: response,
                        loading: false
                    }))
                } else {
                    setState(prev => ({
                        ...prev,
                        data: [...state.data, ...response],
                        loading: false
                    }))
                }
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
        if (route.params?.data) {
            // navigation.navigate('MyAccount');
            navigation.goBack();
        } else {
            navigation.openDrawer();
        }
    })

    const onPay = useCallback(async (item) => {
        if (item?.payment_url) {
            navigation.navigate('Payment', { url: item?.payment_url })
        }
    })

    const onCancel = useCallback(async (item) => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let params = {
                status: 'cancelled'
            }
            const res = await Apis.orderUpdate(item?.id, params)
            if (__DEV__) {
                console.log('OrderCancel', JSON.stringify(res))
            }
            if (res) {
                let updateItem = state.data.map(obj => {
                    if (obj.id === item.id) {
                        return { ...obj, status: 'cancelled' }
                    }
                    return obj;
                })
                setState(prev => ({
                    ...prev,
                    data: updateItem,
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

    const onPagenation = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            page: state.page + 1,
        }))
    })

    const itemSeparator = () => (
        <View style={styles.separator} />
    )

    const onRefresh = useCallback(async () => {
        setState(prev => ({
            ...prev,
            page: 1
        }))
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={route.params?.data ? ImagePath.back : ImagePath.menu} leftonPress={onLeftPress} />
            {state.data && (
                <View style={styles.bodyContent}>
                    <Text style={styles.headingtext}>Orders</Text>
                    <View style={styles.content}>
                        <FlatList
                            data={state.data}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) =>
                                <OrderList item={item} onCancel={onCancel} onPay={onPay} />
                            }
                            onEndReached={onPagenation}
                            onEndReachedThreshold={0.5}
                            ItemSeparatorComponent={itemSeparator}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    </View>
                </View>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default Orders