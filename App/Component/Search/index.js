import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useState, useEffect, useContext } from 'react'
import Apis from '../../Service/apis'
import { styles } from './styles'
import SearchBar from '../../Container/SearchBar'
// import List from '../Home/List'
import { useFocusEffect } from '@react-navigation/native'
import Header from '../../Container/Header'
import Toast from 'react-native-simple-toast';
import Loader from '../../Container/Loader'
import AuthContext from '../../Service/Context'
import { ImagePath } from '../../Utils/ImagePath'
import List from '../../Container/List'

const Search = ({ navigation, route }) => {

    const context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: [],
        page: 1,
        searchkey: '',
        searchData: []
    })

    // useFocusEffect(
    //     useCallback(() => {
    //         const unsubscribe = onGetdata();
    //         return () => unsubscribe
    //     }, [navigation])
    // )

    useEffect(() => {
        if (route.params?.searchkey) {
            setState(prevState => ({
                ...prevState,
                searchkey: route.params?.searchkey
            }))
            onGetdata(route.params?.searchkey)
        }
    }, [])

    const onGetdata = useCallback(async (search = state.searchkey) => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let params = {
                per_page: 50,
                page: 1,
                status: 'publish',
                search: search
            }
            console.log('params', params)
            const response = await Apis.productList(params)
            if (__DEV__) {
                console.log('ProductLists', JSON.stringify(response))
            }
            if (response) {
                setState(prevState => ({
                    ...prevState,
                    // searchData: [...state.data, ...response],
                    searchData: response,
                    loading: false,
                    loadingNew: false
                }))
            }
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                loading: false,
                loadingNew: false
            }))
        }
    })

    const onPagenation = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            page: state.page + 1,
            loadingNew: true
        }))
        onGetdata(state.page + 1)
    })


    const renderFooter = () => {
        if (!state.loadingNew) return null;

        return <ActivityIndicator animating={state.loadingNew} style={styles.loader} />;
    };

    const onSearchKeychng = useCallback(async (value) => {
        setState(prevState => ({
            ...prevState,
            page: 1,
            searchkey: value
        }))
        onGetdata(value)
    })

    const onAddCart = useCallback(async (item) => {
        if (context.allData?.isLogin) {
            try {
                setState(prevState => ({
                    ...prevState,
                    loading: true
                }))
                let params = {
                    id: item?.id,
                    quantity: 1
                }
                const response = await Apis.AddtoCart(params)
                if (__DEV__) {
                    console.log('AddToCart', JSON.stringify(response))
                }
                if (response.data) {
                    Toast.show(`${item?.name} added to Cart`, Toast.LONG);
                }
                setState(prevState => ({
                    ...prevState,
                    loading: false
                }))
            } catch (error) {
                if (__DEV__) {
                    console.log('errors', JSON.stringify(error))
                }
                setState(prevState => ({
                    ...prevState,
                    loading: false
                }))
            }
        } else {
            navigation.navigate('Login')
        }
    })

    const onNext = useCallback(async (item) => {
        navigation.navigate('ProductDetails', { id: item?.id })
    })

    const onLeftPress = useCallback(async () => {
        navigation.goBack();
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.back} leftonPress={onLeftPress} />
            <SearchBar value={state.searchkey} onChangeText={onSearchKeychng} />
            <View style={{ flex: 1, paddingBottom: '2%' }}>
                <FlatList
                    data={state.searchData}
                    keyExtractor={(item, index) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <List navigation={navigation} item={item} onItemPress={onNext} onAddCart={onAddCart} />
                    }
                    horizontal={false}
                    numColumns={2}
                    initialNumToRender={6}
                    contentContainerStyle={styles.flatlistcontent}
                    // onEndReached={onPagenation}
                    // onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            </View>
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default Search