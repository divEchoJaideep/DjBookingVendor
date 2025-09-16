import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Modal,
  TextInput,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import { getOrder, updateOrderStatus } from '../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Accept from '../../../Images/accept.png';
import Decline from '../../../Images/cancel.png';
import DatePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import MyButton from '../../../../components/MyButton';
import { Colors } from '../../../../components/colors/colors';

const screenWidth = Dimensions.get('window').width;

const orderDashboard = ({ status }) => {
  const { isEnabled } = useTheme();
  const navigation = useNavigation();
  const defaultStyles = useDefaultStyles();

  const filterTitles = {
    pending: 'Orders Pending',
    rejected: 'Orders Reject',
    accepted: 'Orders Accept',
    cancelled: 'Orders Cancelled',
    completed: 'Orders Completed',
    All: 'All Orders',
  };

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderToReject, setOrderToReject] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [appliedDates, setAppliedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
  const textStyle = isEnabled ? styles.darkText : styles.lightText;
  const grayContainer = isEnabled ? styles.darkGrayContainer : styles.lightContainer;

  useFocusEffect(
    useCallback(() => {
      if(appliedDates.startDate && appliedDates.endDate){
        fetchOrders(1, appliedDates);
      }
    }, [status, appliedDates])
  );

useFocusEffect(
    useCallback(() => {  
        fetchOrders();   
    }, [status])
  );
  

  const fetchOrders = async (newPage = 1, dateRange = null) => {
    if (newPage > totalPages) return;
    if (newPage === 1) {
      setLoading(true);
      setPage(1);
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const start_date = dateRange?.startDate || null;
      const end_date = dateRange?.endDate || null;

      const data = {
        status: status,
        start_date: start_date,
        end_date: end_date,
      };

      const response = await getOrder(newPage, data, header);
      console.log('response :',response);
      
      if (response?.status) {
        if (newPage === 1) {
          setOrders(response?.data?.orders || []);
        } else {
          setOrders(prev => [...prev, ...(response?.data?.orders || [])]);
        }
        setTotalOrders(response?.data?.total || 0);
        setTotalPages(response?.data?.totalPages || 1);
        setPage(newPage);
      } else {
        if (newPage === 1) setOrders([]);
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatusHandler = async (productID, newStatus, reason = '') => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const payload = { status: newStatus };
      if (reason) payload.reason = reason;

      const response = await updateOrderStatus(productID, payload, header);
      if (response?.status) {
        fetchOrders(1, appliedDates);
      } else {
        Alert.alert('Failed', response?.message || 'Try again.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

 const handleAccept = (order) => {
  const orderTitle = order?.listing_item?.title || 'this order';

  Alert.alert(
    'Confirm Accept',
    `Are you sure you want to accept "${orderTitle}"?`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await updateOrderStatusHandler(order.id, 'accepted');
        },
      },
    ]
  );
};


  const handleReject = (order) => {
    setOrderToReject(order);
    setCancelReason('');
    setModalVisible(true);
  };

  const cancelReject = () => {
    setModalVisible(false);
    setOrderToReject(null);
    setCancelReason('');
  };

  const confirmReject = async () => {
    if (!cancelReason.trim()) return;
    await updateOrderStatusHandler(orderToReject.id, 'rejected', cancelReason.trim());
    setModalVisible(false);
    setOrderToReject(null);
    setCancelReason('');
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const getFormattedDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    if (isNaN(date)) return 'Invalid Date';
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setSelectedDates({ startDate: null, endDate: null });
    setAppliedDates({ startDate: null, endDate: null });
    await fetchOrders(1, { startDate: null, endDate: null });
    setShowCalendar(false);
    // ToastAndroid.show('Orders refreshed', ToastAndroid.SHORT);
    setRefreshing(false);
  };

  const handleApplyDateFilter = () => {
    if (selectedDates.startDate && selectedDates.endDate) {
      const formattedStart = dayjs(selectedDates.startDate).format('YYYY-MM-DD');
      const formattedEnd = dayjs(selectedDates.endDate).format('YYYY-MM-DD');
      setAppliedDates({
        startDate: formattedStart,
        endDate: formattedEnd,
      });
      setShowCalendar(false);
    } else {
      Alert.alert('Select Dates', 'Please select both start and end dates.');
    }
  };

  const renderItem = ({ item }) => {
    const productType = item.order_metas?.find(meta => meta.meta_key === 'Category')?.meta_value || 'N/A';
    const statusLabel = capitalize(item?.status || '');
    const rawDate = item.order_metas?.find(meta => meta.meta_key === 'Event_Date')?.meta_value || item.order_metas?.find(meta => meta.meta_key === 'Function_Date')?.meta_value || '';
    const eventDate = getFormattedDate(rawDate);
    const bannerUrl = item.order_metas?.find(meta => meta.meta_key === 'banner')?.meta_value || item?.listing_item?.banner;
    const orderTitle = item.order_metas?.find(meta => meta.meta_key === 'title')?.meta_value;

    return (
      <TouchableOpacity
        onPress={() => {
          setShowCalendar(false);
          navigation.navigate('orderProductsDetails', { product: item, productType });
        }}
        style={[styles.mainProductsWrap, grayContainer]}
      >
        <View style={styles.productsWrap}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.productImageWrap}>
              <Image source={{ uri: bannerUrl }} style={styles.productImage} />
            </View>
            <View style={{ width: screenWidth / 2 }}>
              <Text style={styles.productsNumber}>#P{item?.id}</Text>
              <Text style={[styles.productName, textStyle]} numberOfLines={1}>
                {item?.listing_item?.title || orderTitle}
              </Text>
            </View>
          </View>

          {status === 'pending' && (
            <View style={styles.AcceptDeclineButtonWrap}>
              <TouchableOpacity onPress={() => handleAccept(item)}>
                <Image source={Accept} style={styles.AcceptDeclineButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReject(item)}>
                <Image source={Decline} style={styles.AcceptDeclineButton} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
          <View style={{ width: '84%', flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.productsNumber}> Event Date :</Text>
            <Text style={styles.productsNumber}>{eventDate}</Text>
          </View>
        </View>
        <View style={styles.dottedLine} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.productTypeWra}>
            <Text style={styles.typeName}>{productType}</Text>
          </View>
          <Text style={[styles.totalAmount, textStyle]}>₹{item?.total_amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && page === 1) {
    return (
      <View style={styles.centeredWrap}>
        <ActivityIndicator size="small" color="#007bff" />
      </View>
    );
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.mainTitleText, textStyle]}>{filterTitles[status] || 'Orders'}</Text>
          <View style={styles.productsQuantityWrap}>
            <Text style={styles.productsQuantity}>{totalOrders}</Text>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.addNewProducts} onPress={() => {
            setAppliedDates({ startDate: null, endDate: null })
            setSelectedDates({ startDate: null, endDate: null });
            setShowCalendar(!showCalendar);
          }}>
            <Image source={require('../../../Images/setting.png')} style={styles.addPlusImg} tintColor={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>

      {!showCalendar && appliedDates?.startDate && appliedDates?.endDate && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={textStyle}>From: {dayjs(appliedDates.startDate).format('DD-MM-YYYY')}</Text>
          <Text style={textStyle}>To: {dayjs(appliedDates.endDate).format('DD-MM-YYYY')}</Text>
        </View>
      )}

      {showCalendar && (
        <View style={{ padding: 10, margin: 10, borderWidth: 1, borderRadius: 10, borderColor: Colors.productDashboardBorderColor }}>
          <DatePicker
            mode="range"
            startDate={selectedDates.startDate}
            endDate={selectedDates.endDate}
            onChange={({ startDate, endDate }) => {
              setSelectedDates({ startDate, endDate });
            }}
            styles={{
              ...defaultStyles,
              range_middle: { backgroundColor: '#007bff' },
              range_fill: { backgroundColor: isEnabled ? '#121212' : '#fff' },
              range_middle_label: { color: '#fff' },
              selectedRange: { backgroundColor: '#007bff' },
              today: { backgroundColor: '#aaa' },
              today_label: { color: '#fff' },
              selected: { backgroundColor: '#007bff' },
              selected_label: { color: 'white' },
              button_next_image: { tintColor: isEnabled ? '#fff' : '#000' },
              button_prev_image: { tintColor: isEnabled ? '#fff' : '#000' },
              month_selector_label: { color: isEnabled ? '#fff' : '#000' },
              year_selector_label: { color: isEnabled ? '#fff' : '#000' },
              day_label: { color: isEnabled ? '#fff' : '#000' }
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <MyButton title={'Apply'} style={styles.applyDate} styletext={styles.acceptText} onPress={handleApplyDateFilter} />
            <MyButton title={'Cancel'} style={styles.cancelDate} styletext={[styles.cancelDateText, { color: isEnabled ? '#fff' : '#121212' }]} onPress={() => {
              setSelectedDates({ startDate: null, endDate: null });
              setShowCalendar(false)
            }} />
          </View>
        </View>
      )}

      <FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + index}
        onEndReached={() => fetchOrders(page + 1, appliedDates)}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007bff']}
            tintColor="#007bff"
          />
        }
        initialNumToRender={10}
        ListFooterComponent={loading && page > 1 ? <ActivityIndicator size="small" color="#007bff" /> : null}
        ListEmptyComponent={!loading && (
          <View style={styles.centeredWrap}>
            <Text style={[styles.emptyText, textStyle]}>No Orders Available...</Text>
          </View>
        )}
      />

      <Modal transparent={true} visible={modalVisible} animationType="fade" onRequestClose={cancelReject}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, containerStyle]}>
            <Text style={[styles.modalTitle, textStyle]}>
              Are you sure you want to reject this order:{"\n"}
              <Text style={{ fontWeight: 'bold', color: isEnabled ? '#fff' : '#000' }}>
                {orderToReject?.listing_item?.title || 'Unknown Order'}
              </Text>
            </Text>
            <TextInput
              style={[styles.modalInput, isEnabled ? styles.darkInput : styles.lightInput]}
              placeholder="Write your reason here..."
              placeholderTextColor={isEnabled ? '#aaa' : '#666'}
              value={cancelReason}
              onChangeText={setCancelReason}
              multiline
              maxLength={300}
              color={isEnabled ? '#fff' : '#000'}
            />
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={[styles.modalButton, styles.modalCancelButton]} onPress={cancelReject}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton, { opacity: cancelReason.trim() ? 1 : 0.5 }]}
                onPress={confirmReject}
                disabled={!cancelReason.trim()}
              >
                <Text style={styles.modalConfirmText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default orderDashboard;
