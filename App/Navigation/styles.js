import { StyleSheet } from 'react-native';
import { Colors } from '../Utils/Colors';


export const styles = StyleSheet.create({
    drawerTopContent: {
        marginVertical: '10%',
        alignItems: 'center',
    },
    drawerLogo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        tintColor:Colors.light_blue
    },
    drawerNametext: {
        // fontFamily: Font_Family.NunitoSans_Bold,
        marginVertical: '5%',
        fontSize: 16,
        fontWeight:'bold',
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
        fontWeight:'bold'
    }
})