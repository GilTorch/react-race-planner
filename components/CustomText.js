import React from "react";
import { Text } from "react-native";

const CustomText = ({ children, type, style }) => {
  const fontType = type => {
    switch (type) {
      case "black":
        return "Roboto-Black";
      case "black-italic":
        return "Roboto-BlackItalic";
      case "bold":
        return "Roboto-Bold";
      case "bold-italic":
        return "Roboto-BoldItalic";
      case "light":
        return "Roboto-Light";
      case "light-italic":
        return "Roboto-LightItalic";
      case "medium":
        return "Roboto-Medium";
      case "regular":
        return "Roboto-Regular";
      case "thin":
        return "Roboto-Thin";
      default:
        return "Roboto-Regular";
    }
  };

  const font = fontType(type ? type : "normal");
  const customStyle = [{ fontFamily: font }, style || {}];
  return <Text style={customStyle}>{children}</Text>;
};

export default CustomText;
