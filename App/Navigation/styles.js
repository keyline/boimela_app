import { StyleSheet } from 'react-native';
import { Colors } from '../Utils/Colors';


export const styles = StyleSheet.create({
    drawerTopContent: {
        marginVertical: '5%',
        alignItems: 'center',
    },
    drawerLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: 'contain',
        // tintColor: Colors.light_blue
    },
    drawerNametext: {
        // fontFamily: Font_Family.NunitoSans_Bold,
        marginVertical: '5%',
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black
    },
    border: {
        borderColor: Colors.light_blue,
        borderWidth: 0.8,
        width: '90%',
        alignSelf: 'center'
    },
    menuText: {
        // fontFamily: Font_Family.NunitoSans_Bold,
        // fontSize:16
        fontWeight: 'bold'
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        borderTopWidth: 1.5,
        borderTopColor: Colors.light_blue,
        alignSelf: 'center',
        paddingHorizontal: '4%',
        paddingVertical: '4%'
    },
    contactlogo: {
        width: 25,
        height: 25
    }
})