import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Component/Home';
import Login from '../Component/Login';
import Cart from '../Component/Cart';
import Address from '../Component/Address';
import Payment from '../Component/Payment';
import DashBoard from '../Component/DashBoard';
import MyAccount from '../Component/MyAccount';
import ProductDetails from '../Component/ProductDetails';
import ProductList from '../Component/ProductList';
import Search from '../Component/Search';
import AccountDetails from '../Component/AccountDetails';
import ChangePassword from '../Component/ChangePassword';
import Orders from '../Component/Orders';
import OrderDetails from '../Component/OrderDetails';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='DashBoard' component={DashBoard} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Cart' component={Cart} />
            <Stack.Screen name='Address' component={Address} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='MyAccount' component={MyAccount} />
            <Stack.Screen name='ProductDetails' component={ProductDetails} />
            <Stack.Screen name='ProductList' component={ProductList} />
            <Stack.Screen name='Search' component={Search} />
            <Stack.Screen name='AccountDetails' component={AccountDetails} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='Orders' component={Orders} />
            <Stack.Screen name='OrderDetails' component={OrderDetails} />


        </Stack.Navigator>
    )
}

export default MainStack