// invoiceTextInput.js
import { StyleSheet, TextInput, View } from 'react-native';
import React, { forwardRef } from 'react';

const invoiceTextInput = forwardRef(
  (
    {
      onFocus,
      placeholder,
      readOnly,
      style,
      maxLength,
      multiline,
      autoFocus,
      keyboardType,
      placeholderTextColor,
      color,
      value,
      textAlignVertical,
      onChangeText,
    },
    ref
  ) => {
    return (
      <View>
        <TextInput
          ref={ref}
          onFocus={onFocus}
          placeholder={placeholder}
          style={[styles.textInput, style]}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          color={color}
          value={value}
          onChangeText={onChangeText}
          editable={!readOnly}
          maxLength={maxLength}
          textAlignVertical={textAlignVertical}
        />
      </View>
    );
  }
);

export default invoiceTextInput;

const styles = StyleSheet.create({
   textInput: {
    color: "black",
    borderWidth: 0,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: "#f8f9fb",
  },
});
