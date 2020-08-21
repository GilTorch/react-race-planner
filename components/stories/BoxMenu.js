import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Toast from 'react-native-root-toast';
import moment from 'moment';
import Text from '../CustomText';
import { CommentModal, VotingModal } from '../modals';
import ReportModal from '../modals/ReportModal';

const BoxMenu = ({ parentType, block, storyStatus, storyId, userIsAuthor }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const inProgresstories = useSelector((state) => state.home.stories) || [];
  const completedStories = useSelector((state) => state.library.stories) || [];
  const myStories = useSelector((state) => state.writing.stories) || [];

  const storedStory =
    [...myStories, ...inProgresstories, ...completedStories].find((s) => s._id === storyId) || {};

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
    'outro_voting',
  ];
  const tooLatetoVoteForIntro = inProgressStatuses.slice(3).includes(storyStatus);
  const introEnding = parentType === 'Intro' || parentType === 'Ending';
  let votingMessage = "It's not time to vote yet";
  if (storyStatus === 'completed') {
    votingMessage = 'Voting is over for endings';
  }
  if (parentType === 'Intro' && tooLatetoVoteForIntro) {
    votingMessage = 'Voting is over for intros';
  }
  if (
    (parentType === 'Intro' && storyStatus === 'intro_voting') ||
    (parentType === 'Ending' && storyStatus === 'outro_voting')
  ) {
    votingMessage = 'Voting is in progress';
  }

  const showReportModal = () => {
    setshowMenu(false);
    setShowReport(true);
  };

  const showCommentModal = () => {
    setshowMenu(false);
    setShowComment(true);
  };

  const showVotingModal = () => {
    const introVotingEndsAt = moment(storedStory.introVotingStartedAt).add(
      storedStory.settings?.voteTimeLimitSeconds,
      'seconds',
    );

    const userPartOfStory =
      storedStory?.coAuthors?.some((ca) => ca.profile._id === currentUser?._id) ||
      storedStory?.masterAuthor?._id === currentUser?._id;

    if (!userPartOfStory) {
      Toast.show('You are not a participant', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });

      return;
    }

    if (userIsAuthor) {
      Toast.show(`You cannot vote for your own ${parentType.toLowerCase()}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });

      return;
    }

    if (parentType === 'Intro' && storyStatus !== 'intro_voting') {
      setshowMenu(false);

      let message = "It's not time to vote yet";

      if (
        tooLatetoVoteForIntro ||
        (storedStory.introVotingStartedAt && moment().isAfter(introVotingEndsAt))
      ) {
        message = "It's too late to vote now";
      }

      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });

      return;
    }

    if (parentType === 'Ending' && storyStatus !== 'outro_voting') {
      setshowMenu(false);

      let message = "It's not time to vote yet";

      if (storedStory.status === 'completed') {
        message = "It's too late to vote now";
      }

      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });

      return;
    }

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
      <VotingModal
        dismiss={dismissVoting}
        visible={showVoting}
        parentType={parentType}
        storyId={storyId}
        roundId={block._id}
      />
      <CommentModal
        dismiss={dismissComment}
        visible={showComment}
        parent={block}
        storyStatus={storedStory.status}
      />
      <TouchableOpacity testID="three-dot-menu-button" onPress={() => setshowMenu(true)}>
        <Menu
          contentStyle={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            elevation: 3,
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
                showCommentModal();
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
                    {votingMessage}
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
  block: PropTypes.object.isRequired,
  storyStatus: PropTypes.string,
  storyId: PropTypes.string,
  userIsAuthor: PropTypes.bool,
};

BoxMenu.defaultProps = {
  storyStatus: 'waiting_for_players',
  userIsAuthor: false,
  storyId: '',
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 20,
    alignItems: 'center',
  },
});

export default BoxMenu;
