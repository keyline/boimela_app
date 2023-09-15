import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import Apis from '../../Service/apis';
import { styles } from './styles';
import Header from '../../Container/Header';
import { ImagePath } from '../../Utils/ImagePath';
import Loader from '../../Container/Loader';
import RenderHTML from 'react-native-render-html';
import { Colors } from '../../Utils/Colors';
import { tagsStyles } from '../../Utils/CommonStyles';

const CmsPage = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: true,
        data: null
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation, route])
    )

    const onGetData = useCallback(async () => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true,
            }))
            let params = {
                slug: route.params?.page
            }
            const response = await Apis.cmsPage(params)
            if (__DEV__) {
                console.log('CmsPage', JSON.stringify(response))
            }
            if (response) {
                setState(prevState => ({
                    ...prevState,
                    data: response[0],
                    loading: false
                }))
            } else {
                setState(prevState => ({
                    ...prevState,
                    data: null,
                    loading: false
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
            Toast.show('Something Went Wrong')
        }
    })

    const onLeftPress = useCallback(async () => {
        navigation.openDrawer();
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.menu} leftonPress={onLeftPress} />
            {(state.data && !state.loading) && (
                <View style={styles.bodyContent}>
                    <Text style={styles.headingtext}>{state.data?.title?.rendered}</Text>
                    <View style={styles.content}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <RenderHTML
                                contentWidth={100}
                                source={{ html: state.data?.content?.rendered }}
                                tagsStyles={tagsStyles}
                            />
                        </ScrollView>
                    </View>
                </View>
            )}
            {state.loading && (
                <Loader loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default CmsPage