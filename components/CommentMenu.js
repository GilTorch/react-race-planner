/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Surface, Portal, Modal, Button } from 'react-native-paper';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';
import Toast from 'react-native-root-toast';

import Text from './CustomText';
import ReportModal from './modals/ReportModal';
import { deleteCommentAction } from '../redux/actions/StoryActions';

const CommentMenu = ({ comment, deleteComment }) => {
  // const loading = useSelector(state => state.story.loading);
  const user = useSelector(state => state.auth.currentUser); // TODO: use the id instead of the email

  const [showMenu, setshowMenu] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const ownComment = user.email === comment.author.email;

  const showReportModal = () => {
    setshowMenu(false);
    setShowReport(true);
  };

  const showDeleteModal = () => {
    setshowMenu(false);
    setShowDelete(true);
  };

  const hideDeleteModal = () => {
    setShowDelete(false);
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment._id);
      hideDeleteModal();
    } catch (e) {
      hideDeleteModal();
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  const dismissReport = () => setShowReport(false);

  return (
    <>
      <ReportModal
        visible={showReport}
        parentType="comment"
        parent={comment}
        onDismiss={dismissReport}
      />

      <Portal>
        <Modal
          dismissable={false}
          visible={showDelete}
          contentContainerStyle={{
            backgroundColor: 'white',
            borderRadius: 6,
            width: '90%',
            alignSelf: 'center'
          }}
          onDismiss={() => setShowDelete(false)}>
          <View
            style={{
              alignItems: 'center',
              margin: 20,
              marginBottom: 10
            }}>
            <Text type="bold" style={{ fontSize: 20, color: '#5A7582' }}>
              Are you sure you whant to delete the comment?
            </Text>
          </View>
          <View
            style={{
              marginTop: 30,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}>
            <Surface style={styles.btnSurface}>
              <Button
                onPress={handleDeleteComment}
                testID="delete-account"
                style={{ backgroundColor: '#f44336' }}>
                <Text type="bold" style={{ color: '#fff' }}>
                  Delete
                </Text>
              </Button>
            </Surface>
            <Surface style={styles.btnSurface}>
              <Button
                testID="cancel-deletion"
                onPress={() => setShowDelete(false)}
                style={{ backgroundColor: '#03A2A2' }}>
                <Text type="bold" style={{ color: '#FFF' }}>
                  Cancel
                </Text>
              </Button>
            </Surface>
          </View>
        </Modal>
      </Portal>

      <TouchableOpacity testID="three-dot-menu-button" onPress={() => setshowMenu(true)}>
        <Menu
          contentStyle={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            elevation: 3
          }}
          visible={showMenu}
          anchor={<Feather name="more-vertical" size={18} color="#5A7582" />}
          onDismiss={() => setshowMenu(false)}>
          {ownComment && (
            <TouchableOpacity onPress={showDeleteModal} style={styles.menuItem}>
              <FontAwesome name="trash" size={18} color="#F44336" style={{ marginRight: 10 }} />
              <Text type="regular" style={{ color: '#5A7582' }}>
                Delete
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={showReportModal}
            style={{ ...styles.menuItem, marginTop: ownComment ? 10 : 0 }}>
            <FontAwesome name="flag" size={16} color="#F44336" style={{ marginRight: 10 }} />
            <Text type="regular" style={{ color: '#5A7582' }}>
              Report
            </Text>
          </TouchableOpacity>
        </Menu>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 20,
    alignItems: 'center'
  }
});

CommentMenu.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func
};

CommentMenu.defaultProps = {
  deleteComment: () => ''
};

const mapDispatchToProps = {
  deleteComment: deleteCommentAction
};

export default connect(null, mapDispatchToProps)(CommentMenu);
