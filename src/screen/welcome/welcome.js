import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import styles from "./styles";
import MyButton from "../../../components/MyButton";
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {

  const navigation = useNavigation();

 const goToSignIn = () => {
  navigation.navigate('signIn');
  };

  const goToSignUp = () => {
  navigation.navigate('signUp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../Images/welcome_girl.jpg')} style={styles.Welcome_img} />
      <Text style={styles.title}>Discover your{"\n"}Dream job Here</Text>
      <Text style={styles.text}>Explore all the most exciting job roles{"\n"}based on your interest and study major.</Text>
      <View style={styles.button}>
        <MyButton title="Register" style={styles.registerButtonStyle}  onPress={goToSignUp}/>
        <MyButton title="Sign In" style={styles.signInButtonStyle} onPress={goToSignIn} />
      </View>
    </View>
  );
};

export default Welcome;
