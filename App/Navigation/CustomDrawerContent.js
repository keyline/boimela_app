import { View, Text, Image } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { Colors } from '../Utils/Colors'
import { ImagePath } from '../Utils/ImagePath'
import { styles } from './styles'
import Toast from 'react-native-simple-toast'
import AuthContext from '../Service/Context'
import { getUserId } from '../Service/AsyncStorage'
import Apis from '../Service/apis'
import { useFocusEffect } from '@react-navigation/native'

const CustomDrawerContent = (props) => {

  const menuList = [
    { id: 1, name: 'Home', screen: 'DashBoard', icon: ImagePath.home, logiReq: false },
    { id: 2, name: 'My Account', screen: 'MyAccount', icon: ImagePath.user_new, logiReq: true },
    { id: 3, name: 'Cart', screen: 'Cart', icon: ImagePath.cart, logiReq: true },
    { id: 4, name: 'Orders', screen: 'Orders', icon: ImagePath.order, logiReq: true },
    { id: 5, name: 'Change Password', screen: 'ChangePassword', icon: ImagePath.lock, logiReq: true },

  ]

  const context = useContext(AuthContext);

  const [state, setState] = useState({
    loading: false,
    data: null,
    isLogin: context.allData?.isLogin
  })

  // useEffect(() => {
  //   onGetData()
  //   // const unsubscribe = onGetData();
  //   // return () => unsubscribe
  // }, [props])

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onGetData();
      return () => unsubscribe
    }, [props, context])
  )

  const onGetData = useCallback(async () => {
    let userid = await getUserId();
    if (context.allData?.isLogin && userid) {
      try {
        setState(prev => ({
          ...prev,
          loading: true
        }))
        const response = await Apis.userDetails(userid);
        // if (__DEV__) {
        //   console.log('UserDetailsDrawer', JSON.stringify(response))
        // }
        if (response) {
          setState(prev => ({
            ...prev,
            data: response,
            isLogin: true,
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
    } else {
      setState(prev => ({
        ...prev,
        isLogin: false
      }))
    }
  })

  const onSignOut = useCallback(async () => {
    try {
      // await clearAllData();
      await context.onClearStoreData();
      Toast.show('Sign Out Successfully', Toast.LONG);
      props.navigation.navigate('DashBoard');
    } catch (error) {
      if (__DEV__) {
        console.log(error)
      }
      Toast.show('Something went Wrong')
    }
  })

  const onLogin = useCallback(async () => {
    props.navigation.navigate('Login');
  })

  const Icon = ({ props, source }) => (
    <Image source={source} style={{ width: props?.size, height: props?.size, tintColor: props?.color, resizeMode: 'contain' }} />
  )

  const onMenuPress = useCallback(async (item) => {
    // console.log('item', item)
    if (item && item.screen) {
      props.navigation.navigate(item.screen);
    }
  })

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      {(state.isLogin && state.data) && (
        <View style={styles.drawerTopContent}>
          <Image source={ImagePath.user} style={styles.drawerLogo} />
          <Text style={styles.drawerNametext}>{state?.data?.first_name + " " + state?.data?.last_name}</Text>
          <View style={styles.border} />
        </View>
      )}
      {(state.isLogin ? menuList : menuList.filter(obj => obj.logiReq == false)).map((item, key) => (
        <DrawerItem
          key={key}
          label={item.name}
          onPress={() => onMenuPress(item)}
          labelStyle={styles.menuText}
          icon={(props) => (<Icon source={item.icon} props={props} />)}
          activeTintColor={Colors.light_blue}
          inactiveTintColor={Colors.border_grey}
          focused={props.state.routeNames[props.state.index] === item.screen}
          pressColor={Colors.light_blue}
        />
      ))}
      <DrawerItem
        label={state.isLogin ? "Sign Out" : "Login"}
        onPress={state.isLogin ? onSignOut : onLogin}
        labelStyle={styles.menuText}
        icon={(props) => (<Icon source={state.isLogin ? ImagePath.logout : ImagePath.user_new} props={props} />)}
        activeTintColor={Colors.light_blue}
        inactiveTintColor={Colors.border_grey}
        pressColor={Colors.light_blue}
      />
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent