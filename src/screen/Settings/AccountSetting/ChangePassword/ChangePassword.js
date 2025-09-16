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
import TopHeader from '../../../../../components/header/topHeader';
import { profileUpdate, ImageUpload, updatePassword } from '../../../../api/api';
import Guest from '../../../../Images/shiva.jpeg';
import Calender from '../../../../Images/timedate.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActiveIndicator from '../../../../../components/ActriveIndicator/ActiveIndicator';
import Container from '../../../../../components/Container';
import Content from '../../../../../components/Content';
import { AuthContext } from '../../../../context/AuthContext';

const ChangePassword = () => {
    const { isEnabled } = useTheme();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState({
        old_password: '',
        password: '',
        password_confirmation: ''
    })

    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;



   const handleChangePassword = async () => {
    const data = {
      old_password: newPassword.old_password,
      password: newPassword.password,
      password_confirmation: newPassword.password_confirmation
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const response = await updatePassword(data, header);
      if (response.success) {
        Alert.alert('Success', response.message || 'Password updated successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating.');

    }
  }


    return (
        <View style={[{flex:1,paddingHorizontal:20,paddingTop:20},containerStyle]}>
            <View style={styles.textInputWrap}>
                <Text style={[styles.textInputTitle, textStyle]}>Old Password</Text>
                <InvoiceTextInput
                    style={[styles.textInput, containerStyle]}
                    color={isEnabled ? '#fff' : '#121212'}
                    placeholder={'Old Password'}
                    placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                    onChangeText={(val) => setNewPassword({ ...newPassword, old_password: val })}
                    value={newPassword.old_password}
                />
            </View>
            <View style={styles.textInputWrap}>
                <Text style={[styles.textInputTitle, textStyle]}>New Password</Text>
                <InvoiceTextInput
                    style={[styles.textInput, containerStyle]}
                    placeholder={'New Password'}
                     color={isEnabled ? '#fff' : '#121212'}
                    placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                    value={newPassword.password}
                    onChangeText={(val) => setNewPassword({ ...newPassword, password: val })}
                />
            </View>
            <View style={styles.textInputWrap}>
                <Text style={[styles.textInputTitle, textStyle]}>Confirm Password</Text>
                <InvoiceTextInput
                    style={[styles.textInput, containerStyle]}
                    placeholder={'Confirm Password'}
                     color={isEnabled ? '#fff' : '#121212'}
                    placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                    value={newPassword.password_confirmation}
                    onChangeText={(val) => setNewPassword({ ...newPassword, password_confirmation: val })}
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#6C63FF" />
            ) : (
                <View style={[styles.bottombutton,{paddingTop:20}]}>
                    <MyButton
                        title="Cancel"
                        style={styles.cancelPassButtonStyle}
                        styletext={styles.registerButtonStyleText}
                        onPress={() => navigation.goBack()}
                    />
                    <MyButton
                        title={'Save Password'}
                        style={styles.savePassButtonStyle}
                        styletext={styles.signInButtonStyleText}
                        onPress={handleChangePassword}
                    />
                </View>
            )}

        </View>
    )
}

export default ChangePassword