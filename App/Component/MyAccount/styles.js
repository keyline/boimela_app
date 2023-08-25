import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey
    },
    bodyContent: {
        flex: 1,
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        marginVertical: '4%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        paddingTop: '4%',
        elevation: 4
    },
    headingtext: {
        fontSize: 18,
        color: Colors.light_blue,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignSelf: 'center'
    },
    content: {
        alignSelf: 'center',
        marginVertical: '4%'
    },
    nametxt: {
        fontWeight: 'bold',
        color: Colors.black,
        textAlign: 'center',
        marginTop: '2%'
    },
    emailtxt: {
        fontSize: 12,
        color: Colors.black,
        textAlign: 'center'
    },
    menuContainer: {
        flex: 1,
        marginHorizontal: '8%',
        marginVertical: '4%'
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
    listcontent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '4%'
    },
    leftcontent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        // tintColor: Colors.light_blue
    },
    boldtxt: {
        fontWeight: 'bold',
        color: Colors.black,
        marginLeft: 15,
        // fontSize:16
    },
    arrowicon: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    }
})