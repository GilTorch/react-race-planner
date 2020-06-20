/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Modal, Portal, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import Dash from 'react-native-dash';
import { AllHtmlEntities } from 'html-entities';
import moment from 'moment';

import { getUserProfileUri, avatarGenerator } from '../../utils/functions';
import Text from '../CustomText';
import { SCREEN_HEIGHT } from '../../utils/dimensions';

const CommentModal = ({ visible, dismiss, parent }) => {
  return (
    <Portal>
      <Modal visible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            margin: 20,
            borderRadius: 6,
            overflow: 'hidden',
            height: SCREEN_HEIGHT * 0.95
          }}>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              paddingBottom: 10
            }}>
            <View
              style={{
                height: 35,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15
              }}>
              <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
                Round Comments
              </Text>
            </View>
            <View style={{ paddingLeft: 20, flexDirection: 'row' }}>
              <Text style={styles.label}>Author: </Text>
              <Text type="bold" style={styles.label}>
                {parent.author?.username || ''}
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.label}>Content:</Text>
            </View>
            <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={styles.text}>{parent.content || ''}</Text>
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20
              }}>
              <Text type="bold" style={styles.label}>
                Comments ({parent.comments?.length})
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={parent.comments}
              renderItem={({ item, index }) => (
                <View>
                  <View
                    style={{
                      borderColor: '#000',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'flex-start',
                      padding: 10,
                      marginVertical: 10
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
                            alignItems: 'center'
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
                              avatarGenerator(item.author.username)
                          }}
                        />
                      </View>
                    )}
                    <View style={{ flex: 3 }}>
                      <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <View>
                          <Text>
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
                          </Text>
                        </View>
                        <Text> {new AllHtmlEntities().decode('&middot;')} </Text>
                        <View>
                          <Text type="bold" style={{ color: '#5A7582' }}>
                            {moment(item.createdAt).fromNow()}
                          </Text>
                        </View>
                      </View>
                      <Text style={{ color: '#5A7582', lineHeight: 17 }}>{item.content}</Text>
                    </View>
                  </View>
                  {parent.comments?.length !== index + 1 && (
                    <Dash dashThickness={0.5} dashColor="#707070" style={{ width: '100%' }} />
                  )}
                </View>
              )}
              keyExtractor={item => `${item._id}`}
            />
            <View>
              <TextInput
                style={{
                  width: '100%',
                  height: 40,
                  borderTopWidth: 1,
                  borderColor: '#D3CBCB',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  padding: 5
                }}
                placeholder="Type your comment here..."
              />
              <TouchableOpacity
                onPress={dismiss}
                style={{
                  ...styles.button,
                  backgroundColor: '#F44336'
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

CommentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  parent: PropTypes.object.isRequired
};

const styles = {
  label: {
    color: '#5A7582'
  },
  text: {
    fontSize: 13,
    color: '#5A7582',
    textAlign: 'justify'
  },
  button: {
    width: 95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 10,
    height: 24,
    top: 13
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
};

export default CommentModal;
