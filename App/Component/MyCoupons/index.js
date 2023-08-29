import { View, Text, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles';
import { ImagePath } from '../../Utils/ImagePath';
import Header from '../../Container/Header';
import { useFocusEffect } from '@react-navigation/native';
import { getAccessToken } from '../../Service/AsyncStorage';
import Toast from 'react-native-simple-toast'
import Apis from '../../Service/apis';
import Loader from '../../Container/Loader';

const MyCoupons = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        data: [],
        page: 1
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
            onGetData();
        } else {
            navigation.navigate('Login')
        }
    })

    const onGetData = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let params = {
                page: 1
            }
            const response = await Apis.CouponList(params)
            if (__DEV__) {
                console.log('CouponList', JSON.stringify(response))
            }
            if (response.data) {
                setState(prev => ({
                    ...prev,
                    data: response.data,
                    loading: false
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    data: [],
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

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={route.params?.data ? ImagePath.back : ImagePath.menu} leftonPress={onLeftPress} />
            <View style={styles.bodyContent}>
                <Text style={styles.headingtext}>My Coupons</Text>

            </View>
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default MyCoupons