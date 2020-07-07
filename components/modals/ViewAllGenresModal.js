import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';

import { SCREEN_HEIGHT } from '../../utils/dimensions';
import { genresData } from '../../utils/data';
import Genre from '../Genre';
import Text from '../CustomText';

const ViewAllGenresModal = ({ visible, dismiss }) => {
  return (
    <Portal>
      <Modal
        dismissable={false}
        style={{ overflow: 'hidden' }}
        visible={visible}
        onDismiss={dismiss}>
        <View
          style={{
            height: SCREEN_HEIGHT * 0.85,
            backgroundColor: 'white',
            marginHorizontal: 20,
            borderRadius: 6
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              paddingBottom: 10
            }}>
            <Text style={{ color: '#5A7582' }}>Start a New Story</Text>
            <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
              Pick a Genre
            </Text>
          </View>
          <FlatList
            style={{ overflow: 'hidden' }}
            data={genresData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Genre genre={item} />}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={dismiss}
              style={{ ...styles.button, backgroundColor: '#F44336' }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

ViewAllGenresModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired
};

const styles = {
  buttonContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginVertical: 7
  },
  button: {
    width: 120,
    backgroundColor: '#03A2A2',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
};

export default ViewAllGenresModal;
