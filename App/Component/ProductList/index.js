import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { useNavigation } from '@react-navigation/native'
import SearchField from '../../Container/SearchField'
import Apis from '../../Service/apis'
import List from '../../Container/List'
import Loader from '../../Container/Loader'
import AuthContext from '../../Service/Context'
import Toast from 'react-native-simple-toast';

const ProductList = ({navigation, route }) => {

    // const navigation = useNavigation();
    const context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        data: [],
        page: 1
    })

    useEffect(() => {
        onGetdata();
    }, [state.page])

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
                category: route.params?.categoryid
            }
            console.log('params', params)
            const response = await Apis.productList(params)
            // if (__DEV__) {
            //     console.log('ProductLists', JSON.stringify(response))
            // }
            if (response) {
                setState(prevState => ({
                    ...prevState,
                    data: [...state.data, ...response],
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
        setState(prevState => ({
            ...prevState,
            page: state.page + 1,
        }))
    })


    // const renderFooter = () => {
    //     if (!state.loadingNew) return null;

    //     return <ActivityIndicator animating={state.loadingNew} style={styles.loader} />;
    // };

    const onLeftPress = useCallback(async () => {
        navigation.goBack();
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

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.back} leftonPress={onLeftPress} />
            {/* <SearchField onPress={onSearchPress} /> */}
            <Text style={styles.headingtext}>{route?.params?.category?.name}</Text>
            {(state?.data && state?.data?.length > 0) && (
                <View style={{ flex: 1, paddingBottom: '2%' }}>
                    <FlatList
                        data={state.data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <List navigation={navigation} item={item} onAddCart={onAddCart} />
                        }
                        horizontal={false}
                        numColumns={2}
                        initialNumToRender={6}
                        contentContainerStyle={styles.flatlistcontent}
                        onEndReached={onPagenation}
                        onEndReachedThreshold={0.5}
                    // ListFooterComponent={renderFooter}
                    />
                </View>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default ProductList