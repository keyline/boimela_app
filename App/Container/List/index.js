import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo, useCallback } from 'react'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { ImagePath } from '../../Utils/ImagePath'
import { offerPercentage } from '../../Utils/CommonFunction'

const List = ({ item, onAddCart }) => {

    const navigation = useNavigation();

    const onItemPress = useCallback(async () => {
        navigation.navigate('ProductDetails', { id: item?.id })
    })

    return (
        <View style={styles.listContainer}>
            {(item?.regular_price && item?.sale_price && item?.regular_price != item?.sale_price) && (
                <View style={styles.offContainer}>
                    <Text style={styles.offText}>{offerPercentage(item?.regular_price, item?.sale_price)}% OFF</Text>
                </View>
            )}
            <TouchableOpacity onPress={onItemPress}>
                <Image source={item?.images[0]?.src ? { uri: item?.images[0]?.src } : ImagePath.no_image} style={styles.booklogo} />
            </TouchableOpacity>
            <Text numberOfLines={1} onPress={onItemPress} style={styles.boldText}>{item?.name}</Text>
            <Text numberOfLines={1} onPress={onItemPress} style={styles.lightText}>{item?.attributes[0]?.options[0]}</Text>
            {(item?.regular_price && item?.sale_price && item?.regular_price != item?.sale_price) ? (
                <View style={styles.flex}>
                    <Text style={styles.originalpp}>₹{parseInt(item?.regular_price)}</Text>
                    <Text style={styles.salepp}>₹{parseInt(item?.sale_price)}</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.salepp}>₹{item?.regular_price}</Text>
                </View>
            )}
            <TouchableOpacity onPress={() => onAddCart(item)} activeOpacity={0.5} style={styles.cartContainer}>
                <Image source={ImagePath.cart} style={styles.cartlogo} />
                <Text style={styles.carttext}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(List)