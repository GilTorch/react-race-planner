import React from 'react';
import { TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Modal, Portal, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import Dash from 'react-native-dash';
import { AllHtmlEntities } from 'html-entities';
import Text from './CustomText';
import { SCREEN_HEIGHT } from '../utils/dimensions';
import { comments } from '../utils/data';

const CommentModal = ({ visible, dismiss }) => {
  return (
    <Portal>
      <Modal visible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            margin: 20,
            borderRadius: 6,
            overflow: 'hidden',
            height: SCREEN_HEIGHT - 100
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
                marginTop: 10,
                paddingRight: 10,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
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
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10
              }}>
              <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
                Round Comments
              </Text>
            </View>
            <View style={{ paddingLeft: 20, marginTop: 20, flexDirection: 'row' }}>
              <Text style={styles.label}>Author: </Text>
              <Text type="bold" style={styles.label}>
                Anonymous 8
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.label}>Content:</Text>
            </View>
            <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                no sea. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                gubergren, no sea.
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20
              }}>
              <Text type="bold" style={styles.label}>
                Comments (8)
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={comments}
              renderItem={({ item, index }) => (
                <View>
                  <View
                    style={{
                      borderColor: '#000',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'flex-start',
                      padding: 10,
                      paddingBottom: 10
                    }}>
                    {item.author.anonymous ? (
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
                    ) : (
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            resizeMode="contain"
                            style={{ height: 50, width: 50, borderRadius: 100 }}
                            source={{ uri: item.author.profilePicture }}
                          />
                        </View>
                      )}
                    <View style={{ flex: 3 }}>
                      <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <View>
                          <Text>
                            {item.author.anonymous ? (
                              <Text type="bold" style={{ color: '#03A2A2' }}>
                                Anonymous {index}
                              </Text>
                            ) : (
                                <Text type="bold" style={{ color: '#03A2A2' }}>
                                  {item.author.firstName} {item.author.lastName}
                                </Text>
                              )}
                          </Text>
                        </View>
                        <Text> {new AllHtmlEntities().decode('&middot;')} </Text>
                        <View>
                          <Text type="bold" style={{ color: '#5A7582' }}>
                            {item.startTime}
                          </Text>
                        </View>
                      </View>
                      <Text style={{ color: '#5A7582', lineHeight: 17 }}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut labore. Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
                      </Text>
                    </View>
                  </View>
                  <Dash dashThickness={0.5} dashColor="#707070" style={{ width: '100%' }} />
                </View>
              )}
              keyExtractor={item => item.id}
            />
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
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

CommentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired
};

const styles = {
  label: {
    fontSize: 18,
    color: '#5A7582'
  },
  text: {
    fontSize: 15,
    color: '#5A7582',
    textAlign: 'justify'
  }
};

export default CommentModal;
