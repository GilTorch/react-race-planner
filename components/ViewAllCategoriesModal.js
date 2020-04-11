import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

import { SCREEN_HEIGHT } from '../utils/dimensions';
import { genres } from '../utils/data';
import CategoryGenre from './CategoryGenre';
import Text from './CustomText';

const ViewAllCategoriesModal = ({ visible, dismiss }) => {
  return (
    <Portal>
      <Modal style={{ overflow: 'hidden' }} visible={visible}>
        <View
          style={{
            height: SCREEN_HEIGHT * .7,
            backgroundColor: 'white',
            marginHorizontal: 20,
            borderRadius: 6,
            paddingBottom: 4
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
              }}>
              <FontAwesome color="#fff" size={25} name="close" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 10
            }}>
            <Text style={{ color: '#5A7582' }}>Start a New Story</Text>
            <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
              Pick a Category
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
