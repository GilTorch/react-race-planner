/* eslint-disable consistent-return */
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import { useSelector, connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

import moment from 'moment';
import Text from '../CustomText';
import { SCREEN_WIDTH } from '../../utils/dimensions';
import BoxMenu from './BoxMenu';
import { voteForRoundAction } from '../../redux/actions/StoryActions';
import { CommentModal } from '../modals';

const ProposedSection = ({
  type,
  proposedBlocks,
  listMode,
  userCanPropose,
  userIsAParticipant,
  onPropose,
  story,
  voteForRound,
}) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const loadingRoundVote = useSelector((state) => state.story.roundVoteLoading);
  const [showComment, setShowComment] = React.useState(false);

  const electedBlock = proposedBlocks?.find((block) => block.isElected);
  const listElected = electedBlock && (
    <View style={{ marginHorizontal: 35, marginBottom: 20, marginTop: type === 'Ending' ? 0 : 20 }}>
      {electedBlock.content && <HTMLView value={electedBlock.content} />}
      {!electedBlock.content && (
        <Text type="regular" style={{ color: textColor, lineHeight: 20 }}>
          {`No elected ${type} yet`}
        </Text>
      )}
    </View>
  );
  const introSubmittingEndsAt = moment(story.introSubmittingStartedAt).add(
    story.settings?.introTimeLimitSeconds,
    'seconds',
  );
  const introVotingEndsAt = moment(story.introVotingStartedAt).add(
    story.settings?.voteTimeLimitSeconds,
    'seconds',
  );
  const outroSubmittingEndsAt = moment(story.outroSubmittingStartedAt).add(
    story.settings?.outroTimeLimitSeconds,
    'seconds',
  );
  const outroVotingEndsAt = moment(story.outroVotingStartedAt).add(
    story.settings?.voteTimeLimitSeconds,
    'seconds',
  );

  const handleVoting = async (proposedBlockId) => {
    try {
      await voteForRound(story._id, proposedBlockId);
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  // const [introSubmittingEndDate, setIntroSubmittingEndDate] = React.useState(introSubmittingEndsAt);
  // const [introVotingEndDate, setIntroVotingEndDate] = React.useState(introVotingEndsAt);
  // const [outroSubmittingEndDate, setOutroSubmittingEndDate] = React.useState(outroSubmittingEndsAt);
  // const [outroVotingEndDate, setOutroVotingEndDate] = React.useState(outroVotingEndsAt);

  // const tick = () => {
  //   setIntroSubmittingEndDate(
  //     moment(story.createdAt).add(story.settings?.introTimeLimitSeconds, 'seconds')
  //   );

  //   setIntroVotingEndDate(
  //     moment(story.introVotingStartedAt).add(story.settings?.voteTimeLimitSeconds, 'seconds')
  //   );

  //   setOutroSubmittingEndDate(
  //     moment(story.outroSubmittingStartedAt).add(story.settings?.outroTimeLimitSeconds, 'seconds')
  //   );

  //   setOutroVotingEndDate(
  //     moment(story.outroVotingStartedAt).add(story.settings?.voteTimeLimitSeconds, 'seconds')
  //   );
  // };

  // React.useEffect(() => {
  //   let timer = setInterval(tick, 1000);

  //   return () => {
  //     if (timer) {
  //       clearInterval(timer);
  //       timer = null;
  //     }
  //   };
  // }, []);

  const renderVotingButton = (proposedBlock) => {
    const alreadyVoted = proposedBlock.votes.some((vote) => vote.voter._id === currentUser?._id);
    const votingButton = (
      <Surface style={{ width: '40%' }}>
        <Button
          uppercase={false}
          loading={loadingRoundVote}
          disabled={loadingRoundVote || alreadyVoted}
          onPress={() => handleVoting(proposedBlock._id)}
          style={{ backgroundColor: alreadyVoted ? '#A39F9F' : '#EC8918' }}>
          <Text type="bold" style={{ color: '#FFF' }}>
            <Text type="bold" style={{ color: '#fff', fontSize: 12 }}>
              Vote now
            </Text>
          </Text>
        </Button>
      </Surface>
    );

    if (
      story?.status === 'outro_voting' &&
      type === 'Ending' &&
      story.outroVotingStartedAt &&
      moment().isBefore(outroVotingEndsAt)
    ) {
      return votingButton;
    }

    if (
      story?.status === 'intro_voting' &&
      type === 'Intro' &&
      story.introVotingStartedAt &&
      moment().isBefore(introVotingEndsAt)
    ) {
      return votingButton;
    }
  };

  const showCommentModal = () => {
    setShowComment(true);
  };
  const dismissComment = () => setShowComment(false);
  const cardsSection = (
    <>
      <Text type="medium" style={{ ...styles.title, marginTop: type === 'Ending' ? 0 : 20 }}>
        All Proposed {type}s ({proposedBlocks?.length})
      </Text>

      {userCanPropose && type === 'Intro' && moment().isBefore(introSubmittingEndsAt) && (
        <View
          style={{
            flex: 1,
            marginLeft: 20,
            marginTop: 10,
          }}>
          <Button
            icon={({ size }) => <FontAwesome5 size={size} color="#fff" name="pen-fancy" />}
            uppercase={false}
            onPress={() => onPropose()}
            style={{ backgroundColor: '#ed8a18', width: SCREEN_WIDTH * 0.5, elevation: 2 }}>
            <Text type="bold" style={{ color: '#FFF' }}>
              Propose an Intro
            </Text>
          </Button>
        </View>
      )}

      {story?.status === 'waiting_for_intros' &&
        type === 'Intro' &&
        story.createdAt &&
        moment().isBefore(introSubmittingEndsAt) && (
          <Text style={{ color: '#ed8a18', marginHorizontal: 20, marginTop: 7 }}>
            Submitting intros ends {moment().to(introSubmittingEndsAt)}
          </Text>
        )}

      {story?.status === 'intro_voting' &&
        type === 'Intro' &&
        story.introVotingStartedAt &&
        moment().isBefore(introSubmittingEndsAt) && (
          <Text style={{ color: '#ed8a18', marginHorizontal: 20, marginTop: 7 }}>
            Votes for the story intro are currently in progress. Ending{' '}
            {moment().to(introVotingEndsAt)}
          </Text>
        )}

      {userCanPropose && type === 'Ending' && moment().isBefore(outroSubmittingEndsAt) && (
        <View
          style={{
            flex: 1,
            marginLeft: 20,
            marginTop: 10,
          }}>
          <Button
            icon={({ size }) => <FontAwesome5 size={size} color="#fff" name="pen-fancy" />}
            uppercase={false}
            onPress={() => onPropose()}
            style={{ backgroundColor: '#ed8a18', width: SCREEN_WIDTH * 0.5, elevation: 2 }}>
            <Text type="bold" style={{ color: '#FFF' }}>
              Propose an Ending
            </Text>
          </Button>
        </View>
      )}

      {story?.status === 'waiting_for_outros' &&
        type === 'Ending' &&
        story.createdAt &&
        moment().isBefore(outroSubmittingEndsAt) && (
          <Text style={{ color: '#ed8a18', marginHorizontal: 20, marginTop: 7 }}>
            Submitting endings ends {moment().to(outroSubmittingEndsAt)}
          </Text>
        )}

      {story?.status === 'outro_voting' &&
        type === 'Ending' &&
        story.outroVotingStartedAt &&
        moment().isBefore(outroVotingEndsAt) && (
          <Text style={{ color: '#ed8a18', marginHorizontal: 20, marginTop: 7 }}>
            Votes for the story ending are currently in progress. Ending{' '}
            {moment().to(outroVotingEndsAt)}
          </Text>
        )}

      {!proposedBlocks?.length && type === 'Ending' && (
        <Text
          style={{
            color: '#ed8a18',
            marginLeft: 20,
            marginBottom: 20,
            marginTop: 10,
          }}>
          No endings yet
        </Text>
      )}

      <ScrollView horizontal style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
        {proposedBlocks?.map((proposedBlock, index) => {
          const margin = index === 0 ? 20 : 0;
          let authorName = index === 0 ? 'the Master Author' : 'an Anonymous Author';
          const userIsAuthor = currentUser?._id === proposedBlock.author?._id;

          if (story.status === 'completed') {
            if (proposedBlock.privacyStatus === 'username') {
              authorName = proposedBlock.author.username;
            } else if (proposedBlock.privacyStatus === 'username_and_full_name') {
              authorName = `${proposedBlock.author.firstName} ${proposedBlock.author.lastName} (${proposedBlock.author.username})`;
            }
          }

          if (userIsAuthor) {
            authorName = 'You';
          }

          return (
            <View key={Math.random()}>
              <CommentModal dismiss={dismissComment} visible={showComment} parent={proposedBlock} />
              <Surface style={{ ...styles.intros, marginLeft: margin }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text type="bold" style={styles.subTitle}>
                    By {authorName}
                  </Text>
                  <BoxMenu
                    parentType={type}
                    block={proposedBlock}
                    storyStatus={story.status}
                    storyId={story._id}
                    // eslint-disable-next-line no-underscore-dangle
                    userIsAuthor={currentUser?._id === proposedBlock.author?._id}
                  />
                </View>

                <HTMLView value={proposedBlock.content} />

                <View style={{ marginTop: 'auto' }}>
                  <Text style={styles.separator}>---</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      {proposedBlock.isElected && (
                        <View style={styles.displayRow}>
                          <FontAwesome name="star" size={20} color="#ed8a18" />
                          <Text type="bold" style={styles.boxFooter}>
                            Elected {type}
                          </Text>
                        </View>
                      )}
                      <View style={styles.displayRow}>
                        <FontAwesome5 name="vote-yea" size={16} color="#911414" />
                        <Text type="bold" style={styles.boxFooter}>
                          Votes: {proposedBlock.votes.length}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.displayRow}
                        onPress={() => {
                          showCommentModal();
                        }}>
                        <FontAwesome name="commenting" size={20} color="#0277BD" />
                        <Text type="bold" style={styles.boxFooter}>
                          Comments: {proposedBlock.comments.length}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {!userIsAuthor && userIsAParticipant && renderVotingButton(proposedBlock)}
                  </View>
                </View>
              </Surface>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
  return listMode ? listElected : cardsSection;
};

ProposedSection.propTypes = {
  type: PropTypes.string.isRequired,
  proposedBlocks: PropTypes.array.isRequired,
  listMode: PropTypes.bool,
  userCanPropose: PropTypes.bool,
  userIsAParticipant: PropTypes.bool,
  onPropose: PropTypes.func.isRequired,
  voteForRound: PropTypes.func.isRequired,
};

ProposedSection.defaultProps = {
  listMode: false,
};

const textColor = '#5A7582';

const styles = StyleSheet.create({
  title: {
    color: textColor,
    fontSize: 20,
    marginLeft: 20,
  },
  intros: {
    width: SCREEN_WIDTH * 0.75,
    elevation: 2,
    marginVertical: 20,
    marginRight: 20,
    padding: 10,
  },
  subTitle: {
    fontWeight: 'bold',
    color: textColor,
  },
  separator: {
    fontSize: 25,
    color: textColor,
  },
  boxFooter: {
    marginLeft: 5,
    fontSize: 12,
    lineHeight: 20,
    color: textColor,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  voteForRound: voteForRoundAction,
};

export default connect(null, mapDispatchToProps)(ProposedSection);
