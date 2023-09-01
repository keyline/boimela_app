import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { useFocusEffect } from '@react-navigation/native'
import { getAccessToken, getUserId } from '../../Service/AsyncStorage'
import Apis from '../../Service/apis'
import Toast from 'react-native-simple-toast'
import Loader from '../../Container/Loader'
import InputField from '../../Container/InputField'
import SingleBotton from '../../Container/SingleBotton'
import CustomDropDown from '../../Container/CustomDropDown'
import { isValidEmail } from '../../Service/Valid'

const AddressNew = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        btnloading: false,
        data: null,
        shipping: null,
        billing: null,
        statelist: [],
        sfnameErr: '',
        bfnameErr: '',
        slastnameErr: '',
        blastnameErr: '',
        saddress1Err: '',
        baddress1Err: '',
        scityErr: '',
        bcityErr: '',
        spostcodeErr: '',
        bpostcodeErr: '',
        sphnnoErr: '',
        bphnnoErr: '',
        emailErr: '',
        emailErrName: '',
        scountryErr: '',
        sstateErr: '',
        bcountryErr: '',
        bstateErr: ''
    })
    const [countryList, setcountryList] = useState([]);
    const [countryPicker, setcountryPicker] = useState(false);
    const [sstateList, setsstateList] = useState([]);
    const [sstatePicker, setsstatePicker] = useState(false);

    const [bcountryPicker, setbcountryPicker] = useState(false);
    const [bstateList, setbstateList] = useState([]);
    const [bstatePicker, setbstatePicker] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onLoad();
            return () => unsubscribe
        }, [navigation])
    )

    const onLoad = useCallback(async () => {
        let accesstoken = await getAccessToken();
        if (accesstoken) {
            onGetCountry();
        } else {
            navigation.navigate('Login')
        }
    })

    const onGetCountry = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            const res = await Apis.countryList();
            if (__DEV__) {
                console.log('CountryList', JSON.stringify(res))
            }
            if (res) {
                if (res.length > 0) {
                    let updatedList = res.map((obj) => {
                        let { code, name, ...rest } = obj;
                        return { label: name, value: code, ...rest }
                    })
                    setcountryList(updatedList)
                    onGetData(updatedList);
                }
            }
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                loading: false,
            }))
            Toast.show('Something Went Wrong')
        }
    })

    const onGetData = useCallback(async (countrylist = countryList) => {
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
                onGetSStateList(response?.shipping?.country, countrylist);
                onGetBStateList(response?.billing?.country, countrylist)
                setState(prev => ({
                    ...prev,
                    data: response,
                    shipping: response?.shipping,
                    billing: response?.billing,
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

    const onChangesfname = useCallback(async (val, typ) => {
        if (typ == 'billing') {
            setState(prev => ({
                ...prev,
                billing: {
                    ...state.billing,
                    first_name: val
                },
                bfnameErr: ''
            }))
        } else {
            setState(prev => ({
                ...prev,
                shipping: {
                    ...state.shipping,
                    first_name: val
                },
                sfnameErr: ''
            }))
        }
    })

    const onChangeslname = useCallback(async (val, typ) => {
        if (typ == 'billing') {
            setState(prev => ({
                ...prev,
                billing: {
                    ...state.billing,
                    last_name: val
                },
                blastnameErr: ''
            }))
        } else {
            setState(prev => ({
                ...prev,
                shipping: {
                    ...state.shipping,
                    last_name: val
                },
                slastnameErr: ''
            }))
        }
    })

    const onChangescname = useCallback(async (val, typ) => {
        if (typ == 'billing') {
            setState(prev => ({
                ...prev,
                billing: {
                    ...state.billing,
                    company: val
                },
            }))
        } else {
            setState(prev => ({
                ...prev,
                shipping: {
                    ...state.shipping,
                    company: val
                },
            }))
        }
    })

    const onChngAddress1 = useCallback(async (val, typ) => {
        if (typ == 'billing') {
            setState(prev => ({
                ...prev,
                billing: {
                    ...state.billing,
                    address_1: val
                },
                baddress1Err: ''
            }))
        } else {
            setState(prev => ({
                ...prev,
                shipping: {
                    ...state.shipping,
                    address_1: val
                },
                saddress1Err: ''
            }))
        }
    })

    const onChngAddress2 = useCallback(async (val, typ) => {
        if (typ == 'billing') {
            setState(prev => ({
                ...prev,
                billing: {
                    ...state.billing,
                    address_2: val
                }
            }))
        } else {
            setState(prev => ({
                ...prev,
                shipping: {
                    ...state.shipping,
                    address_2: val
                }
            }))
        }
    })

    const onChangesCity = useCallback(async (val, typ) => {
        if (typ == 'billing') {
            setState(prev => ({
                ...prev,
                billing: {
                    ...state.billing,
                    city: val
                },
                bcityErr: ''
            }))
        } else {
            setState(prev => ({
                ...prev,
                shipping: {
                    ...state.shipping,
                    city: val
                },
                scityErr: ''
            }))
        }
    })

    const onChnagesPcode = useCallback(async (val, typ) => {
        if (typ == 'billing') {
            setState(prev => ({
                ...prev,
                billing: {
                    ...state.billing,
                    postcode: val
                },
                bpostcodeErr: ''
            }))
        } else {
            setState(prev => ({
                ...prev,
                shipping: {
                    ...state.shipping,
                    postcode: val
                },
                spostcodeErr: ''
            }))
        }
    })

    const onChngPhnno = useCallback(async (val, typ) => {
        if (typ == 'billing') {
            setState(prev => ({
                ...prev,
                billing: {
                    ...state.billing,
                    phone: val
                },
                bphnnoErr: ''
            }))
        } else {
            setState(prev => ({
                ...prev,
                shipping: {
                    ...state.shipping,
                    phone: val
                },
                sphnnoErr: ''
            }))
        }
    })

    const onChngEmail = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            billing: {
                ...state.billing,
                email: val
            },
            emailErr: '',
            emailErrName: ''
        }))
    })

    function onSetSCountry(callback) {
        setState(prev => ({
            ...prev,
            shipping: {
                ...state.shipping,
                country: callback(state),
                state: ''
            },
            scountryErr: ''
        }))
        onGetSStateList(callback(state))
    }

    const onGetSStateList = useCallback((val, countrylist = countryList) => {
        let filterList = countrylist.filter(obj => obj.value == val)
        if (filterList && filterList.length > 0) {
            let array = filterList[0].states
            let updatedList = array.map((obj) => {
                let { code, name } = obj;
                return { label: name, value: code }
            })
            setsstateList(updatedList);
        }
    })

    function onSetSState(callback) {
        setState(prev => ({
            ...prev,
            shipping: {
                ...state.shipping,
                state: callback(state)
            },
            sstateErr: ''
        }))
    }

    function onSetBCountry(callback) {
        setState(prev => ({
            ...prev,
            billing: {
                ...state.billing,
                country: callback(state),
                state: ''
            },
            bcountryErr: ''
        }))
        onGetBStateList(callback(state))
    }

    const onGetBStateList = useCallback((val, countrylist = countryList) => {
        let filterList = countrylist.filter(obj => obj.value == val)
        if (filterList && filterList.length > 0) {
            let array = filterList[0].states
            let updatedList = array.map((obj) => {
                let { code, name } = obj;
                return { label: name, value: code }
            })
            setbstateList(updatedList);
        }
    })

    function onSetBState(callback) {
        setState(prev => ({
            ...prev,
            billing: {
                ...state.billing,
                state: callback(state)
            },
            bstateErr: ''
        }))
    }

    const onUpdate = useCallback(async () => {
        let { shipping, billing } = state
        if (shipping.first_name.trim() == '') {
            setState(prev => {
                return { ...prev, sfnameErr: 'error' }
            })
            return
        } else if (shipping.last_name.trim() == '') {
            setState(prev => {
                return { ...prev, slastnameErr: 'error' }
            })
            return
        } else if (shipping.country == '') {
            setState(prev => {
                return { ...prev, scountryErr: 'error' }
            })
            return
        } else if (shipping.address_1.trim() == '') {
            setState(prev => {
                return { ...prev, saddress1Err: 'error' }
            })
            return
        } else if (shipping.city.trim() == '') {
            setState(prev => {
                return { ...prev, scityErr: 'error' }
            })
            return
        } else if (shipping.state == '') {
            setState(prev => {
                return { ...prev, sstateErr: 'error' }
            })
            return
        } else if (shipping.postcode.trim() == '') {
            setState(prev => {
                return { ...prev, spostcodeErr: 'error' }
            })
            return
        } else if (shipping.phone.trim() == '') {
            setState(prev => {
                return { ...prev, sphnnoErr: 'error' }
            })
            return
        } else if (billing.first_name.trim() == '') {
            setState(prev => {
                return { ...prev, bfnameErr: 'error' }
            })
            return
        } else if (billing.last_name.trim() == '') {
            setState(prev => {
                return { ...prev, blastnameErr: 'error' }
            })
            return
        } else if (billing.country == '') {
            setState(prev => {
                return { ...prev, bcountryErr: 'error' }
            })
            return
        } else if (billing.address_1.trim() == '') {
            setState(prev => {
                return { ...prev, baddress1Err: 'error' }
            })
            return
        } else if (billing.city.trim() == '') {
            setState(prev => {
                return { ...prev, bcityErr: 'error' }
            })
            return
        } else if (billing.state == '') {
            setState(prev => {
                return { ...prev, bstateErr: 'error' }
            })
            return
        } else if (billing.postcode.trim() == '') {
            setState(prev => {
                return { ...prev, bpostcodeErr: 'error' }
            })
            return
        } else if (billing.phone.trim() == '') {
            setState(prev => {
                return { ...prev, bphnnoErr: 'error' }
            })
            return
        } else if (billing.email.trim() == '') {
            setState(prev => {
                return { ...prev, emailErr: 'error' }
            })
            return
        } else if (!isValidEmail(billing.email)) {
            setState(prev => {
                return { ...prev, emailErrName: 'Enter a Valid Email' }
            })
            return
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    btnloading: true
                }))
                let userid = await getUserId();
                let params = {
                    shipping: shipping,
                    billing: billing
                }
                const res = await Apis.userDetailsUpdate(userid, params)
                if (__DEV__) {
                    console.log('UpdateAddressRes', JSON.stringify(res))
                }
                setState(prev => ({
                    ...prev,
                    btnloading: false
                }))
                if (route.params?.data && route.params?.data == 'OrderReview') {
                    navigation.goBack();
                }
                Toast.show('Address Updated Successfully', Toast.LONG)
            } catch (error) {
                if (__DEV__) {
                    console.log('error', error)
                }
                setState(prev => ({
                    ...prev,
                    btnloading: false
                }))
                Toast.show('Something Went Wrong', Toast.LONG)
            }
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={route.params?.data ? ImagePath.back : ImagePath.menu} leftonPress={onLeftPress} />
            {(state.shipping && state.billing && countryList) && (
                <ScrollView>
                    <View style={styles.bodyContent}>
                        <Text style={styles.headingtext}>Address</Text>
                        <View style={styles.content}>
                            <Text style={styles.normaltxt}>The following addresses will be used on the checkout page by default.</Text>
                            <Text style={styles.nametxt}>Shipping Address :</Text>
                            <View style={{ marginHorizontal: '3%' }}>
                                <InputField
                                    name={'First name'}
                                    value={state.shipping?.first_name}
                                    placeholder={'Enter first name'}
                                    onChangeText={onChangesfname}
                                    error={state.sfnameErr ? 'Enter first name' : ''}
                                />
                                <InputField
                                    name={'Last name'}
                                    value={state.shipping?.last_name}
                                    placeholder={'Enter last name'}
                                    onChangeText={onChangeslname}
                                    error={state.slastnameErr ? 'Enter last name' : ''}
                                />
                                <InputField
                                    name={'Company name (Optional)'}
                                    value={state.shipping?.company}
                                    placeholder={'Enter company name'}
                                    onChangeText={onChangescname}
                                />
                                <CustomDropDown
                                    name={'Country'}
                                    value={state.shipping.country}
                                    items={countryList}
                                    open={countryPicker}
                                    setOpen={setcountryPicker}
                                    setItems={setcountryList}
                                    setValue={onSetSCountry}
                                    searchable={true}
                                    // listMode={'MODAL'}
                                    error={state.scountryErr ? 'Select Country' : ''}
                                />
                                <InputField
                                    name={'Street address'}
                                    value={state.shipping?.address_1}
                                    placeholder={'Enter house no and street name'}
                                    onChangeText={onChngAddress1}
                                    multiline={true}
                                    error={state.saddress1Err ? 'Enter address' : ''}
                                />
                                <InputField
                                    // name={'Last name'}
                                    value={state.shipping?.address_2}
                                    placeholder={'Enter apartment, suite, unit etc'}
                                    onChangeText={onChngAddress2}
                                    multiline={true}
                                />
                                <InputField
                                    name={'Town/City'}
                                    value={state.shipping?.city}
                                    placeholder={'Enter town/city'}
                                    onChangeText={onChangesCity}
                                    multiline={false}
                                    error={state.scityErr ? 'Enter Town/City' : ''}
                                />
                                {/* state added here */}
                                <CustomDropDown
                                    name={'State'}
                                    value={state.shipping.state}
                                    items={sstateList}
                                    open={sstatePicker}
                                    setOpen={setsstatePicker}
                                    setItems={setsstateList}
                                    setValue={onSetSState}
                                    searchable={true}
                                    // listMode={'MODAL'}
                                    error={state.sstateErr ? 'Select State' : ''}
                                />
                                <InputField
                                    name={'PIN Code'}
                                    value={state.shipping?.postcode}
                                    placeholder={'Enter PIN Code'}
                                    onChangeText={onChnagesPcode}
                                    multiline={false}
                                    keyboardType={'number-pad'}
                                    error={state.spostcodeErr ? 'Enter PIN Code' : ''}
                                />
                                <InputField
                                    name={'Phone No'}
                                    value={state.shipping?.phone}
                                    placeholder={'Enter Phone No'}
                                    onChangeText={onChngPhnno}
                                    multiline={false}
                                    keyboardType={'phone-pad'}
                                    error={state.sphnnoErr ? 'Enter Phone No' : ''}
                                />
                            </View>
                            <Text style={styles.nametxt}>Billing Address :</Text>
                            <View style={{ marginHorizontal: '3%' }}>
                                <InputField
                                    name={'First name'}
                                    value={state.billing?.first_name}
                                    placeholder={'Enter first name'}
                                    onChangeText={(e) => onChangesfname(e, 'billing')}
                                    error={state.bfnameErr ? 'Enter first name' : ''}
                                />
                                <InputField
                                    name={'Last name'}
                                    value={state.billing?.last_name}
                                    placeholder={'Enter last name'}
                                    onChangeText={(e) => onChangeslname(e, 'billing')}
                                    error={state.blastnameErr ? 'Enter last name' : ''}
                                />
                                <InputField
                                    name={'Company name (Optional)'}
                                    value={state.billing?.company}
                                    placeholder={'Enter company name'}
                                    onChangeText={(e) => onChangescname(e, 'billing')}
                                />
                                {/* country added here */}
                                <CustomDropDown
                                    name={'Country'}
                                    value={state.billing.country}
                                    items={countryList}
                                    open={bcountryPicker}
                                    setOpen={setbcountryPicker}
                                    setItems={setcountryList}
                                    setValue={onSetBCountry}
                                    searchable={true}
                                    // listMode={'MODAL'}
                                    error={state.bcountryErr ? 'Select Country' : ''}
                                />
                                <InputField
                                    name={'Street address'}
                                    value={state.billing?.address_1}
                                    placeholder={'Enter house no and street name'}
                                    onChangeText={(e) => onChngAddress1(e, 'billing')}
                                    multiline={true}
                                    error={state.baddress1Err ? 'Enter address' : ''}
                                />
                                <InputField
                                    // name={'Last name'}
                                    value={state.billing?.address_2}
                                    placeholder={'Enter apartment, suite, unit etc'}
                                    onChangeText={(e) => onChngAddress2(e, 'billing')}
                                    multiline={true}
                                />
                                <InputField
                                    name={'Town/City'}
                                    value={state.billing?.city}
                                    placeholder={'Enter town/city'}
                                    onChangeText={(e) => onChangesCity(e, 'billing')}
                                    multiline={false}
                                    error={state.bcityErr ? 'Enter Town/City' : ''}
                                />
                                {/* state added here */}
                                <CustomDropDown
                                    name={'State'}
                                    value={state.billing.state}
                                    items={bstateList}
                                    open={bstatePicker}
                                    setOpen={setbstatePicker}
                                    setItems={setbstateList}
                                    setValue={onSetBState}
                                    searchable={true}
                                    // listMode={'MODAL'}
                                    error={state.bstateErr ? 'Select State' : ''}
                                />
                                <InputField
                                    name={'PIN Code'}
                                    value={state.billing?.postcode}
                                    placeholder={'Enter PIN Code'}
                                    onChangeText={(e) => onChnagesPcode(e, 'billing')}
                                    multiline={false}
                                    keyboardType={'number-pad'}
                                    error={state.bpostcodeErr ? 'Enter PIN Code' : ''}
                                />
                                <InputField
                                    name={'Phone No'}
                                    value={state.billing?.phone}
                                    placeholder={'Enter Phone No'}
                                    onChangeText={(e) => onChngPhnno(e, 'billing')}
                                    multiline={false}
                                    keyboardType={'phone-pad'}
                                    error={state.bphnnoErr ? 'Enter Phone No' : ''}
                                />
                                <InputField
                                    name={'Email'}
                                    value={state.billing?.email}
                                    placeholder={'Enter Enter Email'}
                                    onChangeText={onChngEmail}
                                    multiline={false}
                                    keyboardType={'phone-pad'}
                                    error={state.emailErrName ? state.emailErrName : (state.emailErr ? 'Enter Phone No' : '')}
                                />
                            </View>
                            <View style={styles.btncontent}>
                                <SingleBotton
                                    name={'Update'}
                                    onPress={onUpdate}
                                    width={'80%'}
                                    loading={state.btnloading}
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

export default AddressNew