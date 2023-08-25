import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { offerPercentage } from '../../Utils/CommonFunction'
import { ImagePath } from '../../Utils/ImagePath'

const List = ({ item, onItemPress, onAddCart }) => {
    return (
        <View style={styles.listContainer}>
            {(item?.regular_price && item?.sale_price && item?.regular_price != item?.sale_price) && (
                <View style={styles.offContainer}>
                    <Text style={styles.offText}>{offerPercentage(item?.regular_price, item?.sale_price)}% OFF</Text>
                </View>
            )}
            {/* <TouchableOpacity onPress={() => onItemPress(item)}> */}
                <Image source={item?.images[0]?.src ? { uri: item?.images[0]?.src } : ImagePath.no_image} style={styles.booklogo} />
            {/* </TouchableOpacity> */}
            <Text onPress={() => onItemPress(item)} style={styles.boldText}>{item?.name}</Text>
            <Text onPress={() => onItemPress(item)} style={styles.lightText}>{item?.attributes[0]?.options[0]}</Text>
            {(item?.regular_price && item?.sale_price && item?.regular_price != item?.sale_price) ? (
                <View style={styles.flex}>
                    <Text style={styles.originalpp}>₹ {item?.regular_price}</Text>
                    <Text style={styles.salepp}>₹ {item?.sale_price}</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.salepp}>₹ {item?.regular_price}</Text>
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