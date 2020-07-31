/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Animated,
  SafeAreaView,
  PixelRatio,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Button, Surface, TouchableRipple } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Dropdown } from 'react-native-material-dropdown';
import { connect, useSelector } from 'react-redux';

import moment from 'moment';
import Text from '../components/CustomText';
import { Round, ProposedSection, MetaData } from '../components/stories';
import { HugeAdvertisement, SmallAdvertisement } from '../components/advertisements';
import { SCREEN_HEIGHT } from '../utils/dimensions';
import { joinStoryAction, getSelectedStoryAction } from '../redux/actions/StoryActions';
import LeaveStoryModal from '../components/modals/LeaveStoryModal';

const StoryScreen = ({ navigation, route, joinStory, getSelectedStory }) => {
  const { story, reducerName } = route.params;
  const { masterAuthor } = story;
  const stories = useSelector((state) => state[reducerName]?.stories) || [];

  const selectedStory = stories.find((s) => s._id === story?._id) || {};
  // We make sure they are in the order of the story lifecycle - https://app.clickup.com/2351815/v/dc/16z6a-777/27rp7-735
  // so that we can properly use this variable later
  const inProgressStatuses = [
    'waiting_for_players',
    'waiting_for_intros',
    'intro_voting',
    'round_writing',
    'waiting_for_outros',
    'outro_voting',
  ];
  const tooLateToJoin = !inProgressStatuses.slice(0, 2).includes(selectedStory?.status);
  const authorsCount = selectedStory?.coAuthors?.length + 1;
  const anonymousAuthorsCount = selectedStory?.coAuthors?.filter(
    (ca) => ca.privacyStatus === 'anonymous',
  ).length;
  const missingAuthorsCount = selectedStory?.settings?.minimumParticipants - authorsCount;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isMasterAuthor = currentUser?._id === masterAuthor?._id;
  const userIsAParticipant =
    selectedStory?.coAuthors?.find((ca) => ca.profile._id === currentUser?._id) || isMasterAuthor;
  const tooLateForOutro =
    selectedStory?.status === 'outro_voting' || selectedStory?.status === 'completed';
  const waitingStory = authorsCount < selectedStory?.settings?.minimumParticipants;
  const completedStory = selectedStory?.status === 'completed';
  const inProgress = inProgressStatuses.includes(selectedStory?.status);
  const status = inProgress ? 'In Progress' : 'Completed';
  let masterAuthorName =
    selectedStory?.privacyStatus === 'anonymous' ? 'Anonymous' : masterAuthor.username;

  if (selectedStory?.privacyStatus === 'username_and_full_name') {
    masterAuthorName = `${masterAuthor.firstName} ${masterAuthor.lastName} (${masterAuthor.username})`;
  }
  const [headerDimensions, setHeaderDimensions] = React.useState({ height: SCREEN_HEIGHT * 0.52 });
  const [isLeaveStoryModalVisible, setIsLeaveStoryModalVisible] = React.useState(false);
  const reachedEnding = !inProgressStatuses.slice(0, 4).includes(selectedStory?.status);
  const scrollView = React.useRef(null);
  const refRBSheet = React.useRef();

  let coAuthors;
  if (waitingStory) {
    coAuthors = `${missingAuthorsCount} more to start`;
  } else {
    // We deduct 1 because authorsCount is counting the master author as well
    const publicAuthorsCount = authorsCount - anonymousAuthorsCount - 1;

    if (publicAuthorsCount) {
      coAuthors = `${publicAuthorsCount} public`;
    }

    if (anonymousAuthorsCount) {
      if (publicAuthorsCount) {
        coAuthors = `${coAuthors} & ${anonymousAuthorsCount} anonymous`;
      } else {
        coAuthors = `${anonymousAuthorsCount} anonymous`;
      }
    }
  }
  let firstBtnColor;
  if (userIsAParticipant && isMasterAuthor && inProgress) {
    firstBtnColor = '#A39F9F';
  } else if (userIsAParticipant && inProgress) {
    firstBtnColor = '#F44336';
  } else if (!userIsAParticipant && waitingStory) {
    firstBtnColor = '#ED8A18';
  } else {
    firstBtnColor = '#A39F9F';
  }

  const [listMode, setListMode] = React.useState(false);
  const [privacyStatus, setPrivacyStatus] = React.useState(); // TODO: get the default user privacystatus from state.setting
  const icon = listMode ? 'eye-slash' : 'eye';
  const color = listMode ? '#FFF' : '#EEE';

  const privacyData = [
    { value: 'username', label: 'Username' },
    { value: 'username_and_full_name', label: 'Username and Full Name' },
    { value: 'anonymous', label: 'Anonymous' },
  ];

  navigation.setOptions({
    headerShown: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchSelectedStory = async () => {
        try {
          await getSelectedStory(story._id);
        } catch (e) {
          Toast.show(e.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      };

      StatusBar.setHidden(false);
      StatusBar.setBarStyle('light-content');
      fetchSelectedStory();
    }, []),
  );

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const HEADER_MINIMUM_HEIGHT = 0;
  const HEADER_MAXIMUM_HEIGHT = SCREEN_HEIGHT * 0.25;

  const titleHeight = scrollY.interpolate({
    inputRange: [0, 25],
    outputRange: [25, 0],
    extrapolate: 'clamp',
  });

  const subtitlemgBottom = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });

  const metaHeaderHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAXIMUM_HEIGHT + 65],
    outputRange: [HEADER_MAXIMUM_HEIGHT, HEADER_MINIMUM_HEIGHT],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAXIMUM_HEIGHT],
    outputRange: [1, 0],
  });

  const paginationOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAXIMUM_HEIGHT],
    outputRange: [0, 1],
  });

  const paginationHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAXIMUM_HEIGHT],
    outputRange: [0, 50],
    extrapolate: 'clamp',
  });

  const onHeaderLayout = (event) => {
    if (headerDimensions) return; // layout was already called

    setHeaderDimensions(event.nativeEvent.layout);
  };

  let rawScrollPosition = 0;

  const handleScroll = (e) => {
    rawScrollPosition = e.nativeEvent.contentOffset.y;
  };

  const showToast = (message) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
  };

  const joinOrLeave = async () => {
    if (userIsAParticipant) {
      try {
        if (completedStory) {
          showToast("It's too late to leave this story now");
        } else if (isMasterAuthor && inProgress) {
          showToast("You cannot delete an 'In Progress' story");
        } else {
          setIsLeaveStoryModalVisible(true);
        }
      } catch (e) {
        showToast(e.message);
      }
    } else if (completedStory) {
      showToast('You cannot join a completed story');
    } else if (authorsCount === 100) {
      showToast('The maximum amount of participants has been reached');
    } else if (tooLateToJoin && selectedStory?.genre?.slug !== 'bedtime_stories') {
      showToast("It's too late to join this story now");
    } else {
      refRBSheet.current.open();
    }
  };

  const handleJoinStory = async () => {
    try {
      await joinStory(story?._id, currentUser?._id, privacyStatus);
      refRBSheet.current.close();
    } catch (e) {
      showToast(e.message);
    }
  };

  const handleRoundWriting = (entity) => () => {
    navigation.navigate('RoundWriting', { story: selectedStory, entity });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
      }}>
      <LeaveStoryModal
        isMasterAuthor={isMasterAuthor}
        dismiss={() => setIsLeaveStoryModalVisible(false)}
        visible={isLeaveStoryModalVisible}
        storyId={story._id}
        navigation={navigation}
      />
      <Surface
        style={{
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13,
          backgroundColor: '#03a2a2',
          elevation: 2,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.4, 1]}
          onLayout={onHeaderLayout}
          style={{
            borderRadius: 13,
          }}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Animated.View
              style={{
                height: titleHeight,
                overflow: 'hidden',
              }}>
              <Text type="bold" style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>
                ScriptoRerum
              </Text>
            </Animated.View>
            <Animated.Text
              type="bold"
              style={{
                color: 'white',
                marginBottom: subtitlemgBottom,
                textAlign: 'center',
                fontSize: 18,
              }}>
              {selectedStory?.title}
            </Animated.Text>

            <Animated.View
              style={{
                height: metaHeaderHeight,
                marginBottom: 10,
                opacity,
                marginLeft: 20,
                alignSelf: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <MetaData label="Genre" value={selectedStory?.genre?.name} />
              <MetaData label="Status" value={status} />
              {completedStory && <MetaData label="Master Author" value={masterAuthorName} />}
              <MetaData
                label="Intro Maximum Words"
                value={`${selectedStory?.settings?.introMaxWords}`}
              />
              <MetaData
                label="Ending Maximum Words"
                value={`${selectedStory?.settings?.outroMaxWords}`}
              />
              <MetaData
                label="Words per Round"
                value={`${selectedStory?.settings?.roundMaxWords} max`}
              />
              <MetaData label="Co-Authors" value={coAuthors} />
            </Animated.View>

            <View style={styles.headerBtn}>
              <Surface style={styles.surface}>
                <Button
                  onPress={joinOrLeave}
                  mode="contained"
                  uppercase={false}
                  style={{ backgroundColor: firstBtnColor }}
                  labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium', color: '#fff' }}>
                  {userIsAParticipant && isMasterAuthor && 'Delete Story'}
                  {userIsAParticipant && !isMasterAuthor && 'Leave Story'}
                  {!userIsAParticipant && 'Join Story'}
                </Button>
              </Surface>

              <Surface style={styles.surface}>
                <Button
                  mode="text"
                  icon="arrow-left"
                  color="#5a7582"
                  uppercase={false}
                  onPress={() => navigation.goBack()}
                  labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium' }}>
                  Go Back
                </Button>
              </Surface>

              {!inProgress && (
                <Surface style={styles.surface}>
                  <TouchableRipple onPress={() => setListMode(!listMode)} style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                      <FontAwesome
                        name="bars"
                        size={22}
                        color="#5a7582"
                        style={{ marginTop: 13, marginLeft: 15 }}
                      />
                      <FontAwesome
                        name={icon}
                        size={22}
                        color="#5a7582"
                        style={{
                          position: 'absolute',
                          left: 5,
                        }}
                      />
                    </View>
                  </TouchableRipple>
                </Surface>
              )}
            </View>
            <Animated.View
              style={{
                width: '100%',
                opacity: paginationOpacity,
                borderTopWidth: 1,
                borderTopColor: 'rgba(255,255,255,0.5)',
                height: paginationHeight,
                marginTop: 10,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  scrollView.current.scrollTo({
                    y: 0,
                    animated: true,
                  });
                }}
                style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: 'rgba(255,255,255,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="stepbackward" size={14} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  scrollView.current.scrollTo({
                    y: rawScrollPosition - 300,
                    animated: true,
                  });
                }}
                style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: 'rgba(255,255,255,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="banckward" size={14} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  scrollView.current.scrollTo({
                    y: rawScrollPosition + 300,
                    animated: true,
                  });
                }}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: 'rgba(255,255,255,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="forward" size={14} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  scrollView.current.scrollToEnd();
                }}
                style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: 'rgba(255,255,255,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="stepforward" size={16} color="white" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        </LinearGradient>
      </Surface>
      {headerDimensions && headerDimensions.height && (
        <ScrollView
          scrollEventThrottle={16}
          ref={scrollView}
          decelerationRate="fast"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            listener: (event) => {
              handleScroll(event);
            },
          })}
          contentContainerStyle={{
            paddingTop: headerDimensions.height + (PixelRatio.get() <= 2 ? -15 : 40),
          }}>
          <ProposedSection
            onPropose={handleRoundWriting('intro')}
            userCanPropose={userIsAParticipant && !tooLateToJoin && !isMasterAuthor}
            type="Intro"
            proposedBlocks={selectedStory?.parts?.filter((p) => p.isIntro)}
            listMode={listMode}
            story={selectedStory}
          />
          <SmallAdvertisement />

          {!waitingStory &&
            selectedStory?.parts
              ?.filter((s) => !s.isIntro && !s.isOutro)
              .map((round, index, arr) => {
                const bigAdd = [4, 10];
                const add = [6];
                return (
                  <View key={Math.random()}>
                    {bigAdd.includes(index) && <HugeAdvertisement />}
                    {add.includes(index) && <SmallAdvertisement />}
                    <Round
                      navigation={navigation}
                      round={round}
                      roundIdx={index + 1}
                      totalRound={arr.length}
                      story={selectedStory}
                      listMode={listMode}
                      isMasterAuthorRound={round.author?._id === masterAuthor?._id}
                      isCompletedStory={completedStory}
                    />
                  </View>
                );
              })}

          {reachedEnding && (
            <ProposedSection
              // We use 'ending' instead of 'outro'
              // because we're gonna be using that on the UI
              onPropose={handleRoundWriting('ending')}
              userCanPropose={userIsAParticipant && !tooLateForOutro}
              type="Ending"
              proposedBlocks={selectedStory?.parts?.filter((p) => p.isOutro)}
              story={selectedStory}
            />
          )}
        </ScrollView>
      )}

      <RBSheet
        ref={refRBSheet}
        height={SCREEN_HEIGHT * 0.6}
        closeOnDragDown
        // closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, color: '#03a2a2' }}>
            Minimum and maximum authors allowed
          </Text>
          <Text style={{ marginTop: 5, marginBottom: 10 }}>
            {selectedStory?.settings?.minimumParticipants} to 100
          </Text>
          <Text style={{ fontSize: 16, color: '#03a2a2' }}>
            Time for writing and voting for the intro
          </Text>
          <Text style={{ marginTop: 5, marginBottom: 10 }}>
            {moment()
              .startOf('day')
              .seconds(selectedStory?.settings?.introTimeLimitSeconds || 0)
              ?.format('H:mm')}{' '}
            to write{' & '}
            {moment()
              .startOf('day')
              .seconds(selectedStory?.settings?.voteTimeLimitSeconds || 0)
              ?.format('H:mm')}{' '}
            to vote
          </Text>
          <Text style={{ fontSize: 16, color: '#03a2a2' }}>
            Time for writing and voting for the ending
          </Text>
          <Text style={{ marginTop: 5, marginBottom: 10 }}>
            {moment()
              .startOf('day')
              .seconds(selectedStory?.settings?.outroTimeLimitSeconds || 0)
              ?.format('H:mm')}{' '}
            to write{' & '}
            {moment()
              .startOf('day')
              .seconds(selectedStory?.settings?.voteTimeLimitSeconds || 0)
              ?.format('H:mm')}{' '}
            to vote
          </Text>
          <Text style={{ fontSize: 16, color: '#03a2a2' }}>Time for writing a round</Text>
          <Text style={{ marginTop: 5, marginBottom: 10 }}>
            {moment()
              .startOf('day')
              .seconds(selectedStory?.settings?.roundTimeLimitSeconds || 0)
              ?.format('H:mm')}{' '}
          </Text>
          <Text style={{ fontSize: 16, color: '#03a2a2' }}>Privacy Status</Text>

          <Text style={{ fontSize: 13, marginBottom: -20 }}>
            Decide what other people will see as your handle throughout this story
          </Text>

          <Dropdown
            value={selectedStory?.privacyStatus}
            fontSize={16}
            dropdownPosition={0.1}
            onChangeText={(text) => setPrivacyStatus(text)}
            data={privacyData}
          />
          <Surface style={{ ...styles.surface, marginTop: 20, marginBottom: 30 }}>
            <Button
              mode="contained"
              onPress={handleJoinStory}
              uppercase={false}
              style={{ backgroundColor: '#ED8A18' }}
              labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium', color: '#fff' }}>
              Join Story
            </Button>
          </Surface>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#5A7582',
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  headerBtn: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginHorizontal: '5%',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  surface: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 45,
    elevation: 3,
  },
});

StoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  joinStory: PropTypes.func.isRequired,
  getSelectedStory: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  joinStory: joinStoryAction,
  getSelectedStory: getSelectedStoryAction,
};

export default connect(null, mapDispatchToProps)(StoryScreen);
