import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import SearchBar from '../../../components/searchBar';
import styles from './styles';
import MyButton from '../../../components/MyButton';
import { useNavigation } from '@react-navigation/native';
import { OtpInput } from "react-native-otp-entry";
import { forgotPasswordAPI, forgotPasswordOtp } from '../../api/api';
import Container from '../../../components/Container';
import Content from '../../../components/Content';

const forgotPassword = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const endTimeRef = useRef(null);
  const intervalRef = useRef(null); // 🔥 interval ka reference

  // ✅ Start timer function
  const startTimer = (duration) => {
    // clear old interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    endTimeRef.current = Date.now() + duration * 1000;
    setTimer(duration);

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((endTimeRef.current - Date.now()) / 1000)
      );
      setTimer(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ✅ Send OTP
  const handleSendOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      Alert.alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPasswordOtp({ phone: mobile });
      if (response?.success) {
        setIsOtpSent(true);
        startTimer(120); // ⏳ 2 min timer
        Alert.alert('Success', response.message || 'OTP sent successfully.');
      } else {
        Alert.alert('Alert', response.message || 'OTP failed.');
      }
    } catch (err) {
      setIsOtpSent(false);
      Alert.alert('Error', 'Something went wrong while sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset Password
  const handleForgotPassword = async () => {
    if (!otp || otp.length !== 4 || isNaN(otp)) {
      Alert.alert("OTP should be exactly 4 digits.");
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPasswordAPI({
        phone: mobile,
        otp: otp,
        password: password,
        password_confirmation: confirmPassword,
      });

      if (response?.success) {
        Alert.alert('Success', response.message || 'Password reset successful.');
        navigation.navigate('SignIn');
      } else {
        Alert.alert('Alert', response?.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Format timer mm:ss
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <Container safeAreaView safeAreaViewHeader paddingBottomContainer={true}>
      <Content
        hasHeader
        scrollEnabled
        contentContainerStyle={styles.contentContainer}
        extraScrollHeight={1}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Forgot Password</Text>

          {!isOtpSent ? (
            <Text style={styles.text}>No Worries, we will send you {"\n"}reset instructions</Text>
          ) : (
            <View style={{ width: '100%' }}>
              <Text style={styles.text}>We have sent a code to your mobile</Text>
              <View style={styles.editButton}>
                <Text style={styles.mobile}>{mobile}</Text>
                <TouchableOpacity onPress={() => setIsOtpSent(false)}>
                  <Image source={require('../../Images/edit.png')} style={styles.edit} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!isOtpSent ? (
            <SearchBar
              placeholder={"Mobile No."}
              value={mobile}
              maxLength={10}
              onChangeText={setMobile}
              keyboardType={"numeric"}
              autoFocus={false}
              placeholderTextColor={'#121212'}
            />
          ) : (
            <View>
              <View style={{ width: '70%', marginHorizontal: "auto" }}>
                <OtpInput
                  numberOfDigits={4}
                  placeholder="****"
                  value={otp}
                  onTextChange={setOtp}
                  autoFocus={false}
                  focusColor="#121212"
                  type="numeric"
                  theme={{
                    pinCodeContainerStyle: {
                      ...styles.pinCodeContainer,
                      backgroundColor: '#fff',
                      marginBottom: 15,
                    },
                  }}
                />
              </View>

              <SearchBar
                placeholder={"New Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoFocus={false}
                placeholderTextColor={'#121212'}
                color={'#121212'}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.viewButton}>
                <Image
                  source={showPassword ? require('../../Images/hidden.png') : require('../../Images/view.png')}
                  style={[styles.view, { width: 20, height: 20 }]}
                />
              </TouchableOpacity>

              <SearchBar
                placeholder={"Repeat New Password"}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoFocus={false}
                placeholderTextColor={'#121212'}
                color={'#121212'}
              />
            </View>
          )}

          {loading ? (
            <ActivityIndicator size="large" color="#743bff" style={{ marginVertical: 20 }} />
          ) : (
            <MyButton
              title={isOtpSent ? "Reset Password" : "Send OTP"}
              style={styles.sendOTPButton}
              styletext={styles.btnText}
              onPress={isOtpSent ? handleForgotPassword : handleSendOTP}
            />
          )}

          {isOtpSent && (
            <View style={[styles.sendAgain, { marginTop: 30, flexDirection: 'row' }]}>
              {timer > 0 ? (
                <Text style={styles.redirectText}>
                  Send again in {formatTime(timer)}
                </Text>
              ) : (
                <>
                  <Text style={styles.redirectText}>Didn't receive code?</Text>
                  <TouchableOpacity onPress={handleSendOTP}>
                    <Text style={styles.redirect}> Send Again</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          <View style={styles.redirectWrap}>
            <Text style={styles.redirectText}>Back To Login? </Text>
            <TouchableOpacity onPress={goToSignIn}>
              <Text style={styles.redirect}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default forgotPassword;
