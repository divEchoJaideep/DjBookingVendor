import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { fontSize } from '../size/size';
import { Colors } from '../colors/colors';


const screenWidth = Dimensions.get('screen').width;

const TopHeader = ({
  title,
  topHeaderStyle,
  stylesText,
  onLeftPress,
  onLongRightPress,
  profileImage,
  headerImageStyle,
  onRightPress,
  leftImage,
  rightImage,
  titleText,
  onTitletextPress,
  backIconWrap,
  tintColorLeft,
  headerImage,
  rightSource,
  rightImageSource,
  rightImageSourcePress,
  dropdownOptions = [],
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(dropdownOptions);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = dropdownOptions.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <View style={[styles.headerContainer, topHeaderStyle]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onLeftPress} style={[styles.iconContainer, backIconWrap]}>
          {leftImage && (
            <Image
              source={require('../../src/Images/left-arrow.png')}
              style={styles.bacKbutton}
              tintColor={tintColorLeft}
            />
          )}
        </TouchableOpacity>

        {profileImage && (
          <Image source={headerImage} style={[styles.image, headerImageStyle]} />
        )}

        {titleText && (
          <TouchableOpacity onPress={onTitletextPress} activeOpacity={1}>
            <Text style={[styles.title, stylesText]}>{title}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <View style={{ position: 'relative' }}>
          {rightImage ? (
            <TouchableOpacity onPress={onRightPress} onLongPress={onLongRightPress}>
              <Image
                source={require('../../src/Images/search.png')}
                style={styles.search}
                tintColor={tintColorLeft}
              />
            </TouchableOpacity>

          ) : null}


        </View>
        <View style={{ position: 'relative' }}>
          {rightSource ?
            <TouchableOpacity onPress={rightImageSourcePress}>
              <Image source={rightImageSource} style={styles.rightImageShare} />
            </TouchableOpacity>

            : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
    marginBottom: 10,
    borderWidth: 0,
  },
  title: {
    ...fontSize.mainTitle,
    // marginLeft: -10,
    // marginTop:-20
  },
  iconContainer: {
    padding: 5,
  },
  bacKbutton: {
    width: 17,
    height: 17,
    alignSelf: 'center',
    marginRight: 10,
    // marginLeft: -5,
    marginTop:0
  },
  search: {
    width: 17,
    height: 17,
    alignSelf: 'center',
    // marginRight:10,
    marginLeft: -5
  },
  image: {
    alignSelf: 'center',
    marginRight: 7,
    // marginTop: -7,
    marginLeft: 10,
  },
  menuDots: {
    ...fontSize.mainTitle,
    fontWeight: 400,
    textAlign: 'center',
    paddingVertical: 0,
    fontSize: 15,
  },
  dropdownWrap: {
    position: 'absolute',
    width: screenWidth / 2,
    padding: 10,
    top: 35,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 100,
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
    maxHeight: 200, // Add max height for scroll
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
    width: screenWidth / 2,
    gap: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginVertical: -5,
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
  dropdownContent: {
    paddingBottom: 10,
  },
  dropdownFlatList: {
    maxHeight: 100,
  },
  rightImageShare: {
    width: 20,
    height: 20,
    alignSelf: "center",
    

  },
});

export default TopHeader;
