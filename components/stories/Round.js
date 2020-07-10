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
import Text from '../CustomText';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/dimensions';
import BoxMenu from './BoxMenu';
import { skipRoundAction } from '../../redux/actions/StoryAction';
import LeaveStoryModal from '../modals/LeaveStoryModal';

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

  const [isLeaveStoryModalVisible, setIsLeaveStoryModalVisible] = React.useState(false);

  const inprogressRound = roundStatus === 'in_progress';
  const userTurn = round?.author?._id === currentUser?._id;
  const height = inprogressRound && userTurn ? SCREEN_HEIGHT * 0.5 : 0;
  let authorName = isMasterAuthorRound ? 'the Master Author' : 'an Anonymous Author';
  const wordsCount = round.content?.split(' ').length || 0;

  // if (userTurn) {
  //   console.log(round);
  // }

  const handleSkipRound = async () => {
    try {
      await skipRound(story._id, round._id);
    } catch (e) {
      Toast.show(e, {
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
    // <Text type="regular" style={{ color: '#5A7582', lineHeight: 20 }}>
    //   {round.content || ''}
    // </Text>

    <HTMLView value={round.content || 'no content yet. <u>Press to add text</u>'} />
  );

  const inprogress = (
    <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.7 }}>
      <Text style={styles.pendding}>{roundStatus || ''}</Text>
      <Text
        type="bold-italic"
        style={{ color: '#ED8A18', fontSize: 13, marginTop: 10, marginLeft: 10 }}>
        {round.timeLeft || ''}
      </Text>
    </View>
  );

  const userRound = (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('RoundWriting', { story, entity: 'round' })}>
        {roundBody}
      </TouchableOpacity>
      <View style={{ marginTop: 'auto' }}>
        <Text style={styles.subTitle}>{wordsCount}/50 words</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          {round.skipCount !== 1 && (
            <Surface style={{ ...styles.surface, marginRight: 20 }}>
              <Button
                mode="contained"
                loading={loading}
                disabled={loading}
                uppercase={false}
                onPress={handleSkipRound}
                style={{ backgroundColor: '#ED8A18', width: SCREEN_WIDTH * 0.25 }}
                labelStyle={styles.boxBtnLabel}>
                Skip Turn
              </Button>
            </Surface>
          )}

          <Surface style={styles.surface}>
            <Button
              mode="contained"
              disabled={loading}
              uppercase={false}
              onPress={() => setIsLeaveStoryModalVisible(true)}
              style={{ backgroundColor: '#f44336' }}
              labelStyle={styles.boxBtnLabel}>
              {isMasterAuthorRound ? 'Delete Story' : 'Leave Story'}
            </Button>
          </Surface>
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
              <Text style={styles.separator}>---</Text>
              <View style={styles.displayRow}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text type="bold" style={styles.boxFooter}>
                  Comments: {round.comments.length}
                </Text>
              </View>
            </View>
          </>
        )}
      </Surface>
    </View>
  );

  return listMode ? listRound : cardRound;
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
});

Round.propTypes = {
  navigation: PropTypes.object.isRequired,
  round: PropTypes.object.isRequired,
  totalRound: PropTypes.number,
  listMode: PropTypes.bool.isRequired,
  style: PropTypes.object,
  isMasterAuthorRound: PropTypes.bool,
  isCompletedStory: PropTypes.bool,
  story: PropTypes.object.isRequired,
  skipRound: PropTypes.func,
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
