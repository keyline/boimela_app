import { View, Text, SafeAreaView, ScrollView, Share, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import Loader from '../../Container/Loader'
import Apis from '../../Service/apis'
import Banner from '../../Container/Banner'
import { useFocusEffect } from '@react-navigation/native'
import RenderHTML from 'react-native-render-html'
import Toast from 'react-native-simple-toast'
import { offerPercentage } from '../../Utils/CommonFunction'
import ListHorizontal from '../../Container/ListHorizontal'
import AuthContext from '../../Service/Context'

const ProductDetails = ({ navigation, route }) => {

    const context = useContext(AuthContext);

    const [state, setState] = useState({
        loading: false,
        data: null,
        relatedProduct: null,
        reviewList: null
    })

    useEffect(() => {
        onGetData();
    }, [route])

    // useFocusEffect(
    //     useCallback(() => {
    //         const unsubscribe = onGetData();
    //         return () => unsubscribe
    //     }, [navigation])
    // )

    const onGetData = useCallback(async () => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            const response = await Apis.productDetails(route?.params?.id)
            if (__DEV__) {
                console.log('ProductDetails', JSON.stringify(response))
            }
            if (response) {
                setState(prevState => ({
                    ...prevState,
                    data: response,
                    loading: false,
                }))
                onGetRelatedProduct(response?.related_ids)
                onGetReview(response?.id)
            } else {
                setState(prevState => ({
                    ...prevState,
                    data: null,
                    loading: false,
                }))
            }
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
            setState(prevState => ({
                ...prevState,
                data: null,
                loading: false,
            }))
        }
    })

    const onGetRelatedProduct = useCallback(async (ids) => {
        try {
            let params = {
                include: [0, ...ids]
            }
            // console.log('RelatedParams', JSON.stringify(params))
            const res = await Apis.productList(params)
            // if (__DEV__) {
            //     console.log('RelatedProduct', JSON.stringify(res))
            // }
            if (res) {
                setState(prev => ({
                    ...prev,
                    relatedProduct: res
                }))
            }
        } catch (error) {
            if (__DEV__) {
                console.log('errors', JSON.stringify(error))
            }
        }
    })

    const onGetReview = useCallback(async (id) => {
        try {
            const ress = await Apis.reviewList(id)
            if (__DEV__) {
                console.log('ReviewList', JSON.stringify(ress))
            }
            if (ress) {
                setState(prev => ({
                    ...prev,
                    reviewList: ress
                }))
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
                console.log('errors', JSON.stringify(error))
            }
        }
    })

    const onLeftPress = useCallback(async () => {
        navigation.goBack();
    })

    const onPressAttributes = useCallback(async (value) => {
        navigation.navigate('Search', { searchkey: value })
    })

    const handleShare = async () => {
        try {
            let shareContent = {
                message: `${state.data?.name} ${state.data?.permalink}`,
            }
            const result = await Share.share(shareContent);
            // if (result.action === Share.sharedAction) {
            //     if (result.activityType) {
            //         // Content shared
            //         console.log('Content shared successfully');
            //     } else {
            //         // Content shared
            //         console.log('Content shared successfully');
            //     }
            // } else if (result.action === Share.dismissedAction) {
            //     // Share dialog dismissed
            //     console.log('Share dialog dismissed');
            // }
        } catch (error) {
            Toast.show('Something Went Wrong')
            console.error('Error sharing:', error);
        }
    };

    const onAddCart = useCallback(async () => {
        if (context.allData?.isLogin) {
            try {
                // setState(prevState => ({
                //     ...prevState,
                //     loading: true
                // }))
                let params = {
                    id: state.data?.id,
                    quantity: 1
                }
                // console.log('addtoCartParams', JSON.stringify(params))
                const response = await Apis.AddtoCart(params)
                // if (__DEV__) {
                //     console.log('AddToCart', JSON.stringify(response))
                // }
                if (response.data) {
                    Toast.show(`${state.data?.name} added to Cart`, Toast.LONG);
                }
                // setState(prevState => ({
                //     ...prevState,
                //     loading: false
                // }))
            } catch (error) {
                if (__DEV__) {
                    console.log('errors', JSON.stringify(error))
                    console.log('error', error)
                }
                Toast.show('Something Went Wrong. Login again')
                // setState(prevState => ({
                //     ...prevState,
                //     loading: false
                // }))
            }
        } else {
            navigation.navigate('Login')
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.back} leftonPress={onLeftPress} />
            {state.data && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.bodyContent}>
                        <TouchableOpacity onPress={handleShare} activeOpacity={0.5} style={styles.shareContent}>
                            <Image source={ImagePath.share} style={styles.sharelogo} />
                        </TouchableOpacity>
                        <Banner data={state.data?.images} />
                        <Text style={styles.nametxt}>{state.data?.name}</Text>
                        <View style={[styles.flex, { marginVertical: '0%' }]}>
                            {(state.data?.attributes && state.data?.attributes.length > 0) && state.data?.attributes.map((item, key) => (
                                <View style={{ padding: 5 }} key={key}>
                                    <Text style={styles.boldtxt}>{item?.name}</Text>
                                    {(item?.options && item?.options.length > 0) && item?.options.map((items, keys) => (
                                        <Text onPress={() => onPressAttributes(items)} style={styles.lighttxt} key={keys}>{items}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>
                        <View style={{ marginVertical: '2%' }}>
                            {(state.data?.stock_quantity > 5) ?
                                <Text style={styles.instocktxt}>In Stock</Text>
                                :
                                <>
                                    {(state.data?.stock_quantity > 0) ?
                                        <Text style={styles.outstocktxt}>Only {state.data?.stock_quantity} left(s) in Stock</Text>
                                        :
                                        <Text style={styles.outstocktxt}>Sold Out</Text>
                                    }
                                </>
                            }
                        </View>
                        {(state.data?.regular_price && state.data?.sale_price && state.data?.regular_price != state.data?.sale_price) ?
                            <View style={styles.pricecontainer}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>{offerPercentage(state.data?.regular_price, state.data?.sale_price)}% off</Text>
                                <Text style={styles.regularpp}>₹{parseInt(state.data?.regular_price)}</Text>
                                <Text style={styles.salepp}>₹{parseInt(state.data?.sale_price)}</Text>
                            </View>
                            :
                            <View>
                                <Text style={styles.salepp}>₹{parseInt(state.data?.price)}</Text>
                            </View>
                        }
                        {(state.data?.categories && state.data?.categories.length > 0) && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: '1%' }}>
                                <Text style={styles.boldtext}>Category : </Text>
                                {state.data?.categories.map((item, key) => (
                                    <Text key={key}>{item.name}, </Text>
                                ))}
                            </View>
                        )}
                        {state.data?.description && (
                            <View style={{ marginVertical: '1%' }}>
                                <Text style={styles.boldtext}>Description :</Text>
                                <RenderHTML
                                    contentWidth={100}
                                    source={{ html: state.data?.description }}
                                />
                            </View>
                        )}
                        {(state.relatedProduct && state.relatedProduct.length > 0) && (
                            <View>
                                <Text style={styles.boldtext}>Related Product(s) :</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={styles.relatedContent}>
                                        {state.relatedProduct.map((item, key) => (
                                            <ListHorizontal item={item} key={key} />
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
            {(!state.loading && state.data) && (
                <TouchableOpacity onPress={onAddCart} activeOpacity={0.5} style={styles.cartcontainer}>
                    <Text style={styles.carttxt}>Add To Cart</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    )
}

export default ProductDetails