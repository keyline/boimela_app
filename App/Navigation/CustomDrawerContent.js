import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
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
import { SUPORT_EMAIL, SUPORT_MESSAGE, SUPORT_PHONE } from '../Service/Constant'

const CustomDrawerContent = (props) => {

  const menuList = [
    { id: 1, name: 'Home', screen: 'DashBoard', icon: ImagePath.home, logiReq: false },
    { id: 2, name: 'My Account', screen: 'MyAccount', icon: ImagePath.user_new, logiReq: true },
    { id: 3, name: 'Cart', screen: 'Cart', icon: ImagePath.cart, logiReq: true },
    { id: 4, name: 'Orders', screen: 'Orders', icon: ImagePath.order, logiReq: true },
    { id: 5, name: 'Change Password', screen: 'ChangePassword', icon: ImagePath.lock, logiReq: true },
    { id: 6, name: 'About Us', screen: 'CmsPage', icon: ImagePath.about_us, logiReq: false, params: 'about-us' },
    { id: 7, name: 'Shipping Info', screen: 'CmsPage', icon: ImagePath.shipping_info, logiReq: false, params: 'shipping-info' },
    { id: 8, name: 'Privacy Policy', screen: 'CmsPage', icon: ImagePath.privacy_policy, logiReq: false, params: 'privacy-policy' },
    { id: 9, name: 'Conditions of Use', screen: 'CmsPage', icon: ImagePath.conditionof_use, logiReq: false, params: 'conditions-of-use' },
    { id: 10, name: 'Refund Policy', screen: 'CmsPage', icon: ImagePath.refund, logiReq: false, params: 'cancellation-refund-policy' },
    { id: 11, name: 'Delete Account', screen: 'DeleteAccount', icon: ImagePath.delete_account, logiReq: true, params: 'delete_account' },
    { id: 11, name: 'Track Order', screen: 'TrackOrder', icon: ImagePath.delete_account, logiReq: false },

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
      if (item.screen == 'CmsPage') {
        props.navigation.navigate(item.screen, { page: item.params });
      } else if (item.screen == 'DeleteAccount') {
        onDeleteAccount();
      } else {
        props.navigation.navigate(item.screen);
      }
    }
  })

  const onContactPress = useCallback(async (type) => {
    try {
      if (type == 'phone') {
        let phoneUrl = `tel:${SUPORT_PHONE}`
        await Linking.openURL(phoneUrl)
      } else if (type == 'whatsapp') {
        let whatsappUrl = `https://api.whatsapp.com/send?phone=${SUPORT_PHONE}&text=${encodeURIComponent(SUPORT_MESSAGE)}`;
        await Linking.openURL(whatsappUrl)
      } else if (type == 'email') {
        let emailUrl = `mailto:${SUPORT_EMAIL}`
        await Linking.openURL(emailUrl)
      }
    } catch (error) {
      if (__DEV__) {
        console.log(error)
      }
      Toast.show('Something went Wrong')
    }
  })

  const onDeleteAccount = useCallback(async () => {
    if (state.data?.id) {
      try {
        const delres = await Apis.DeleteUser(state.data?.id)
        if (__DEV__) {
          console.log('DeleteRes', JSON.stringify(delres))
        }
        if (delres) {
          await context.onClearStoreData();
          props.navigation.navigate('DashBoard');
          Toast.show('Account Deleted Successfully', Toast.LONG)
        }
      } catch (error) {
        if (__DEV__) {
          console.log(error)
        }
        Toast.show('Something went Wrong');
      }
    } else {
      Toast.show('Something went Wrong');
    }
  })

  return (
    <View style={{ flex: 1 }}>
      {(state.isLogin && state.data) && (
        <View style={styles.drawerTopContent}>
          <Image source={state.data?.avatar_url ? { uri: state?.data?.avatar_url } : ImagePath.user} style={styles.drawerLogo} />
          <Text style={styles.drawerNametext}>{state?.data?.first_name + " " + state?.data?.last_name}</Text>
          <View style={styles.border} />
        </View>
      )}
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        {/* <DrawerItemList {...props} /> */}
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
            style={{ marginVertical: 0 }}
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
          style={{ marginVertical: 0 }}
        />
      </DrawerContentScrollView>
      <View style={styles.contactContainer}>
        <Text style={styles.menuText}>Contact Us :</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => onContactPress('phone')}>
          <Image source={ImagePath.call} style={styles.contactlogo} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => onContactPress('whatsapp')}>
          <Image source={ImagePath.whatsapp} style={styles.contactlogo} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => onContactPress('email')}>
          <Image source={ImagePath.email} style={styles.contactlogo} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawerContent