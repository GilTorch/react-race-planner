import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import Text from '../CustomText';
import { ReportModal, CommentModal, VotingModal } from '../modals';

const BoxMenu = ({ parentType, block }) => {
  const [showMenu, setshowMenu] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showVoting, setShowVoting] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  const inProgressStatuses = [
    'waiting_for_players',
    'waiting_for_intros',
    'intro_voting',
    'round_writing',
    'waiting_for_outros',
    'outro_voting'
  ];
  const penddingStatus = inProgressStatuses.includes(block.status);
  const introEnding = parentType === 'Intro' || parentType === 'Ending';

  const showReportModal = () => {
    setshowMenu(false);
    setShowReport(true);
  };

  const showCommentModal = () => {
    setshowMenu(false);
    setShowComment(true);
  };

  const showVotingModal = () => {
    setshowMenu(false);
    setShowVoting(true);
  };

  const dismissReport = () => setShowReport(false);
  const dismissVoting = () => setShowVoting(false);
  const dismissComment = () => setShowComment(false);

  return (
    <>
      <ReportModal
        visible={showReport}
        parentType={parentType}
        parent={block}
        onDismiss={dismissReport}
      />
      {introEnding && (
        <VotingModal
          dismiss={dismissVoting}
          visible={showVoting}
          parentType={parentType}
          parent={block}
        />
      )}
      <CommentModal dismiss={dismissComment} visible={showComment} parent={block} />

      <TouchableOpacity testID="three-dot-menu-button" onPress={() => setshowMenu(true)}>
        <Menu
          contentStyle={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            elevation: 3
          }}
          visible={showMenu}
          anchor={<Feather name="more-vertical" size={23} color="#5A7582" />}
          onDismiss={() => setshowMenu(false)}>
          <TouchableOpacity onPress={showReportModal} style={styles.menuItem}>
            <FontAwesome name="flag" size={16} color="#F44336" style={{ marginRight: 10 }} />
            <Text type="regular" style={{ color: '#5A7582' }}>
              Report
            </Text>
          </TouchableOpacity>
          {parentType === 'round' && (
            <TouchableOpacity
              onPress={() => {
                if (!penddingStatus) {
                  showCommentModal();
                }
              }}
              style={{ ...styles.menuItem, marginTop: 10 }}>
              <FontAwesome
                name="commenting"
                size={16}
                color="#0277BD"
                style={{ marginRight: 10 }}
              />
              <Text type="regular" style={{ color: '#5A7582' }}>
                Comment
              </Text>
            </TouchableOpacity>
          )}
          {introEnding && (
            <>
              <TouchableOpacity
                onPress={showCommentModal}
                style={{ ...styles.menuItem, marginTop: 10 }}>
                <FontAwesome
                  name="commenting"
                  size={16}
                  color="#0277BD"
                  style={{ marginRight: 10 }}
                />
                <Text type="regular" style={{ color: '#5A7582' }}>
                  Comment
                </Text>
              </TouchableOpacity>
              <Divider style={{ marginTop: 5 }} />
              <TouchableOpacity
                onPress={showVotingModal}
                style={{ ...styles.menuItem, marginTop: 5 }}>
                <FontAwesome5
                  name="vote-yea"
                  size={15}
                  color="#911414"
                  style={{ marginRight: 10 }}
                />
                <View>
                  <Text type="regular" style={{ color: '#5A7582' }}>
                    Vote
                  </Text>
                  <Text type="regular" style={{ color: '#EC8918', fontSize: 8 }}>
                    {block.hasElected ? 'Voting is over' : 'Votes end in 34 minutes'}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </Menu>
      </TouchableOpacity>
    </>
  );
};

BoxMenu.propTypes = {
  parentType: PropTypes.string.isRequired,
  block: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 20,
    alignItems: 'center'
  }
});

export default BoxMenu;
