import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'

const AddressView = ({ address }) => {
    return (
        <>
            {address ?
                <View>
                    <Text style={styles.text}>{address?.first_name + ' ' + address?.last_name}</Text>
                    <Text style={styles.text}>{address?.address_1}</Text>
                    <Text style={styles.text}>{address?.address_2}</Text>
                    {(address?.company) && (
                        <Text style={styles.text}>{address?.company}</Text>
                    )}
                    <Text style={styles.text}>{address?.city + ', ' + address?.postcode}</Text>
                    <Text style={styles.text}>{address?.state + ', ' + address?.country}</Text>
                    {(address?.phone) && (
                        <Text style={styles.text}>{address?.phone}</Text>
                    )}
                </View>
                :
                null
            }
        </>
    )
}

export default AddressView