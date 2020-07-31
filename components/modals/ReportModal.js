/* eslint-disable no-underscore-dangle */
import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Modal, Portal, TextInput, Surface, Button } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';

import HTMLView from 'react-native-htmlview';
import Text from '../CustomText';
import { createReportAction, reportCommentAction } from '../../redux/actions/StoryActions';
import { reportSchema } from '../../utils/validators';
import { SCREEN_HEIGHT } from '../../utils/dimensions';

const ReportModal = ({ visible, onDismiss, parentType, parent, createReport, reportComment }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.story.createReportLoading);
  const reportCommentLoading = useSelector((state) => state.story.reportCommentLoading);

  const [margin, setMargin] = React.useState(0);

  const { errors, handleSubmit, register, watch, setValue } = useForm({
    validationSchema: reportSchema,
    defaultValues: {
      reporter: user?._id,
      status: 'pending',
      documentId: parent._id,
    },
  });

  const submit = async (data) => {
    try {
      if (parentType === 'comment') {
        // eslint-disable-next-line no-underscore-dangle
        await reportComment({ commentId: parent._id, report: data });

        Toast.show('Comment successfully reported', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      } else {
        await createReport(data);

        Toast.show('Report sent', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  React.useEffect(() => {
    register('reason');
    register('reporter');
    register('status');
    register('documentId');
  }, [register]);

  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={visible}
        contentContainerStyle={{
          width: '90%',
          alignSelf: 'center',
        }}
        onDismiss={onDismiss}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 6,
            overflow: 'hidden',
            marginBottom: Platform.OS === 'ios' ? margin : 0,
          }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ backgroundColor: 'white' }}>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 10,
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
                {parentType === 'comment' && (
                  <>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={styles.text}>Author: </Text>
                      <Text type="bold" style={styles.text}>
                        {parent.author?.username || 'Round Author'}
                      </Text>
                    </View>
                    <Text style={{ ...styles.text, paddingBottom: 2 }}>Content: </Text>
                    {/* <Text style={{ color: textColor, lineHeight: 17 }}>
                      {parent.content || 'Round Content'}
                    </Text> */}
                    <HTMLView value={parent.content} />
                  </>
                )}
                <View style={{ marginTop: 30 }}>
                  <Text type="bold" style={{ ...styles.text }}>
                    Reason for reporting
                  </Text>
                </View>
                <TextInput
                  placeholder="Your reason for reporting here..."
                  value={watch('reason')}
                  multiline
                  underlineColor={errors.reason ? 'red' : 'white'}
                  onChangeText={(text) => setValue('reason', text)}
                  onFocus={() => setMargin(SCREEN_HEIGHT * 0.3)}
                  onBlur={() => setMargin(0)}
                  style={{
                    borderWidth: 1,
                    marginTop: 5,
                    borderStyle: 'dashed',
                    backgroundColor: 'white',
                  }}
                />
                {errors.reason && (
                  <Text style={{ fontSize: 12, marginTop: 3, color: 'red' }}>
                    {errors.reason.message}
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    width: '65%',
                    alignSelf: 'flex-end',
                    justifyContent: 'space-between',
                  }}>
                  <Surface style={styles.btnSurface}>
                    <Button
                      uppercase={false}
                      loading={loading}
                      disabled={loading}
                      onPress={handleSubmit(submit)}
                      style={{ backgroundColor: '#03A2A2' }}>
                      <Text type="bold" style={{ color: '#FFF' }}>
                        {reportCommentLoading && (
                          <>
                            <Text type="bold" style={{ color: '#fff' }}>
                              Reporting
                            </Text>
                          </>
                        )}

                        {!reportCommentLoading && (
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
        </View>
      </Modal>
    </Portal>
  );
};

const textColor = '#5A7582';

const styles = StyleSheet.create({
  text: { color: textColor },
  btnSurface: {
    elevation: 4,
    marginVertical: 10,
    borderRadius: 5,
  },
});

ReportModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  parentType: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  createReport: PropTypes.func.isRequired,
  reportComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createReport: createReportAction,
  reportComment: reportCommentAction,
};

export default connect(null, mapDispatchToProps)(ReportModal);
