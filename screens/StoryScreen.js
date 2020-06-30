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
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Button, Surface, TouchableRipple } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Text from '../components/CustomText';
import { Round, ProposedSection, MetaData } from '../components/stories';
import { HugeAdvertisement, SmallAdvertisement } from '../components/advertisements';
import { SCREEN_HEIGHT } from '../utils/dimensions';

const StoryScreen = ({ navigation, route }) => {
  const { story } = route.params;
  const { masterAuthor } = story;
  const authorsCount = story.parts?.filter(p => !p.isIntro && !p.isOutro).length;
  const missingAuthorsCount = story.settings?.minimumParticipants - authorsCount;
  const currentUser = useSelector(state => state.auth.currentUser);
  const includesSelf = story.parts?.some(p => p.author?._id === currentUser?._id);
  const inprogressStory = story.status === 'in_progress';
  const waitingStory = authorsCount < story.settings?.minimumParticipants;
  const completedStory = story.status === 'completed';
  const inprogress = inprogressStory || waitingStory;
  const status = inprogress ? 'In Progress' : 'Completed';
  const masterAuthorName = inprogress ? 'Anonymous 1' : masterAuthor.username;
  const [headerDimensions, setHeaderDimensions] = React.useState({ height: SCREEN_HEIGHT * 0.52 });

  const scrollView = React.useRef(null);

  let coAuthors;
  if (inprogressStory) {
    coAuthors = `${authorsCount - 1}/${authorsCount}`;
  } else if (waitingStory) {
    coAuthors = `${missingAuthorsCount} more to start`;
  } else {
    coAuthors = `+${authorsCount - 1} anonymous authors`;
  }
  let firstBtnColor;
  if (includesSelf && inprogress) {
    firstBtnColor = '#F44336';
  } else if (!includesSelf && waitingStory) {
    firstBtnColor = '#ED8A18';
  } else {
    firstBtnColor = '#A39F9F';
  }

  const [listMode, setListMode] = React.useState(false);
  const icon = listMode ? 'eye-slash' : 'eye';
  const color = listMode ? '#FFF' : '#EEE';

  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(false);
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight * 1.1 : 0
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
              paddingTop: Constants.statusBarHeight * 1.7,
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
              <MetaData label="Genre" value={story.genre?.name} />
              <MetaData label="Status" value={status} />
              <MetaData label="Master Author" value={masterAuthorName} />
              <MetaData label="Intro Maximum Words" value={`${story.settings?.introMaxWords}`} />
              <MetaData label="Ending Maximum Words" value={`${story.settings?.outroMaxWords}`} />
              <MetaData label="Words per Round" value={`${story.settings?.roundMaxWords} max`} />
              <MetaData label="Co-Authors" value={coAuthors} />
            </Animated.View>

            <View style={styles.headerBtn}>
              <Surface style={styles.surface}>
                <Button
                  mode="contained"
                  uppercase={false}
                  style={{ backgroundColor: firstBtnColor }}
                  labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium', color: '#fff' }}>
                  {includesSelf ? 'Leave Story' : 'Join Story'}
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
          <ProposedSection
            type="Intro"
            proposedBlocks={story.parts?.filter(p => p.isIntro)}
            listMode={listMode}
          />
          <SmallAdvertisement />

          {!waitingStory &&
            story.parts
              .filter(s => !s.isIntro && !s.isOutro)
              .map((round, index, arr) => {
                const bigAdd = [4, 10];
                const add = [6];
                return (
                  <View key={Math.random()}>
                    {bigAdd.includes(index) && <HugeAdvertisement />}
                    {add.includes(index) && <SmallAdvertisement />}
                    <Round
                      round={round}
                      roundIdx={index + 1}
                      totalRound={arr.length}
                      listMode={listMode}
                    />
                  </View>
                );
              })}

          {completedStory && (
            <ProposedSection
              type="Ending"
              proposedBlocks={story.parts?.filter(p => p.isOutro)}
              listMode={listMode}
            />
          )}
        </ScrollView>
      )}
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
  pendingText: {
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
  route: PropTypes.object.isRequired
};

export default StoryScreen;
