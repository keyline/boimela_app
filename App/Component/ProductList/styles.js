import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_gery
    },
    flatlistcontent: {
        justifyContent: 'space-between',
    },
    headingtext: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.light_blue,
        marginVertical: '2%',
        fontSize: 18,
        backgroundColor: Colors.white,
        paddingVertical: '1%'
    }
})