import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { CommonStyles } from "../../Utils/CommonStyles";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_gery
    },
    content: {
        // flex:1,
        // alignItems: 'center',
        marginTop: '4%'

    },
    logo: {
        width: '70%',
        height: 60,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    boldText: {
        fontSize: 18,
        color: Colors.bold_text,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:'4%'
    },
    bodyContent: {
        backgroundColor: Colors.white,
        width: '95%',
        paddingHorizontal: '6%',
        paddingVertical: '6%',
        alignSelf: 'center',
        marginTop: '4%',
        borderRadius: 5,
        ...CommonStyles.box_Container
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