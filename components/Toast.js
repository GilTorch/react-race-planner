import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/dimensions';
import Text from './CustomText';
import { clearMessage } from '../redux/actions/actionCreators';

const ToastComponent = ({ message }) => {
  const opacity = new Animated.Value(0);
  const dispatch = useDispatch();

  const width = SCREEN_WIDTH - 50;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 2000
    }).start();
    setTimeout(() => {
      dispatch(clearMessage());
    }, 2000);
  };

  if (message) {
    fadeIn();
  }

  return (
    <Animated.View
      style={{
        opacity,
        width,
        height: 40,
        backgroundColor: '#bbb',
        position: 'absolute',
        top: SCREEN_HEIGHT - 100,
        left: '50%',
        borderRadius: 20,
        marginLeft: -width / 2,
        zIndex: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10
      }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text type="medium" style={{ color: 'black', textAlign: 'center' }}>
          {message}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          fadeOut();
        }}
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: 'white',
          marginLeft: 10,
          paddingTop: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <MaterialCommunityIcons style={{ fontSize: 16 }} name="close" color="black" />
      </TouchableOpacity>
    </Animated.View>
  );
};

ToastComponent.propTypes = {
  message: PropTypes.string.isRequired
};

export default ToastComponent;
