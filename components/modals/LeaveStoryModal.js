import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modal, Portal, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';

import Text from '../CustomText';
import { leaveStoryAction, deleteStoryAction } from '../../redux/actions/StoryActions';

const LeaveStoryModal = ({
  visible,
  dismiss,
  isMasterAuthor,
  storyId,
  leavestory,
  deleteStory,
  navigation
}) => {
  const deleteStoryLoading = useSelector(state => state.story.deleteStoryLoading);
  const leaveStoryLoading = useSelector(state => state.story.leaveStoryLoading);

  const confirmDelete = async () => {
    try {
      await deleteStory(storyId);

      dismiss();
      navigation.goBack();
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  return (
    <Portal>
      <Modal visible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            borderRadius: 6
          }}>
          <View
            style={{
              borderRadius: 6,
              shadowColor: '#000'
            }}>
            <View
              style={{
                height: 35,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15
              }}>
              {isMasterAuthor && (
                <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
                  Delete This Story
                </Text>
              )}

              {!isMasterAuthor && (
                <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
                  Leave This Story
                </Text>
              )}
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5 }}>
              {isMasterAuthor && (
                <Text type="bold" style={styles.label}>
                  Are you sure you want to delete this story?
                </Text>
              )}

              {!isMasterAuthor && (
                <Text type="bold" style={styles.label}>
                  Are you sure you want to leave this story?
                </Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              {isMasterAuthor && (
                <TouchableOpacity
                  onPress={() => confirmDelete()}
                  style={{
                    ...styles.button,
                    backgroundColor: '#F44336',
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 10,
                    flexDirection: 'row'
                  }}>
                  {deleteStoryLoading && (
                    <ActivityIndicator style={{ marginRight: 10 }} size={18} color="#fff" />
                  )}
                  <Text style={{ ...styles.buttonText }}>Delete</Text>
                </TouchableOpacity>
              )}

              {!isMasterAuthor && (
                <TouchableOpacity
                  onPress={() => leavestory()}
                  style={{
                    ...styles.button,
                    backgroundColor: '#EC8918',
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 10,
                    flexDirection: 'row'
                  }}>
                  {leaveStoryLoading && (
                    <ActivityIndicator style={{ marginRight: 10 }} size={18} color="#fff" />
                  )}
                  <Text style={{ ...styles.buttonText }}>Just Leave</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={dismiss}
                style={{ ...styles.button, flex: 1, marginRight: 20 }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

LeaveStoryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  leavestory: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  isMasterAuthor: PropTypes.bool.isRequired,
  storyId: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  leavestory: leaveStoryAction,
  deleteStory: deleteStoryAction
};

const styles = {
  label: {
    color: '#5A7582',
    textAlign: 'center'
  },
  text: {
    fontSize: 13,
    color: '#5A7582',
    textAlign: 'justify'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    // alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#03A2A2',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    padding: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },

  buttonText: {
    color: 'white'
  }
};

export default connect(null, mapDispatchToProps)(LeaveStoryModal);
