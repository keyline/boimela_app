import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import InputField from '../../Container/InputField'
import SingleBotton from '../../Container/SingleBotton'
import Toast from 'react-native-simple-toast'
import { getUserId } from '../../Service/AsyncStorage'
import Apis from '../../Service/apis'

const ChangePassword = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        btnloading: false,
        oldpass: '',
        oldpassErr: '',
        oldpassVisible: true,
        newpass: '',
        newpassErr: '',
        newpassVisible: true,
        cnfpass: '',
        cnfpassErr: '',
        cnfpassVisible: true,
        isbtnActive: false,

    })
    const onLeftPress = useCallback(async () => {
        if (route.params?.data == 'MyAccount') {
            navigation.navigate('MyAccount');
        } else {
            navigation.openDrawer();
        }
    })

    // const onChangeOldpass = useCallback(async (val) => {
    //     setState(prev => ({
    //         ...prev,
    //         oldpass: val,
    //         oldpassErr: ''
    //     }))
    //     onCheckbtnVisible();
    // }, [state.oldpass])

    // const onChangeOldpassVisible = useCallback(async () => {
    //     setState(prev => ({
    //         ...prev,
    //         oldpassVisible: !state.oldpassVisible
    //     }))
    // }, [state.oldpassVisible])

    const onChangeNewpass = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            newpass: val,
            newpassErr: ''
        }))
        onCheckbtnVisible();
    }, [state.newpass])

    const onChangeNewpassVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            newpassVisible: !state.newpassVisible
        }))
    }, [state.newpassVisible])

    const onChangeCnfpass = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            cnfpass: val,
            cnfpassErr: ''
        }))
        onCheckbtnVisible();
    }, [state.cnfpass])

    const onChangeCnfpassVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            cnfpassVisible: !state.cnfpassVisible
        }))
    }, [state.cnfpassVisible])

    const onCheckbtnVisible = useCallback(async () => {
        if (state.newpass.trim() != '' && state.cnfpass.trim() != '') {
            setState(prev => ({
                ...prev,
                isbtnActive: true
            }))
        } else {
            setState(prev => ({
                ...prev,
                isbtnActive: false
            }))
        }
    })

    const onUpdate = useCallback(async () => {
        // if (state.oldpass.trim() == '') {
        //     setState(prev => ({
        //         ...prev,
        //         oldpassErr: 'error'
        //     }))
        //     return
        // } 
        if (state.newpass.trim() == '') {
            setState(prev => ({
                ...prev,
                newpassErr: 'error'
            }))
            return
        } else if (state.cnfpass.trim() == '') {
            setState(prev => ({
                ...prev,
                cnfpassErr: 'error'
            }))
            return
        } else if (state.newpass != state.cnfpass) {
            Toast.show('New and Confirm Password Mismatch', Toast.LONG);
            return
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    btnloading: true
                }))
                let userid = await getUserId();
                let params = {
                    password: state.newpass
                    // old_password: state.oldpass
                }
                const res = await Apis.userDetailsUpdate(userid, params)
                if (__DEV__) {
                    console.log('UpdateRespone', JSON.stringify(res))
                }
                if (res) {
                    setState(prev => ({
                        ...prev,
                        newpass: '',
                        cnfpass: '',
                        isbtnActive: false,
                        btnloading: false
                    }))
                    Toast.show('Password Update Successfully', Toast.LONG)
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
            <Header leftIcon={route.params?.data == 'MyAccount' ? ImagePath.back : ImagePath.menu} leftonPress={onLeftPress} />
            <ScrollView>
                <View style={styles.bodyContent}>
                    <Text style={styles.headingtext}>Change Password</Text>
                    <View style={styles.content}>
                        {/* <InputField
                            name={'Old Password'}
                            placeholder={'Enter Old Password'}
                            value={state.oldpass}
                            onChangeText={onChangeOldpass}
                            error={state.oldpassErr ? 'Enter Old Password' : ''}
                            passwordInput={true}
                            passVisible={state.oldpassVisible}
                            onChangVisible={onChangeOldpassVisible}
                        /> */}
                        <InputField
                            name={'New Password'}
                            placeholder={'Enter New Password'}
                            value={state.newpass}
                            onChangeText={onChangeNewpass}
                            error={state.newpassErr ? 'Enter New Password' : ''}
                            passwordInput={true}
                            passVisible={state.newpassVisible}
                            onChangVisible={onChangeNewpassVisible}
                        />
                        <InputField
                            name={'Confirm Password'}
                            placeholder={'Enter Confirm Password'}
                            value={state.cnfpass}
                            onChangeText={onChangeCnfpass}
                            error={state.cnfpassErr ? 'Enter Confirm Password' : ''}
                            passwordInput={true}
                            passVisible={state.cnfpassVisible}
                            onChangVisible={onChangeCnfpassVisible}
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
        </SafeAreaView>
    )
}

export default ChangePassword