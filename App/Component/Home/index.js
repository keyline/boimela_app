import { View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import Apis from '../../Service/apis'
import { useFocusEffect } from '@react-navigation/native'
import { styles } from './styles'
import Header from '../../Container/Header'
import List from './List'
import AuthContext from '../../Service/Context'
import Toast from 'react-native-simple-toast';
import Loader from '../../Container/Loader'
import SearchBar from '../../Container/SearchBar'
import SearchField from '../../Container/SearchField'

const Home = ({ navigation }) => {

    const context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: [],
        page: 1,
        searchkey: '',
        searchData: []
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onLoad();
            return () => unsubscribe
        }, [navigation])
    )

    const onLoad = useCallback(async () => {
        setState(prevState => ({
            ...prevState,
            data: [],
        }))
        onGetdata();
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
                status: 'publish',
            }
            console.log('params', params)
            const response = await Apis.productList(params)
            // if (__DEV__) {
            //     console.log('ProductLists', JSON.stringify(response))
            // }
            if (response) {
                // let filterData = response.data.filter(obj => obj.status == 'publish')
                setState(prevState => ({
                    ...prevState,
                    data: [...state.data, ...response],
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

    const onSearchKeychng = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            searchkey: value
        }))
        onGetdata(1, value)
    }, [state.searchkey])

    const getSearchData = useCallback(async () => {

    })

    const onNext = useCallback(async (item) => {
        navigation.navigate('Cart')
    })

    const onSearchPress = useCallback(async () => {
        navigation.navigate('Search')
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            {/* <SearchBar value={state.searchkey} onChangeText={onSearchKeychng} /> */}
            <SearchField onPress={onSearchPress} />
            {state.data.length > 0 && (
                <View style={{ flex: 1, paddingBottom: '2%' }}>
                    <FlatList
                        data={state.searchkey ? state.searchData : state.data}
                        keyExtractor={(item, index) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <List item={item} onItemPress={onNext} onAddCart={onAddCart} />
                        }
                        horizontal={false}
                        numColumns={2}
                        initialNumToRender={6}
                        contentContainerStyle={styles.flatlistcontent}
                        onEndReached={onPagenation}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default Home