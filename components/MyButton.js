import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

const MyButton = ({ containerStyle, title, style, onPress, styletext, ImaageButton, imageStyle, tintColor }) => {
  const hasImage = !!ImaageButton;

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[
          styles.button,
          hasImage && styles.rowLayout,
          style
        ]}
        onPress={onPress}
      >
        {hasImage && (
          <Image
            source={ImaageButton}
            style={[styles.buttonImg, imageStyle]}
            tintColor={tintColor}
          />
        )}
        <Text style={[styles.buttonText, styletext]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 0,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  rowLayout: {
    flexDirection: 'row',
    gap: 5,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonImg: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
});
