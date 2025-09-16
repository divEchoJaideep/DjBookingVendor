import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Share, FlatList, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import TopHeader from '../../../../components/header/topHeader';
import styles from './styles';
import MyButton from '../../../../components/MyButton';
import { updateStatus } from '../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../../../components/colors/colors';
import Container from '../../../../components/Container';
import Content from '../../../../components/Content';


const ProductDetails = () => {
    const screenWidth = Dimensions.get('window').width;

    const navigation = useNavigation();
    const route = useRoute();
    const { product, price } = route.params;
    const listingItemId = product?.listing_item_id || '';

    const [recommendedData, setRecommendedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [status, setStatus] = useState(product?.status || 'inactive');
    const [productDetails, setProductDetails] = useState(product);

    const { isEnabled } = useTheme();

    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const grayContainer = isEnabled ? styles.darkGray : styles.grayContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;
    const grayText = [styles.text, isEnabled ? styles.darkText : styles.grayText];

    const handleStatusChange = async () => {
        const newStatus = status === 'active' ? 'inactive' : 'active';

        Alert.alert(
            'Confirm Status Change',
            `Are you sure you want to mark this product as ${newStatus}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('userToken');
                            const header = `Bearer ${token}`;

                            const data = {
                                status: newStatus,
                                title: productDetails.title,
                            };

                            const response = await updateStatus(productDetails.id, data, header);

                            if (response?.success) {
                                Alert.alert('Success', response?.message);
                                setStatus(newStatus);
                                setProductDetails(prev => ({ ...prev, status: newStatus }));
                            } else {
                                Alert.alert('Error', response?.message || 'Failed to update');
                            }
                        } catch (error) {
                            Alert.alert('Error', 'Something went wrong');
                        }
                    },
                },
            ]
        );
    };

    useEffect(() => {
        if (product?.banner || product?.galleries?.length > 0) {
            const mediaData = [
                { type: 'banner', uri: product.banner },
                ...product.galleries.map((img) => ({
                    type: 'gallery',
                    uri: img.file_path
                }))
            ];
            setRecommendedData(mediaData);
        }
    }, [product]);

    const handleShare = async () => {
        try {
            const productLink = `https://www.DjBookingUser.com/product/${product.id}`;

            const name = product.title || 'N/A';
            const productPrice = price || 'N/A';
            const location = [
                product?.locality?.locality,
                product?.city?.city,
                product?.state?.name,
                product?.country || '',
                product?.postal || ''
            ].filter(Boolean).join(', ');

            const message = `Check out this amazing product: ${name}\n\n` +
                `Price: ₹${productPrice}\n\n` +
                `Location: ${location || 'N/A'}\n\n` +
                `Click here to view the product: ${productLink}\n\n` +
                `Thank you;`;

            const result = await Share.share({ message });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                }
            }
        } catch (error) {
            Alert.alert("Error sharing the product.");
        }
    };

    const onScrollEnd = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(contentOffsetX / Dimensions.get('window').width);
        setCurrentPage(pageIndex);
    };

    const HIDDEN_META_KEYS = ['price'];


    return (
        <Container safeAreaView={false} paddingBottomContainer={true} transparentStatusBar conatinerStyle={containerStyle} lightContent={isEnabled}>
            <View>
                <TopHeader
                    backIconWrap={[styles.iconWrap, containerStyle]}
                    leftImage={true}
                    onLeftPress={() => navigation.goBack()}
                    topHeaderStyle={styles.backButton}
                    tintColorLeft={isEnabled ? '#fff' : '#121212'}
                    
                />
            </View>

            <Content
                hasHeader
                scrollEnabled
                isBottomSheet
                contentContainerStyle={containerStyle}
                extraScrollHeight={1}>
                <View>
                    <View style={styles.productImageContainer}>
                        {recommendedData.length > 0 ? (
                            <FlatList
                                horizontal
                                pagingEnabled
                                decelerationRate="fast"
                                showsHorizontalScrollIndicator={false}
                                data={recommendedData}
                                keyExtractor={(item) => item.uri}
                                renderItem={({ item }) => (
                                    <Image source={{ uri: item.uri }} style={styles.productImage} />
                                )}
                                contentContainerStyle={styles.flatListContent}
                                onMomentumScrollEnd={onScrollEnd}
                            />

                        ) : (
                            <Image source={{ uri: product.image }} style={styles.productImage} />
                        )}
                    </View>


                </View>

                <View style={[styles.bottomWrap, containerStyle]}>
                    <View style={styles.pageIndicatorContainer}>
                        {recommendedData.map((_, index) => (
                            <View
                                key={index}
                                style={[styles.screenWidth, currentPage === index ? styles.activePageIndicator : styles.inactivePageIndicator]}
                            />
                        ))}
                    </View>
                    <View style={[styles.middleBody, { backgroundColor: isEnabled ? '#121212' : '#fff' }]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "column", width: '50%' }}>
                                <Text style={[styles.productName, textStyle]}>{productDetails.title}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.priceText, { color: isEnabled ? '#fff' : 'rgb(26 60 85)' }]}>Price: ₹{price}</Text>
                                {/* <Text style={[styles.price, grayText]}>/pice</Text> */}
                            </View>
                        </View>

                        {/* <View style={{ flexDirection: "row", marginVertical: 10, gap: 10 }}></View> */}

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                            <TouchableOpacity style={[styles.middleBodyButton, grayContainer, { borderWidth: isEnabled ? 1 : 0 }]} onPress={handleShare}>
                                <Image source={require('../../../Images/share.png')} style={styles.middleBodyButtonImag} tintColor={'#fff'} />
                                <Text style={[styles.buttonshare]}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.middleBody, { backgroundColor: isEnabled ? '#121212' : '#fff' }]}>
                        <Text style={[styles.middleBodyText, textStyle]}>Description</Text>


                        <FlatList
                            data={
                                (productDetails?.metas || []).filter(
                                    item => !HIDDEN_META_KEYS.includes(item.meta_key?.toLowerCase())
                                )
                            }
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.discriptionTextWrap}>
                                    <Text style={[styles.productLabel, textStyle]}>
                                        {item.meta_key.charAt(0).toUpperCase() + item.meta_key.slice(1)}:
                                    </Text>
                                    <Text style={[styles.productText, textStyle]}>
                                        {(item.meta_key === 'Per Hour Price' || item.meta_key === 'Per KM Price')
                                            ? `₹ ${item.meta_value}`
                                            : item.meta_value}
                                    </Text>
                                </View>
                            )}
                            scrollEnabled={false}
                        />



                    </View>


                    <View style={[styles.middleBody, { backgroundColor: isEnabled ? '#121212' : '#fff' }]}>
                        <Text style={[styles.middleBodyText, textStyle]}>Product Details</Text>

                        <View style={styles.discriptionTextWrap}>
                            <Text style={[styles.productLabel, textStyle]}>Category:</Text>
                            <Text style={[styles.productText, textStyle]}>{productDetails.category?.name}</Text>
                        </View>
                        <View style={styles.discriptionTextWrap}>
                            <Text style={[styles.productLabel, textStyle]}>Subcategory:</Text>
                            <Text style={[styles.productText, textStyle]}>{productDetails.subcategory?.name}</Text>
                        </View>
                        <View style={styles.discriptionTextWrap}>
                            <Text style={[styles.productLabel, textStyle]}>Status:</Text>
                            <Text style={[styles.productText, textStyle]}>{productDetails.status}</Text>
                        </View>
                        <View style={styles.discriptionTextWrap}>
                            <Text style={[styles.productLabel, textStyle]}>Location:</Text>
                            <Text style={[styles.productText, textStyle]}>
                                {productDetails.locality?.locality || 'N/A'} {productDetails.city?.city || 'N/A'} {productDetails.state?.name || 'N/A'}
                            </Text>
                        </View>

                    </View>
                </View>
            </Content>

            <MyButton
                containerStyle={styles.btnContainer}
                title={status === 'active' ? 'For Press Inactive' : 'For Press Active'}
                style={[styles.MyButton, { backgroundColor: status === 'active' ? 'red' : Colors.parssedButton }]}
                styletext={styles.MyButtonText}
                onPress={handleStatusChange}
            />
        </Container>
    );
};

export default ProductDetails;
