import { Platform, StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const CommonStyles = StyleSheet.create({
    box_Container: {
        borderColor: 'lightgray',
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
    }
})

export const tagsStyles = {
    b: { color: Colors.black },
    h1: { color: Colors.black },
    h2: { color: Colors.black },
    h3: { color: Colors.black },
    h5: { color: Colors.black },
    h4: { color: Colors.black },
    h6: { color: Colors.black },
    p: { color: Colors.grey },
    li: { color: Colors.grey },
    span:{color: Colors.grey}
}