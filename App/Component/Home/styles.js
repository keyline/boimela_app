import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey
    },
    flatlistcontent: {
        justifyContent: 'space-between',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
    listContainer: {
        flex: 1,
        // width: '45%',
        borderColor: 'lightgray',
        borderWidth: 1,
        // marginBottom: '2%',
        // marginHorizontal: '1%',
        margin: '1%',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingVertical: '3%',
        paddingHorizontal: '2%',
        // overflow: 'hidden',
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
    booklogo: {
        width: '100%',
        height: 180,
        borderRadius: 5,
        // resizeMode: 'contain'
    },
    boldText: {
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center',
        marginVertical: '1%',
        color: 'black'
    },
    lightText: {
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center',
        marginVertical: '1%',
        // color: Colors.lightGrey
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: '2%'
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
    loader: {
        marginVertical: 20,
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
    }
})