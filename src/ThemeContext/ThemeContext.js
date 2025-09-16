import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fontClass, setFontClass] = useState('default-font');

  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    const initTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('userTheme'); 
        const isManual = await AsyncStorage.getItem('manualOverride'); 

        if (savedTheme && isManual === 'true') {
          setIsEnabled(savedTheme === 'dark');
          setManualOverride(true);
        } else {
          const systemTheme = Appearance.getColorScheme(); 
          setIsEnabled(systemTheme === 'dark');
          setManualOverride(false);
        }
      } catch (e) {
      //  console.error('Failed to load theme', e);
      }
    };

    initTheme();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (!manualOverride) {
        setIsEnabled(colorScheme === 'dark');
      }
    });

    return () => listener.remove();
  }, []);

  const toggleSwitch = async () => {
    try {
      const newTheme = !isEnabled;
      setIsEnabled(newTheme);
      setManualOverride(true);
      await AsyncStorage.setItem('userTheme', newTheme ? 'dark' : 'light');
      await AsyncStorage.setItem('manualOverride', 'true');
    } catch (e) {
     // console.error('Failed to save theme', e);
    }
  };

  useEffect(() => {
    setFontClass(isEnabled ? 'WinkySans-Italic-VariableFont_wght' : 'default-font');
  }, [isEnabled]);

  return (
    <ThemeContext.Provider value={{ isEnabled, fontClass, toggleSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
