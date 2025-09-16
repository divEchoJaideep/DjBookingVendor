import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import MyButton from '../../../components/MyButton'
import { useNavigation } from '@react-navigation/native';

const OnBoarding = () => {

  const data = [
    {
      image: require('../../Images/img1.png'),
      text: 'Client Management \n Invoice Tracking',
      text2: 'Clint database to store and manage client \n information. Link clients to their respective \n invoice. Option to add new clients and \n manage existing ones.'
    },
    {
      image: require('../../Images/img2.png'),
      text: 'Invoice Creation & \n Editing',
      text2: 'Intuitive interface for creating and editing \n invoice. With automatic invoice numbering \n and ability to add line items with descriptions \n quantities, rates and taxes. Support For \n multiple currencies.'
    },
    {
      image: require('../../Images/img3.png'),
      text: 'Powerful Reporting & \n Analytics',
      text2: 'Generate reports on invoicing trends, revenue, \n and outstanding payments. Analytics \n dashboard for financial insights. Export reports \n in various formats (PDF, CSV).',
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  const goToSignIn = () => {
    navigation.navigate('signIn');
  };

  const goToSignUp = () => {
    navigation.navigate('orderDashboard');
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#743bff" barStyle={'light-content'} /> */}

      <View style={{ flex: 1 }}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={data}
        
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item} key={index.toString()}>
              <Image source={item.image} style={styles.flatlistImagescreen} />
              <Text style={styles.flatlistTitletext}>{item.text}</Text>
              <Text style={styles.flatlistText}>{item.text2}</Text>
            </View>
          )}
          onViewableItemsChanged={({ changed, viewableItems }) => {
            setCurrentPage(viewableItems[0].index);
          }}
          viewabilityConfig={{
            waitForInteraction: true,
            itemVisiblePercentThreshold: 10
          }}
          contentContainerStyle={{ gap: 10 }}
        />
        <View style={styles.dotsWrap}>
          {data.map((item, index) => (

            <Text key={index.toString()} style={index === currentPage ? styles.isActiveDots : styles.dots} />
          ))}
        </View>
        <View style={styles.button}>
          <MyButton title="Register" style={styles.registerButtonStyle} styletext={styles.registerButtonStyleText} onPress={goToSignUp} />
          <MyButton title="Sign In" style={styles.signInButtonStyle} styletext={styles.signInButtonStyleText} onPress={goToSignIn} />
        </View>
      </View>
     
    </View>
  );
}

export default OnBoarding;