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
        alignSelf: 'center',
        marginVertical: '3%',
        // height:'75%',
        borderRadius: 5,
        paddingVertical: '8%',
        // borderWidth: 1,
        // borderColor: Colors.lightGrey,
        // elevation: 4
        ...CommonStyles.box_Container
    },
    headingtext: {
        fontSize: 18,
        color: Colors.light_blue,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content:{
        paddingHorizontal:'5%',
        paddingVertical:'2%'
    }
})