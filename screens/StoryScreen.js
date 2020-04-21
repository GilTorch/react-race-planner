import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Animated,
  SafeAreaView,
  PixelRatio
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Surface, TouchableRipple } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';

import Text from '../components/CustomText';
import { Round, ProposedSection, MetaData } from '../components/stories';
import { HugeAdvertisement, SmallAdvertisement } from '../components/advertisements';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/dimensions';
import { stories } from '../utils/data';

const StoryScreen = ({ navigation, route }) => {
  const { storyId } = route.params;
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
  const icon = listMode ? 'eye-slash' : 'eye';
  const color = listMode ? '#FFF' : '#EEE';

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

  const onHeaderLayout = event => {
    if (headerDimensions) return; // layout was already called

    setHeaderDimensions(event.nativeEvent.layout);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color
      }}>
      <Surface
        style={{
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13,
          backgroundColor: '#03a2a2',
          elevation: 5,
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
            paddingBottom: 20,
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
          </SafeAreaView>
        </LinearGradient>
      </Surface>
      {headerDimensions && headerDimensions.height && (
        <ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
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
    elevation: 5
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
  route: PropTypes.object.isRequired
};

export default StoryScreen;
