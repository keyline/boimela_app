import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import NameValue from '../../Container/NameValue'
import { Colors } from '../../Utils/Colors'
import { styles } from './styles'
import { capitalizeFirstLetter, dateFormat } from '../../Utils/CommonFunction'
import SmallBotton from '../../Container/SmallBotton'
import { useNavigation } from '@react-navigation/native'

const OrderList = ({ item, onCancel, onPay }) => {

    const navigation = useNavigation();

    const getStatusColor = (value) => {
        if (value == 'pending' || value == 'processing' || value == 'on-hold') {
            return Colors.mid_yellow
        } else if (value == 'refunded' || value == 'cancelled' || value == 'failed' || value == 'trash') {
            return 'red'
        } else {
            return 'green'
        }
    }

    const onView = useCallback(async () => {
        // console.log('View Details');
        navigation.navigate('OrderDetails', { id: item?.id })
    })

    return (
        <View style={styles.listContainer}>
            <TouchableOpacity activeOpacity={0.7}>
                <NameValue name={'Order Id'} value={'#' + item?.id} valueColor={Colors.light_blue} />
                <NameValue name={'Date'} value={dateFormat(item?.date_created)} />
                <NameValue name={'Status'} value={capitalizeFirstLetter(item?.status)} valueColor={getStatusColor(item?.status)} />
                <NameValue name={'Total'} value={item?.currency_symbol + " " + item?.total} valueColor={Colors.bold_text} />
            </TouchableOpacity>
            <View style={styles.listbtnContainer}>
                {(item?.status == 'pending' || item?.status == 'processing' || item?.status == 'on-hold') && (
                    <SmallBotton name={'Cancel'} onPress={() => onCancel(item)} />
                )}
                {/* {(item?.status == 'pending') && (
                    <SmallBotton name={'Pay'} onPress={() => onPay(item)} />
                )} */}
                <SmallBotton name={'View'} onPress={onView} />
                {/* <SmallBotton name={'Invoice'} /> */}
            </View>

        </View>
    )
}

export default OrderList