import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CNRichTextEditor, {
  CNToolbar,
  getDefaultStyles,
  convertToObject,
} from 'react-native-cn-richtext-editor';
import { Surface, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';
import moment from 'moment';

import { createStoryAction, createRoundAction } from '../redux/actions/StoryActions';

const IS_IOS = Platform.OS === 'ios';
const defaultStyles = getDefaultStyles();

const RoundWritingScreen = ({ navigation, route, createStory, createRound }) => {
  const { story } = route.params;
  const [canWriteStory, setCanWriteStory] = useState(true);

  navigation.setOptions({
    headerShown: false,
  });

  const roundSubmittingEndsAt = moment(story?.roundSubmittingStartedAt).add(
    story.settings?.roundTimeLimitSeconds,
    'seconds',
  );

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setHidden(true);
      } else {
        StatusBar.setBarStyle('light-content');
      }
    }, []),
  );

  const createStoryLoading = useSelector((state) => state.story.createStoryLoading);

  const [customStyles] = useState({
    ...defaultStyles,
    body: { fontSize: 12 },
    heading: { fontSize: 16 },
    title: { fontSize: 20 },
    ol: { fontSize: 12 },
    ul: { fontSize: 12 },
    bold: { fontSize: 12, fontWeight: 'bold', color: '' },
  });

  const [selectedTag, setSelectedTag] = useState('body');

  const [selectedStyles, setSelectedStyles] = useState([]);
  const [value, setValue] = useState(
    convertToObject(
      '<div><p><span>This is </span><span style="font-weight: bold;">bold</span><span> and </span><span style="font-style: italic;">italic </span><span>text</span></p></div>',
      customStyles,
    ),
  );

  let editor = null;

  const onStyleKeyPress = (toolType) => {
    editor.applyToolbar(toolType);
  };

  const onSelectedTagChanged = (tag) => {
    setSelectedTag(tag);
  };

  const onSelectedStyleChanged = (styles) => {
    setSelectedStyles(styles);
  };

  const onValueChanged = (newVal) => {
    const trimmedValue = newVal.trim();

    if (trimmedValue.split(' ').length > route.params.story.settings.roundMaxWords) {
      setCanWriteStory(false);

      Toast.show('You reached your maximum character limit.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } else {
      setCanWriteStory(true);
      setValue(trimmedValue);
    }
  };

  const submitRound = async () => {
    try {
      if (route.params.isNewStory) {
        const story = await createStory({
          ...route.params.story,
          intro: value,
        });

        navigation.navigate('StoryScreen', { story, reducerName: 'writing', isNewStory: true });
      } else {
        const finalObj = {
          content: value,
        };

        if (route.params.entity === 'intro') {
          finalObj.isIntro = true;
        }

        if (route.params.entity === 'ending') {
          finalObj.isOutro = true;
        }

        // Send data as is and finish round creation remotely
        await createRound(finalObj, route.params.story?._id, route.params.round?._id);

        navigation.goBack();
      }
    } catch (e) {
      // This is a quick hack until we set
      // a local state in the Story screen
      if (!e) {
        navigation.goBack();
        return;
      }

      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      keyboardVerticalOffset={IS_IOS ? 0 : 0}
      style={styles.root}>
      <Surface
        style={{
          elevation: 3,
          zIndex: 1,
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.5, 1]}
          style={{
            paddingHorizontal: 10,
          }}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()} disabled={createStoryLoading}>
              <Text type="bold" style={{ color: 'white', fontSize: 14 }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <Text type="bold" style={{ color: 'white', fontSize: 18, marginVertical: 15 }}>
              {`${route.params.entity.charAt(0).toUpperCase()}${route.params.entity.slice(1)}`}{' '}
              Writing
            </Text>
            {createStoryLoading && (
              <ActivityIndicator color="#fff" size={Platform.OS === 'android' ? 30 : 'small'} />
            )}
            {!createStoryLoading && (
              <TouchableOpacity
                onPress={() => submitRound()}
                disabled={createStoryLoading || !canWriteStory}>
                <Text type="bold" style={{ color: canWriteStory ? 'white' : 'gray', fontSize: 14 }}>
                  Done
                </Text>
              </TouchableOpacity>
            )}
          </SafeAreaView>
        </LinearGradient>
      </Surface>
      <MenuProvider style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <CNRichTextEditor
              ref={(input) => {
                editor = input;
              }}
              onSelectedTagChanged={onSelectedTagChanged}
              onSelectedStyleChanged={onSelectedStyleChanged}
              value={value}
              placeholder={`Write your story ${route.params.entity} here...`}
              style={styles.editor}
              styleList={customStyles}
              foreColor="dimgray" // optional (will override default fore-color)
              onValueChanged={onValueChanged}
            />
          </View>
        </TouchableWithoutFeedback>
        {!story?.isNewStory && moment().isBefore(roundSubmittingEndsAt) && (
          <View style={{ backgroundColor: 'white', paddingBottom: 10 }}>
            <Text style={{ color: '#ed8a18', marginHorizontal: 20, marginTop: 7 }}>
              Submitting ends{' '}
              <Text style={{ fontWeight: 'bold' }}>{moment().to(roundSubmittingEndsAt)}</Text>
            </Text>
          </View>
        )}
        <View style={styles.toolbarContainer}>
          <CNToolbar
            style={{
              height: 35,
            }}
            iconSetContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
            size={28}
            iconSet={[
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'bold',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-bold" />,
                  },
                  {
                    toolTypeText: 'italic',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-italic" />,
                  },
                  {
                    toolTypeText: 'underline',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-underline" />,
                  },
                  {
                    toolTypeText: 'lineThrough',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-strikethrough-variant" />,
                  },
                ],
              },
              {
                type: 'seperator',
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'ul',
                    buttonTypes: 'tag',
                    iconComponent: <MaterialCommunityIcons name="format-list-bulleted" />,
                  },
                  {
                    toolTypeText: 'ol',
                    buttonTypes: 'tag',
                    iconComponent: <MaterialCommunityIcons name="format-list-numbered" />,
                  },
                ],
              },
            ]}
            selectedTag={selectedTag}
            selectedStyles={selectedStyles}
            onStyleKeyPress={onStyleKeyPress}
            backgroundColor="aliceblue" // optional (will override default backgroundColor)
            color="#03a2a2" // optional (will override default color)
            selectedColor="white" // optional (will override default selectedColor)
            selectedBackgroundColor="#03a2a2" // optional (will override default selectedBackgroundColor)
          />
        </View>
      </MenuProvider>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  main: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  editor: {
    backgroundColor: '#fff',
  },
  toolbarContainer: {
    minHeight: 35,
  },
  divider: {
    marginVertical: 0,
    marginHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

RoundWritingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  createStory: PropTypes.func.isRequired,
  createRound: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createStory: createStoryAction,
  createRound: createRoundAction,
};

export default connect(null, mapDispatchToProps)(RoundWritingScreen);
