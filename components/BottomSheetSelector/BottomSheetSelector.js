import React, { useMemo, useState, useEffect } from 'react';
import {
  Text,
  View,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/ThemeContext/ThemeContext';
import { Colors } from '../colors/colors';

const AddressBottomSheet = ({
  visible,
  onClose,
  data,
  onSelect,
  BottomSheetTitle
}) => {
  const { isEnabled } = useTheme();
  const insets = useSafeAreaInsets();
useEffect(() => {
  if (!visible) {
    setSearch('');
  }
}, [visible]);

  const [search, setSearch] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const grayContainer = isEnabled ? styles.darkGray : styles.grayContainer;
  const containerStyle = isEnabled ? styles.darkContainer : styles.backgroundContainer;
  const textStyle = isEnabled ? styles.darkText : styles.lightText;

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item?.label?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => {
        onSelect?.(item);
        onClose?.();
        setSearch('')
      }}
    >
      <Text style={textStyle}>{item?.label}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.overlay]}>
        <KeyboardAvoidingView
          style={[styles.modalContainer, grayContainer]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.contentContainer}>
            <View style={styles.BottomSheetTittleWrap}>
              <Text style={[styles.BottomSheetTittleText, textStyle]}>
                {BottomSheetTitle}
              </Text>
              <TouchableOpacity
                style={[styles.Button, { backgroundColor: isEnabled ? '#fff' : 'gray' }]}
                onPress={onClose}
              >
                <Text style={[styles.ButtonText, { color: isEnabled ? '#121212' : '#fff' }]}>X</Text>
              </TouchableOpacity>
            </View>


            <View>
              <TextInput
                value={search}
                multiline
                onChangeText={setSearch}
                style={[styles.textInput, containerStyle]}
                placeholderTextColor="#aaa"
                placeholder="Search..."
                color={isEnabled ? '#fff' : '#121212'}
              />
            </View>
          </View>


          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => item?.value?.toString() || index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: keyboardVisible ? 30 + insets.bottom : 20,
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    maxHeight: '70%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  textInput: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.backgroundContainer,
    //color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  Button: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  BottomSheetTittleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BottomSheetTittleText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
  },
  lightContainer: {
    backgroundColor: Colors.lightContainer,
  },
  darkContainer: {
    backgroundColor: Colors.darkContainer,
  },
  lightText: {
    color: Colors.lightText,
  },
  darkText: {
    color: Colors.darkText,
  },
  grayContainer: {
    backgroundColor: Colors.Dashboardgray,
  },
  darkGray: {
    backgroundColor: Colors.darkGray,
  },
});

export default AddressBottomSheet;
