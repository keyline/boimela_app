import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'

const SearchField = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress()} activeOpacity={0.5} style={styles.container}>
            <TextInput editable={false} placeholder='Search here..' style={styles.input} />
            <Image source={ImagePath.search} style={styles.logo} />
        </TouchableOpacity>
    )
}

export default SearchField