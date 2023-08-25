import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'

const NameValue = ({ name, nameColor, value, valueColor }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.nametxt, { color: nameColor ? nameColor : Colors.black }]}>{name}</Text>
            <Text style={styles.dot}>:</Text>
            <Text style={[styles.valuetxt, { color: valueColor ? valueColor : Colors.black }]}>{value}</Text>
        </View>
    )
}

export default NameValue