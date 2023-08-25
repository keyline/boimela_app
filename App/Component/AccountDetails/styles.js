import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_gery
    },
    bodyContent: {
        flex: 1,
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        marginVertical: '4%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        paddingVertical: '8%',
        elevation: 4
    },
    headingtext: {
        fontSize: 18,
        color: Colors.light_blue,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        width: '80%',
        alignSelf: 'center',
        marginTop: '8%'
    },
    btnContent:{
        marginTop:'8%',
    }
})