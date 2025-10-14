import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
} from 'react-native';
import styles from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef, useContext, } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import InvoiceTextInput from '../../../../../components/invoiceTextInput';
import MyButton from '../../../../../components/MyButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../../../ThemeContext/ThemeContext';
import { profileUpdate, ImageUpload, updatePassword } from '../../../../api/api';
import Guest from '../../../../Images/shiva.jpeg';
import Calender from '../../../../Images/timedate.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActiveIndicator from '../../../../../components/ActriveIndicator/ActiveIndicator';
import Content from '../../../../../components/Content';
import { AuthContext } from '../../../../context/AuthContext';


const ProfileDetails = () => {
    const { isEnabled } = useTheme();
    const { logout } = useContext(AuthContext);
    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;
    const navigation = useNavigation();

    const [activeButton, setActiveButton] = useState(1);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const profilePhotoRef = useRef('');
    const [backButton, setBackButton] = useState(false);
    const [loading, setLoading] = useState(false);


    const [profile, setProfile] = useState({
        name: '',
        business_name: '',
        email: '',
        alternate: '',
        address: '',
        date_of_birth: '',
        profile_photo: ''
    });

    useEffect(() => {
        getStoredUser()
        checkUserStatus();
    }, [navigation])
    const checkUserStatus = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return;

        const header = `Bearer ${token}`;
        const response = await profile(header);

        if (response?.success && response.data?.status === 'rejected') {
            Alert.alert('Account Rejected', 'Your account has been rejected.');
            await logout();
        }
    };

    const getStoredUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setProfile(JSON.parse(user));
                setBackButton(true)
            }
        } catch (error) {
            // Alert.alert('Failed to get user:');
        }
    };

    const selectPhoto = async () => {
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

            if (result.didCancel) {
                return;
            }

            if (result.errorCode) {
                Alert.alert('Error', result.errorMessage || 'Something went wrong.');
                return;
            }

            const selectedImage = result.assets[0];

            const formData = new FormData();
            formData.append('upload', {
                uri: Platform.OS === 'ios' ? selectedImage.uri.replace('file://', '') : selectedImage.uri,
                type: selectedImage.type || 'image/jpeg',
                name: selectedImage.fileName || `profile_${Date.now()}.jpg`,
            });

            const response = await ImageUpload(formData, header);

            if (response && response.path) {
                setImage(response.path)
                setProfile({
                    ...profile,
                    profile_photo: response.path
                })
              //  Alert.alert('Success', response.message);
                return;
            }

            throw new Error(response.message)
        } catch (error) {
            // Alert.alert('Error','Something went wrong while uploading.');
        }
    }



    const removeImage = () => {
        setImage(null);
        profilePhotoRef.current = '';
        setProfile({ ...profile, profile_photo: '' });
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setProfile({ ...profile, date_of_birth: currentDate.toISOString().split('T')[0] });
    };

    const showDatePicker = () => setShow(true);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const updateProfile = async () => {
        if (!profile.alternate) {
            Alert.alert('Mobile number is required');
            return
        } else if (profile?.alternate.length != 10) {
            Alert.alert('Enter a valid 10-digit mobile number');
            return
        }

        const data = {
            name: profile?.name,
            business_name: profile.business_name,
            email: profile.email,
            alternate: profile.alternate,
            address: profile.address,
            date_of_birth: profile.date_of_birth,
            profile_photo: profile.profile_photo,
        };

        try {
            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;
            const response = await profileUpdate(data, header);

            if (response?.success) {
                await AsyncStorage.setItem('user', JSON.stringify(response.data));

                Alert.alert('Success', response?.message);
                navigation.navigate('BottomTab');
            } else {
                Alert.alert('Alert', response?.message);
            }
        } catch (error) {
            // Alert.alert('Error', 'Something went wrong');
        }
    };


    return (
        <View style={[{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }, containerStyle]}>
            <Content
                hasHeader
                scrollEnabled
                contentContainerStyle={containerStyle}
                extraScrollHeight={1}>
                {loading && (<ActiveIndicator style={styles.loaderStyle} />)}


                <View style={{ flex: 1, }}>
                    <View>
                        <View style={[styles.bannerImageWrap, containerStyle]}>
                            <View style={styles.imageUploadWrap}>
                                <TouchableOpacity onPress={selectPhoto}>
                                    <Image
                                        style={styles.bannarImage}
                                        source={
                                            image
                                                ? { uri: image }
                                                : profile.profile_photo
                                                    ? { uri: profile.profile_photo }
                                                    : Guest
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.uploadWrap}>
                                <Text style={[styles.uploadText, textStyle]}>Profile Image</Text>
                                {/* <Text style={styles.imageSizeText}>Size should be below 4 MB</Text> */}
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.uploadImgButton}>
                                        <TouchableOpacity onPress={selectPhoto}>
                                            <Text style={styles.uploadImgButtonText}>Upload</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {image && (
                                        <TouchableOpacity style={styles.deleteButtonWrap} onPress={removeImage}>
                                            <Text style={styles.deleteButton}>Delete</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={styles.textInputWrap}>
                            <Text style={[styles.textInputTitle, textStyle]}>Name</Text>
                            <InvoiceTextInput
                                style={[styles.textInput, containerStyle]}
                                placeholder={'Enter Full Name'}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                value={profile.name}
                                onChangeText={(val) => setProfile({ ...profile, name: val })}
                                autoFocus={false}
                                color={isEnabled ? '#fff' : '#121212'}
                            />
                        </View>

                        <View style={styles.textInputWrap}>
                            <Text style={[styles.textInputTitle, textStyle]}>Business Name</Text>
                            <InvoiceTextInput
                                style={[styles.textInput, containerStyle]}
                                placeholder={'Enter Business Name'}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                value={profile.business_name}
                                onChangeText={(val) => setProfile({ ...profile, business_name: val })}
                                color={isEnabled ? '#fff' : '#121212'}

                            />
                        </View>

                        <View style={styles.textInputWrap}>
                            <Text style={[styles.textInputTitle, textStyle]}>Email</Text>
                            <InvoiceTextInput
                                style={[styles.textInput, containerStyle]}
                                placeholder={'Enter Email'}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                value={profile.email}
                                onChangeText={(val) => setProfile({ ...profile, email: val })}
                                color={isEnabled ? '#fff' : '#121212'}

                            />
                        </View>

                        <View style={styles.textInputWrap}>
                            <Text style={[styles.textInputTitle, textStyle]}>Alternate Mobile Number</Text>
                            <InvoiceTextInput
                                style={[styles.textInput, containerStyle]}
                                placeholder={'Enter Mobile Number'}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                keyboardType="number-pad"
                                maxLength={10}
                                value={profile.alternate}
                                onChangeText={(val) => setProfile({ ...profile, alternate: val })}
                                color={isEnabled ? '#fff' : '#121212'}
                            // readOnly={true}
                            />
                        </View>

                        <View style={styles.textInputWrap}>
                            <Text style={[styles.textInputTitle, textStyle]}>Address</Text>
                            <InvoiceTextInput
                                style={[styles.textInput, containerStyle]}
                                placeholder={'Enter Address'}
                                placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                value={profile.address}
                                onChangeText={(val) => setProfile({ ...profile, address: val })}
                                color={isEnabled ? '#fff' : '#121212'}

                            />
                        </View>


                        <View style={[styles.textInputWrap,]}>
                            <Text style={[styles.textInputTitle, textStyle]}>Date of Birth</Text>
                            <TouchableOpacity style={[styles.selectGender, containerStyle]} onPress={showDatePicker}>
                                <Text style={[styles.selectGenderText, textStyle]}>
                                    {profile.date_of_birth ? formattedDate : 'Select Date'}
                                </Text>
                                <Image source={Calender} style={styles.nextImag} tintColor={isEnabled ? '#fff' : "#121212"} />
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
                                    is24Hour={true}
                                    onChange={onChange}
                                    maximumDate={new Date()}
                                />
                            )}
                        </View>
                    </View>


                </View>
            </Content>
            <View style={styles.bottombutton}>
                <MyButton title="Cancel" style={styles.cancelPassButtonStyle} styletext={styles.registerButtonStyleText} onPress={() => navigation.goBack()} />
                <MyButton title={activeButton === 1 ? " Save Changes " : 'Save Password'} style={styles.savePassButtonStyle} styletext={styles.signInButtonStyleText} onPress={activeButton === 1 ? updateProfile : handleChangePassword} />
            </View>

        </View>
    );
};

export default ProfileDetails;
