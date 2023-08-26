import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'

const LoaderFull = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={Colors.light_blue} />
        </View>
    )
}

export default LoaderFull

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        // opacity:0.7
    }
})