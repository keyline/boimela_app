import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'

const SingleBotton = ({ name, onPress, loading, width, disabled }) => {
    return (
        <>
            {loading ?
                <View style={[styles.container, { width: width ? width : '100%' }]}>
                    <ActivityIndicator color={Colors.white} animating={loading} size={'small'} />
                </View>
                :
                <TouchableOpacity disabled={disabled ? disabled : false} onPress={() => onPress()} activeOpacity={0.5} style={[styles.container, { width: width ? width : '100%', opacity: disabled ? 0.7 : '' }]}>
                    <Text style={styles.text}>{name}</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default SingleBotton

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light_blue,
        paddingVertical: '5%',
        borderRadius: 5,
        alignSelf: 'center'
    },
    text: {
        color: Colors.white,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }

})