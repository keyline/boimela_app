import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import InputField from '../../Container/InputField'
import SingleBotton from '../../Container/SingleBotton'
import Toast from 'react-native-simple-toast';
import Apis from '../../Service/apis'
import { setAccessToken, setNonce, setUserData } from '../../Service/AsyncStorage'
import AuthContext from '../../Service/Context'
import { useNavigation } from '@react-navigation/native'

const Login = () => {

  const context = useContext(AuthContext);
  const navigation = useNavigation();

  const [state, setState] = useState({
    loading: false,
    username: '',
    usernameErr: '',
    password: '',
    passwordErr: '',
    passwordVisible: true
  })

  const onChangeUsername = useCallback(async (value) => {
    setState(prev => ({
      ...prev,
      username: value,
      usernameErr: ''
    }))
  }, [state.username])

  const onChangePassword = useCallback(async (value) => {
    setState(prev => ({
      ...prev,
      password: value,
      passwordErr: ''
    }))
  }, [state.password])

  const onChangePssVisible = useCallback(async () => {
    setState(prev => ({
      ...prev,
      passwordVisible: !state.passwordVisible,
    }))
  }, [state.passwordVisible])

  const onSignUp = useCallback(async () => {
    console.log('SignUp')
  })

  const onLogin = useCallback(async () => {
    if (state.username.trim() == '') {
      setState(prev => ({
        ...prev,
        usernameErr: 'error'
      }))
      return;
    } else if (state.password.trim() == '') {
      setState(prev => ({
        ...prev,
        passwordErr: 'error'
      }))
      return;
    } else {
      try {
        setState(prev => ({
          ...prev,
          loading: true
        }))
        const response = await Apis.Login(state.username, state.password)
        if (__DEV__) {
          console.log('LoginRes', JSON.stringify(response))
        }
        if (response.data) {
          await setAccessToken(response?.data?.token)
          await setUserData(response?.data);
          await onCart();
          await context.onGetStoreData();
          Toast.show('Login Successful', Toast.LONG);
          setState(prev => ({
            ...prev,
            loading: false
          }))
          navigation.goBack();
        } else {
          Toast.show('Enter Correct Username & Password', Toast.LONG);
          setState(prev => ({
            ...prev,
            loading: false
          }))
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false
        }))
        Toast.show('Enter Correct Username & Password', Toast.LONG);
        if (__DEV__) {
          console.log('errorsss', error)
        }
      }
    }
  })

  const onCart = useCallback(async () => {
    try {
      const response = await Apis.CartList();
      let Nonce = response.headers.get('nonce');
      // if (__DEV__) {
      //   console.log('Nonce', JSON.stringify(Nonce))
      // }
      if (Nonce) {
        await setNonce(Nonce)
      }
    } catch (error) {
      if (__DEV__) {
        console.log('errorsss', error)
      }
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Image source={ImagePath.boimela_logo} style={styles.logo} />
          <View style={styles.bodyContent}>
            <Text style={styles.boldText}>Login</Text>
            <InputField
              name={'Email'}
              placeholder={'Enter Email'}
              value={state.username}
              onChangeText={onChangeUsername}
              error={state.usernameErr ? 'Enter Email' : ''}
            />
            <InputField
              name={'Password'}
              placeholder={'Enter Password'}
              value={state.password}
              onChangeText={onChangePassword}
              error={state.passwordErr ? 'Enter Password' : ''}
              passwordInput={true}
              passVisible={state.passwordVisible}
              onChangVisible={onChangePssVisible}
            />
            <View style={{ marginVertical: '5%' }}>
              <SingleBotton
                loading={state.loading}
                name={'Login'}
                onPress={onLogin}
                width={'70%'}
              />
            </View>
            <Text style={styles.btmtxt}>New Users? <Text onPress={onSignUp} style={styles.signtxt}>Sign Up</Text> here.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login