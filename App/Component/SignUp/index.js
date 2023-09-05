import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import InputField from '../../Container/InputField'
import SingleBotton from '../../Container/SingleBotton'
import { isValidEmail } from '../../Service/Valid'
import Toast from 'react-native-simple-toast'
import Apis from '../../Service/apis'

const SignUp = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        fname: '',
        fnameErr: '',
        lname: '',
        lnameErr: '',
        email: '',
        emailErr: '',
        password: '',
        passwordErr: '',
        passwordVisible: true,
        cnfPassword: '',
        cnfPasswordErr: '',
        cnfPasswordVisible: true

    })

    const onChangefname = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            fname: val,
            fnameErr: ''
        }))
    }, [state.fname])

    const onChangelname = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            lname: val,
            lnameErr: ''
        }))
    }, [state.lname])

    const onChangeemail = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            email: val,
            emailErr: ''
        }))
    }, [state.email])

    const onChangepassword = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            password: val,
            passwordErr: ''
        }))
    }, [state.password])

    const onChangecnfPass = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            cnfPassword: val,
            cnfPasswordErr: ''
        }))
    }, [state.cnfPassword])

    const onChangePssVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            passwordVisible: !state.passwordVisible,
        }))
    }, [state.passwordVisible])

    const onChangecnfPssVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            cnfPasswordVisible: !state.cnfPasswordVisible,
        }))
    }, [state.cnfPasswordVisible])

    const onLogin = useCallback(async () => {
        navigation.navigate('Login')
    })

    const onSignUp = useCallback(async () => {
        if (state.fname.trim() == '') {
            setState(prev => ({
                ...prev,
                fnameErr: 'Enter First Name'
            }))
            return
        } else if (state.lname.trim() == '') {
            setState(prev => ({
                ...prev,
                lnameErr: 'Enter Last Name'
            }))
            return
        } else if (state.email.trim() == '') {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter Email'
            }))
            return;
        } else if (!isValidEmail(state.email)) {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter a Valid Email'
            }))
            return;
        } else if (state.password.trim() == '') {
            setState(prev => ({
                ...prev,
                passwordErr: 'Enter Password'
            }))
            return
        } else if (state.cnfPassword.trim() == '') {
            setState(prev => ({
                ...prev,
                cnfPasswordErr: 'Enter Confirm Password'
            }))
            return
        } else if (state.password != state.cnfPassword) {
            Toast.show('Password Mismatch', Toast.LONG);
            return
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let params = {
                    email: state.email,
                    first_name: state.fname,
                    last_name: state.lname,
                    username: state.email,
                    password: state.password
                }
                const response = await Apis.SignUp(params)
                if (__DEV__) {
                    console.log('SignUp', JSON.stringify(response))
                }
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                if (response) {
                    Toast.show('SignUp Successfully', Toast.LONG)
                    navigation.goBack();
                }
            } catch (error) {
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                Toast.show('Something Went Wrong', Toast.LONG);
                if (__DEV__) {
                    console.log('errorsss', error)
                }
            }
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Image source={ImagePath.boimela_logo} style={styles.logo} />
                    <View style={styles.bodyContent}>
                        <Text style={styles.boldText}>Sign Up</Text>
                        <InputField
                            name={'First Name'}
                            placeholder={'Enter First Name'}
                            value={state.fname}
                            onChangeText={onChangefname}
                            error={state.fnameErr ? state.fnameErr : ''}
                        />
                        <InputField
                            name={'Last Name'}
                            placeholder={'Enter Last Name'}
                            value={state.lname}
                            onChangeText={onChangelname}
                            error={state.lnameErr ? state.lnameErr : ''}
                        />
                        <InputField
                            name={'Email'}
                            placeholder={'Enter Email Name'}
                            value={state.email}
                            onChangeText={onChangeemail}
                            error={state.emailErr ? state.emailErr : ''}
                        />
                        <InputField
                            name={'Password'}
                            placeholder={'Enter Password'}
                            value={state.password}
                            onChangeText={onChangepassword}
                            error={state.passwordErr ? state.passwordErr : ''}
                            passwordInput={true}
                            passVisible={state.passwordVisible}
                            onChangVisible={onChangePssVisible}
                        />
                        <InputField
                            name={'Confirm Password'}
                            placeholder={'Enter Confirm Password'}
                            value={state.cnfPassword}
                            onChangeText={onChangecnfPass}
                            error={state.cnfPasswordErr ? state.cnfPasswordErr : ''}
                            passwordInput={true}
                            passVisible={state.cnfPasswordVisible}
                            onChangVisible={onChangecnfPssVisible}
                        />
                        <View style={{ marginVertical: '5%' }}>
                            <SingleBotton
                                loading={state.loading}
                                name={'Sign Up'}
                                onPress={onSignUp}
                                width={'70%'}
                            />
                        </View>
                        <Text style={styles.btmtxt}>Already Users? <Text onPress={onLogin} style={styles.signtxt}>Login</Text> here.</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp