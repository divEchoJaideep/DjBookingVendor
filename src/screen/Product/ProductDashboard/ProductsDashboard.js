import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  Dimensions,
  ToastAndroid,
  Platform
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './style';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import TopHeader from '../../../../components/header/topHeader';
import InvoiceTextInput from '../../../../components/invoiceTextInput';
import { getProducts, setting, deleteProduct, boostOrder, boostedAmount } from '../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../../../../components/Container';

const ProductsDashboard = ({ route }) => {

  const screenWidth = Dimensions.get('window').width;
  const { isEnabled } = useTheme();
  const [searchBar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productData, setProductData] = useState({
    total: '',
    items: [],
    last_page: ''
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);      // scroll loading
  const [refreshing, setRefreshing] = useState(false); // pull to refresh
  const [isBoostPopupVisible, setBoostPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [boostDate, setBoostDate] = useState(null);
  const [boostExpiry, setBoostExpiry] = useState(null);
  const [boostAmount, setBoostAmount] = useState('');
  const [maxBoosstPrice, setMaxBoostPrice] = useState(0);

  const navigation = useNavigation();
  const grayContainer = isEnabled ? styles.darkgray : styles.lightContainer;
  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
  const textStyle = isEnabled ? styles.darkText : styles.lightText;

  useEffect(() => {
    resetAndFetchProducts();
  }, [])

  useFocusEffect(
    useCallback(() => {
      resetAndFetchProducts();
    }, [searchQuery])
  )

  const resetAndFetchProducts = async () => {
    setPage(1);
    setProductData({ total: '', items: [], last_page: '' });
    await fetchProducts(1, true);
  };

  const fetchProducts = async (customPage = page, isReset = false) => {
    if (loading || refreshing || (productData.last_page && customPage > productData.last_page)) {
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const response = await getProducts("", searchQuery, customPage, header);

      if (response?.data) {
        const { total, last_page, items } = response.data;

        setProductData(prev => ({
          total,
          last_page,
          items: isReset ? items : [...prev.items, ...items]
        }));

        setPage(customPage + 1);
      }
    } catch (error) {
      Alert.alert("Error fetching products:", error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    if (refreshing) return; // prevent spam taps
    setRefreshing(true);
    try {
      await resetAndFetchProducts();
      if (Platform.OS === 'android') {
        // ToastAndroid.show('Listing Refreshed!', ToastAndroid.SHORT);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to refresh listings.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete the product?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const header = `Bearer ${token}`;
              const result = await deleteProduct(header, id);
              if (result?.success) {
                Alert.alert("Success", "Product has been deleted.");
                setProductData(prev => ({
                  ...prev,
                  total: prev.total - 1,
                  items: prev.items.filter(item => item.id !== id)
                }));
              } else {
                Alert.alert("Error", "There was an issue deleting the product.");
              }
            } catch (error) {
              Alert.alert("Error", "There was an issue deleting the product.");
            }
          }
        }
      ]
    );
  };

useEffect(() => {
  if (!selectedProduct?.locality_id) return;
  
  const fetchBoostAmount = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const result = await boostedAmount(selectedProduct.locality_id, selectedProduct.category_id, header);
      setMaxBoostPrice(result?.data?.maximum_boosted_amount  || 0);
    } catch (error) {
    //  console.error('Error fetching boosted amount:', error);

    }
  };

  fetchBoostAmount();
}, [selectedProduct]);


  const handleBoostClick = (selectedProduct) => {
    try {

      if (selectedProduct.is_boosted === 'yes') {
        Alert.alert("Notice", "This product is already boosted.");
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expiry = new Date(today);
      expiry.setDate(expiry.getDate() + 30);
      expiry.setHours(0, 0, 0, 0);

      const formattedExpiry = expiry.toISOString().split('T')[0];
      const expire_date = formattedExpiry;
      setSelectedProduct(selectedProduct);
      setBoostDate(today);
      setBoostExpiry(expire_date);
      setBoostPopupVisible(true);
    } catch (error) { }
  };

  const handleBoost = async () => {
    try {
      if (!selectedProduct?.id) throw new Error("No product selected.");
      if (!boostExpiry) throw new Error("Boost expiry date is not set.");
      if (!boostAmount || isNaN(boostAmount) || Number(boostAmount) <= 0)
        throw new Error("Boost amount must be a valid number greater than 0.");

      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const data = {
        listing_id: selectedProduct.id,
        amount: Number(boostAmount),
        expire_date: boostExpiry,
      };
      const result = await boostOrder(data, header);

      if (result?.success) {
        Alert.alert("Success", result.message);
        setBoostAmount('');
        setSelectedProduct(null)
        resetAndFetchProducts();
        setMaxBoostPrice(0)
      } else {
        throw new Error(result.message || "Something went wrong with the boost operation.");
      }
    } catch (error) {
      Alert.alert("Alert", error.message || "Something went wrong while boosting the product.");
    } finally {
      setBoostPopupVisible(false);
    }
  };

  const renderItem = ({ item }) => {
    const price = item.metas?.find(meta => meta.meta_key === 'price')?.meta_value ?? 'N/A';

    return (
      <TouchableOpacity
        style={[styles.mainProductsWrap, grayContainer]}
        onPress={() => navigation.navigate('ProductDetails', { product: item, price })}
      >
        <View style={styles.productsWrap}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.productImageWrap}>
              <Image source={{ uri: item.banner }} style={styles.productImage} />
            </View>
            <View style={{ borderWidth: 0, width: screenWidth / 3 - 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.productsNumber}>{`#P${item.id}`.slice(0, 2)}</Text>
                <Text style={styles.productsNumber}>{`#P${item.id}`.slice(2)}</Text>
              </View>
              <Text style={[styles.productName, textStyle]} numberOfLines={1}>{item.title}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            {item.is_boosted === 'no' && (
              <TouchableOpacity style={styles.opreationImageWrap} onPress={() => { handleBoostClick(item)}}>
                <Image source={require('../../../Images/Boost.png')} style={styles.opreationImage} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.opreationImageWrap} onPress={() => navigation.navigate('product', { product: item, price })}>
              <Image source={require('../../../Images/editing.png')} style={styles.opreationImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.opreationImageWrap} onPress={() => handleDelete(item.id)}>
              <Image source={require('../../../Images/delete.png')} style={styles.opreationImage} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dottedLine} />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.productTypeWra, item.status === 'active' && { backgroundColor: '#007bff' }]}>
            <Text style={[styles.typeName, item.status === 'active' && { color: '#fff' }]}>
              {item.category?.name || 'Unknown'} / {item.status === 'active' ? 'Active' : 'Inactive'}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.totalPrice, textStyle]}>₹</Text>
            <Text style={[styles.totalPrice, textStyle]}>{price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => (
    loading ? (
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#007bff" />
      </View>
    ) : null
  );

  return (
    <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader paddingBottomContainer={false} conatinerStyle={containerStyle}>
      <View style={styles.container}>
        <View>
          <TopHeader
            leftImage={false}
            onLeftPress={() => navigation.goBack()}
            titleText={true}
            title={'Listing'}
            rightImage={true}
            stylesText={{ color: isEnabled ? "#fff" : "#121212" }}
            tintColorLeft={isEnabled ? '#fff' : '#121212'}
            onRightPress={() => setSearchBar(prev => !prev)}
          />

          {searchBar && (
            <InvoiceTextInput
              placeholder="Search here..."
              value={searchQuery}
              placeholderTextColor="#aaa"
              onChangeText={setSearchQuery}
              color={isEnabled ? '#fff' : '#121212'}
              style={[styles.searchBarInput, containerStyle]}
            />
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: -10, marginBottom: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.mainTitleText, textStyle]}>Total Listing</Text>
            <View style={styles.productsQuantityWrap}>
              <Text style={styles.productsQuantity}>{productData.total || 0}</Text>
            </View>
          </View>
          <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.addNewProducts} onPress={() => navigation.navigate('product')}>
              <Image source={require('../../../Images/addwhite.png')} style={styles.addPlusImg} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.firstButton}> */}
        <FlatList
          data={productData.items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          onEndReached={() => fetchProducts()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            !loading &&
            <View style={styles.centeredWrap}>
              <Text style={[styles.emptyText, textStyle]}>No Listing Available...</Text>
            </View>
          }
        />
        <Modal visible={isBoostPopupVisible} transparent animationType="fade" onRequestClose={() => setBoostPopupVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Boost Product</Text>
              <Text style={styles.modalText}>
                Do you want to boost this product?{'\n\n'}
                Product: <Text style={{ fontWeight: 'bold' }}>{selectedProduct?.title}</Text>{'\n'}
                Boost Expiry Date: <Text style={{ fontWeight: 'bold' }}>{boostExpiry
                  ? new Date(boostExpiry).toLocaleDateString('en-GB')
                  : 'Calculating...'}
                  </Text>
              </Text>
              <Text style={styles.modalText}>
                Top Boost Price: <Text style={{ fontWeight: 'bold' }}>₹{maxBoosstPrice || 0}</Text>
              </Text>
              <Text style={styles.modalText}>For better ranking, set a boost amount that exceeds the top boost price.</Text>
              <View style={{ flexDirection: "row", borderWidth: 0 }}>
                <Text style={styles.boostText}>₹</Text>
                <InvoiceTextInput
                  placeholderTextColor={'gray'}
                  placeholder={'Enter Amount'}
                  style={styles.boostInput}
                  keyboardType="numeric"
                  value={boostAmount}
                  onChangeText={setBoostAmount}
                  maxLength={6}
                />
              </View>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  onPress={handleBoost}
                  disabled={!boostAmount.trim()}
                  style={[
                    styles.modalButton,
                    styles.modalButtonBoost,
                    { opacity: boostAmount.trim() ? 1 : 0.5 },
                  ]}
                >
                  <Text style={styles.modalButtonText}>Boost</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setBoostPopupVisible(false), setSelectedProduct(null),setMaxBoostPrice(0)}} style={[styles.modalButton, styles.modalButtonCancel]}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* </View> */}
      </View>
    </Container>
  );
};

export default ProductsDashboard;
