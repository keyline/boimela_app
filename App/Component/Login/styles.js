import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../Utils/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey
    },
    content: {
        // flex:1,
        // alignItems: 'center',
        marginTop: '10%'

    },
    logo: {
        width: '70%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: Colors.bold_text,
        marginBottom: '5%',
        // textDecorationLine:'underline',
        textAlign: 'center'
    },
    bodyContent: {
        flex: 1,
        borderColor: Colors.border_grey,
        backgroundColor: Colors.white,
        width: '95%',
        marginVertical: '10%',
        // marginBottom: '15%',
        alignSelf: 'center',
        paddingVertical: '6%',
        paddingHorizontal: '6%',
        borderRadius: 5,
        // elevation:1,
        borderColor: Colors.lightGrey,
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
    btmtxt: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    signtxt: {
        color: Colors.light_blue,
        // textDecorationLine:'underline'
    }
})