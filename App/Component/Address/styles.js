import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey
    },
    content: {
        width: '95%',
        // height: '40%',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        marginVertical: '5%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        paddingHorizontal: '4%',
        paddingVertical: '4%',
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
    boldtext: {
        color: Colors.bold_text,
        fontWeight: 'bold',
        marginTop:'4%'
        // textAlign: 'center'
    },
    normaltext: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
})