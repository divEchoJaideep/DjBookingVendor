import { View, Text, Image, TouchableOpacity, Alert, ScrollView, Modal, TouchableWithoutFeedback, FlatList, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator, } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles';
import MyButton from '../../../../components/MyButton';
import InvoiceTextInput from '../../../../components/invoiceTextInput';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import TopHeader from '../../../../components/header/topHeader';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDown from '../../../../components/Dropdown/DropDown';
import { getLocalities, setting, Subcategory, createProduct, ImageUpload, getCities, Field, updateProduct, categoryLogoUrl } from '../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import Container from '../../../../components/Container';
import Content from '../../../../components/Content';
import ActiveIndicator from '../../../../components/ActriveIndicator/ActiveIndicator';
import { SelectList } from 'react-native-dropdown-select-list'
// import ModalSelector from 'react-native-modal-selector';
import BottomSheetSelector from '../../../../components/BottomSheetSelector/BottomSheetSelector';
import { Dropdown } from 'react-native-element-dropdown';

const Product = () => {

    const route = useRoute();
    const { product = {} } = route.params || {};
    console.log('product :',product);
    
    const [loading, setLoading] = useState(false)
    const { isEnabled } = useTheme();
    const containerStyle = isEnabled ? styles.darkContainer : styles.backgroundContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [banner, setBanner] = useState(null);
    const [bannerPath, setBannerServerPath] = useState(null);
    const [images, setImages] = useState(
        (product?.galleries?.slice(0, 6).map(g => ({ uri: g.file_path, loading: false })) || [])
    );
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(product?.category || null);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(
        product?.state ? { label: product.state.name, value: product.state.id } : null
    );
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(
        product?.city ? { label: product.city.city, value: product.city.id } : null
    );

    const [localities, setLocalities] = useState([]);
    const [selectedLocality, setSelectedLocality] = useState(
        product?.locality ? { label: product.locality.locality, value: product.locality.id } : null
    );

    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(product?.subcategory || null);
    const [fields, setFields] = useState([]);
    const [dynamicFieldValues, setDynamicFieldValues] = useState({});
    const [bannerLoading, setBannerLoading] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [uploadBannerProgress, setUploadBannerProgress] = useState(0);
    const [uploadProgresses, setUploadProgresses] = useState({});
    const [uploadingImages, setUploadingImages] = useState([]);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentSelectionType, setCurrentSelectionType] = useState(null); 
    const [currentDateField, setCurrentDateField] = useState(null);
    const [showModal, setShowModal] = useState(false);
