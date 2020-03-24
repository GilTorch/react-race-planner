import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const CustomText = ({ children, type, style }) => {
  const fontType = passedType => {
    switch (passedType) {
      case 'black':
        return 'Roboto-Black';
      case 'black-italic':
        return 'RobotoBlackItalic';
      case 'bold':
        return 'RobotoBold';
      case 'bold-italic':
        return 'RobotoBoldItalic';
      case 'light':
        return 'RobotoLight';
      case 'light-italic':
        return 'RobotoLightItalic';
      case 'medium':
        return 'RobotoMedium';
      case 'regular':
        return 'RobotoRegular';
      case 'thin':
        return 'RobotoThin';
      default:
        return 'RobotoRegular';
    }
  };

  const font = fontType(type);
  const customStyle = [{ fontFamily: font }, style || {}];
  return <Text style={customStyle}>{children}</Text>;
};

CustomText.defaultProps = {
  type: 'normal',
  style: {}
};

CustomText.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  style: PropTypes.object
};

export default CustomText;
