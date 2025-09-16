import { View, Text, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import SearchBar from '../../../components/searchBar'
import MyButton from '../../../components/MyButton'
import { useNavigation } from '@react-navigation/native';
import { SignUpUser } from '../../api/api'
import viewIcon from '../../Images/hidden.png';
import hideIcon from '../../Images/view.png';
import Container from '../../../components/Container'
import Content from '../../../components/Content'
import ActiveIndicator from '../../../components/ActriveIndicator/ActiveIndicator'


const SignUp = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [createRegester, setRegester] = useState({
        phone: null,
        password: null,
        password_confirmation: null,
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async () => {
        const { phone, password, password_confirmation } = createRegester;

        // if (!phone) {
        //     Alert.alert("Please enter a mobile number.");
        //     return;
        // }

        // const phoneRegex = /^[0-9]{10}$/;
        // if (!phoneRegex.test(phone)) {
        //     Alert.alert("Please enter a valid 10-digit mobile number.");
        //     return;
        // }

        // if (!password || !password_confirmation) {
        //     Alert.alert("Please enter Password and Repeat Password.");
        //     return;
        // }

        // if (password !== password_confirmation) {
        //     Alert.alert('Passwords do not match!');
        //     return;
        // }

        setLoading(true);

        try {
            const response = await SignUpUser(createRegester);
            if (response?.success) {
                navigation.navigate('OTPVerification', { phone, password, password_confirmation });
            } else {
                Alert.alert('Sign Up Failed', response?.message || 'Please try again.');
            }
        } catch (error) {
            Alert.alert('Sign Up Error', error.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container
            safeAreaView
            safeAreaViewHeader
            paddingBottomContainer={true}
        >
            <Content
                scrollEnabled
                contentContainerStyle={styles.contentContainer}
                extraScrollHeight={1}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.text}>Just a few quick things{"\n"}to get started</Text>

                    <SearchBar
                        placeholder={'Mobile No.'}
                        value={createRegester?.phone}
                        onChangeText={(e) => setRegester({ ...createRegester, phone: e })}
                        keyboardType="number-pad"
                        autoFocus={false}
                        placeholderTextColor={'#121212'}
                        color={'#121212'}
                        maxLength={10}
                    />
                    <SearchBar
                        placeholder={'Password'}
                        secureTextEntry={!showPassword}
                        value={createRegester?.password}
                        onChangeText={(e) => setRegester({ ...createRegester, password: e })}
                        placeholderTextColor={'#121212'}
                        color={'#121212'}
                    />

                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.viewButton}>
                        <Image
                            source={!showPassword ? hideIcon : viewIcon}
                            style={[styles.view, { width: 20, height: 20 }]}
                        />
                    </TouchableOpacity>

                    <SearchBar
                        placeholder={"Repeat Password"}
                        secureTextEntry={!showPassword}
                        value={createRegester?.password_confirmation}
                        onChangeText={(e) => setRegester({ ...createRegester, password_confirmation: e })}
                        placeholderTextColor={'#121212'}
                        color={'#121212'}
                    />
                    {loading ? (<ActiveIndicator style={styles.loaderStyle} withBackground={false} />)
                        : (

                            <MyButton
                                title="Sign Up"
                                style={styles.signInButton}
                                styletext={styles.signInButtonText}
                                onPress={handleSignUp}
                            />
                        )}
                    <View style={styles.redirectWrap}>
                        <Text style={styles.redirectText}>Already a member?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text style={styles.redirect}> Login Now</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </ScrollView> */}
                </View>
            </Content>
        </Container>
    );
};

export default SignUp;
