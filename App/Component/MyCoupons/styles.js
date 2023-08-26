import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { CommonStyles } from "../../Utils/CommonStyles";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_gery
    },
    bodyContent: {
        flex: 1,
        backgroundColor: Colors.white,
        width: '95%',
        // height: '85%',
        alignSelf: 'center',
        marginVertical: '3%',
        borderRadius: 5,
        paddingVertical: '4%',
        ...CommonStyles.box_Container
    },
    headingtext: {
        fontSize: 18,
        color: Colors.light_blue,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: '8%'
    },
})