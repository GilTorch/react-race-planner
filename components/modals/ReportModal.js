import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Modal, Portal, TextInput, Surface, Button } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import { reportCommentAction } from '../../redux/actions/StoryActions';
import Text from '../CustomText';
import { newReportSchema } from '../../utils/validators';
import { SCREEN_HEIGHT } from '../../utils/dimensions';

const ReportModal = ({ visible, onDismiss, parentType, parent, reportComment }) => {
  const [padding, setPadding] = React.useState(0);
  const rounds = parentType === 'round' || parentType === 'Ending' || parentType === 'Intro';
  const loadingReportComment = useSelector(state => state.story.loadingReportComment);

  const { errors, handleSubmit, register, setValue } = useForm({
    validationSchema: newReportSchema
  });

  const keyboardDidShow = e => {
    const add = parentType === 'story' ? -10 : SCREEN_HEIGHT * 0.15;
    setPadding(add + e.endCoordinates.height);
  };

  React.useEffect(() => {
    register('status');
    register('isActive');
    register('reason');
    Keyboard.addListener('keyboardDidHide', () => setPadding(0));
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  });

  const loremText = 'some text';

  const onSubmit = async report => {
    try {
      if (parentType === 'comment') {
        // eslint-disable-next-line no-underscore-dangle
        await reportComment({ commentId: parent._id, report });

        Toast.show('Comment successfully reported', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM
        });
      }
      // if Intro/Ending/round

      // if story
    } catch (error) {
      Toast.show('Something unexpected happened', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={visible}
        contentContainerStyle={{
          width: '90%',
          alignSelf: 'center'
        }}
        onDismiss={onDismiss}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 6,
            overflow: 'hidden'
          }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ backgroundColor: 'white' }}>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 10
                }}>
                {parentType === 'comment' && (
                  <Text type="bold" style={{ fontSize: 24, color: textColor }}>
                    Report This Comment
                  </Text>
                )}
                {parentType !== 'comment' && (
                  <Text type="bold" style={{ fontSize: 24, color: textColor }}>
                    Report This {parentType === 'story' ? 'Story' : 'Round'}
                  </Text>
                )}
              </View>

              <View style={{ marginHorizontal: 20 }}>
                {parentType === 'story' && (
                  <>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={styles.text}>Title: </Text>
                      <Text type="bold" style={styles.text}>
                        {parent.title || 'Story Title'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={styles.text}>Genre: </Text>
                      <Text type="bold" style={styles.text}>
                        {parent.genre?.name || 'Story Genre'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={styles.text}>Status: </Text>
                      <Text type="bold" style={styles.text}>
                        {parent.status || 'Story Status'}
                      </Text>
                    </View>
                  </>
                )}
                {rounds && (
                  <>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={styles.text}>Author: </Text>
                      <Text type="bold" style={styles.text}>
                        Anonymous 1
                      </Text>
                    </View>
                    <Text style={{ ...styles.text, paddingBottom: 2 }}>Content: </Text>
                    <Text style={{ color: textColor, lineHeight: 17 }}>{loremText}</Text>
                  </>
                )}
                {parentType === 'comment' && (
                  <>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={styles.text}>Author: </Text>
                      <Text type="bold" style={styles.text}>
                        {parent.author?.username || 'Round Author'}
                      </Text>
                    </View>
                    <Text style={{ ...styles.text, paddingBottom: 2 }}>Content: </Text>
                    <Text style={{ color: textColor, lineHeight: 17 }}>
                      {parent.content || 'Round Content'}
                    </Text>
                  </>
                )}
                <View style={{ marginTop: 30 }}>
                  <Text type="bold" style={{ ...styles.text }}>
                    Reason for reporting
                  </Text>
                </View>
                <TextInput
                  placeholder="Your reason for reporting here..."
                  onChangeText={text => {
                    setValue('reason', text);
                  }}
                  multiline
                  underlineColor="white"
                  style={{
                    borderWidth: 1,
                    marginTop: 5,
                    borderStyle: 'dashed',
                    backgroundColor: 'white'
                  }}
                />
                {errors.reason && (
                  <Text style={{ marginTop: 10, marginBottom: 10, color: 'red' }}>
                    {errors.reason.message}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    width: '65%',
                    alignSelf: 'flex-end',
                    justifyContent: 'space-between'
                  }}>
                  <Surface style={styles.btnSurface}>
                    <Button
                      uppercase={false}
                      onPress={handleSubmit(onSubmit)}
                      style={{ backgroundColor: '#03A2A2' }}>
                      <Text type="bold" style={{ color: '#FFF' }}>
                        {loadingReportComment && (
                          <>
                            <Text type="bold" style={{ color: '#fff' }}>
                              Reporting
                            </Text>
                          </>
                        )}

                        {!loadingReportComment && (
                          <Text type="bold" style={{ color: '#fff' }}>
                            Report
                          </Text>
                        )}
                      </Text>
                    </Button>
                  </Surface>
                  <Surface style={styles.btnSurface}>
                    <Button
                      uppercase={false}
                      onPress={onDismiss}
                      style={{ backgroundColor: '#f44336' }}>
                      <Text type="bold" style={{ color: '#fff' }}>
                        Cancel
                      </Text>
                    </Button>
                  </Surface>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ paddingBottom: padding }} />
        </View>
      </Modal>
    </Portal>
  );
};

ReportModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  parentType: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  reportComment: PropTypes.func.isRequired
};

const textColor = '#5A7582';

const styles = StyleSheet.create({
  text: { color: textColor },
  btnSurface: {
    elevation: 4,
    marginVertical: 10,
    borderRadius: 5
  }
});

const mapDispatchToProps = {
  reportComment: reportCommentAction
};

export default connect(null, mapDispatchToProps)(ReportModal);
