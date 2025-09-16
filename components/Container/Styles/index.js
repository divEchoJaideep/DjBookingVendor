import { StatusBar, StyleSheet } from 'react-native';
import { Colors } from '../../colors/colors';

const styles = StyleSheet.create({
  safeViewcontainer: {
    flex: 1,
    backgroundColor: Colors.lighterGray,
    // paddingBottom:30
    // paddingTop: StatusBar.currentHeight
  },
  container: {
    flex: 1,
        // paddingBottom:30
    // alignItems: 'center'
  },
  statusBarMarginTop: {
    // paddingTop: StatusBar.currentHeight
  }
});

export default styles;
