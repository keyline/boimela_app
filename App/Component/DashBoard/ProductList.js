import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { offerPercentage } from '../../Utils/CommonFunction'
import { useNavigation } from '@react-navigation/native'
import Apis from '../../Service/apis'
import Toast from 'react-native-simple-toast'
import AuthContext from '../../Service/Context'

const ProductList = ({ item }) => {

    const navigation = useNavigation();
    const context = useContext(AuthContext);

    const onProductDetails = useCallback(async () => {
        navigation.navigate('ProductDetails', { id: item?.id })
    })

    const onAddCart = useCallback(async () => {
        if (context.allData?.isLogin) {
            try {
                // setState(prevState => ({
                //     ...prevState,
                //     loading: true
                // }))
                let params = {
                    id: item?.id,
                    quantity: 1
                }
                const response = await Apis.AddtoCart(params)
                // if (__DEV__) {
                //     console.log('AddToCart', JSON.stringify(response))
                // }
                if (response.data) {
                    Toast.show(`${item?.name} added to Cart`, Toast.LONG);
                }
                // setState(prevState => ({
                //     ...prevState,
                //     loading: false
                // }))
            } catch (error) {
                if (__DEV__) {
                    console.log('errors', JSON.stringify(error))
                }
                Toast.show('Something Went Wrong')
                // setState(prevState => ({
                //     ...prevState,
                //     loading: false
                // }))
            }
        } else {
            navigation.navigate('Login')
        }
    })

    return (
        <View style={styles.listContainer}>
            {(item?.regular_price && item?.sale_price && item?.regular_price != item?.sale_price) && (
                <View style={styles.offContainer}>
                    <Text style={styles.offText}>{offerPercentage(item?.regular_price, item?.sale_price)}% OFF</Text>
                </View>
            )}
            <TouchableOpacity onPress={onProductDetails}>
                <Image source={item?.images[0]?.src ? { uri: item?.images[0]?.src } : ImagePath.no_image} style={styles.booklogo} />
            </TouchableOpacity>
            <Text numberOfLines={1} onPress={onProductDetails} style={styles.boldText}>{item?.name}</Text>
            <Text numberOfLines={1} onPress={onProductDetails} style={styles.lightText}>{item?.attributes[0]?.options[0]}</Text>
            {(item?.regular_price && item?.sale_price && item?.regular_price != item?.sale_price) ? (
                <View style={styles.flex}>
                    <Text style={styles.originalpp}>₹{parseInt(item?.regular_price)}</Text>
                    <Text style={styles.salepp}>₹{parseInt(item?.sale_price)}</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.salepp}>₹{parseInt(item?.regular_price)}</Text>
                </View>
            )}
            <TouchableOpacity onPress={() => onAddCart(item)} activeOpacity={0.5} style={styles.cartContainer}>
                <Image source={ImagePath.cart} style={styles.cartlogo} />
                <Text style={styles.carttext}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductList