import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';
import arrowDown from '../../src/Images/down.png';
import arrowUp from '../../src/Images/upload.png';
import { Colors } from '../colors/colors';

const screenWidth = Dimensions.get('screen').width;

const DropDown = ({
  title,
  dropdownOptions = [],
  DropDownTitle,
  dropDownStyle,
  dropDownTitleStyle,
  dropDownTintColor,
  labelStyle,
  dropdownContainer,
  SearchBox = false,
  searchBoxTextColor = '#000',
  onSelect,
  value,
  isMultiSelect = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(dropdownOptions);
  const [selectedItems, setSelectedItems] = useState(
    isMultiSelect ? value || [] : value || null
  );
  const [dropdownHeight, setDropdownHeight] = useState(0); // Track dropdown height
  const dropdownRef = useRef(null); // Reference for dropdown container

  const toggleDropdown = () => {
      Keyboard.dismiss();
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = dropdownOptions.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelect = (item) => {
    if (isMultiSelect) {
      let updatedSelections = [...selectedItems];
      const exists = updatedSelections.some((i) => i.value === item.value);

      if (exists) {
        updatedSelections = updatedSelections.filter((i) => i.value !== item.value);
      } else {
        updatedSelections.push(item);
      }

      setSelectedItems(updatedSelections);
      onSelect?.(updatedSelections);
    } else {
      setSelectedItems(item);
      onSelect?.(item);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    setFilteredOptions(dropdownOptions);
  }, [dropdownOptions]);

  useEffect(() => {
    if (value) {
      setSelectedItems(value);
    }
  }, [value]);

  const isSelected = (item) => {
    if (isMultiSelect) {
      return selectedItems.some((i) => i.value === item.value);
    }
    return selectedItems?.value === item.value;
  };

  const renderSelectedLabel = () => {
    if (isMultiSelect) {
      return selectedItems.length > 0
        ? selectedItems.map((item) => item.label).join(', ')
        : DropDownTitle || 'Select Options';
    }
    return selectedItems?.label || DropDownTitle || 'Select an Option';
  };

  const handleDropdownLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setDropdownHeight(height);
  };

  return (
    <View
      style={[
        styles.headerContainer,
        { marginBottom: showDropdown ? dropdownHeight + 0 : 0 },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={[styles.dropdown, dropDownStyle]}
        >
          <Text
            style={[
              styles.menuDots,
              dropDownTitleStyle,
              (!isMultiSelect && !selectedItems) || (isMultiSelect && selectedItems.length === 0)
                ? { color: 'gray' }
                : {},
            ]}
          >
            {renderSelectedLabel()}
          </Text>

          <Image
            source={showDropdown ? arrowUp : arrowDown}
            style={styles.arrowIcon}
            tintColor={dropDownTintColor}
          />
        </TouchableOpacity>

        {showDropdown && (
          <View
            style={[styles.dropdownWrap, dropdownContainer]}
            onLayout={handleDropdownLayout}
            ref={dropdownRef}
          >
            {SearchBox && (
              <TextInput
                style={[styles.searchBox, { color: searchBoxTextColor }]}
                placeholder="Search..."
                placeholderTextColor="#aaa"
                value={searchText}
                onChangeText={handleSearch}
              />
            )}

            {filteredOptions.length > 0 ? (
              <FlatList
                nestedScrollEnabled={true}
                data={filteredOptions}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const selected = isSelected(item);
                  return (
                    <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      style={[
                        { paddingVertical: 5, paddingHorizontal: 20, },
                        selected && {
                          backgroundColor: '#e6f7ff',
                          borderRadius: 5,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.dropdownItem,
                          labelStyle,
                          selected && { color: Colors.primary },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                }}

                style={styles.dropdownFlatList}
              />
            ) : (
              <Text style={[styles.noOptionsText, labelStyle]}>No options available</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
    marginTop: -15,
  },
  menuDots: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  dropdownWrap: {
    position: 'absolute',
    width: screenWidth - 52,
    padding: 10,
    top: 35,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    zIndex: 100,
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
    marginTop: 0,
    marginHorizontal: 6,
    marginTop:6,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
    width: screenWidth - 40,
    gap: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  dropdownItem: {
    paddingVertical: 5,
    fontSize: 16,
  },
  searchBox: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  arrowIcon: {
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  dropdownFlatList: {
    maxHeight: 150,
  
  },
  noOptionsText: {
    textAlign: 'center',
    color: '#aaa',
    paddingVertical: 10,
  },
});

export default DropDown;
