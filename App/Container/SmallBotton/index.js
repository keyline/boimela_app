import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'

const SmallBotton = ({ name, onPress, width }) => {
    return (
        <TouchableOpacity disabled={onPress ? false : true} onPress={() => onPress()} activeOpacity={0.5} style={[styles.container, { width: width ? width : '22%' }]}>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

export default SmallBotton

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light_blue,
        alignItems: 'center',
        paddingVertical: '1.5%',
        borderRadius: 5,
        marginLeft: '4%',
        marginTop: '2%'
    },
    text: {
        color: Colors.white,
        fontWeight: 'bold'
    }
})