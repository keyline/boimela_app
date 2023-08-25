import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { useNavigation } from '@react-navigation/native'

const List = ({ item, onDelete }) => {

    const navigation = useNavigation()

    const ValueText = ({ name, value }) => (
        <View>
            <Text style={styles.headingtxt}>{name}</Text>
            <Text style={styles.valutxt}>{value}</Text>
        </View>
    )

    const onProductDetails = useCallback(async () => {
        navigation.navigate('ProductDetails', { id: item?.id })
    })

    return (
        <View style={styles.listContainer}>
            <TouchableOpacity onPress={onProductDetails} activeOpacity={0.5} style={styles.listContent}>
                <Image source={item?.images[0]?.src ? { uri: item?.images[0]?.src } : ImagePath.no_image} style={styles.img} />
                <View style={{ width: '60%' }}>
                    <Text style={[styles.boldtext, { marginBottom: '2%' }]}>{item?.name}</Text>
                    <View style={styles.listContent}>
                        <ValueText name={'Price'} value={'₹' + item?.prices?.price} />
                        <ValueText name={'Qty'} value={item?.quantity} />
                        <ValueText name={'Total'} value={'₹' + item?.totals?.line_total} />
                    </View>
                </View>
                <TouchableOpacity onPress={() => onDelete(item)} style={{ marginRight: '2%' }}>
                    <Image source={ImagePath.delete} style={styles.delicon} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

export default List