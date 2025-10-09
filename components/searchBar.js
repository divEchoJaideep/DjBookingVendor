import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { fontSize } from './size/size'

const searchBar = ({
    placeholder,
    value,
    onChangeText,
    keyboardType,
    style,
    maxLength,
    secureTextEntry,
    inRef,
    key,
    placeholderTextColor,
    onKeyPress,
    returnKeyType,
    autoFocus,
}) => {
    return (
        <View>
            <TextInput
                ref={inRef}
                autoFocus={autoFocus}
                placeholder={placeholder}
                style={[styles.searchBar, style]}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderTextColor}
                returnKeyType={returnKeyType}
                onKeyPress={onKeyPress}
                
            />
        </View>
    )
}

export default searchBar

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0,
        borderRadius: 10,
        fontSize: 17,
       paddingHorizontal:20,
        //  marginHorizontal:20,
        marginTop: 20,
        backgroundColor: "white",
        height: 60,
        color:"black",
    },
})