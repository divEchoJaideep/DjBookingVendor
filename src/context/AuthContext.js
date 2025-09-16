import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profile, signpage, setting } from '../api/api';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    setIsAuthenticated(false);
  };

  const checkUserStatus = async (user) => {
    if (user?.status === 'rejected') {
      Alert.alert('Account Rejected', 'Your account has been rejected.');
      await logout();
      return false;
    }
    return true;
  };

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const header = `Bearer ${token}`;
      const response = await profile(header);

      if (response.success) {
        const user = response.data;

        const isValid = await checkUserStatus(user);
        if (!isValid) return;

        await AsyncStorage.setItem('user', JSON.stringify(user));
        await fetchSettings(header);
        setIsAuthenticated(true);
      } else {
        await logout();
      }
    } catch (error) {
      //console.error('Auth check failed:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async (header) => {
    try {
      const response = await setting(header);
      if (response) {
        await AsyncStorage.setItem('Settings', JSON.stringify(response));
      }
    } catch (error) {
      Alert.alert('Error fetching settings');
    }
  };

  const login = async (credentials) => {
    try {
      const response = await signpage(credentials);
    
      if (!response?.success) throw new Error(response.message);

      const { token, vendor } = response.data;

      const isValid = await checkUserStatus(vendor);
      if (!isValid) return;

      await AsyncStorage.setItem('userToken', token);

      const header = `Bearer ${token}`;
      const profileResponse = await profile(header);

      if (profileResponse.success) {
        const user = profileResponse.data;

        const isValidProfile = await checkUserStatus(user);
        if (!isValidProfile) return;

        await AsyncStorage.setItem('user', JSON.stringify(user));
        await fetchSettings(header);
        setIsAuthenticated(true);
      } else {
        throw new Error('Failed to fetch user profile.');
      }
    } catch (error) {
     // console.error('Login failed:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,   login, logout, loading }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
