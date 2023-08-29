import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { getAccessToken, getUserId } from '../../Service/AsyncStorage'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-simple-toast';
import Apis from '../../Service/apis'
import Loader from '../../Container/Loader'
import AuthContext from '../../Service/Context'

const MyAccount = ({ navigation }) => {

    const menuList = [
        { id: 1, name: 'Account Details', screen: 'AccountDetails', icon: ImagePath.user_new, params: 'MyAccount' },
        { id: 2, name: 'Change Password', screen: 'ChangePassword', icon: ImagePath.lock, params: 'MyAccount' },
        { id: 3, name: 'Address', screen: 'AddressNew', icon: ImagePath.address, params: 'MyAccount' },
        { id: 4, name: 'Orders', screen: 'Orders', icon: ImagePath.order, params: 'MyAccount' },
        // { id: 5, name: 'My Coupons', screen: 'MyCoupons', icon: ImagePath.coupon, params: 'MyAccount' },
        { id: 6, name: 'Sign Out', screen: 'sign_out', icon: ImagePath.logout, params: 'MyAccount' },
    ]

    const context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        btnloading: false,
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
        navigation.openDrawer();
    })

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onMenuPress(item)} activeOpacity={0.5} style={styles.listcontent}>
            <View style={styles.leftcontent}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.boldtxt}>{item.name}</Text>
            </View>
            <Image source={ImagePath.right_arrow} style={styles.arrowicon} />
        </TouchableOpacity>
    )

    const itemSeparator = () => (
        <View style={styles.separator} />
    )

    const onSignOut = useCallback(async () => {
        try {
            // await clearAllData();
            await context.onClearStoreData();
            Toast.show('Sign Out Successfully', Toast.LONG);
            navigation.navigate('DashBoard');
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            Toast.show('Something went Wrong')
        }
    })

    const onMenuPress = useCallback(async (item) => {
        if (item?.screen) {
            if (item?.screen == 'sign_out') {
                onSignOut();
            } else {
                navigation.navigate(item?.screen, { data: item.params })
            }
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.menu} leftonPress={onLeftPress} />
            {state.data && (
                <View style={styles.bodyContent}>
                    <Text style={styles.headingtext}>My Account</Text>
                    <View style={styles.content}>
                        <Image source={{ uri: state?.data?.avatar_url }} style={styles.logo} />
                        <Text style={styles.nametxt}>{state.data?.first_name + " " + state.data?.last_name}</Text>
                        <Text style={styles.emailtxt}>{state.data?.email}</Text>
                    </View>
                    <View style={styles.menuContainer}>
                        <FlatList
                            data={menuList}
                            keyExtractor={(item, index) => item.id}
                            renderItem={renderItem}
                            ItemSeparatorComponent={itemSeparator}
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

export default MyAccount