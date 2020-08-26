/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, TouchableOpacity, FlatList, Image, Keyboard, Platform } from 'react-native';
import { Modal, Portal, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Dash from 'react-native-dash';
import { AllHtmlEntities } from 'html-entities';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';

import { getUserProfileUri, avatarGenerator } from '../../utils/functions';
import Text from '../CustomText';
import { SCREEN_HEIGHT } from '../../utils/dimensions';
import { createCommentAction } from '../../redux/actions/StoryActions';
import { commentSchema } from '../../utils/validators';
import CommentMenu from '../CommentMenu';
import { Story } from '../../redux/actions/types';

const CommentModal = ({ visible, dismiss, parent, storyStatus, createComment }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [margin, setMargin] = React.useState(0);
  const [comments, setComments] = React.useState(parent?.comments);
  const [updateStory, setUpdateStory] = React.useState(null);

  const flatRef = React.useRef();

  const defaultValues = {
    author: currentUser?._id,
    content: '',
    // TODO: provide a checkbox to the user for them to appear publicly
    // when the story ends
    privacyStatus: 'anonymous',
    isActive: true,
  };

  const { errors, handleSubmit, register, watch, setValue, reset } = useForm({
    validationSchema: commentSchema,
    defaultValues,
  });

  const submit = async (data) => {
    try {
      const { comment: newComment, story } = await createComment(data, parent?._id);
      reset(defaultValues);
      setComments([...comments, newComment]);
      setUpdateStory(story);
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  const onKeyboardHide = () => {
    if (errors.content) {
      setMargin(15);
    } else {
      setMargin(0);
    }
  };

  React.useEffect(() => {
    register('content');
    register('author');
    register('privacyStatus');
    register('isActive');
  }, [register]);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setMargin(Platform.OS === 'android' ? 200 : 500);
    });
    Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  });

  return (
    <Portal>
      <Modal visible={visible} dismissable={false}>
        <View
          style={{
            backgroundColor: 'white',
            margin: 20,
            borderRadius: 6,
            overflow: 'hidden',
            height: SCREEN_HEIGHT * 0.95,
            marginBottom: margin,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              paddingBottom: 10,
            }}>
            <View
              style={{
                height: 35,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
                Round Comments
              </Text>
            </View>
            <View style={{ paddingLeft: 20, flexDirection: 'row' }}>
              <Text style={styles.label}>Author: </Text>
              <Text type="bold" style={styles.label}>
                {storyStatus !== 'completed' ? 'Anonymous' : parent?.author?.username || ''}
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.label}>Content:</Text>
            </View>
            <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
              {/* <Text style={styles.text}>{parent?.content || ''}</Text> */}
              <HTMLView value={parent?.content} />
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
              }}>
              <Text type="bold" style={styles.label}>
                Comments ({comments?.length})
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={comments}
              ref={flatRef}
              renderItem={({ item, index }) => (
                <View>
                  <View
                    style={{
                      borderColor: '#000',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'flex-start',
                      padding: 10,
                      marginVertical: 10,
                    }}>
                    {item.privacyStatus === 'anonymous' && (
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View
                          style={{
                            backgroundColor: '#5A7582',
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <FontAwesome name="user" size={30} color="white" />
                        </View>
                      </View>
                    )}

                    {item.privacyStatus !== 'anonymous' && (
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          resizeMode="contain"
                          style={{ height: 50, width: 50, borderRadius: 100 }}
                          source={{
                            uri:
                              getUserProfileUri(item.author.picture) ||
                              avatarGenerator(item.author.username),
                          }}
                        />
                      </View>
                    )}
                    <View style={{ flex: 3 }}>
                      <View
                        style={{
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          {item.privacyStatus === 'anonymous' && (
                            <Text type="bold" style={{ color: '#03A2A2' }}>
                              Anonymous {index}
                            </Text>
                          )}

                          {item.privacyStatus !== 'anonymous' && (
                            <Text type="bold" style={{ color: '#03A2A2' }}>
                              {item.author.firstName} {item.author.lastName}
                            </Text>
                          )}
                        </View>
                        <Text> {new AllHtmlEntities().decode('&middot;')} </Text>
                        <View>
                          <Text type="bold" style={{ color: '#5A7582' }}>
                            {moment(item.createdAt).fromNow()}
                          </Text>
                        </View>
                        <CommentMenu comment={item} />
                      </View>
                      {/* <Text style={{ color: '#5A7582', lineHeight: 17 }}>{item.content}</Text> */}
                      <HTMLView value={item.content} />
                    </View>
                  </View>
                  {comments?.length !== index + 1 && (
                    <Dash dashThickness={0.5} dashColor="#707070" style={{ width: '100%' }} />
                  )}
                </View>
              )}
              keyExtractor={(item) => `${item._id}`}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TextInput
                underlineColor={errors.content ? 'red' : 'white'}
                value={watch('content')}
                onChangeText={(text) => setValue('content', text)}
                returnKeyType="send"
                multiline
                style={{
                  borderTopWidth: 1,
                  borderColor: '#D3CBCB',
                  width: '85%',
                  backgroundColor: 'white',
                  padding: 5,
                }}
                placeholder="Type your comment here..."
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    dismiss();
                    reset(defaultValues);
                    if (updateStory) {
                      dispatch({ type: Story.COMMENT_ROUND_SUCCESS, story: updateStory });
                    }
                  }}
                  style={{
                    ...styles.button,
                    backgroundColor: '#F44336',
                  }}>
                  <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit(submit)}
                  style={{
                    ...styles.button,
                    backgroundColor: '#03a2a2',
                  }}>
                  <FontAwesome5 name="paper-plane" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            {errors.content && (
              <Text style={{ fontSize: 12, marginVertical: 3, marginLeft: 5, color: 'red' }}>
                {errors.content.message}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = {
  label: {
    color: '#5A7582',
  },
  text: {
    fontSize: 13,
    color: '#5A7582',
    textAlign: 'justify',
  },
  button: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
};

CommentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  parent: PropTypes.object.isRequired,
  storyStatus: PropTypes.string,
  createComment: PropTypes.func.isRequired,
};

CommentModal.defaultProps = {
  storyStatus: 'in_progress',
};

const mapDispatchToProps = {
  createComment: createCommentAction,
};

export default connect(null, mapDispatchToProps)(CommentModal);
