import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    container: {
        // flex:1,
        borderWidth: 1,
        borderColor: Colors.light_blue,
        marginVertical: '2%',
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 30,
        justifyContent: 'space-between',
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
    input: {
        width: '80%',
    },
    logoContainer: {

    },
    logo: {
        width: 25,
        height: 25,
        tintColor: Colors.light_blue
    }
})