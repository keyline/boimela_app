import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { CommonStyles } from '../../Utils/CommonStyles'


export const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        // width: '45%',
        // marginBottom: '2%',
        // marginHorizontal: '1%',
        margin: '1%',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingVertical: '3%',
        paddingHorizontal: '2%',
        // overflow: 'hidden',
        ...CommonStyles.box_Container
    },
    booklogo: {
        width: 150,
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
        marginVertical: '0.5%',
        fontSize: 12
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
        opacity: 0.7
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