import { Platform, StyleSheet } from "react-native";

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