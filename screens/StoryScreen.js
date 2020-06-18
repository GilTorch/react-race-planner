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
  Platform
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
import { connect } from 'react-redux';

import Text from '../components/CustomText';
import { Round, ProposedSection, MetaData } from '../components/stories';
import { HugeAdvertisement, SmallAdvertisement } from '../components/advertisements';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/dimensions';
import { stories } from '../utils/data';
import { joinStoryAction } from '../redux/actions/StoryAction';

const StoryScreen = ({ navigation, route, joinStory }) => {
  const { storyId } = route.params;
  // const stories = useSelector(state => state.home.stories);
  // const story = stories.find(st => st.id === storyId);

  const story = stories.find(st => st.id === storyId) || stories[3];
  const masterAuthor = story.authors.find(author => author.storyLead);
  const authorsCount = story.authors.length;
  const missingAuthorsCount = 5 - authorsCount;
  const user = story.authors.find(author => author.username === 'johndoe');
  const inprogressStory = story.status === 'In Progress';
  const waitingStory = story.status === 'Waiting for players';
  const completedStory = story.status === 'Completed';
  const inprogress = inprogressStory || waitingStory;
  const status = inprogress ? 'In Progress' : 'Completed';
  const masterAuthorName = inprogress ? 'Anonymous 1' : masterAuthor.fullName;
  const [headerDimensions, setHeaderDimensions] = React.useState({ height: SCREEN_HEIGHT * 0.52 });

  const scrollView = React.useRef(null);
  const refRBSheet = React.useRef();

  let coAuthors;
  if (inprogressStory) {
    coAuthors = `${authorsCount - 1}/${authorsCount}`;
  } else if (waitingStory) {
    coAuthors = `${missingAuthorsCount} more to start`;
  } else {
    coAuthors = `+${authorsCount - 1} anonymous authors`;
  }
  let firstBtnColor;
  if (user && inprogress) {
    firstBtnColor = '#F44336';
  } else if (!user && waitingStory) {
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
    { value: 'anonymous', label: 'Anonymous' }
  ];

  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const HEADER_MINIMUM_HEIGHT = 0;
  const HEADER_MAXIMUM_HEIGHT = SCREEN_HEIGHT * 0.25;

  const titleHeight = scrollY.interpolate({
    inputRange: [0, 25],
    outputRange: [25, 0],
    extrapolate: 'clamp'
  });

  const subtitlemgBottom = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: [10, 0],
    extrapolate: 'clamp'
  });

  const metaHeaderHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAXIMUM_HEIGHT + 65],
    outputRange: [HEADER_MAXIMUM_HEIGHT, HEADER_MINIMUM_HEIGHT],
    extrapolate: 'clamp'
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAXIMUM_HEIGHT],
    outputRange: [1, 0]
  });

  const paginationOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAXIMUM_HEIGHT],
    outputRange: [0, 1]
  });

  const paginationHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAXIMUM_HEIGHT],
    outputRange: [0, 50],
    extrapolate: 'clamp'
  });

  const onHeaderLayout = event => {
    if (headerDimensions) return; // layout was already called

    setHeaderDimensions(event.nativeEvent.layout);
  };

  let rawScrollPosition = 0;

  const handleScroll = e => {
    rawScrollPosition = e.nativeEvent.contentOffset.y;
  };

  const joinOrLeave = () => {
    // TODO: check if the max authors is reached
    // Toast.show('You cannot join a completed story', {
    //   duration: Toast.durations.SHORT,
    //   position: Toast.positions.BOTTOM
    // });
    if (user) {
      // leaveStory();
    } else {
      refRBSheet.current.open();
    }
  };

  const handleJoinStory = async () => {
    try {
      // await joinStory({ privacyStatus });
      refRBSheet.current.close();
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
      }}>
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
          zIndex: 1
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.4, 1]}
          onLayout={onHeaderLayout}
          style={{
            borderRadius: 13
          }}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flexDirection: 'column'
            }}>
            <Animated.View
              style={{
                height: titleHeight,
                overflow: 'hidden'
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
                fontSize: 18
              }}>
              {story.title}
            </Animated.Text>

            <Animated.View
              style={{
                height: metaHeaderHeight,
                marginBottom: 10,
                opacity,
                marginLeft: 20,
                alignSelf: 'flex-start',
                justifyContent: 'space-between'
              }}>
              <MetaData label="Genre" value={story.genre} />
              <MetaData label="Status" value={status} />
              <MetaData label="Master Author" value={masterAuthorName} />
              <MetaData label="Intro Maximum Words" value="50" />
              <MetaData label="Ending Maximum Words" value="50" />
              <MetaData label="Words per Round" value="100 max" />
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
                  {user ? 'Leave Story' : 'Join Story'}
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

              {!inprogress && (
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
                          left: 5
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
                flexDirection: 'row'
              }}>
              <TouchableOpacity
                onPress={() => {
                  scrollView.current.scrollTo({
                    y: 0,
                    animated: true
                  });
                }}
                style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: 'rgba(255,255,255,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <AntDesign name="stepbackward" size={14} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  scrollView.current.scrollTo({
                    y: rawScrollPosition - 300,
                    animated: true
                  });
                }}
                style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: 'rgba(255,255,255,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <AntDesign name="banckward" size={14} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  scrollView.current.scrollTo({
                    y: rawScrollPosition + 300,
                    animated: true
                  });
                }}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: 'rgba(255,255,255,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
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
                    alignItems: 'center'
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
            listener: event => {
              handleScroll(event);
            }
          })}
          contentContainerStyle={{
            paddingTop: headerDimensions.height + (PixelRatio.get() <= 2 ? -15 : 40)
          }}>
          {waitingStory && (
            <>
              <Text type="medium" style={styles.title}>
                All Proposed Intros
              </Text>
              <Text type="bold-italic" style={styles.penddingText}>
                Waiting for {missingAuthorsCount} more players.
              </Text>

              <HugeAdvertisement />
            </>
          )}
          {!waitingStory && (
            <>
              <ProposedSection type="Intro" proposedBlocks={story.intros} listMode={listMode} />
              <SmallAdvertisement />
            </>
          )}

          {!waitingStory &&
            story.rounds.map((round, index) => {
              const bigAdd = [4, 10];
              const add = [6];
              return (
                <View key={Math.random()}>
                  {bigAdd.includes(index) && <HugeAdvertisement />}
                  {add.includes(index) && <SmallAdvertisement />}
                  <Round round={round} totalRound={story.totalRound} listMode={listMode} />
                </View>
              );
            })}
          {inprogressStory && (
            <>
              <Text type="bold" style={{ ...styles.title, marginTop: 0 }}>
                All Proposed Endings
              </Text>
              <Text type="bold-italic" style={{ ...styles.penddingText, fontSize: 13 }}>
                Pendding
              </Text>
            </>
          )}
          {completedStory && (
            <ProposedSection type="Ending" proposedBlocks={story.endings} listMode={listMode} />
          )}
        </ScrollView>
      )}
      {false && !listMode && !waitingStory && (
        <View
          style={{
            position: 'absolute',
            width: SCREEN_WIDTH * 0.25,
            bottom: 25,
            right: 10
          }}>
          <Surface style={styles.floatingNav}>
            <FontAwesome name="chevron-up" size={20} color="#5A7582" />
            <Text type="bold" style={{ color: '#5A7582' }}>
              FIRST
            </Text>
          </Surface>
          <Surface style={{ ...styles.floatingNav, marginTop: 10 }}>
            <FontAwesome name="chevron-down" size={20} color="#5A7582" />
            <Text type="bold" style={{ color: '#5A7582' }}>
              LAST
            </Text>
          </Surface>
        </View>
      )}
      <RBSheet
        ref={refRBSheet}
        height={400}
        closeOnDragDown
        // closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          },
          draggableIcon: {
            backgroundColor: '#000'
          }
        }}>
        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, color: '#F44336' }}>
            Minimum and maximum authors allowed
          </Text>
          <Text type="bold" style={{ marginVertical: 5 }}>
            2 to 10
          </Text>
          <Text style={{ fontSize: 16, color: '#F44336' }}>
            Time for writing and voting for the intro
          </Text>
          <Text type="bold" style={{ marginVertical: 5 }}>
            10mins
          </Text>
          <Text style={{ fontSize: 16, color: '#F44336' }}>
            Time for writing and voting for the ending
          </Text>
          <Text type="bold" style={{ marginVertical: 5 }}>
            1hr 10 mins
          </Text>
          <Text style={{ fontSize: 16, color: '#F44336' }}>Time for writing a round</Text>
          <Text type="bold" style={{ marginVertical: 5 }}>
            50mins
          </Text>
          <Text style={{ fontSize: 16, color: '#F44336', marginBottom: -20 }}>Privacy Status</Text>
          <Dropdown
            value="username"
            fontSize={16}
            dropdownPosition={0.1}
            onChangeText={text => setPrivacyStatus(text)}
            data={privacyData}
          />
          <Surface style={{ ...styles.surface, marginTop: 20, marginBottom: 30 }}>
            <Button
              mode="contained"
              onPress={handleJoinStory}
              uppercase={false}
              style={{ backgroundColor: firstBtnColor }}
              labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium', color: '#fff' }}>
              Join Story
            </Button>
          </Surface>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#5A7582',
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20
  },
  headerBtn: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginHorizontal: '5%',
    justifyContent: 'space-around',
    marginTop: 10
  },
  surface: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2
  },
  penddingText: {
    color: '#ED8A18',
    marginLeft: 20,
    marginVertical: 20
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 45,
    elevation: 3
  }
});

StoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  joinStory: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  joinStory: joinStoryAction
};

export default connect(null, mapDispatchToProps)(StoryScreen);
