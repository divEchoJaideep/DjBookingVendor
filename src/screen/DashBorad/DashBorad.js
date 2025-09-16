import { View, Text, FlatList, Image, Dimensions, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles'
import { BarChart } from 'react-native-gifted-charts';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../ThemeContext/ThemeContext';
import MyButton from '../../../components/MyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNext7DayOrder, setting } from '../../api/api';

import Container from '../../../components/Container';
import Content from '../../../components/Content';


const DashBorad = () => {
  const windowWidth = Dimensions.get('window').width;
  const { isEnabled } = useTheme();
  const [data1, setData1] = useState([]);
  const [allOrderAmount, setAllOrderAmount] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [nextDayOrder, setNextDayOrder] = useState([]);

  const grayContainer = isEnabled && styles.darkGrayContaine;
  const containerStyle = isEnabled ? styles.darkContainer : styles.backgroundContainer;
  const textStyle = isEnabled ? styles.darkText : styles.lightText;

  const xAxisLabelTextColor = {
    color: isEnabled ? '#fff' : '#121212',
    fontSize: 10,
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSettingsApi();
      await fetchSettings();
      await fetchNext7DayOrder();
    };

    fetchData();
  }, [navigation])

  const fetchSettingsApi = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const response = await setting(header);
      console.log('response :',response);
      
      if (response) {
        await AsyncStorage.setItem('Settings', JSON.stringify(response));
      }
    } catch (error) {
      Alert.alert('Error fetching settings:');
    }
  };

  const fetchNext7DayOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const response = await getNext7DayOrder(header);
      if (response) {
        const formattedData = response.dates.map((date, index) => ({
          value: response.pending[index] || 0,
          label: date.slice(5),
          frontColor: 'red',
        }));

        setNextDayOrder(formattedData);
      }
    } catch (error) {
      Alert.alert('Error fetching settings:');
    }
  };


  const fetchSettings = async () => {
    try {
      const AllSettings = await AsyncStorage.getItem('Settings')
      const parsedSettings = JSON.parse(AllSettings);
      const today_order = parsedSettings.data.today_order;
      const today_order_amount = parsedSettings.data.today_order_amount;
      const all_order = parsedSettings.data.all_order;
      const all_order_amount = parsedSettings.data.all_order_amount;
      const completedOrder = parsedSettings.data.completed_orders;
      const pendingOrder = parsedSettings.data.pending_orders;
      const orderDate = parsedSettings.data.last_7_days;

      const combined = [...completedOrder, ...pendingOrder];
      const totalOrder = combined.reduce((sum, num) => sum + num,);
      const dashboardData = [
        {
          image: require('../../Images/page.png'),
          text: 'Total Order',
          text2: 'Today',
          text3: today_order,
          text4: '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
          image2: require('../../Images/up-arrow.png'),
          text5: '+ 12.53 %',
        },
        {
          image: require('../../Images/page.png'),
          text: 'Total Amount',
          text2: 'Today',
          text3: today_order_amount.toFixed(2),
          text4: '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
          image2: require('../../Images/download.png'),
          text5: '+ 12.53 %',
        },
        {
          image: require('../../Images/blank-page.png'),
          text: 'Total Order',
          text2: 'This Month',
          text3: all_order,
          text4: '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
          image2: require('../../Images/up-arrow.png'),
          text5: '+ 12.53 %',
        },
        {
          image: require('../../Images/adduser.png'),
          text: 'Total Amount',
          text2: 'This Month',
          text3: all_order_amount ? all_order_amount.toFixed(2) : '0.00',
          text4: '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
          image2: require('../../Images/up-arrow.png'),
          text5: '+ 12.53 %',
        },
      ];

      const getDayLabel = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });

      const mergedBarData = orderDate.flatMap((dateStr, index) => [
        {
          value: completedOrder[index] || 0,
          label: getDayLabel(dateStr),
          frontColor: '#814eff',
        },
        {
          value: pendingOrder[index] || 0,
          frontColor: 'red',
        },
      ]);

      setChartData(mergedBarData);
      setTotalOrder(totalOrder)
      setData1(dashboardData);
      setAllOrderAmount(all_order_amount)

    } catch (error) {
      Alert.alert('Alert', 'Settings are not found');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSettingsApi();
    await fetchSettings();
    await fetchNext7DayOrder();
    setRefreshing(false);
  };
  const barwidth = windowWidth < 370 ? (5.3) : (9.3);
  const navigation = useNavigation();


  return (
    <Container lightContent statusBarColor="#743bff" conatinerStyle={{
      backgroundColor: "#743bff",
    
    }} >
      <Content
        hasHeader
        scrollEnabled
        
        contentContainerStyle={containerStyle}
        extraScrollHeight={1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#743bff']}
            tintColor="#743bff"
          />
        }>
        {/* <ScrollView
        style={{ flex: 1 }} showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#743bff']}
            tintColor="#743bff"
          />
        }
      > */}
        <View style={[styles.container, grayContainer]}>
          <View style={styles.topContainer}>
            <Text style={styles.totalIncomeText}></Text>
            <Text style={styles.totalIncome}>
              ₹{allOrderAmount ? allOrderAmount.toFixed(2) : '0.00'}
            </Text>

            <View>
              <FlatList
                style={styles.FlatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                data={data1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={[styles.flatlistItem, grayContainer]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={[styles.flatlistTitletext, textStyle]}>{item.text}</Text>
                      <Image source={item.image} style={styles.flatlistImagescreen} tintColor={isEnabled ? '#fff' : '#121212'} />
                    </View>
                    <Text style={[styles.flatlistText, textStyle]}>{item.text2}</Text>
                    <Text style={[styles.dotLine, textStyle]}>{item.text4}</Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={[styles.flatlistAmount, textStyle]}>
                        {item.text.includes('Total Order') ? item.text3 : `₹${item.text3}`}
                      </Text>
                      {/* <View style={styles.flatlistUpDown}> */}
                      {/* <Image source={item.image2} style={styles.flatlistImagearrow} /> */}
                      {/* <Text style={styles.flatlistText2}>{item.text5}</Text> */}
                      {/* </View> */}
                    </View>
                  </View>
                )}
                contentContainerStyle={{ gap: 10 }}
              />
            </View>
          </View>

          <View style={[styles.bottomContainer, grayContainer]}>
            <Text style={[styles.bottomContainerTitleMain, textStyle]}>Add a Quick</Text>

            <MyButton
              title={'Listing'}
              style={styles.listProducts}
              styletext={styles.listProductsText}
              onPress={() => navigation.navigate('product')}
              ImaageButton={require('../../Images/add.png')}
              imageStyle={styles.listProductsImg} tintColor={'#fff'}
            />

            <View style={[styles.graph, containerStyle]}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <Text style={[styles.bottomContainerTitle, textStyle]}>Order Statics</Text>
                <View style={styles.weeklyButton} >
                  <View style={{ flexDirection: 'row', }}>
                    <View style={styles.completedOrder} />
                    <Text style={[styles.weeklyButtonText, textStyle]}>Completed Orders</Text>
                  </View>
                  <View style={{ flexDirection: 'row', }}>
                    <View style={styles.pendingOrder} />
                    <Text style={[styles.weeklyButtonText, textStyle]}>Pending Orders</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.bottomContainerText}>Total Order Received</Text>
              {/* <Text style={[styles.bottomContainerAmount, textStyle]}>Total Order : {totalOrder}</Text> */}
              <View style={styles.barChartWrap}>
                <BarChart
                  data={chartData}
                  barWidth={barwidth}
                  spacing={13}
                  roundedTop
                  roundedBottom
                  labelWidth={24}
                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: 'gray' }}
                  noOfSections={3}
                  maxValue={12}
                  initialSpacing={10}
                  height={100}
                  isAnimated={true}
                  rulesLength={windowWidth - 88}
                  animationDuration={1000}
                  xAxisLabelTextStyle={xAxisLabelTextColor}
                />
              </View>

            </View>
            <View style={[styles.graph, containerStyle]}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <Text style={[styles.bottomContainerTitle, textStyle]}>Next 7 Days Orders</Text>
                {/* <View style={styles.weeklyButton} >
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.completedOrder} />
                  <Text style={[styles.weeklyButtonText, textStyle]}>Completed Orders</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.pendingOrder} />
                  <Text style={[styles.weeklyButtonText, textStyle]}>Pending Orders</Text>
                </View>
              </View> */}
              </View>

              {/* <Text style={styles.bottomContainerText}>Total Order Recived</Text>
            <Text style={[styles.bottomContainerAmount, textStyle]}>Total Order : {totalOrder}</Text> */}
              <View style={[styles.barChartWrap,]}>
                <BarChart
                  data={nextDayOrder}
                  barWidth={barwidth}
                  spacing={36}
                  rulesLength={windowWidth - 88}
                  roundedTop
                  roundedBottom
                  scrollEnabled={true}
                  labelWidth={barwidth}
                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: 'gray' }}
                  noOfSections={3}
                  maxValue={12}
                  initialSpacing={10}
                  height={100}
                  isAnimated={true}
                  animationDuration={1000}
                  xAxisLabelTextStyle={xAxisLabelTextColor}
                />


              </View>

            </View>
          </View>
        </View>
      </Content>
      {/* </ScrollView> */}
    </Container>
  )
}

export default DashBorad
