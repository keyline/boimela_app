import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { PAYMENT_SUCCESS_URL } from '../../Service/Constant'
import Toast from 'react-native-simple-toast'

const Payment = ({ navigation, route }) => {

    const handleNavigationStateChange = (navState) => {
        if (__DEV__) {
            console.log('Current URL:', navState.url);
        }
        let url = navState.url
        if (url == PAYMENT_SUCCESS_URL || url.includes('my-account')) {
            navigation.replace('DashBoard')
            Toast.show('Order Placed Successfully', Toast.LONG);
        } else if (url.includes('cancel_order')) {
            navigation.replace('DashBoard')
            Toast.show('Payment Failed', Toast.LONG);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: route?.params?.url }}
                onNavigationStateChange={handleNavigationStateChange}
                style={{ flex: 1 }}
            // containerStyle={{ paddingTop: 20 }}
            />
        </SafeAreaView>
    )
}

export default Payment