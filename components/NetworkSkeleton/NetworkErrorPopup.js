import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MyButton from '../MyButton';


const {width } = Dimensions.get('screen');

const NetworkErrorPopup = ({ visible, onRetry, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Network Error</Text>
          <Text style={styles.message}>Please check your internet connection.</Text>

          <View style={styles.btnRow}>
            {/* <TouchableOpacity style={styles.btn} onPress={onRetry}>
              <Text style={styles.btnText}>Retry</Text>
            </TouchableOpacity> */}
            <MyButton title="Retry" onPress={onRetry} style={styles.btn} styletext={styles.btnText} />

            {/* <TouchableOpacity style={[styles.btn, styles.closeBtn]} onPress={onClose}>
              <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: width -110 ,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  closeBtn: {
    backgroundColor: '#777',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default NetworkErrorPopup;
