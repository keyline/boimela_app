import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'

const SearchBar = ({ value, onChangeText, onPress }) => {

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        page: 1,
        searchkey: '',
        searchData: []
    })

    return (
        <View style={styles.container}>
            <TextInput autoFocus={true} value={value} onChangeText={e => onChangeText(e)} placeholder='Search here' style={styles.input} />
            <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.logoContainer}>
                <Image source={ImagePath.search} style={styles.logo} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar