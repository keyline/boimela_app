import { View, Text, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useContext, useState, useEffect } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import SearchField from '../../Container/SearchField'
import Loader from '../../Container/Loader'
import Apis from '../../Service/apis'
import { useFocusEffect } from '@react-navigation/native'
import CategoryList from './CategoryList'

const DashBoard = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        categoryList: [],
        page: 1
    })

    // useFocusEffect(
    //     useCallback(() => {
    //         const unsubscribe = onGetdata();
    //         return () => unsubscribe
    //     }, [navigation])
    // )

    useEffect(() => {
        onGetdata();
    }, [state.page])

    // useEffect(() => {
    //     const unsubscribe = onGetdata();
    //     return () => unsubscribe
    // }, [navigation])

    const onMenuPress = useCallback(async () => {
        navigation.openDrawer();
    })

    const onSearchPress = useCallback(async () => {
        navigation.navigate('Search')
    })

    const onGetdata = useCallback(async (page = state.page) => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let params = {
                per_page: 20,
                page: page,
                hide_empty: true
            }
            // console.log('params', params)
            const response = await Apis.categoryList(params)
            // if (__DEV__) {
            //     console.log('CategoryLists', JSON.stringify(response))
            // }
            if (response) {
                setState(prevState => ({
                    ...prevState,
                    categoryList: [...state.categoryList, ...response],
                    // categoryList:response,
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

    const onPagenation = useCallback(async () => {
        // onGetdata(state.page + 1)
        setState(prevState => ({
            ...prevState,
            page: state.page + 1,
            // loading: true
        }))
    })

    const renderFooter = () => {
        if (!state.loading) return null;

        return <ActivityIndicator animating={state.loading} style={styles.loader} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.menu} leftonPress={onMenuPress} />
            <SearchField onPress={onSearchPress} />
            {(state.categoryList && state.categoryList.length > 0) && (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={state.categoryList}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) =>
                            <CategoryList item={item} />
                        }
                        initialNumToRender={8}
                        contentContainerStyle={styles.flatlistcontent}
                        onEndReached={onPagenation}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default DashBoard