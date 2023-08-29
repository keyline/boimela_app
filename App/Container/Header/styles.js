import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: Colors.white,
        borderBottomColor: Colors.light_blue,
        borderBottomWidth: 3,
        paddingHorizontal: '3%',
        paddingVertical: '1%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    logo: {
        width: 120,
        height: 50,
        resizeMode:'contain'
    },
    menu:{
        width:30,
        height:30,
        // resizeMode:'contain',
        tintColor:Colors.light_blue
    },
    flex:{
        flexDirection:'row',
        alignItems:'center'
    }
})