console.log('categories :',categories);

    const [main, setMain] = useState({
        title: product?.title || '',
        description: product?.metas?.find(m => m.meta_key === 'description')?.meta_value || '',
        price: product?.metas?.find(m => m.meta_key === 'price')?.meta_value || '',
        address: product?.metas?.find(m => m.meta_key === 'address')?.meta_value || '',

    })
    const { title, description, price, address } = main;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchSettings();
        }, [])
    );
    useEffect(() => {
        if (product?.state?.id) {
            fetchCities(product.state.id);
        }

        if (product?.city?.id) {
            fetchLocalities(product.city.id);
        }
    }, []);


    useEffect(() => {
        if (product?.metas?.length) {
            const initialDynamicValues = {};
            product.metas.forEach(meta => {
                initialDynamicValues[meta.meta_key] = meta.meta_value;
            });
            setDynamicFieldValues(initialDynamicValues);
        }
    }, [product]);


    useFocusEffect(
        React.useCallback(() => {
            // fetchStates();
            // fetchSubcategories();
            fetchCities();
            fetchSettings()
        }, [])
    );
    useEffect(() => {
        if (selectedCategory) {
            fetchSubcategories(selectedCategory);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedState) {
            // setSelectedCity(null);
            // setSelectedLocality(null);
            fetchCities(selectedState?.value);
        }
    }, [selectedState]);


    useEffect(() => {
        if (selectedCity) {
            // setSelectedLocality(null);
            fetchLocalities(selectedCity?.value);
        }
    }, [selectedCity]);



    useEffect(() => {
        if (!loadingSettings) {
            fetchStates();
        }
    }, [loadingSettings]);

    const fetchSettings = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;
            const response = await setting(header);
            if (response) {
                await AsyncStorage.setItem('Settings', JSON.stringify(response));
                setLoadingSettings(false);
            }
        } catch (error) {
            Alert.alert('Error fetching settings:');
            setLoadingSettings(false);
        }
    };


    const setDynamicField = (fieldName, value) => {
        setDynamicFieldValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };



    const fetchStates = async () => {
        try {
            const AllSettings = await AsyncStorage.getItem('Settings');
            const parsedSettings = JSON.parse(AllSettings);
            const statesData = parsedSettings.data.states;
            const formattedStates = statesData.map(item => ({
                label: item.name,
                value: item.id,
            }));
            setStates(formattedStates);
            const categoriesData = parsedSettings.data.categories;
            const formattedCategories = categoriesData.map(item => ({
                id: item.id?.toString(),
                name: item.name,
                 icon: { uri: `${categoryLogoUrl}/${item.image}` },
            }));

            setCategories(formattedCategories);

        } catch (error) {
            Alert.alert('Alert', ' Settings are not found ')
        }
    };


    const fetchSubcategories = async (category_id) => {
        setSubcategories([])
        setFields([]);
        // setSelectedSubcategory();
        try {

            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;

            const response = await Subcategory(category_id.id || category_id, header);


            if (response && response.data) {
                setSubcategories(response.data);

            } else {
                setSubcategories([]);
            }
        } catch (error) {
            setSubcategories([]);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (selectedSubcategory) {
                getFildes(selectedSubcategory);
            }
        }, [selectedCategory, selectedSubcategory])
    );

    const getFildes = async (subcategory_id) => {
        // setFields([]);
        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;

        const dataItem = {
            subcategory_id: subcategory_id.id,
            category_id: Number(selectedCategory.id)
        };


        const response = await Field(dataItem, header);

        if (response?.success && Array.isArray(response?.data)) {
            setFields(response.data);

        } else {
            setFields([]);
        }

    };




    const fetchCities = async (state_id) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;

            const response = await getCities(state_id, header);

            const formatted = response.data.map(item => ({
                label: item.city,
                value: item.id,
            }));
            setCities(formatted);

        } catch (error) {
            setCities([]);
        }
    };



    const fetchLocalities = async (city_id) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;

            const response = await getLocalities(city_id, header);

            const formatted = response.data.map(item => ({
                label: item.locality,
                value: item.id,
            }));
            setLocalities(formatted);
            // setShowLocalityDropdown(true);
        } catch (error) {
        }
    };



    const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

    const selectBannerImage = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;

        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
                maxWidth: 800,
                maxHeight: 800,
                quality: 0.5,
            });

            if (result.didCancel) return;

            const selectedImage = result.assets[0];
            const tempUri = selectedImage.uri;

            setBanner(tempUri);
            setBannerLoading(true);
            setUploadBannerProgress(0);

            const formData = new FormData();
            formData.append('upload', {
                uri: tempUri,
                type: 'image/jpeg',
                name: `banner_${Date.now()}.jpg`,
            });

            const response = await ImageUpload(formData, header, (progressEvent) => {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadBannerProgress(percent);
            });

            if (response && response.path) {
                //   setBanner(response.path);
                setBannerServerPath(response.path);
            } else {
                throw new Error(response.message || 'Upload failed');
            }

        } catch (error) {
            Alert.alert('Error', error?.message || 'Something went wrong while uploading.');
            setBanner(null);
            setBannerServerPath(null);
            setUploadBannerProgress(0);
            setBannerLoading(false);
        }
    };

    const removeSelectPhoto = () => {
        setBanner('')
    }


    const multiSelectPhoto = async () => {
        if (images.length >= 6) {
            Alert.alert('Limit Reached', 'You can upload a maximum of 6 images.');
            return;
        }

        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            selectionLimit: 6 - images.length,
            maxWidth: 800,
            maxHeight: 800,
            quality: 0.5,
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) return;

            const selectedAssets = response.assets;
            const assetsToUpload = selectedAssets.slice(0, 6 - images.length);

            for (let i = 0; i < assetsToUpload.length; i++) {
                const selectedImage = assetsToUpload[i];
                const tempId = Date.now() + i;

                setImages(prev => [
                    ...prev,
                    { id: tempId, uri: null, loading: true },
                ]);

                const formData = new FormData();
                formData.append('upload', {
                    uri: Platform.OS === 'ios' ? selectedImage.uri.replace('file://', '') : selectedImage.uri,
                    type: selectedImage.type || 'image/jpeg',
                    name: selectedImage.fileName || `product_${Date.now()}.jpg`,
                });

                try {
                    const uploadResponse = await ImageUpload(formData, header, (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgresses(prev => ({
                            ...prev,
                            [tempId]: percentCompleted,
                        }));
                    });

                    if (uploadResponse?.path) {
                        setImages(prevImages => prevImages.map(img =>
                            img.id === tempId
                                ? { ...img, uri: uploadResponse.path, loading: false }
                                : img
                        ));
                    } else {
                        throw new Error(uploadResponse?.message || 'Upload failed.');
                    }

                    setUploadProgresses(prev => {
                        const updated = { ...prev };
                        delete updated[tempId];
                        return updated;
                    });

                } catch (error) {
                    Alert.alert('Upload Failed', error.message || 'Try again later.');
                    setImages(prev => prev.filter(img => img.id !== tempId));
                    setUploadProgresses(prev => {
                        const updated = { ...prev };
                        delete updated[tempId];
                        return updated;
                    });
                }
            }
        });
    };


    const removeimages = () => {
        setImages([]);
    };



    const renderSubcatagory = ({ item }) => {
        const isSelected = selectedSubcategory?.id === item.id;

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedSubcategory(item)
                    getFildes(item)
                }

                }
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    margin: 5,
                    backgroundColor: isSelected ? '#007bff' : '#f0f0f0',
                    borderRadius: 8,
                }}
            >
                <Text style={{ textAlign: 'center', color: isSelected ? '#fff' : '#000' }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };



    const handleSaveProduct = async () => {
        if (!description || description.trim().length === 0) {
            Alert.alert('Alert', 'Description field is required.');
            return false;
        }

        if (selectedCategory) {
            if (subcategories.length > 0 && !selectedSubcategory) {
                Alert.alert('Alert', 'Subcategory field is required.');
                return false;
            }
        }

        const dynamicValues = Object.fromEntries(
            Object.entries(dynamicFieldValues).map(([key, value]) => [
                key,
                Array.isArray(value) ? value.join(',') : value,
            ])
        );

        dynamicValues.description = description || product?.description;
        dynamicValues.address = address;
        dynamicValues.price = price;

        const productData = {
            title: title || product?.title,
            category: selectedCategory?.id,
            subcategory: selectedSubcategory?.id,
            state_id: selectedState?.value,
            city_id: selectedCity?.value,
            locality_id: selectedLocality?.value,
            banner: bannerPath || product?.banner,
            images: images.map(img => img.uri),
            dynamic: dynamicValues,
        };

        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;

        try {
            let response;

            if (product?.id) {
                response = await updateProduct(product.id, productData, header);
            } else {
                response = await createProduct(productData, header);
            }

            if (response?.success) {
                Alert.alert('Success', response?.message, [
                    {
                        text: 'OK',
                        onPress: () => navigation.replace('ProductsDashboard'),
                    },
                ]);
            } else if (response?.errors) {
                const errorMessages = Object.values(response.errors).flat().join('\n');
                Alert.alert('Validation Error', errorMessages);
            } else {
                Alert.alert('Error', response?.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        }
    };

    const showDatePicker = (fieldName) => {
        setCurrentDateField(fieldName);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDynamicField(currentDateField, date.toISOString().split('T')[0]);
        hideDatePicker();
    };

    const renderProductImage = ({ item, index }) => {
        const isStillLoading =
            item.loading || (uploadProgresses[index] != null && uploadProgresses[index] < 100);

        return (
            <TouchableOpacity style={styles.imageWrapper} activeOpacity={1}>
                {isStillLoading && (
                    <View style={styles.progressOverlay}>
                        <Progress.Circle
                            size={50}
                            progress={(uploadProgresses[index] || 0) / 100}
                            showsText={true}
                            formatText={() => `${uploadProgresses[index] || 0}%`}
                            color="#007bff"
                            thickness={4}
                        />
                    </View>
                )}

                <Image
                    source={{ uri: item.uri }}
                    style={styles.avatar2}
                    onLoadEnd={() => {
                        setImages(prev => {
                            const updated = [...prev];
                            updated[index] = { ...updated[index], loading: false };
                            return updated;
                        });

                        setUploadProgresses(prev => {
                            const updated = { ...prev };
                            delete updated[index];
                            return updated;
                        });
                    }}
                />

                {!isStillLoading && (
                    <TouchableOpacity
                        style={styles.removeIcon}
                        onPress={() => removeSingleImage(index)}
                    >
                        <Text style={styles.removeIconText}>×</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity >
        );
    };
    const onDateChange = (event, selectedDate) => {
        if (Platform.OS !== 'ios') {
            hideDatePicker();
        }

        if (selectedDate) {
            handleConfirm(selectedDate);
        } else if (Platform.OS === 'ios' && event?.type === 'dismissed') {
            hideDatePicker();
        }
    };

    // const onDateChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    //     setProfile({ ...profile, date_of_birth: currentDate.toISOString().split('T')[0] });
    // };

    //   const showDatePicker = () => setShow(true);


    const removeSingleImage = (indexToRemove) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };
    const modelRef = useRef(null);

    const handleModalPress = (type) => {
        setCurrentSelectionType(type);
        // modelRef.current?.present();
        setShowModal(true)
    };

    const handleCloseBottomSheet = useCallback(() => {
        modelRef.current?.close();
    }, []);
    return (
        <Container lightContent={isEnabled} paddingBottomContainer={true} safeAreaView safeAreaViewHeader conatinerStyle={containerStyle}>
            <View style={{
                paddingHorizontal: 20,

            }}>
                <TopHeader
                    leftImage={true}
                    onLeftPress={() => navigation.goBack()}
                    titleText={true}
                    title={product?.id ? 'Update' : 'Product'}
                    onTitletextPress={() => navigation.goBack()}
                    rightImage={false}
                    stylesText={{ color: isEnabled ? '#fff' : '#121212' }}
                    tintColorLeft={isEnabled ? '#fff' : '#121212'}
                />
            </View>
            {/* <Content
                hasHeader
                useFlex
                scrollEnabled
                disableKBDismissScroll
                contentContainerStyle={[containerStyle,]}
                extraScrollHeight={1}> */}

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20,}}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {loading && (<ActiveIndicator style={styles.loaderStyle} />)}

                    <View style={{ paddingHorizontal: 20, }}>
                        <View style={[styles.bannerImageWrap, containerStyle]}>
                            <View style={styles.imageUploadWrap}>
                                <TouchableOpacity onPress={selectBannerImage} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.imageWrapper}>
                                        {(bannerLoading || uploadBannerProgress < 100) && (banner || product?.banner) && (
                                            <View style={styles.progressOverlay}>
                                                <Progress.Circle
                                                    size={50}
                                                    progress={uploadBannerProgress / 100}
                                                    showsText={true}
                                                    formatText={() => `${uploadBannerProgress}%`}
                                                    color="#007bff"
                                                    thickness={4}
                                                />
                                            </View>
                                        )}

                                        {(banner || product?.banner) ? (
                                            <Image
                                                source={{ uri: banner || product?.banner }}
                                                style={styles.bannarImage}
                                                onLoadEnd={() => {
                                                    setBannerLoading(false);
                                                    setUploadBannerProgress(100);
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                source={require('../../../Images/file-upload.png')}
                                                style={styles.bannarImage}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>


                            </View>

                            <View style={{ margin: 'auto' }}>
                                <Text style={[styles.uploadText, textStyle]}>Upload Banner</Text>
                                <TouchableOpacity onPress={banner ? removeSelectPhoto : selectBannerImage} style={styles.uploadImgButton}>
                                    <Text style={[styles.uploadImgButtonText, { color: banner ? 'red' : '#fff' }]}>{banner ? "Delete" : "Upload"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.addPhotoWrap, containerStyle]}>
                            {images.length > 0 ? (
                                <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                                    <TouchableOpacity onPress={removeimages}>
                                        <Text style={styles.addPhotoText}>Remove Photo</Text>
                                    </TouchableOpacity>
                                    {images.length < 6 ? (
                                        <TouchableOpacity onPress={multiSelectPhoto}>
                                            <Text style={styles.addPhotoText}>Add More</Text>
                                        </TouchableOpacity>
                                    ) : null}
                                </View>
                            ) : (
                                <TouchableOpacity onPress={multiSelectPhoto}>
                                    <Text style={styles.addPhotoText}>{images.length > 0 ? "Remove Photo" : "Add Photo"}</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={images}
                            renderItem={renderProductImage}
                            keyExtractor={(item) => item.uri}
                        />
                        <View style={[styles.textInputWrap, { paddingTop: 10, paddingBottom: 10 }]}>
                            <Text style={[styles.textInputTitle, textStyle]}>Name</Text>
                            <InvoiceTextInput
                                placeholder={'Enter Name'}
                                style={[styles.textInput, containerStyle]}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                color={isEnabled ? '#fff' : '#121212'}
                                value={title !== undefined ? title : product?.title || ''}

                                onChangeText={(val) => setMain({ ...main, title: val })}



                            />
                        </View>

                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                            <Text style={[styles.textInputTitle, textStyle]}>Description</Text>
                            <InvoiceTextInput
                                placeholder={'Enter Description'}
                                style={[styles.textInput, containerStyle]}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                color={isEnabled ? '#fff' : '#121212'}
                                value={description}
                                onChangeText={(val) => setMain({ ...main, description: val })}
                            />
                        </View>

                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                            <Text style={[styles.textInputTitle, textStyle]}>Category</Text>

                            <TouchableOpacity
                                style={[styles.selectOption, containerStyle]}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    setModalVisible(true);
                                }}
                            >
                                {selectedCategory ? (
                                    <Text style={[styles.select, textStyle]}>{selectedCategory.name}</Text>
                                ) : (
                                    <Text style={[styles.select, { color: isEnabled ? '#fff' : 'gray' }]}>Select Category</Text>
                                )}
                                <Image source={require('../../../Images/down.png')} style={styles.selectImage} tintColor={isEnabled ? '#fff' : '#121212'} />
                            </TouchableOpacity>
                        </View>

                        <Modal statusBarTranslucent={true} animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                                <View style={styles.modalBackground}>
                                    <View style={styles.modalContainer}>
                                        <Text style={styles.listCategoryTitle}>Select Category</Text>
                                        <FlatList
                                            data={categories}
                                            keyExtractor={(item) => item.id.toString()}
                                            numColumns={2}
                                            contentContainerStyle={{ paddingBottom: 30 }}
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.listCategory}
                                                        onPress={() => {
                                                            setSelectedCategory(item);
                                                            fetchSubcategories(item.id);
                                                            setSelectedSubcategory(null)
                                                            setModalVisible(false);
                                                        }}
                                                    >
                                                        <Image source={item.icon} style={styles.listCategoryIcon} />
                                                       <Text style={[styles.paymentText, { textTransform: 'capitalize' }]}>{item.name}</Text>

                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                        <View >
                            {(product.subcategory_id || selectedCategory) && subcategories.length > 0 && (
                                <View>
                                    <Text style={[styles.textInputTitle, textStyle]}>Subcategories</Text>

                                    <FlatList
                                        data={subcategories}
                                        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                                        renderItem={renderSubcatagory}
                                        numColumns={3}
                                        contentContainerStyle={{ paddingBottom: 0 }}
                                    />
                                </View>
                            )}


                        </View>

                        <FlatList
                            data={fields}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                if (item.type === 'number') {
                                    return (
                                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                                            <Text style={[styles.textInputTitle, { color: isEnabled ? '#fff' : '#121212', marginBottom: 5 }]}>
                                                {item.name}
                                            </Text>
                                            <InvoiceTextInput
                                                placeholder={`Enter ${item.name}`}
                                                style={[styles.textInput, containerStyle]}
                                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                                color={isEnabled ? '#fff' : '#121212'}
                                                keyboardType="number-pad"
                                                onChangeText={(val) => setDynamicField(item.name, val)}
                                                value={dynamicFieldValues[item.name] || ''}

                                            />
                                        </View>
                                    );
                                }
                                if (item.type === 'text') {
                                    return (
                                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                                            <Text style={[styles.textInputTitle, { color: isEnabled ? '#fff' : '#121212', marginBottom: 5 }]}>
                                                {item.name}
                                            </Text>
                                            <InvoiceTextInput
                                                placeholder={`Enter ${item.name}`}
                                                style={[styles.textInput, containerStyle]}
                                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                                color={isEnabled ? '#fff' : '#121212'}
                                                onChangeText={(val) => setDynamicField(item.name, val)}
                                                value={dynamicFieldValues[item.name] || ''}


                                            />
                                        </View>
                                    );
                                }
                                if (item.type === 'textarea') {
                                    return (
                                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                                            <Text style={[styles.textInputTitle, { color: isEnabled ? '#fff' : '#121212', marginBottom: 5 }]}>
                                                {item.name}
                                            </Text>
                                            <InvoiceTextInput
                                                placeholder={`Enter ${item.name}`}
                                                style={[styles.textInput, containerStyle, { minHeight: 80, }]}
                                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                                color={isEnabled ? '#fff' : '#121212'}
                                                onChangeText={(val) => setDynamicField(item.name, val)}
                                                multiline={true}
                                                textAlignVertical={'top'}
                                            />
                                        </View>
                                    );
                                }

                                if (item.type === 'select' && item.options) {
    const optionsArray = item.options.split(',').map(opt => ({
        label: opt,
        value: opt,
    }));

    return (
        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
            <Text
                style={[
                    styles.textInputTitle,
                    { color: isEnabled ? '#fff' : '#121212' }
                ]}
            >
                {item.name}
            </Text>

            <View style={[styles.picker, containerStyle]}>
                <Dropdown
                containerStyle={containerStyle}
                    style={{
                        height: 40,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                    }}
                    placeholderStyle={{ color: '#999' }}
                    selectedTextStyle={{
                        color: isEnabled ? '#fff' : '#000',
                    }}
                    itemTextStyle={{
                        color: isEnabled ? '#fff' : '#000',
                    }}
                    data={optionsArray}
                    activeColor={containerStyle}
                     placeholder="Select an option"   
                    search
                    searchPlaceholder="Search..."
                    labelField="label"
                    valueField="value"
                    value={dynamicFieldValues[item.name] || null}
                    onChange={val => setDynamicField(item.name, val.value)}
                    maxHeight={200}
                />
            </View>
        </View>
    );
}

                                if (item.type === 'date') {
                                    return (
                                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                                            <Text style={[styles.textInputTitle, { color: isEnabled ? '#fff' : '#121212', marginBottom: 5 }]}>
                                                {item.name}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCurrentDateField(item.name);
                                                    setDatePickerVisibility(true);
                                                }}
                                                style={[styles.textInput, containerStyle, { justifyContent: 'center', height: 50 }]}
                                            >
                                                <Text style={{ color: isEnabled ? '#fff' : '#121212', marginLeft: 10 }}>
                                                    {dynamicFieldValues[item.name]
                                                        ? (() => {
                                                            const date = new Date(dynamicFieldValues[item.name]);
                                                            const day = String(date.getDate()).padStart(2, '0');
                                                            const month = String(date.getMonth() + 1).padStart(2, '0');
                                                            const year = date.getFullYear();
                                                            return `${day}-${month}-${year}`;
                                                        })()
                                                        : `Select ${item.name}`}
                                                </Text>
                                            </TouchableOpacity>

                                            {isDatePickerVisible && currentDateField === item.name && (
                                                <DateTimePicker
                                                    value={
                                                        dynamicFieldValues[item.name]
                                                            ? new Date(dynamicFieldValues[item.name])
                                                            : new Date()
                                                    }
                                                    mode="date"
                                                    display="default"
                                                    onChange={(event, selectedDate) => {
                                                        setDatePickerVisibility(false);
                                                        if (selectedDate) {
                                                            setDynamicField(currentDateField, selectedDate.toISOString());
                                                        }
                                                    }}
                                                />
                                            )}
                                        </View>
                                    );
                                }

                                if (item.type === 'checkbox' && item.options) {
                                    const optionsArray = item.options.split(',');
                                    const selectedValues = Array.isArray(dynamicFieldValues[item.name])
                                        ? dynamicFieldValues[item.name]
                                        : (typeof dynamicFieldValues[item.name] === 'string'
                                            ? dynamicFieldValues[item.name].split(',')
                                            : []);

                                    const toggleCheckbox = (value) => {
                                        let newValues = [...selectedValues];
                                        if (newValues.includes(value)) {
                                            newValues = newValues.filter(v => v !== value);
                                        } else {
                                            newValues.push(value);
                                        }
                                        setDynamicField(item.name, newValues);
                                    };

                                    return (
                                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                                            <Text style={[styles.textInputTitle, { color: isEnabled ? '#fff' : '#121212', marginBottom: 5 }]}>
                                                {item.name}
                                            </Text>
                                            {optionsArray.map((opt, index) => (
                                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <CheckBox
                                                        value={selectedValues.includes(opt)}
                                                        onValueChange={() => toggleCheckbox(opt)}
                                                         tintColors={{ true: '#4CAF50', false: '#999' }}
                                                    />
                                                    <Text style={{ color: isEnabled ? '#fff' : '#121212' }}>{opt}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    );
                                }

                                return null;
                            }}
                        />
                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                            <Text style={[styles.textInputTitle, textStyle]}>Price</Text>

                            <InvoiceTextInput
                                placeholder={'Enter Price'}
                                style={[styles.textInput, containerStyle]}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                color={isEnabled ? '#fff' : '#121212'}
                                keyboardType="number-pad"
                                value={price}
                                onChangeText={(val) => setMain({ ...main, price: val })} />

                        </View>

                        <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                            <Text style={[styles.textInputTitle, textStyle]}>Address</Text>

                            <InvoiceTextInput
                                placeholder={'Enter Address'}
                                style={[styles.textInput, containerStyle]}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                color={isEnabled ? '#fff' : '#121212'}
                                value={address}
                                onChangeText={(val) => setMain({ ...main, address: val })}
                            />
                        </View>
                        <View >
                            <View style={[styles.textInputWrap, { paddingBottom: 10, }]}>
                                <Text style={[styles.textInputTitle, textStyle]}>State</Text>
                                <MyButton onPress={() => { handleModalPress('state'), Keyboard.dismiss() }} title={selectedState?.label || "Select State"} style={[styles.selectOption, containerStyle]} styletext={[styles.select, { color: isEnabled ? '#fff' : selectedState ? '#121212' : 'gray' }]} />
                            </View>
                            <View>



                                {selectedState && (
                                    <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                                        <Text style={[styles.textInputTitle, textStyle]}>City</Text>
                                        <MyButton onPress={() => { handleModalPress('city'), Keyboard.dismiss() }} title={selectedCity?.label || "Select City"} style={[styles.selectOption, containerStyle]} styletext={[styles.select, { color: isEnabled ? '#fff' : selectedCity ? '#121212' : 'gray' }]} />

                                    </View>
                                )}


                                {selectedCity && (
                                    <View style={[styles.textInputWrap, { paddingBottom: 10 }]}>
                                        <Text style={[styles.textInputTitle, textStyle]}>Locality</Text>
                                        <MyButton onPress={() => { handleModalPress('locality'), Keyboard.dismiss() }} title={selectedLocality?.label || "Select Locality"} style={[styles.selectOption, containerStyle]} styletext={[styles.select, { color: isEnabled ? '#fff' : selectedLocality ? '#121212' : 'gray' }]} />

                                    </View>
                                )}


                            </View>

                        </View>
                    </View>

                    {/* </Content> */}
                </ScrollView>
            </KeyboardAvoidingView>
            <MyButton title={product?.id ? 'Update Product' : 'Save Product'} style={styles.savebutton} styletext={styles.buttonText} onPress={handleSaveProduct} />
            <BottomSheetSelector
                visible={showModal}
                onClose={() => setShowModal(false)}
                data={
                    currentSelectionType === 'state' ? states :
                        currentSelectionType === 'city' ? cities :
                            currentSelectionType === 'locality' ? localities :
                                []
                }
                BottomSheetTitle={
                    currentSelectionType === 'state' ? "Select State" :
                        currentSelectionType === 'city' ? "Select City" :
                            currentSelectionType === 'locality' ? "Select Locality" :
                                "Select Option"
                }
                onSelect={(item) => {
                    if (currentSelectionType === 'state') {
                        setSelectedState(item);
                        setSelectedCity(null);
                        setSelectedLocality(null);
                        fetchCities(item.value);
                    } else if (currentSelectionType === 'city') {
                        setSelectedCity(item);
                        setSelectedLocality(null);
                        fetchLocalities(item.value);
                    } else if (currentSelectionType === 'locality') {
                        setSelectedLocality(item);
                    }
                    handleCloseBottomSheet();
                }}
            />

        </Container>
    );
};

export default Product;