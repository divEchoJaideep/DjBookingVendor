import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import MyButton from '../../../components/MyButton';
import { CommonActions } from '@react-navigation/native';
import { otpVerify, SignUpUser } from '../../api/api';
import Container from '../../../components/Container';
import Content from '../../../components/Content';

const otpVerification = ({ route }) => {
  const navigation = useNavigation();
  const { phone, password, password_confirmation } = route.params || {};
  const [otp, setOtp] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(119);
  const [loading, setLoading] = useState(false);         
  const [resendLoading, setResendLoading] = useState(false); 

  const endTimeRef = useRef(null);

  useEffect(() => {
    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + 119000;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
      setTimer(remaining);

      if (remaining <= 0) {
        setShowResend(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTimeRef.current]);

  const validateOTPAndPassword = async () => {
    if (!otp) {
      Alert.alert('Alert', 'Please enter the OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await otpVerify({ phone, otp });
      if (response.success) {
        Alert.alert('Alert', response.message);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
          })
        );
      } else {
        Alert.alert('Alert', response?.message || 'Invalid OTP');
      }
    } catch (error) {
      if (error.response?.data) {
        Alert.alert('Alert', error.response.data.message || 'Invalid OTP');
      } else {
        Alert.alert('Error', error.message || 'Please try again');
      }
    } finally {
      setLoading(false); 
    }
  };

  const sendAgain = async () => {
    setResendLoading(true); 
    try {
      const response = await SignUpUser({
        phone,
        password,
        password_confirmation: password
      });

      if (response.success) {
        Alert.alert('Alert', 'We have sent the code again!');
        setShowResend(false);
        setTimer(119);
        endTimeRef.current = Date.now() + 119000;
      } else {
        Alert.alert(response?.message || 'Failed to resend OTP');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Could not resend OTP');
    } finally {
      setResendLoading(false); 
    }
  };

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
          <View>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.text}>We’ve sent your code to WhatsApp</Text>
            <View style={styles.editButton}>
              <Text style={styles.mobile}>{phone}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../Images/edit.png')} style={styles.edit} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: '70%', marginHorizontal: "auto" }}>
            <OtpInput
              numberOfDigits={4}
              placeholder="******"
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


          {loading ? (
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#6C63FF" />
              {/* <Text style={{ color: '#6C63FF', marginTop: 5 }}>Verifying your OTP...</Text> */}
            </View>
          ) : (
            <MyButton
              title={loading ? 'Verifying... OTP' : 'Verify OTP'}
              style={[styles.sendOTPButton, loading && { opacity: 0.7 }]}
              styletext={styles.btnText}
              onPress={!loading ? validateOTPAndPassword : null}
              disabled={loading}
            />

          )}

          <View style={[styles.redirectWrap]}>
            {timer > 0 ? (
              <Text style={styles.redirectText}>
                Resend code in: {formatTime(timer)}
              </Text>
            ) : resendLoading ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <ActivityIndicator size="small" color="#6C63FF" />
                <Text style={styles.redirectText}>Resending...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.redirectText}>Didn't receive code?</Text>
                <TouchableOpacity onPress={sendAgain}>
                  <Text style={styles.redirect}>Send Again</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default otpVerification;
