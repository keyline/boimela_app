import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './App/Navigation/MainStack'
import { encode, decode } from 'base-64';
import AuthContext from './App/Service/Context';
import { clearAllData, getAccessToken, getUserData } from './App/Service/AsyncStorage';
import DrawerStack from './App/Navigation/DrawerStack';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const App = () => {

  const [state, setState] = useState({
    isLogin: false,
    userdata: null,
    accesstoken: null
  })

  useEffect(() => {
    onGetStoreData();
  }, [])

  const onGetStoreData = async () => {
    let userdata = await getUserData();
    // console.log('UserData', userdata);
    if (userdata) {
      setState(prevState => ({
        ...prevState,
        userdata: userdata,
        // isLogin: true
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        userdata: null,
        // isLogin: false
      }))
    }
    let accesstoken = await getAccessToken();
    // console.log('token', accesstoken)
    if (accesstoken) {
      setState(prevState => ({
        ...prevState,
        accesstoken: accesstoken,
        isLogin: true
      }))
      return true
    } else {
      setState(prevState => ({
        ...prevState,
        accesstoken: null,
        isLogin: false
      }))
      return false
    }
  }

  const onClearStoreData = async () => {
    let value = await clearAllData();
    if (value) {
      setState(prevState => ({
        ...prevState,
        isLogin: false,
        userdata: null,
        accesstoken: null
      }))
    } else {
      if (__DEV__) {
        console.log('AsyncStorage Error')
      }
    }
  }

  return (
    <AuthContext.Provider value={{ onGetStoreData, onClearStoreData, allData: state, setState }}>
      <NavigationContainer>
        {/* <MainStack /> */}
        <DrawerStack/>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App