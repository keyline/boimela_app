import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    listContainer: {
        width: 120,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lightgray',
        paddingVertical: '3%',
        paddingHorizontal: '2%',
    },
    booklogo: {
        width: 120,
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
        paddingVertical: '5%',
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
        opacity: 0.7
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