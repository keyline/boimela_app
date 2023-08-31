import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_gery
    },
    loader: {
        marginVertical: 20,
    },
    banner: {
        width: '100%',
        height: 150,
        resizeMode: 'cover'
    },
    categoryContainer: {
        backgroundColor: Colors.white,
        marginBottom: '2%',
        width: '98%',
        alignSelf: 'center',
        borderRadius: 5,
        paddingHorizontal: '2%',
        paddingVertical: '3%',
        borderColor: 'lightgray',
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowRadius: 1,
                shadowOpacity: 0.5,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
            },
            android: {
                elevation: 4
            }
        }),
    },
    categoryContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2%'
    },
    viewContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowLogo: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        tintColor: Colors.grey
    },
    categryText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.light_blue
    },
    viewText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.grey
    },
    listContainer: {
        width: 130,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lightgray',
        paddingVertical: '3%',
        paddingHorizontal: '2%',
        // borderWidth: 1,
        // height: 100,
        // backgroundColor: 'lightgray',
        // // flex: 1,
        // width: 50,
        // // marginBottom: '2%',
        // marginHorizontal: '1%',
        // margin: '1%',
        // borderRadius: 5,
        // alignItems: 'center',
        // backgroundColor: Colors.white,
        // // overflow: 'hidden',
        // ...Platform.select({
        //     ios: {
        //         shadowColor: 'rgba(0,0,0,0.5)',
        //         shadowRadius: 1,
        //         shadowOpacity: 0.5,
        //         shadowOffset: {
        //             width: 0,
        //             height: 1,
        //         },
        //     },
        //     android: {
        //         elevation: 4
        //     }
        // }),
    },
    booklogo: {
        width: 130,
        height: 140,
        borderRadius: 5,
        // resizeMode: 'contain'
    },
    boldText: {
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center',
        marginVertical: '0.5%',
        color: 'black'
    },
    lightText: {
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center',
        marginVertical: '0.5%',
        fontSize: 12
        // color: Colors.lightGrey
    },
    offContainer: {
        position: 'absolute',
        left: 2,
        top: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
        paddingHorizontal: '6%',
        paddingVertical: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    offText: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightGrey,
        marginTop: '8%',
        paddingHorizontal: '8%',
        paddingVertical: '4%',
        borderRadius: 5
    },
    cartlogo: {
        width: 20,
        height: 20
    },
    carttext: {
        marginLeft: '4%',
        fontWeight: 'bold'
    },
    originalpp: {
        color: Colors.bold_text,
        textDecorationLine: 'line-through',
        fontWeight: 'bold',

    },
    salepp: {
        color: Colors.bold_text,
        fontWeight: 'bold',
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: '2%'
    },
})