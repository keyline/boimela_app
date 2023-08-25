import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    bodyContent: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: '4%'
    },
    nametxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
        marginVertical: '2%'
    },
    pricecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        justifyContent: 'space-between'
    },
    regularpp: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.bold_text,
        textDecorationLine: 'line-through',
        opacity: 0.7
    },
    salepp: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.bold_text,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    boldtxt: {
        fontWeight: 'bold',
        color: Colors.black,
        textAlign: 'center',
        fontSize: 12
    },
    lighttxt: {
        color: Colors.light_blue,
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 12
        // borderWidth:1,
        // padding:2
    },
    instocktxt: {
        color: Colors.light_blue,
        // fontSize:12
    },
    outstocktxt: {
        color: 'red',
        // fontSize:12
    },
    boldtext: {
        // fontSize:12,
        color: Colors.black,
        fontWeight: 'bold'
    },
    shareContent: {
        backgroundColor: Colors.light_gery,
        position: 'absolute',
        top: 5,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
        // borderWidth:1,
        // borderColor:Colors.light_gery,
        // elevation:5
    },
    sharelogo: {
        width: 20,
        height: 20
    },
    relatedContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '2%'
    },
    cartcontainer: {
        backgroundColor: Colors.light_blue,
        paddingVertical: '4%'
    },
    carttxt: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign:'center'
    }
})