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
        marginVertical: '3%',
        alignSelf: 'center',
        borderRadius: 5,
        paddingVertical: '4%',
        paddingHorizontal: '2%',
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
    nametxt: {
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: '1%',
        marginTop: '4%'
    },
    bold: {
        fontWeight: 'bold',
        color: Colors.black,
        backgroundColor: Colors.light_yellow,
        // paddingHorizontal:1
    },
    listheading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2%'
    },
    border: {
        borderWidth: 0.5,
        borderColor: Colors.black,
        marginVertical: '1%'
    },
    detailsContent: {
        backgroundColor: Colors.light_yellow,
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        marginVertical: '2%'
    }
})