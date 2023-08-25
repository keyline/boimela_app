import { View, Text, Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Component/Home';
import Cart from '../Component/Cart';
import Address from '../Component/Address';
import Payment from '../Component/Payment';
import Login from '../Component/Login';
import { ImagePath } from '../Utils/ImagePath';
import { styles } from './styles';
import Search from '../Component/Search';
import DashBoard from '../Component/DashBoard';
import ProductList from '../Component/ProductList';
import ProductDetails from '../Component/ProductDetails';
import MyAccount from '../Component/MyAccount';
import CustomDrawerContent from './CustomDrawerContent';
import AccountDetails from '../Component/AccountDetails';
import ChangePassword from '../Component/ChangePassword';
import Orders from '../Component/Orders';
import OrderDetails from '../Component/OrderDetails';
import MainStack from './MainStack';
import { Colors } from '../Utils/Colors';

const Drawer = createDrawerNavigator();

const Productstack = createNativeStackNavigator();
const ProductStack = () => (
    <Productstack.Navigator screenOptions={{ headerShown: false }}>
        <Productstack.Screen name='DashBoard' component={DashBoard} />
        <Productstack.Screen name='Home' component={Home} />
        <Productstack.Screen name='Search' component={Search} />
        <Productstack.Screen name='ProductList' component={ProductList} />
        <Productstack.Screen name='ProductDetails' component={ProductDetails} />

        {/* <Productstack.Screen name='Home' component={Home} /> */}
        {/* <Productstack.Screen name='Home' component={Home} /> */}
        <Productstack.Screen name='Login' component={Login} />
    </Productstack.Navigator>
)

const Cartstack = createNativeStackNavigator();
const CartStack = () => (
    <Cartstack.Navigator screenOptions={{ headerShown: false }}>
        <Cartstack.Screen name='Cart' component={Cart} />
        <Cartstack.Screen name='Address' component={Address} />
        <Cartstack.Screen name='Payment' component={Payment} />
        <Cartstack.Screen name='Login' component={Login} />
        <Cartstack.Screen name='Search' component={Search} />
        <Cartstack.Screen name='ProductList' component={ProductList} />
        <Cartstack.Screen name='ProductDetails' component={ProductDetails} />

    </Cartstack.Navigator>
)

const Myaccountstack = createNativeStackNavigator();
const MyaccountStack = () => (
    <Myaccountstack.Navigator screenOptions={{ headerShown: false }}>
        <Myaccountstack.Screen name='MyAccount' component={MyAccount} />
        <Myaccountstack.Screen name='AccountDetails' component={AccountDetails} />
        <Myaccountstack.Screen name='ChangePassword' component={ChangePassword} />
        <Myaccountstack.Screen name='Orders' component={Orders} />
        <Myaccountstack.Screen name='OrderDetails' component={OrderDetails} />

    </Myaccountstack.Navigator>
)

const Authstack = createNativeStackNavigator();
const AuthStack = () => (
    <Authstack.Navigator screenOptions={{ headerShown: false }}>
        <Authstack.Screen name='Login' component={Login} />
    </Authstack.Navigator>
)

const Icon = ({ props, source }) => (
    <Image source={source} style={{ width: props?.size, height: props?.size, tintColor: props?.color, resizeMode: 'contain' }} />
)

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderWidth: 2,
                    borderColor: Colors.light_blue,
                    backgroundColor: Colors.white
                }
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name='MainStack' component={MainStack} />
            {/* <Drawer.Screen name='DashBoard' component={DashBoard} />
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='Login' component={Login} />
            <Drawer.Screen name='Cart' component={Cart} />
            <Drawer.Screen name='Address' component={Address} />
            <Drawer.Screen name='Payment' component={Payment} />
            <Drawer.Screen name='MyAccount' component={MyAccount} />
            <Drawer.Screen name='ProductDetails' component={ProductDetails} />
            <Drawer.Screen name='ProductList' component={ProductList} />
            <Drawer.Screen name='Search' component={Search} />
            <Drawer.Screen name='AccountDetails' component={AccountDetails} />
            <Drawer.Screen name='ChangePassword' component={ChangePassword} />
            <Drawer.Screen name='Orders' component={Orders} />
            <Drawer.Screen name='OrderDetails' component={OrderDetails} /> */}
        </Drawer.Navigator>
    )
}

export default DrawerStack