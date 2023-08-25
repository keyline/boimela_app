import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey
    },
    listContainer: {
        backgroundColor: Colors.white,
        borderColor: 'lightgray',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: '2%',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
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
    listContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    img: {
        width: '20%',
        height: 100,
        // resizeMode:'contain'
    },
    boldtext: {
        color: Colors.bold_text,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headingtxt: {
        color: Colors.grey,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    valutxt: {
        color: Colors.black,
        textAlign: 'center'
    },
    delicon: {
        width: 20,
        height: 20
    },
    btmContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '8%',
        backgroundColor: Colors.white,
        // justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    totalPricetxt: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
        width: '60%',
        textAlign: 'center'
    },
    btm: {
        backgroundColor: Colors.light_blue,
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btmText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    btmPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        justifyContent: 'space-between',
        paddingHorizontal: '4%'
    },
})