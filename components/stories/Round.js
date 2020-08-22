/* eslint-disable no-underscore-dangle */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Toast from 'react-native-root-toast';
import { connect, useSelector } from 'react-redux';
import HTMLView from 'react-native-htmlview';

import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Text from '../CustomText';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/dimensions';
import BoxMenu from './BoxMenu';
import { skipRoundAction } from '../../redux/actions/StoryActions';
import LeaveStoryModal from '../modals/LeaveStoryModal';
import { CommentModal } from '../modals';
import ConfirmModal from '../modals/ConfirmModal';

const Round = ({
  navigation,
  round,
  totalRound,
  roundIdx,
  listMode,
  style,
  isMasterAuthorRound,
  isCompletedStory,
  story,
  skipRound,
}) => {
  const roundStatus = round.status;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.story.skipRoundLoading);
  const [confirmSkipVisible, setConfirmVisible] = React.useState(false);

  const [isLeaveStoryModalVisible, setIsLeaveStoryModalVisible] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  const showCommentModal = () => {
    setShowComment(true);
  };
  const dismissComment = () => setShowComment(false);

  const inprogressRound = roundStatus === 'in_progress';
  const userTurn = round?.author?._id === currentUser?._id;
  const height = inprogressRound && userTurn ? SCREEN_HEIGHT * 0.5 : 0;
  let authorName = isMasterAuthorRound ? 'the Master Author' : 'an Anonymous Author';
  const wordsCount = round.content?.split(' ').length || 0;

  const handleSkipRound = async () => {
    try {
      await skipRound(story._id, round._id);

      Toast.show('You have the next turn now', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  if (isCompletedStory) {
    if (round.privacyStatus === 'username') {
      authorName = round.author.username;
    } else if (round.privacyStatus === 'username_and_full_name') {
      authorName = `${round.author.firstName} ${round.author.lastName} (${round.author.username})`;
    }
  }

  const roundBody = (
    <>
      {roundStatus === 'completed' && <HTMLView value={round.content || 'No content'} />}

      {inprogressRound && !userTurn && <HTMLView value={round.content || 'No content yet'} />}

      {inprogressRound && userTurn && (
        <HTMLView
          value={round.content || 'No content yet. <u>Press here to write your round</u>'}
        />
      )}
    </>
  );

  const roundSubmittingEndsAt = moment(story?.roundSubmittingStartedAt).add(
    story.settings?.roundTimeLimitSeconds,
    'seconds',
  );

  const inprogress = (
    <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.7 }}>
      <Text style={styles.pendding}>{roundStatus || ''}</Text>
      <Text
        type="bold-italic"
        style={{ color: '#ED8A18', fontSize: 13, marginTop: 10, marginLeft: 10 }}>
        {moment().isBefore(roundSubmittingEndsAt) && (
          <Text style={{ color: '#ed8a18', marginHorizontal: 20, marginTop: 7 }}>
            (ends {moment().to(roundSubmittingEndsAt)})
          </Text>
        )}
      </Text>
    </View>
  );

  const userRound = (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('RoundWriting', { story, entity: 'round', round })}>
        {roundBody}
      </TouchableOpacity>
      <View style={{ marginTop: 'auto' }}>
        <Text style={styles.subTitle}>
          {wordsCount}/{story.settings.roundMaxWords} words
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          {round.skipCount !== 1 && roundIdx !== totalRound && (
            <Surface style={{ ...styles.surface, marginRight: 20 }}>
              <Button
                mode="contained"
                loading={loading}
                disabled={loading}
                uppercase={false}
                onPress={() => setConfirmVisible(true)}
                style={{ backgroundColor: '#ED8A18', width: SCREEN_WIDTH * 0.25 }}
                labelStyle={styles.boxBtnLabel}>
                Skip Turn
              </Button>
            </Surface>
          )}
          {roundIdx !== totalRound && (
            <Surface style={styles.surface}>
              <Button
                mode="contained"
                disabled={loading || true}
                uppercase={false}
                onPress={() => setIsLeaveStoryModalVisible(true)}
                style={{ backgroundColor: '#A39F9F' }}
                labelStyle={styles.boxBtnLabel}>
                {isMasterAuthorRound ? 'Delete Story' : 'Leave Story'}
              </Button>
            </Surface>
          )}
        </View>
      </View>
    </>
  );

  const listRound = (
    <View style={{ marginHorizontal: 35, marginBottom: 20, ...style }}>
      {/* <Text type="regular" style={{ color: '#5A7582', lineHeight: 20 }}>
        {round.content || ''}
      </Text> */}
      <HTMLView value={round.content} />
    </View>
  );

  const cardRound = (
    <View style={{ marginBottom: 20 }}>
      <LeaveStoryModal
        isMasterAuthor={isMasterAuthorRound}
        dismiss={() => setIsLeaveStoryModalVisible(false)}
        visible={isLeaveStoryModalVisible}
        storyId={story._id}
        navigation={navigation}
      />
      <Text type="medium" style={styles.title}>
        Round {roundIdx}/{totalRound} {userTurn && '(Your Turn)'}
      </Text>
      {inprogressRound && userTurn && moment().isBefore(roundSubmittingEndsAt) && (
        <Text
          style={{
            color: '#ed8a18',
            marginRight: 10,
            marginHorizontal: 20,
            marginTop: 3,
            marginBottom: 15,
          }}>
          Submitting ends {moment().to(roundSubmittingEndsAt)}
        </Text>
      )}
      <Surface style={{ ...styles.round, minHeight: height }}>
        <View style={styles.boxHeader}>
          <Text type="bold" style={styles.subTitle}>
            By {authorName}
          </Text>
          <BoxMenu parentType="round" block={round} />
        </View>
        {inprogressRound && userTurn && userRound}

        {inprogressRound && !userTurn && inprogress}

        {roundStatus === 'completed' && (
          <>
            {roundBody}
            <View style={{ marginTop: 'auto' }}>
              <CommentModal
                dismiss={dismissComment}
                visible={showComment}
                parent={round}
                storyStatus={story.status}
              />
              <Text style={styles.separator}>---</Text>
              <TouchableOpacity
                style={styles.displayRow}
                onPress={() => {
                  showCommentModal();
                }}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text type="bold" style={styles.boxFooter}>
                  Comments: {round.comments.length}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Surface>
    </View>
  );

  return (
    <>
      <ConfirmModal
        title="Skip Your Turn"
        subtitle="Are you sure your want to skip your round?"
        okLabel="Skip"
        okBtnStyle={{ backgroundColor: '#EC8918' }}
        cancelLabel="Cancel"
        visible={confirmSkipVisible}
        dismiss={() => setConfirmVisible(false)}
        onOkPressed={handleSkipRound}
      />

      {listMode ? listRound : cardRound}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#5A7582',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  round: {
    marginHorizontal: 40,
    minWidth: '70%',
    backgroundColor: '#fff',
    elevation: 2,
    alignSelf: 'center',
    padding: 15,
  },
  pendding: {
    color: '#ED8A18',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'RobotoItalic',
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxFooter: {
    marginLeft: 5,
    fontSize: 12,
    lineHeight: 20,
    color: '#5A7582',
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#5A7582',
  },
  boxBtnLabel: {
    fontSize: 11,
    fontFamily: 'RobotoMedium',
    color: '#fff',
  },
  surface: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  separator: {
    fontSize: 25,
    color: '#5A7582',
  },
  displayRow: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#03A2A2',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

Round.propTypes = {
  navigation: PropTypes.object.isRequired,
  round: PropTypes.object.isRequired,
  totalRound: PropTypes.number,
  roundIdx: PropTypes.number.isRequired,
  listMode: PropTypes.bool.isRequired,
  style: PropTypes.object,
  isMasterAuthorRound: PropTypes.bool,
  isCompletedStory: PropTypes.bool,
  story: PropTypes.object.isRequired,
  skipRound: PropTypes.func.isRequired,
};

Round.defaultProps = {
  style: {},
  totalRound: 11,
  isMasterAuthorRound: false,
  isCompletedStory: false,
};

const mapDispatchToProps = {
  skipRound: skipRoundAction,
};

export default connect(null, mapDispatchToProps)(Round);
