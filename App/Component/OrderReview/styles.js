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
        marginVertical: '2%',
        borderRadius: 5,
        paddingVertical: '6%',
        ...CommonStyles.box_Container
    },
    headingtext: {
        fontSize: 18,
        color: Colors.light_blue,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        paddingHorizontal: '4%',
        marginTop: '4%'
    },
    boldtxt: {
        fontWeight: 'bold',
        color: Colors.black
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    edittxt: {
        color: Colors.light_blue,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
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
        marginVertical: '2%'
    },
    itemContent: {
        backgroundColor: Colors.light_yellow,
        borderRadius: 5,
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    couponContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.light_blue,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal:'4%'
    }
})