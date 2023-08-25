import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../Container/Header'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import Apis from '../../Service/apis'
import { getAccessToken, getUserId } from '../../Service/AsyncStorage'
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../Container/Loader'
import InputField from '../../Container/InputField'
import SingleBotton from '../../Container/SingleBotton'
import { isValidEmail } from '../../Service/Valid'

const AccountDetails = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        btnloading: false,
        data: null,
        isbtnActive: false,
        fname: '',
        fnameErr: '',
        lname: '',
        lnameErr: '',
        email: '',
        emailErr: '',
        emailErrName: '',
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
                    fname: response?.first_name,
                    lname: response?.last_name,
                    email: response?.email,
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
        navigation.goBack();
    })

    const onChangeFname = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            fname: val,
            fnameErr: '',
            isbtnActive: true
        }))
    }, [state.fname])

    const onChangeLname = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            lname: val,
            lnameErr: '',
            isbtnActive: true
        }))
    }, [state.lname])

    const onChangeEmail = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            email: val,
            emailErr: '',
            emailErrName: '',
            isbtnActive: true
        }))
    }, [state.email])

    const onUpdate = useCallback(async () => {
        if (state.fname.trim() == '') {
            setState(prev => ({
                ...prev,
                fnameErr: 'error'
            }))
            return;
        } else if (state.lname.trim() == '') {
            setState(prev => ({
                ...prev,
                lnameErr: 'error'
            }))
            return;
        } else if (state.email.trim() == '') {
            setState(prev => ({
                ...prev,
                emailErr: 'error'
            }))
            return;
        } else if (!isValidEmail(state.email)) {
            setState(prev => ({
                ...prev,
                emailErrName: 'Enter Valid Email'
            }))
            return;
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    btnloading: true
                }))
                let userid = await getUserId();
                let params = {
                    first_name: state.fname,
                    last_name: state.lname,
                    email: state.email,
                    // username: state.email
                }
                const res = await Apis.userDetailsUpdate(userid, params)
                if (__DEV__) {
                    console.log('UpdateRespone', JSON.stringify(res))
                }
                if (res) {
                    setState(prev => ({
                        ...prev,
                        isbtnActive: false,
                        btnloading: false
                    }))
                    Toast.show('Account Update Successfully', Toast.LONG)
                } else {
                    setState(prev => ({
                        ...prev,
                        btnloading: false
                    }))
                }

            } catch (error) {
                if (__DEV__) {
                    console.log('error', error)
                }
                setState(prev => ({
                    ...prev,
                    btnloading: false
                }))
                Toast.show('Something Went Wrong')
            }
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.back} leftonPress={onLeftPress} />
            {state.data && (
                <ScrollView>
                    <View style={styles.bodyContent}>
                        <Text style={styles.headingtext}>Account Details</Text>
                        <View style={styles.content}>
                            <InputField
                                value={state.fname}
                                name={'First Name'}
                                placeholder={'Enter First Name'}
                                onChangeText={onChangeFname}
                                error={state.fnameErr ? 'Enter First Name' : ''}
                            />
                            <InputField
                                value={state.lname}
                                name={'Last Name'}
                                placeholder={'Enter Last Name'}
                                onChangeText={onChangeLname}
                                error={state.lnameErr ? 'Enter Last Name' : ''}
                            />
                            <InputField
                                value={state.email}
                                name={'Email'}
                                placeholder={'Enter Email'}
                                onChangeText={onChangeEmail}
                                error={state.emailErrName ? state.emailErrName : (state.emailErr ? 'Enter Email' : '')}
                            />
                            <View style={styles.btnContent}>
                                <SingleBotton
                                    name={'Save Changes'}
                                    onPress={onUpdate}
                                    loading={state.btnloading}
                                    disabled={!state.isbtnActive}
                                    width={'80%'}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default AccountDetails