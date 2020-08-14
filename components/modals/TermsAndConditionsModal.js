/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Modal, Portal, Surface, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../CustomText';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/dimensions';
import { createCommentAction } from '../../redux/actions/StoryActions';

const TermsAndConditionsModal = ({ visible, dismiss }) => {
  const uri = 'https://www.google.com/';

  return (
    <>
      <Portal>
        <Modal visible={visible}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 20,
              borderRadius: 6,
              overflow: 'hidden',
              height: SCREEN_HEIGHT * 0.95,
              marginBottom: 50,
            }}>
            <View style={{ flex: 1 }}>
              <Surface
                style={{
                  elevation: 3,
                  backgroundColor: 'blue',
                }}>
                <LinearGradient colors={['#03a2a2', '#23c2c2']} locations={[0.5, 1]}>
                  <SafeAreaView
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginTop: Constants.statusBarHeight,
                    }}>
                    <IconButton onPress={() => dismiss()} icon="arrow-left" color="white" />
                    <Text
                      type="bold"
                      style={{
                        color: 'white',
                        fontSize: 18,
                        margin: 'auto',
                        padding: 'auto',
                        left: SCREEN_WIDTH * 0.12,
                      }}>
                      Terms and Conditions
                    </Text>
                  </SafeAreaView>
                </LinearGradient>
              </Surface>
              <WebView source={{ uri }} />
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

TermsAndConditionsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createComment: createCommentAction,
};

export default connect(null, mapDispatchToProps)(TermsAndConditionsModal);
