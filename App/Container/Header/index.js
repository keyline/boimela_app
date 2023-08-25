import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useContext } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import AuthContext from '../../Service/Context'
import { useNavigation } from '@react-navigation/native';

const Header = ({ leftIcon, leftonPress }) => {

    const navigation = useNavigation()
    const context = useContext(AuthContext);

    const onLogin = useCallback(async () => {
        navigation.navigate('Login')
    })

    const onCart = useCallback(async () => {
        navigation.navigate('Cart')
    })

    const onLogo = useCallback(async () => {
        navigation.navigate('DashBoard')
    })

    const onSearch = useCallback(async () => {
        navigation.navigate('Search')
    })

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                {leftIcon && (
                    <TouchableOpacity onPress={() => leftonPress()} activeOpacity={0.5} style={{ marginRight: '4%' }}>
                        <Image source={leftIcon} style={styles.menu} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onLogo} activeOpacity={0.5}>
                    <Image source={ImagePath.boimela_logo} style={styles.logo} />
                </TouchableOpacity>
            </View>
            <View style={styles.flex}>
                <TouchableOpacity onPress={onSearch} activeOpacity={0.5} style={{ marginRight: '12%' }}>
                    <Image source={ImagePath.search} style={styles.menu} />
                </TouchableOpacity>
                {context?.allData?.isLogin ?
                    <TouchableOpacity onPress={onCart} activeOpacity={0.5}>
                        <Image source={ImagePath.cart} style={styles.menu} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={onLogin} activeOpacity={0.5} >
                        <Image source={ImagePath.user} style={styles.menu} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default memo(Header)