import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles';
import { useTheme } from '../../../../ThemeContext/ThemeContext';
import InvoiceTextInput from '../../../../../components/invoiceTextInput';
import { createJob } from '../../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from '../../../../../components/MyButton';
import Content from '../../../../../components/Content';
import Container from '../../../../../components/Container';
import { useNavigation } from '@react-navigation/native';


const CreateJob = () => {
    const { isEnabled } = useTheme();
    const navigation = useNavigation();
    const [user, setUser] = useState([])
    const [jobDetails, setJobDetails] = useState({
        title: null,
        qualification: null,
        experience: null,
        salary: null,
        description: null,
        mobile: null,
        email: null,
        address: null,
    });

    const grayContainer = isEnabled ? styles.darkgray : styles.lightContainer;
    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;

    useEffect(() => {
        getUserData();
    }, []);


    const getUserData = async () => {
        try {
            const UserData = await AsyncStorage.getItem('user');
            if (UserData != null) {
                const userData = JSON.parse(UserData);
                setUser(userData);
                return userData;
            } else {
                return null;
            }
        } catch (e) {
            Alert.alert('Error', 'Something went wrong');
            return null;
        }
    };



    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validateMobile = (mobile) => {
        const mobilePattern = /^[0-9]{10}$/;
        return mobilePattern.test(mobile);
    };

    const handleCreateJob = async () => {
        const { title, qualification, experience, salary, description, mobile, email, address } = jobDetails;

        // if (!validateEmail(email)) {
        //     Alert.alert('Error', 'Invalid email');
        //     return;
        // }

        // if (!validateMobile(mobile)) {
        //     Alert.alert('Error', 'Invalid mobile number');
        //     return;
        // }

        const data = {
            title,
            address,
            email,
            mobile,
            qualification,
            experience,
            salary,
            description,
        };

        try {
            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;
            const response = await createJob(data, header);
             if (response?.success) {
                Alert.alert('Success', response?.message, [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('ListedJob'),
                                setJobDetails({
                                    title: '',
                                    qualification: '',
                                    experience: '',
                                    salary: '',
                                    description: '',
                                    mobile: '',
                                    email: '',
                                    address: '',
                                });
                        }
                    },
                ]);
            } else {
                // Extract first error message from errors object
                const errors = response?.errors;
                let firstErrorMessage = response?.message || 'Failed to update';

                if (errors) {
                    // Get first key and its first error message
                    const firstKey = Object.keys(errors)[0];
                    if (firstKey && errors[firstKey]?.length > 0) {
                        firstErrorMessage = errors[firstKey][0];
                    }
                }

                Alert.alert('Error', firstErrorMessage);
            }

        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        }
    };


    return (
        <Container lightContent={isEnabled} paddingBottomContainer={false} disablePaddingTop={true} conatinerStyle={containerStyle}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, paddingHorizontal: 20 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.textInputWrap}>
                        <Text style={[styles.textInputTitle, textStyle]}>Job Title</Text>
                        <InvoiceTextInput

                            style={[styles.textInput, containerStyle]}
                            placeholder={'Enter Job Title'}
                            placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                            value={jobDetails.title}
                            onChangeText={(val) => setJobDetails({ ...jobDetails, title: val })}
                            autoFocus={false}
                            color={isEnabled ? '#fff' : '#121212'}
                        />
                    </View>
                    <View style={styles.textInputWrap}>
                        <Text style={[styles.textInputTitle, textStyle]}>Email</Text>
                        <InvoiceTextInput

                            style={[styles.textInput, containerStyle]}
                            placeholder={'Enter Email'}
                            placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                            value={jobDetails.email}
                            onChangeText={(val) => setJobDetails({ ...jobDetails, email: val })}
                            color={isEnabled ? '#fff' : '#121212'}

                        />
                    </View>

                    <View style={styles.textInputWrap}>
                        <Text style={[styles.textInputTitle, textStyle]}>Mobile Number</Text>
                        <InvoiceTextInput

                            style={[styles.textInput, containerStyle]}
                            placeholder={'Enter Mobile Number'}
                            placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                            keyboardType="number-pad"
                            maxLength={10}
                            value={jobDetails.mobile}
                            onChangeText={(val) => setJobDetails({ ...jobDetails, mobile: val })}
                            color={isEnabled ? '#fff' : '#121212'}

                        />
                    </View>

                    <View style={styles.textInputWrap}>
                        <Text style={[styles.textInputTitle, textStyle]}>Qualification</Text>
                        <InvoiceTextInput

                            style={[styles.textInput, containerStyle]}
                            placeholder={'Enter Qualification'}
                            placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                            value={jobDetails.qualification}
                            onChangeText={(val) => setJobDetails({ ...jobDetails, qualification: val })}
                            color={isEnabled ? '#fff' : '#121212'}

                        />
                    </View>

                    <View style={styles.textInputWrap}>
                        <Text style={[styles.textInputTitle, textStyle]}>Description</Text>
                        <InvoiceTextInput

                            style={[styles.textInput, containerStyle]}
                            placeholder={'Enter Description'}
                            placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                            value={jobDetails.description}
                            multiline={true}
                            onChangeText={(val) => setJobDetails({ ...jobDetails, description: val })}
                            color={isEnabled ? '#fff' : '#121212'}

                        />
                    </View>
                    <View style={styles.textInputWrap}>
                        <Text style={[styles.textInputTitle, textStyle]}>Address</Text>
                        <InvoiceTextInput

                            style={[styles.textInput, containerStyle]}
                            placeholder={'Enter Address'}
                            placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                            value={jobDetails.address}
                            multiline={true}
                            onChangeText={(val) => setJobDetails({ ...jobDetails, address: val })}
                            color={isEnabled ? '#fff' : '#121212'}

                        />
                    </View>

                    <View style={styles.textInputWrap}>
                        <Text style={[styles.textInputTitle, textStyle]}>Experience</Text>
                        <InvoiceTextInput

                            style={[styles.textInput, containerStyle]}
                            placeholder={'Enter Experience'}
                            placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                            value={jobDetails.experience}
                            multiline={true}
                            onChangeText={(val) => setJobDetails({ ...jobDetails, experience: val })}
                            color={isEnabled ? '#fff' : '#121212'}

                        />
                    </View>
                    <View style={[styles.textInputWrap,]}>
                        <Text style={[styles.textInputTitle, textStyle]}>Salary</Text>
                        <InvoiceTextInput

                            style={[styles.textInput, containerStyle]}
                            placeholder={'Enter Salary'}
                            keyboardType="number-pad"
                            placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                            value={jobDetails.salary}
                            onChangeText={(val) => setJobDetails({ ...jobDetails, salary: val })}
                            color={isEnabled ? '#fff' : '#121212'}

                        />
                    </View>
                </ScrollView>
                <View style={{
                    paddingHorizontal: 20
                }}>
                    <MyButton
                        title={'Create Job'}
                        style={styles.savePassButtonStyle}
                        styletext={styles.signInButtonStyleText}
                        onPress={handleCreateJob}
                    />
                </View>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default CreateJob;
