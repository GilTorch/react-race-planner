import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const CustomText = ({ children, type, style }) => {
  const fontType = passedType => {
    switch (passedType) {
      case 'black':
        return 'Roboto-Black';
      case 'black-italic':
        return 'Roboto-BlackItalic';
      case 'bold':
        return 'Roboto-Bold';
      case 'bold-italic':
        return 'Roboto-BoldItalic';
      case 'light':
        return 'Roboto-Light';
      case 'light-italic':
        return 'Roboto-LightItalic';
      case 'medium':
        return 'Roboto-Medium';
      case 'regular':
        return 'Roboto-Regular';
      case 'thin':
        return 'Roboto-Thin';
      default:
        return 'Roboto-Regular';
    }
  };

  const font = fontType(type || 'normal');
  const customStyle = [{ fontFamily: font }, style || {}];
  return <Text style={customStyle}>{children}</Text>;
};

CustomText.defaultProps = {
  style: {}
};

CustomText.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default CustomText;
