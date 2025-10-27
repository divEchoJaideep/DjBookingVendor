import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, ToastAndroid, Image } from 'react-native';
import { useTheme } from '../../src/ThemeContext/ThemeContext';
import Container from '../Container';

const { width, height } = Dimensions.get('window');

const NetworkError = ({ cardCount = 1 }) => {
  const { isEnabled } = useTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    const interval = setInterval(() => {
      ToastAndroid.showWithGravity(
        'No Internet Connection! Please check your network.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }, 10000);

    return () => clearInterval(interval); 
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Container style={styles.wrapper} lightContent={isEnabled}>
      <View style={styles.imageWrap}>
        <Image source={require('../../src/Images/wifislash.png')} style={styles.image} />
      </View>

      {[...Array(cardCount)].map((_, index) => (
        <Animated.View key={index} style={[styles.card, { opacity }]}>
          <Animated.View style={[styles.time, { opacity }]} />
          <View style={styles.categoryContainer}>
            <Animated.View style={[styles.category, { opacity }]} />
            <Animated.View style={[styles.halfcategory, { opacity }]} />
          </View>
          <View style={styles.boostedContainer}>
            <Animated.View style={[styles.categoryWrap, { opacity }]} />
            <Animated.View style={[styles.description, { opacity }]} />
            <Animated.View style={[styles.data, { opacity }]} />
            <Animated.View style={[styles.data, { opacity }]} />
          </View>
        </Animated.View>
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    paddingTop: 50,
  },
  imageWrap: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  card: {
    width: width,
    backgroundColor: '#fff',
    marginBottom: 20,
    elevation: 10,
    height: height,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  time: {
    width: '30%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: -30,
    marginBottom: 20,
  },
  category: {
    width: '70%',
    height: 130,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  halfcategory: {
    width: '20%',
    height: 130,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  boostedContainer: {
    backgroundColor: '#fff',
    marginHorizontal: -30,
    paddingHorizontal: 20,
    paddingTop: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
  },
  categoryWrap: {
    width: '40%',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
  },
  description: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
  },
  data: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
  },
});

export default NetworkError;
