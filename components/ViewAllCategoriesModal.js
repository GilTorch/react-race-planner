import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { genres } from '../utils/data';
import CategoryGenre from './CategoryGenre';
import Text from './CustomText';

const ViewAllCategoriesModal = ({ visible, dismiss }) => {
  return (
    <Portal>
      <Modal style={{ overflow: 'hidden' }} visible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            margin: 20,
            borderRadius: 6,
            shadowColor: '#000'
          }}>
          <View
            style={{
              marginTop: 10,
              paddingRight: 10,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84
            }}>
            <TouchableOpacity
              onPress={dismiss}
              style={{
                backgroundColor: '#03A2A2',
                width: 30,
                height: 30,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
                justifySelf: 'flex-start',
                elevation: 10
              }}>
              <FontAwesome color="#fff" size={25} name="close" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 35,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}>
            <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
              All Categories
            </Text>
          </View>
          <FlatList
            style={{ overflow: 'hidden' }}
            data={genres}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <CategoryGenre genre={item} />}
          />
        </View>
      </Modal>
    </Portal>
  );
};

ViewAllCategoriesModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired
};

export default ViewAllCategoriesModal;
