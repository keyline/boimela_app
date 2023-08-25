import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'

const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    itemcontainer: {
        // borderColor: '#ccc',
        // borderWidth: 4,
        // borderRadius: 5
        paddingVertical:'2%'
    },
    bannerimg: {
        width: Width,
        height: 200,
        resizeMode: 'contain',
        // borderRadius: '2%',
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // marginBottom: hp('20'),
        position: 'absolute',
        bottom: 50,
        right: 150
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: Colors.light_blue,
    },
})