import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../colors/colors';
import styles from './Styles';
import { useFocusEffect } from '@react-navigation/native';

export default function Container(props) {
  const {
    children,
    transparentStatusBar,
    statusBarColor,
    lightContent,
    safeAreaView,
    safeAreaViewHeader,
    conatinerStyle,
    paddingBottomContainer,
    disablePaddingTop = false, 
  } = props;

  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const style = {
    flex: 0,
    alignItems: 'center',
    backgroundColor: !transparentStatusBar
      ? statusBarColor || Colors.lighterGray
      : Colors.transparent
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(lightContent ? 'light-content' : 'dark-content', true);
      StatusBar.setBackgroundColor(
        !transparentStatusBar
          ? lightContent
            ? Colors.darkContainer
            : statusBarColor || Colors.lighterGray
          : Colors.transparent,
        true
      );
    }, [lightContent, statusBarColor])
  );
{console.log('lightContent :',lightContent);
}
  return (
    <>
      {safeAreaView !== false && <SafeAreaView style={style} />}

      {safeAreaView !== false && safeAreaViewHeader !== false && (
        <SafeAreaView
          style={[
            styles.safeViewcontainer,
            conatinerStyle,
            {
              paddingTop: disablePaddingTop ? 0 : statusBarHeight, // ✅ Conditional paddingTop
              paddingBottom: paddingBottomContainer ? insets.bottom : 0,
            },
          ]}
        >
          {children}
        </SafeAreaView>
      )}

      {(safeAreaView === false || safeAreaViewHeader === false) && (
        <View
          style={[
            styles.container,
            conatinerStyle,
            !transparentStatusBar && { marginTop: disablePaddingTop ? 0 : statusBarHeight }, // ✅ Conditional marginTop
            safeAreaViewHeader === false && styles.statusBarMarginTop,
            { paddingBottom: paddingBottomContainer ? insets.bottom : 0 },
          ]}
        >
          {children}
        </View>
      )}
    </>
  );
}
