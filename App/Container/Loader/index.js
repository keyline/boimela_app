import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'

const Loader = ({ loading }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} animating={loading} color={Colors.light_blue} />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})