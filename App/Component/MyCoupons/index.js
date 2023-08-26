import { View, Text, SafeAreaView } from 'react-native'
import React, { useCallback } from 'react'
import { styles } from './styles';
import { ImagePath } from '../../Utils/ImagePath';
import Header from '../../Container/Header';

const MyCoupons = ({ navigation, route }) => {

    const onLeftPress = useCallback(async () => {
        if (route.params?.data) {
            // navigation.navigate('MyAccount');
            navigation.goBack();
        } else {
            navigation.openDrawer();
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={route.params?.data ? ImagePath.back : ImagePath.menu} leftonPress={onLeftPress} />
            <View style={styles.bodyContent}>
            <Text style={styles.headingtext}>My Coupons</Text>

            </View>
        </SafeAreaView>
    )
}

export default MyCoupons