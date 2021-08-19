import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

export const CustomModal = ({ visible, children }) => {
  return (
    <Modal
      isVisible={visible}
      transparent={true}
      hideModalContentWhileAnimating={false}
      useNativeDriver={true}
      style={styles.container}
    >
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
});
