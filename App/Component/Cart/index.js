import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AuthContext from '../../Service/Context'
import Apis from '../../Service/apis'
import Header from '../../Container/Header'
import { styles } from './styles'
import List from './List'
import Loader from '../../Container/Loader'
import Toast from 'react-native-simple-toast';
import { Colors } from '../../Utils/Colors'
import { getAccessToken } from '../../Service/AsyncStorage'
import { ImagePath } from '../../Utils/ImagePath'

const Cart = ({ navigation }) => {

    const context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: null,
        page: 1,
        storedata: null
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onLoad();
            return () => unsubscribe
        }, [navigation])
    )

    const onLoad = useCallback(async () => {
        let accesstoken = await getAccessToken();
        if (accesstoken) {
            onGetCart();
        } else {
            navigation.navigate('Login')
        }
    })

    const onGetCart = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            const response = await Apis.CartList();
            if (__DEV__) {
                console.log('CartListItem', JSON.stringify(response.data))
                console.log('Price', response?.data?.totals?.total_items)
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

    const onDelete = useCallback(async (item) => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let params = {
                key: item?.key
            }
            const response = await Apis.RemovetoCart(params);
            if (__DEV__) {
                console.log('RemoveCart', JSON.stringify(response))
            }
            if (response.data) {
                Toast.show(`${item?.name} remove from Cart`, Toast.LONG)
            }
            setState(prevState => ({
                ...prevState,
                data: response?.data,
                loading: false
            }))
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                loading: false
            }))
        }
    })

    const ValueText = ({ name, value }) => (
        <View>
            <Text style={styles.headingtxt}>{name}</Text>
            <Text style={[styles.valutxt, { color: Colors.bold_text, fontWeight: 'bold' }]}>{value}</Text>
        </View>
    )

    const onNext = useCallback(async () => {
        navigation.navigate('OrderReview');
    })

    const onMenuPress = useCallback(async () => {
        navigation.openDrawer();
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.menu} leftonPress={onMenuPress} />
            <View style={{ flex: 1, paddingTop: '2%', marginBottom: '16%' }}>
                <FlatList
                    data={state?.data?.items}
                    keyExtractor={(item, index) => item.key}
                    renderItem={({ item }) =>
                        <List item={item} onDelete={onDelete} />
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {(state.data) && (
                <View style={styles.btmContent}>
                    <View style={styles.btmPrice}>
                        <ValueText name={'Subtotal'} value={'₹' + state?.data?.totals?.total_items} />
                        {state?.data?.totals?.total_shipping && (
                            <ValueText name={'Shipping'} value={'₹' + state?.data?.totals?.total_shipping} />
                        )}
                        {(state.data.coupons && state.data.coupons.length > 0) && (
                            <ValueText name={'Coupon'} value={'- ₹' + state?.data?.coupons[0]?.totals?.total_discount} />
                        )}
                        <ValueText name={'Total'} value={'₹' + state?.data?.totals?.total_price} />
                    </View>
                    {/* <Text style={styles.totalPricetxt}>Total Price : <Text style={styles.boldtext}>₹ {state?.data?.totals?.total_price}</Text></Text> */}
                    <TouchableOpacity disabled={state.data?.items.length > 0 ? false : true} onPress={onNext} activeOpacity={0.5} style={[styles.btm, { opacity: state.data?.items.length > 0 ? null : 0.7 }]}>
                        <Text style={styles.btmText}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default Cart