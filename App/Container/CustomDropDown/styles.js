import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginVertical: '2%',
        // zIndex:1
    },
    text: {
        color: Colors.black,
        fontWeight: 'bold'
    },
    dropdown: {
        // flex: 1,
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderColor: Colors.light_blue,
    },
    placeholderStyle: {
        color: Colors.grey
    },
    dropDownContainerStyle: {
        // flex: 1,
        position: 'relative',
        top: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        backgroundColor: Colors.light_gery,
        borderColor: Colors.light_blue,
    },
    error: {
        color: 'red',
        paddingLeft: '3%',
        marginTop: '1%'
    }
})