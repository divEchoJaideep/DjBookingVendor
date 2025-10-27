import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Alert,
    Modal,
    TextInput,
    Dimensions,
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import MyButton from '../../../../components/MyButton';
import TopHeader from '../../../../components/header/topHeader';
import { setting, updateOrderStatus } from '../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../../../../components/Container';
import Content from '../../../../components/Content';

const OrderProductsDetails = ({ route }) => {
    const screenWidth = Dimensions.get('window').width;

    const { product, productType, producttotal, image, originolPrice } = route.params;
    const bannerMeta = product?.order_metas?.find(meta => meta.meta_key === 'banner');
    const priceMeta = product?.order_metas.find(meta => meta.meta_key === 'price');
    const commissionMeta = product?.order_metas.find(meta => meta.meta_key === 'commission');
    const UserAddress = product?.order_metas?.find(meta => meta.meta_key === 'user_Address');
    const price = priceMeta ? parseFloat(priceMeta.meta_value) : 0;
    const commissionPercent = commissionMeta ? parseFloat(commissionMeta.meta_value) : 0;
    const commissionAmount = (commissionPercent / 100) * price;
    const vendorEarning = price - commissionAmount;
    const remainingAmount = parseFloat(product?.remaining_amount || 0);
    const receivedAmount = product?.remaining_amount - commissionAmount;
    const eventDateMeta = product?.order_metas?.find(
        meta => meta.meta_key.toLowerCase() === 'event_date'
    );
    const eventDate = eventDateMeta ? new Date(eventDateMeta.meta_value) : null;

    const productID = product.id;
    const [order, setOrders] = useState([]);
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [orderToReject, setOrderToReject] = useState(null);
    const [orderCancelDays, setOrderCancelDays] = useState(0);
    const [isCompleteAllowed, setIsCompleteAllowed] = useState(false);
    const [loadingAction, setLoadingAction] = useState(null);

    const navigation = useNavigation();

    const { isEnabled } = useTheme();

    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;

    const [isCancelAllowed, setIsCancelAllowed] = useState(false);
    useEffect(() => {
        fetchSettingsApi();
    }, []);


    useEffect(() => {
        if (eventDate) {
            setIsCompleteAllowed(isSameOrBeforeToday(eventDate));
        }
    }, [eventDate]);

    const isSameOrBeforeToday = (date) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const event = new Date(date);
        event.setHours(0, 0, 0, 0);

        return event.getTime() <= today.getTime();
    };




    useEffect(() => {
        if (orderCancelDays && eventDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            const timeDiff = eventDate.getTime() - today.getTime();
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setIsCancelAllowed(daysRemaining > parseInt(orderCancelDays));
        }
    }, [orderCancelDays, eventDate]);


    const updateOrderStatusHandler = async (productID, newStatus, reason = '') => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;

            const payload = {
                status: newStatus,
                reason: reason,
            };
            const response = await updateOrderStatus(productID, payload, header);
            if (response?.status) {
                const updatedOrders = order.map((orderItem) =>
                    orderItem.productID === productID ? { ...orderItem, status: newStatus } : orderItem,
                );
                setOrders(updatedOrders);
                Alert.alert('Alert', response?.message);
                navigation.goBack();
            } else {
                Alert.alert('Alert', response?.message || 'Failed to update order status');
            }
        } catch (error) {
            // Alert.alert(`Error updating status to ${newStatus}`, error.message || 'Something went wrong');
        }
    };

    const handleAccept = async (productID) => {
        try {
            setLoadingAction('accept');
            await updateOrderStatusHandler(productID, 'accepted');
        } finally {
            setLoadingAction(null);
        }
    };


    const handleDecline = (order) => {
        setOrderToReject(order);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setCancelModalVisible(true);
    };

    const confirmCancelOrder = async () => {
        if (!cancelReason.trim()) {
            Alert.alert('Please enter a reason for cancellation');
            return;
        }

        try {
            setLoadingAction('cancel');
            await updateOrderStatusHandler(productID, 'cancelled', cancelReason);
            setCancelModalVisible(false);
            setCancelReason('');
        } finally {
            setLoadingAction(null);
        }
    };


    const handleComplete = async () => {
        try {
            setLoadingAction('complete');
            await updateOrderStatusHandler(productID, 'completed');
        } finally {
            setLoadingAction(null);
        }
    };

    const confirmReject = async () => {
        if (!cancelReason.trim()) {
            Alert.alert('Please enter a reason for rejection');
            return;
        }

        try {
            setLoadingAction('reject');
            if (orderToReject) {
                await updateOrderStatusHandler(orderToReject.productID || productID, 'rejected', cancelReason);
                setOrderToReject(null);
                setCancelReason('');
                setModalVisible(false);
            }
        } finally {
            setLoadingAction(null);
        }
    };


    const cancelReject = () => {
        setOrderToReject(null);
        setCancelReason('');
        setModalVisible(false);
    };

    const fetchSettingsApi = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;
            const response = await setting(header);

            if (response) {
                // await AsyncStorage.setItem('Settings', JSON.stringify(response));
                setOrderCancelDays(response.data.order_cancel_days)

            }
        } catch (error) {
            Alert.alert('Error fetching settings:');
        }
    };

    const scrollmarginBottom = product?.status?.toLowerCase() === 'pending' || product?.status?.toLowerCase() === 'accepted' ? 30 : 20;
    const hiddenKeys = ['commission', 'vendor_profile', 'banner', 'user_Address', 'title', 'vendor_Address', 'vendor_Name', 'price', 'contact'];

    return (
        <Container lightContent={isEnabled} paddingBottomContainer={true} conatinerStyle={containerStyle}>

            <View style={[styles.container, containerStyle, { flex: 1 }]}>
                <TopHeader
                    leftImage={true}
                    onLeftPress={() => navigation.goBack()}
                    titleText={true}
                    onTitletextPress={() => navigation.goBack()}
                    stylesText={{ color: isEnabled ? '#fff' : '#121212' }}
                    tintColorLeft={isEnabled ? '#fff' : '#121212'}
                    title={`Order: #P${product.id}`}
                    rightImage={false}
                />
                <Content
                    hasHeader
                    scrollEnabled
                    isBottomSheet
                    contentContainerStyle={containerStyle}
                    extraScrollHeight={1}>
                    <View style={styles.contant}>

                        <View style={{ flexDirection: 'row', gap: 20, }}>
                            <Image
                                source={{ uri: bannerMeta?.meta_value || product.listing_item?.banner }}
                                style={[styles.productImage,]}
                            />                            <View style={{ width: screenWidth / 2 - 20 }}>
                                <Text style={[styles.productName, textStyle]} numberOfLines={1}>{product.listing_item?.title}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                                    <Text style={styles.originalPrice}>{productType}</Text>
                                    {/* <Text style={styles.originalPrice}>1 unit</Text> */}
                                </View>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={[styles.productTotal, textStyle]}>₹</Text>
                                <Text style={[styles.productTotal, textStyle]}>{product.total_amount || '0'}</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.originalPrice, styles.strikethrough]}>₹</Text>
                                <Text style={[styles.originalPrice, styles.strikethrough]}>{price}</Text>
                            </View> */}
                        </View>
                    </View>

                    <View style={styles.billSummary}>
                        <Text style={[styles.billSummaryTitle, textStyle]}>Customer Info</Text>

                        <View style={styles.billSummaryWrap}>
                            <View style={styles.billTextWrap}>
                                <Text style={[styles.lable, textStyle]}>Name</Text>
                                <Text style={[styles.billText, textStyle]}>{product.user?.name}</Text>
                            </View>

                            <View style={styles.billTextWrap}>
                                <Text style={[styles.lable, textStyle]}>Mobile No.</Text>
                                <Text style={[styles.billText, textStyle]}>{product.user?.phone}</Text>
                            </View>

                            <View style={styles.billTextWrap}>
                                <Text style={[styles.lable, textStyle]}>Address</Text>
                                <Text style={[styles.billText, textStyle,]} >
                                    {product.user?.address}
                                </Text>
                            </View>
                            <View style={styles.billTextWrap}>
                                <Text style={[styles.lable, textStyle]}>Locality</Text>
                                <Text style={[styles.billText, textStyle]}>{UserAddress?.meta_value || ''} </Text>
                            </View>
                        </View>

                        <Text style={[styles.billSummaryTitle, textStyle]}>Order Info</Text>

                        <View style={styles.billSummaryWrap}>
                            {/* <TouchableOpacity>
                                <Text style={[styles.billText, textStyle, { color: 'blue' }]}>{product.listing_item?.title}</Text>
                            </TouchableOpacity> */}

                            <FlatList
                                data={product.order_metas.filter(item => !hiddenKeys.includes(item.meta_key))}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    const formattedKey = item.meta_key
                                        .split('_')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ');

                                    let displayValue = item.meta_value;

                                    if (item.meta_key.toLowerCase() === 'event_date' && !isNaN(Date.parse(item.meta_value))) {
                                        const dateObj = new Date(item.meta_value);
                                        displayValue = dateObj.toLocaleDateString('en-GB');
                                    } else {
                                        if (typeof displayValue === 'string' && displayValue.length > 0) {
                                            displayValue = displayValue.charAt(0).toUpperCase() + displayValue.slice(1);
                                        }
                                    }

                                    return (
                                        <View style={[styles.billTextWrap,]}>
                                            <View style={styles.lableWrap}>
                                            <Text style={[styles.lable, textStyle,]}>{formattedKey}</Text>
                                            </View>
                                            <View style={styles.textwrap}>
                                                <Text style={[styles.billText, textStyle,]}>{displayValue}</Text>
                                            </View>
                                        </View>
                                    );
                                }}
                            />


                        </View>
                        {commissionPercent > 0 && (
                            <Text style={[styles.billSummaryTitle, textStyle]}>Bill Summary</Text>
                        )}
                        {commissionPercent > 0 && (
                            <View style={styles.billSummaryWrap}>

                                <View style={styles.billTextWrap}>
                                    <Text style={[styles.lable, textStyle]}>Total Amount</Text>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text style={[styles.billText, textStyle]}>₹{product.total_amount}</Text>
                                    </View>
                                </View>
                                <View style={styles.billTextWrap}>
                                    <Text style={[styles.lable, textStyle]}>Commission Amount ({commissionPercent}%)</Text>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text style={[styles.billText, textStyle]}>₹{commissionAmount.toFixed(2)}</Text>
                                    </View>
                                </View>


                                <View style={styles.billTextWrap}>
                                    <Text style={[styles.lable, textStyle]}>Advance Amount</Text>
                                    <Text style={[styles.billText, textStyle]}>₹{product.advance_amount}</Text>
                                </View>
                                <View style={styles.billTextWrap}>
                                    <Text style={[styles.lable, textStyle]}>Remaining Amount</Text>
                                    <Text style={[styles.billText, textStyle]}>₹{product.remaining_amount}</Text>
                                </View>
                            </View>

                        )}
                        <View style={styles.billTextWrap}>
                            <Text style={[styles.billSummaryTitle, textStyle]}>Total Bill</Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                {commissionPercent > 0 ? (
                                    <>
                                        <Text style={[styles.totalbillDiscount, styles.strikethrough]}>₹{price}</Text>
                                        <Text style={[styles.billSummaryTitle, textStyle]}>₹{receivedAmount.toFixed(2)}</Text>
                                    </>
                                ) : (
                                    <Text style={[styles.billSummaryTitle, textStyle]}>₹{price}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </Content>

                {product?.status?.toLowerCase() === 'accepted' && (
                    <View style={[styles.fixedButtonContainer, containerStyle]}>
                        <MyButton
                            title={loadingAction === 'cancel' ? 'Cancelling...' : 'Cancel Order'}
                            style={[styles.rateOrder, (!isCancelAllowed || loadingAction) && { opacity: 0.5 }]}
                            styletext={styles.rateOrderText}
                            onPress={
                                !isCancelAllowed || loadingAction
                                    ? () => { }
                                    : handleCancel
                            }
                            disabled={!isCancelAllowed || !!loadingAction}
                            loading={loadingAction === 'cancel'}
                        />
                        <MyButton
                            title={loadingAction === 'complete' ? 'Completing...' : 'Complete Order'}
                            style={[styles.orderAgain, (!isCompleteAllowed || loadingAction) && { opacity: 0.5 }]}
                            styletext={styles.orderAgainText}
                            onPress={
                                !isCompleteAllowed || loadingAction
                                    ? () => { }
                                    : handleComplete
                            }
                            disabled={!isCompleteAllowed || !!loadingAction}
                            loading={loadingAction === 'complete'}
                        />
                    </View>
                )}

                {product?.status?.toLowerCase() === 'pending' && (
                    <View style={[styles.fixedButtonContainer, containerStyle]}>
                        <MyButton
                            title={loadingAction === 'reject' ? 'Rejecting...' : 'Reject Order'}
                            style={[styles.rateOrder, loadingAction && { opacity: 0.5 }]}
                            styletext={styles.rateOrderText}
                            onPress={loadingAction ? () => { } : () => handleDecline(product)}
                            disabled={!!loadingAction}
                            loading={loadingAction === 'reject'}
                        />
                        <MyButton
                            title={loadingAction === 'accept' ? 'Accepting...' : 'Accept Order'}
                            style={[styles.orderAgain, loadingAction && { opacity: 0.5 }]}
                            styletext={styles.orderAgainText}
                            onPress={loadingAction ? () => { } : () => handleAccept(productID)}
                            disabled={!!loadingAction}
                            loading={loadingAction === 'accept'}
                        />
                    </View>
                )}


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={cancelModalVisible}
                    onRequestClose={() => setCancelModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContainer, containerStyle]}>
                            <Text style={[styles.modalTitle, textStyle]}>
                                Reason for canceling <Text style={styles.productNameInModal}>{product.listing_item?.title}</Text>
                            </Text>

                            <Text style={[styles.modalGuideText, textStyle]}>
                                Kindly tell us why you want to cancel this order. Your feedback helps us improve.
                            </Text>

                            <TextInput
                                style={[styles.modalInput, isEnabled ? styles.darkInput : styles.lightInput]}
                                placeholder="Write your reason here..."
                                placeholderTextColor={isEnabled ? '#aaa' : '#666'}
                                value={cancelReason}
                                onChangeText={setCancelReason}
                                multiline
                                maxLength={300}
                            />

                            <View style={styles.modalButtonsRow}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalCancelButton]}
                                    onPress={() => {
                                        setCancelModalVisible(false);
                                        setCancelReason('');
                                    }}
                                >
                                    <Text style={styles.modalCancelText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.modalConfirmButton,
                                        !cancelReason.trim() && { opacity: 0.5 }
                                    ]}
                                    onPress={confirmCancelOrder}
                                    disabled={!cancelReason.trim()}
                                >
                                    <Text style={styles.modalConfirmText}>Submit</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={cancelReject}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContainer, containerStyle]}>
                            <Text style={[styles.modalTitle, textStyle]}>
                                Are you sure you want to reject this order:{"\n"}
                                {/* Optional: Show product name */}
                                {/* <Text style={{ fontWeight: 'bold', color: isEnabled ? '#fff' : '#000' }}>
                                    {orderToReject?.listing_item?.title || 'Unknown Order'}
                                </Text> */}
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
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalCancelButton]}
                                    onPress={cancelReject}
                                >
                                    <Text style={styles.modalCancelText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.modalConfirmButton,
                                        !cancelReason.trim() && { opacity: 0.5 }
                                    ]}
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
        </Container>
    );
};

export default OrderProductsDetails;
