import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Image, Alert, ActivityIndicator
} from 'react-native';
import styles from './styles';
import SearchBar from '../../../components/searchBar';
import MyButton from '../../../components/MyButton';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../src/ThemeContext/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import hiddenIcon from '../../Images/hidden.png';
import viewIcon from '../../Images/view.png';
import Container from '../../../components/Container';
import Content from '../../../components/Content';
import ActiveIndicator from '../../../components/ActriveIndicator/ActiveIndicator';

const SignIn = () => {
  const navigation = useNavigation();
  const { isEnabled } = useTheme();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [createLogin, setLogin] = useState({
    phone: '',
    password: '',
  });

  const { phone, password } = createLogin;

  const handleSignIn = async () => {
    // if (!phone) return Alert.alert('Please enter your mobile number.');
    // if (!password) return Alert.alert('Please enter your password.');
    // if (password.length < 6) return Alert.alert('Password must have at least 6 characters.');
    setLoading(true);
    try {
      await login(createLogin);
    } catch (error) {
      Alert.alert('Login failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
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
        <View style={[styles.container]}>
          <Text style={[styles.title]}>Hello again!</Text>
          <Text style={[styles.text]}>
            Welcome back! {'\n'}You've been missed!
          </Text>

          <SearchBar
            placeholder="Mobile No."
            value={phone}
            onChangeText={(e) => setLogin({ ...createLogin, phone: e })}
           keyboardType="number-pad"
            placeholderTextColor="#121212"
            color="#121212"
            maxLength={10}
          />

          <SearchBar
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(e) => setLogin({ ...createLogin, password: e })}
            placeholderTextColor="#121212"
            color="#121212"
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.viewButton}>
            <Image
              source={showPassword ? hiddenIcon : viewIcon}
              style={[styles.view, { width: 20, height: 20 }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.recoverpassbtn}
            onPress={() => navigation.navigate('forgotPassword')}
          >
            <Text style={styles.recoverpasstext}>Forgot Password</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#6C63FF" />
          ) : (
            <MyButton
              title="Sign In"
              style={styles.signInButton}
              styletext={styles.signInButtonText}
              onPress={handleSignIn}
            />
          )}

          <View style={styles.redirectWrap}>
            <Text style={styles.redirectText}>Not a member?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.redirect}> Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default SignIn;
