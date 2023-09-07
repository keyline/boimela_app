import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useContext, useCallback, useEffect, memo } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import Apis from '../../Service/apis'
import ProductList from './ProductList'
import { useNavigation } from '@react-navigation/native'
import ListHorizontal from '../../Container/ListHorizontal'

const CategoryList = ({ item }) => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        loading: false,
        data: [],
    })

    useEffect(() => {
        const unsubscribe = onGetdata();
        return () => unsubscribe
    }, [item])

    const onGetdata = useCallback(async () => {
        try {
            let params = {
                per_page: 6,
                page: 1,
                status: 'publish',
                category: item?.id
            }
            // console.log('params', params)
            const response = await Apis.productList(params)
            // if (__DEV__) {
            //     console.log('ProductLists', JSON.stringify(response))
            // }
            if (response) {
                setState(prevState => ({
                    ...prevState,
                    // data: [...state.data, ...response],
                    data: response,
                    loading: false,
                }))
            }
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                loading: false,
            }))
        }
    })

    const onPressCategory = useCallback(async () => {
        navigation.navigate('ProductList', { categoryid: item.id, category: item })
    })

    return (
        <View style={styles.categoryContainer}>
            <View style={styles.categoryContent}>
                <Text style={styles.categryText}>{item?.name}</Text>
                <TouchableOpacity onPress={onPressCategory} activeOpacity={0.5} style={styles.viewContent}>
                    <Text style={styles.viewText}>View All </Text>
                    <Image source={ImagePath.right_arrow} style={styles.arrowLogo} />
                </TouchableOpacity>
            </View>
            {!state.loading && (
                <View style={{ marginTop: '2%' }}>
                    <FlatList
                        data={state.data}
                        keyExtractor={(items, index) => items.id}
                        renderItem={({ item }) =>
                            // <ProductList item={item} />
                            <ListHorizontal item={item} />
                        }
                        horizontal
                        initialNumToRender={4}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    )
}

export default memo(CategoryList)