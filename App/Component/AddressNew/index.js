import { View, Text, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { useFocusEffect } from '@react-navigation/native'
import { getAccessToken, getUserId } from '../../Service/AsyncStorage'
import Apis from '../../Service/apis'
import Toast from 'react-native-simple-toast'
import Loader from '../../Container/Loader'

const AddressNew = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        data: null
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
            let userid = await getUserId();
            const response = await Apis.userDetails(userid);
            if (__DEV__) {
                console.log('UserDetails', JSON.stringify(response))
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
                <Text style={styles.headingtext}>Address</Text>
                <View style={styles.content}>
                    <Text style={styles.normaltxt}>The following addresses will be used on the checkout page by default.</Text>

                </View>
            </View>
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default AddressNew