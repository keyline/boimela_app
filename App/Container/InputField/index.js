import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import { ImagePath } from '../../Utils/ImagePath'

const InputField = ({ name, value, keyboardType,multiline, onChangeText, placeholder, passwordInput, onChangVisible, passVisible, error }) => {
    return (
        <View style={styles.container}>
            {name && (
                <Text style={styles.text}>{name} :</Text>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    onChangeText={e => onChangeText(e)}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    style={styles.input}
                    secureTextEntry={passVisible ? passVisible : false}
                    multiline={multiline ? multiline : false}
                    keyboardType={keyboardType?keyboardType :'default'}
                    // number-pad
                    // phone-pad
                />
                {passwordInput && (
                    <TouchableOpacity onPress={() => onChangVisible()}>
                        {passVisible ?
                            <Image source={ImagePath.eye_on} style={styles.eye} />
                            :
                            <Image source={ImagePath.eye_off} style={styles.eye} />
                        }
                    </TouchableOpacity>
                )}
            </View>
            {error && (
                <Text style={styles.error}>{error}</Text>
            )}
        </View>
    )
}

export default InputField

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginVertical: '2%',
        // alignSelf: 'center'
    },
    text: {
        color: Colors.black,
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
        borderColor: Colors.light_blue,
        borderBottomWidth: 1,


    },
    input: {
        color: Colors.black,
        width: '85%',
    },
    eye: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: Colors.light_blue
    },
    error: {
        color: 'red',
        paddingLeft: '3%',
        marginTop: '1%'
    }
})