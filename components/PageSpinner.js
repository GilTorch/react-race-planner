import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, ActivityIndicator, StyleSheet, Platform } from 'react-native';

const PageSpinner = ({ visible }) => (
  <Modal transparent visible={visible}>
    <View style={styles.container}>
      <ActivityIndicator size={Platform.isAndroid ? 60 : 'large'} color="#f8f8f8" />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

PageSpinner.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default PageSpinner;
