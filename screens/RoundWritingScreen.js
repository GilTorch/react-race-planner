/* eslint-disable no-alert */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CNRichTextEditor, {
  CNToolbar,
  getDefaultStyles,
  convertToObject
} from 'react-native-cn-richtext-editor';
import { Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');
const defaultStyles = getDefaultStyles();

const RoundWritingScreen = ({ navigation }) => {
  navigation.setOptions({
    headerShown: false
  });

  const [customStyles, setCustomStyles] = useState({
    ...defaultStyles,
    body: { fontSize: 12 },
    heading: { fontSize: 16 },
    title: { fontSize: 20 },
    ol: { fontSize: 12 },
    ul: { fontSize: 12 },
    bold: { fontSize: 12, fontWeight: 'bold', color: '' }
  });
  const [selectedTag, setSelectedTag] = useState('body');
  const [selectedColor, setSelectedColor] = useState('default');
  const [selectedHighlight, setSelectedHighlight] = useState('default');
  const [colors, setColors] = useState(['red', 'green', 'blue']);
  const [highlights, setHighlights] = useState([
    'yellow_hl',
    'pink_hl',
    'orange_hl',
    'green_hl',
    'purple_hl',
    'blue_hl'
  ]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  // value: [getInitialObject()] get empty editor
  const [value, setValue] = useState(
    convertToObject(
      '<div><p><span>This is </span><span style="font-weight: bold;">bold</span><span> and </span><span style="font-style: italic;">italic </span><span>text</span></p></div>',
      customStyles
    )
  );
  let editor = null;

  const onStyleKeyPress = toolType => {
    if (toolType !== 'image') {
      editor.applyToolbar(toolType);
    }
  };

  const onSelectedTagChanged = tag => {
    setSelectedTag(tag);
  };

  const onSelectedStyleChanged = styles => {
    const colors = colors;
    const highlights = highlights;
    setSelectedStyles(styles);
    const sel = styles.filter(x => colors.indexOf(x) >= 0);
    const hl = styles.filter(x => highlights.indexOf(x) >= 0);
    setSelectedColor(sel.length > 0 ? sel[sel.length - 1] : 'default');
    setSelectedHighlight(hl.length > 0 ? hl[hl.length - 1] : 'default');
  };

  const onValueChanged = value => {
    setValue(value);
  };

  const insertImage = url => {
    editor.insertImage(url);
  };

  const askPermissionsAsync = async () => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // hasCameraPermission(camera.status === 'granted');
    // hasCameraRollPermission(cameraRoll.status === 'granted');
  };

  const useLibraryHandler = async () => {
    await askPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: false
    });

    insertImage(result.uri);
  };

  const useCameraHandler = async () => {
    await askPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: false
    });
    // console.log(result);

    insertImage(result.uri);
  };

  const onImageSelectorClicked = value => {
    if (value === 1) {
      useCameraHandler();
    } else if (value === 2) {
      useLibraryHandler();
    }
  };

  const onColorSelectorClicked = value => {
    if (value === 'default') {
      editor.applyToolbar(selectedColor);
    } else {
      editor.applyToolbar(value);
    }
    setSelectedColor(value);
  };

  const onHighlightSelectorClicked = value => {
    if (value === 'default') {
      editor.applyToolbar(selectedHighlight);
    } else {
      editor.applyToolbar(value);
    }
    setSelectedHighlight(value);
  };

  const onRemoveImage = ({ url, id }) => {
    // do what you have to do after removing an image
    console.log(`image removed (url : ${url})`);
  };

  const renderImageSelector = () => {
    return (
      <View style={styles.root}>
        <Menu renderer={SlideInMenu} onSelect={onImageSelectorClicked}>
          <MenuTrigger>
            <MaterialCommunityIcons name="image" size={28} color="#737373" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1}>
              <Text style={styles.menuOptionText}>Take Photo</Text>
            </MenuOption>
            <View style={styles.divider} />
            <MenuOption value={2}>
              <Text style={styles.menuOptionText}>Photo Library</Text>
            </MenuOption>
            <View style={styles.divider} />
            <MenuOption value={3}>
              <Text style={styles.menuOptionText}>Cancel</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const renderColorMenuOptions = () => {
    let lst = [];

    if (defaultStyles[selectedColor]) {
      lst = colors.filter(x => x !== selectedColor);
      lst.push('default');
      lst.push(selectedColor);
    } else {
      lst = colors.filter(x => true);
      lst.push('default');
    }

    return lst.map(item => {
      const color = defaultStyles[item] ? defaultStyles[item].color : 'black';
      return (
        <MenuOption value={item} key={item}>
          <MaterialCommunityIcons name="format-color-text" color={color} size={28} />
        </MenuOption>
      );
    });
  };

  const renderHighlightMenuOptions = () => {
    let lst = [];

    if (defaultStyles[selectedHighlight]) {
      lst = highlights.filter(x => x !== selectedHighlight);
      lst.push('default');
      lst.push(selectedHighlight);
    } else {
      lst = highlights.filter(x => true);
      lst.push('default');
    }

    return lst.map(item => {
      const bgColor = defaultStyles[item] ? defaultStyles[item].backgroundColor : 'black';
      return (
        <MenuOption value={item} key={item}>
          <MaterialCommunityIcons name="marker" color={bgColor} size={26} />
        </MenuOption>
      );
    });
  };

  const renderColorSelector = () => {
    let selectedColor = '#737373';
    if (defaultStyles[selectedColor]) {
      selectedColor = defaultStyles[selectedColor].color;
    }

    return (
      <Menu renderer={SlideInMenu} onSelect={onColorSelectorClicked}>
        <MenuTrigger>
          <MaterialCommunityIcons
            name="format-color-text"
            color={selectedColor}
            size={28}
            style={{
              top: 2
            }}
          />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>{renderColorMenuOptions()}</MenuOptions>
      </Menu>
    );
  };

  const renderHighlight = () => {
    let selectedColor = '#737373';
    if (defaultStyles[selectedHighlight]) {
      selectedColor = defaultStyles[selectedHighlight].backgroundColor;
    }
    return (
      <Menu renderer={SlideInMenu} onSelect={onHighlightSelectorClicked}>
        <MenuTrigger>
          <MaterialCommunityIcons name="marker" color={selectedColor} size={24} style={{}} />
        </MenuTrigger>
        <MenuOptions customStyles={highlightOptionsStyles}>
          {renderHighlightMenuOptions()}
        </MenuOptions>
      </Menu>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      keyboardVerticalOffset={IS_IOS ? 0 : 0}
      style={styles.root}>
      <View style={styles.container}>
        <Surface
          style={{
            elevation: 3,
            zIndex: 1
          }}>
          <LinearGradient
            colors={['#03a2a2', '#23c2c2']}
            locations={[0.5, 1]}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 12,
              paddingTop: 35,
              paddingLeft: 10,
              paddingRight: 10
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text type="bold" style={{ color: 'white', fontSize: 14 }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
              Round Writing
            </Text>
            <TouchableOpacity onPress={() => alert(value)}>
              <Text type="bold" style={{ color: 'white', fontSize: 14 }}>
                Done
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Surface>
      </View>
      <MenuProvider style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <CNRichTextEditor
              ref={input => (editor = input)}
              onSelectedTagChanged={onSelectedTagChanged}
              onSelectedStyleChanged={onSelectedStyleChanged}
              value={value}
              style={styles.editor}
              styleList={customStyles}
              foreColor="dimgray" // optional (will override default fore-color)
              onValueChanged={onValueChanged}
              onRemoveImage={onRemoveImage}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.toolbarContainer}>
          <CNToolbar
            style={{
              height: 35
            }}
            iconSetContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}
            size={28}
            iconSet={[
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'bold',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-bold" />
                  },
                  {
                    toolTypeText: 'italic',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-italic" />
                  },
                  {
                    toolTypeText: 'underline',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-underline" />
                  },
                  {
                    toolTypeText: 'lineThrough',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-strikethrough-variant" />
                  }
                ]
              },
              {
                type: 'seperator'
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'body',
                    buttonTypes: 'tag',
                    iconComponent: <MaterialCommunityIcons name="format-text" />
                  },
                  {
                    toolTypeText: 'title',
                    buttonTypes: 'tag',
                    iconComponent: <MaterialCommunityIcons name="format-header-1" />
                  },
                  {
                    toolTypeText: 'heading',
                    buttonTypes: 'tag',
                    iconComponent: <MaterialCommunityIcons name="format-header-3" />
                  },
                  {
                    toolTypeText: 'ul',
                    buttonTypes: 'tag',
                    iconComponent: <MaterialCommunityIcons name="format-list-bulleted" />
                  },
                  {
                    toolTypeText: 'ol',
                    buttonTypes: 'tag',
                    iconComponent: <MaterialCommunityIcons name="format-list-numbered" />
                  }
                ]
              },
              {
                type: 'seperator'
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'image',
                    iconComponent: renderImageSelector()
                  },
                  {
                    toolTypeText: 'color',
                    iconComponent: renderColorSelector()
                  },
                  {
                    toolTypeText: 'highlight',
                    iconComponent: renderHighlight()
                  }
                ]
              }
            ]}
            selectedTag={selectedTag}
            selectedStyles={selectedStyles}
            onStyleKeyPress={onStyleKeyPress}
            backgroundColor="aliceblue" // optional (will override default backgroundColor)
            color="gray" // optional (will override default color)
            selectedColor="white" // optional (will override default selectedColor)
            selectedBackgroundColor="deepskyblue" // optional (will override default selectedBackgroundColor)
          />
        </View>
      </MenuProvider>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  main: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    alignItems: 'stretch'
  },
  editor: {
    backgroundColor: '#fff'
  },
  toolbarContainer: {
    minHeight: 35
  },
  divider: {
    marginVertical: 0,
    marginHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: '#eee'
  }
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'yellow',
    padding: 0,
    width: 40,
    marginLeft: width - 40 - 30,
    alignItems: 'flex-end'
  },
  optionsWrapper: {
    backgroundColor: 'white'
  },
  optionWrapper: {
    margin: 2
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70
  }
};

const highlightOptionsStyles = {
  optionsContainer: {
    backgroundColor: 'transparent',
    padding: 0,
    width: 40,
    marginLeft: width - 40,

    alignItems: 'flex-end'
  },
  optionsWrapper: {
    backgroundColor: 'white'
  },
  optionWrapper: {
    margin: 2
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70
  }
};

export default RoundWritingScreen;
